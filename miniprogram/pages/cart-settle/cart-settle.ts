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
        wechat:'',

        payArray: ["微信支付", "客服辅助支付"],
        payIndex: 0,

        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPriceShow: 0,
        favourable: [] as Array<{ title: string, amount: number }>,
        favourableTotal: 0,

        totolPriceCNY: 0,

        agree: false,

        allowSubmit: false
    },
    onShow() {
        this.setData({
            userName: wx.getStorageSync("userInfo").userName,
            phone: wx.getStorageSync("userInfo").phone,
            email: wx.getStorageSync("userInfo").email,
            liveCity: wx.getStorageSync("userInfo").handSignCity
        })
        this.updateCart()
    },
    inp(e: { currentTarget: { id: string } }) {
        wx.hideKeyboard()
        setTimeout(() => {
            this.setData({
                focusId: e.currentTarget.id
            })
        }, 300)
    },
    updateCart() {
        let total = 0;
        let totalCNY = 0;
        let favourableTotal = 0;

        const carts = wx.getStorageSync('carts');
        let usVisaNum = 0;//美签数量
        let sgVisaNum = 0;//申根签数量

        let pr88Num = 0;//88元签证数量
        let pr68Num = 0//68元签证数量
        console.log("carts",)
        //计算商品总价,统计签证类型和价格
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].select) {
                total += carts[i].currentPrice * carts[i].quantity

                switch (carts[i].commodityName[0]) {
                    case "美":
                        usVisaNum += carts[i].quantity; break;
                    case "法":
                        sgVisaNum += carts[i].quantity; break;
                    default:
                        break;
                }

                if (carts[i].currentPrice >= 88) {
                    pr88Num += carts[i].quantity
                } else if (carts[i].currentPrice >= 68 && carts[i].currentPrice < 88) {
                    pr68Num += carts[i].quantity;
                }
            } else {
                carts.splice(i--, 1)
            }
        }

        /**
         * 优惠
            1.美签+申根自动优惠 10英镑
            2.5位以上88磅的，自动-人数*10英镑，5位以上68磅的，和88磅的，自动-5*人数英镑
            3.美签2位，-10*2英镑，3位-10*3英镑，4位也是-10*3英镑
         */

        //生成优惠方案
        if (sgVisaNum + usVisaNum < 5 && sgVisaNum && usVisaNum) {
            const favourable = this.data.favourable;
            const amount = Math.min(sgVisaNum, usVisaNum) * 10 <= 40 ? Math.min(sgVisaNum, usVisaNum) * 10 : 40
            favourable.push({ title: "美签+申根联合优惠", amount: amount })
            this.setData({ favourable: favourable })
        }

        if (pr88Num >= 5) {
            const favourable = this.data.favourable;
            const amount = pr88Num * 10 < 40 ? pr88Num * 10 : 40
            favourable.push({ title: "组队刷签优惠", amount: amount })
            this.setData({ favourable: favourable })
        }

        if (pr68Num >= 5) {
            const favourable = this.data.favourable;
            const amount = pr68Num * 10 < 40 ? pr68Num * 10 : 40
            favourable.push({ title: "组队刷签优惠", amount: amount })
            this.setData({ favourable: favourable })
        }

        if (usVisaNum && pr68Num + pr88Num < 5) {
            const favourable = this.data.favourable;
            switch (usVisaNum) {
                case 2:
                    favourable.push({ title: "美签组队优惠", amount: 20 })
                    break;
                case 3:
                    favourable.push({ title: "美签组队优惠", amount: 20 })
                    break;
                case 4:
                    favourable.push({ title: "美签组队优惠", amount: 30 })
                    break;
                default:
                    break;
            }
            this.setData({ favourable: favourable })
        }

        //计算优惠价格
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

    toPrivacy() {
        wx.navigateTo({ url: '/pages/user-set-privacy/privacy' })
    },

    toNotice() {
        wx.navigateTo({ url: '/pages/user-set-notice/notice' })
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
                    commodityId: cart.commodityId,
                    remark: cart.remark
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
                contact: `${this.data.userName},${this.data.phone},${this.data.email},${this.data.wechat}`
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
});