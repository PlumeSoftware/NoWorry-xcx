/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webPost } from "../../utils/http";
import { Cart } from "../../entity/cart";
import { CartDetail } from "../../entity/order";

Page({
    data: {
        userName: '',
        phone: '',
        email: '',
        liveCity: '',


        payArray: ["微信支付", "客服辅助支付"],
        payIndex: 0,

        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPriceShow: 0,
        favourable: wx.getStorageSync('token') == "oJth05Jx9ITN9s85MnT5odUbPlAg43" ? [
            {
                title: "开发人员",
                amount: 127.9
            },
        ] : [],
        favourableTotal: 0,

        totolPriceCNY: 0,

        agree: false,

        allowSubmit: false
    },
    updateCart() {
        let total = 0;
        let totalCNY = 0;
        let favourableTotal = 0;

        //计算商品总价
        const carts = wx.getStorageSync('carts');
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].select) {
                total += carts[i].currentPrice * carts[i].quantity
            } else {
                carts.splice(i--, 1)
            }
        }

        this.data.favourable.forEach(i => {
            favourableTotal += i.amount
        })

        total = Number(total.toFixed(2))
        totalCNY = Number((8.6231 * (total - favourableTotal)).toFixed(2));

        const totalPriceShow = Number((total - favourableTotal).toFixed(2))
        this.setData(
            {
                totalPrice: total,
                totolPriceCNY: totalCNY,
                favourableTotal: favourableTotal,
                totalPriceShow: totalPriceShow,
                carts: carts
            }
        )
    },

    bindPickerChange(e: { detail: { value: number } }) {
        this.setData({ payIndex: e.detail.value })
    },

    agreeChange() {
        this.setData({
            agree: !this.data.agree
        })
    },

    async submitOrder() {
        wx.showLoading({
            title: '加载中',
        })

        setTimeout(() => {
            wx.hideLoading()
        }, 2000)

        const orderDetail: CartDetail[] = []
        const paid = this.data.carts;
        paid.forEach((cart: Cart) => {
            if (cart.select) {
                orderDetail.push({
                    boughtQuantity: cart.quantity,
                    invPrice: cart.quantity * cart.currentPrice,
                    commodityId: cart.commodityId
                })
            }
        })

        if (this.data.payIndex == 0) {//微信支付
            const data = (await webPost<{
                appId: string,
                timeStamp: string,
                nonceStr: string,
                package: string,
                signType: "MD5" | "HMAC-SHA256" | undefined,
                paySign: string
            }>('/pay', {
                openid: wx.getStorageSync('userInfo').openid,
                describe: paid[0].commodityName,
                amount: this.data.totolPriceCNY * 100
                // amount: 1
            }))!

            await new Promise<void>(r => {
                wx.requestPayment({
                    appId: data['appId'],
                    timeStamp: data['timeStamp'],
                    nonceStr: data['nonceStr'],
                    package: data['package'],
                    signType: data['signType'],
                    paySign: data['paySign'],
                    success: () => r()
                })
            })

            await webPost('/order/submit', {
                token: wx.getStorageSync('token'),
                orderTotalPrice: this.data.totalPrice,
                favourablePrice: this.data.favourableTotal,
                orderPaymentPrice: this.data.totalPrice - this.data.favourableTotal,
                payWay: 1,
                orderDetail: orderDetail,
                contact: `${this.data.userName},${this.data.phone},${this.data.email},${this.data.liveCity}`
            })

        } else if (this.data.payIndex == 1) {//客服辅助支付
            webPost('/order/submit', {
                token: wx.getStorageSync('token'),
                orderTotalPrice: this.data.totalPrice,
                favourablePrice: this.data.favourableTotal,
                orderPaymentPrice: 0,
                payWay: 0,
                orderDetail: orderDetail,
                contact: `${this.data.userName},${this.data.phone},${this.data.email},${this.data.liveCity}`
            })
        }

        //付款结束，跳转到成功界面
        setTimeout(() => {
            wx.reLaunch({
                url: `/pages/cart-settle-success/cart-settle-success`
            })
        }, 500)

        //删除购物车已支付商品
        const carts = wx.getStorageSync('carts');
        for (let i = 0; i < carts.length; i++) {
            if (paid.findIndex((item: { commodityId: number }) => carts[i].commodityId == item.commodityId) != -1) {
                carts.splice(i--, 1)
            }
        }
        wx.setStorageSync('carts', carts);
    },


    onShow() {
        this.updateCart()
    }
});