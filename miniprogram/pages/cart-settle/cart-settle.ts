/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webPost } from "../../utils/http";
import { Cart } from "../../entity/cart";
import { CartDetail } from "../../entity/order";
import { culFav } from "../../utils/util";
import { culFavFromCarts } from "../../utils/cart";

Page({
    data: {
        userName: '',
        phone: '',
        email: '',
        wechat: '',

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
        hasReadA: false,
        hasReadB: false,
        favcode: '',
        favdetail: { payway: 2, favway: 0, value: 0 },

        allowSubmit: false
    },

    onShow(){
        this.setData({
            userName: getApp().globalData.userInfo.userName,
            phone: getApp().globalData.userInfo.phone,
            email: getApp().globalData.userInfo.email,
            wechat: getApp().globalData.userInfo.handSignCity
        })
        this.updateCart()
    },

    //这里不作为focus修复了，用户要改只能去个人信息改
    inp() {
        // wx.hideKeyboard()
        // setTimeout(() => { this.setData({ focusId: e.currentTarget.id }) }, 500)
        wx.showToast({
            title: '如果需要修改资料，请前往个人设置',
            icon: 'none',
            duration: 2000
        })
    },

    inpFav() {
        if (this.data.favcode.length == 8) {
            wx.showToast({ title: '检查优惠券中...', icon: 'none', duration: 1000, })
            setTimeout(() => {
                const result = culFav(this.data.favcode)
                if (result) {
                    this.setData({ favdetail: result })
                    this.updateCart()
                } else {
                    wx.showToast({ title: '该优惠券已失效~', icon: 'none', duration: 2500, })
                    this.setData({ favcode: '', favdetail: { payway: 2, favway: 0, value: 0 } })
                }
            }, 1000)
        } else {
            this.setData({ favcode: this.data.favcode.slice(0, 8), favdetail: { payway: 2, favway: 0, value: 0 } })
        }
        this.updateCart()
    },
    async updateCart() {
        let total = 0;
        let totalCNY = 0;
        let favourableTotal = 0;

        const carts = getApp().globalData.carts.filter((cart: Cart) => cart.select == true);

        //计算商品总价,统计签证类型和价格
        carts.forEach((cart: Cart) => {
            total += cart.currentPrice! * cart.quantity!

        })

        /**
         * 优惠
            1.美签+申根自动优惠 10英镑
            2.5位以上88磅的，自动-人数*10英镑，5位以上68磅的，和88磅的，自动-5*人数英镑
            3.美签2位，-10*2英镑，3位-10*3英镑，4位也是-10*3英镑
         */

        //清空优惠缓存
        //生成优惠方案
        this.setData({ favourableTotal: 0, carts: carts })
        const fav = (await culFavFromCarts(this.data.carts))!;
        if (this.data.favourable != fav) {
            this.setData({ favourable: fav })
        }

        //计算优惠价格
        this.data.favourable.forEach(i => {
            favourableTotal += i.amount
        })

        //加入优惠券计算
        favourableTotal += this.data.favdetail.value

        if (total - favourableTotal < 1) {
            wx.showModal({
                title: '提示',
                content: '你真的是在测试吗QAQ',
                showCancel: false,
                success:()=>wx.navigateBack()
            })
        }

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
        wx.navigateTo({ url: '/pages/user-set-privacy/privacy' }).then(() => this.setData({ hasReadB: true }))
    },

    toNotice() {
        wx.navigateTo({ url: '/pages/user-set-notice/notice' }).then(() => this.setData({ hasReadA: true }))
    },

    agreeChange() {
        if (this.data.agree) {
            this.setData({
                agree: false
            })
        } else {
            if (!this.data.hasReadA) {
                wx.showToast({ title: "请先阅读用户协议", icon: 'none' })
            }
            else if (!this.data.hasReadB) {
                wx.showToast({ title: "请先阅读隐私条款", icon: 'none' })
            } else {
                this.setData({ agree: true })
            }
        }
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
            orderDetail.push({
                boughtQuantity: cart.quantity,
                invPrice: cart.quantity! * cart.currentPrice!,
                commodityId: cart.commodityId,
                remark: cart.remark
            })
        })

        if (this.data.payIndex == 0) {//微信支付
            const data = (await webPost<{
                appId: string,
                timeStamp: string,
                nonceStr: string,
                package: string,
                signType: "MD5" | "HMAC-SHA256" | undefined,
                paySign: string
                errortag?: boolean
                errormessage?: string
            }>('/pay', {
                openid: getApp().globalData.userInfo.openid,
                describe: paid[0].commodityName,
                amount: Math.floor(this.data.totolPriceCNY * 100),
                checkitems: {
                    favcode: this.data.favcode
                }
            }))!


            await new Promise<void>(r => {
                wx.requestPayment({
                    //服务器未返回错误，并且存在支付信息，允许支付
                    appId: data['appId'], timeStamp: data['timeStamp'], nonceStr: data['nonceStr'],
                    package: data['package'], signType: data['signType'], paySign: data['paySign'],
                    success: () => r(),
                    //服务器未返回错误，检查通过，允许支付
                    fail: (err) => {
                        console.log(err)
                        wx.showToast({ title: data.errormessage || '用户取消支付', icon: 'none', duration: 2500 })
                        if (data.errortag) { this.setData({ favcode: '', favdetail: { payway: 2, favway: 0, value: 0 } }) }
                        this.updateCart()
                    }
                })
            })

            await webPost('/order/submit', {
                token: getApp().globalData.token,
                orderTotalPrice: this.data.totalPrice,
                favourablePrice: this.data.favourableTotal,
                orderPaymentPrice: this.data.totalPrice - this.data.favourableTotal,
                payWay: 1,
                orderDetail: orderDetail,
                favcode: this.data.favcode,
                contact: `${this.data.userName},${this.data.phone},${this.data.email},${this.data.wechat}`
            }).then(() => this.afterPayment(paid))


        } else if (this.data.payIndex == 1) {//客服辅助支付
            const data = (await webPost<{
                errortag?: boolean
                errormessage?: string
            }>('/pay', {
                openid: getApp().globalData.userInfo.openid,
                checkitems: { favcode: this.data.favcode }
            }))!

            if (data.errortag) {
                wx.showToast({ title: data.errormessage || '用户取消支付', icon: 'none', duration: 2500 })
                if (data.errortag) { this.setData({ favcode: '', favdetail: { payway: 2, favway: 0, value: 0 } }) }
                this.updateCart()
            } else {
                webPost('/order/submit', {
                    token: getApp().globalData.token,
                    orderTotalPrice: this.data.totalPrice,
                    favourablePrice: this.data.favourableTotal,
                    orderPaymentPrice: 0,
                    payWay: 0,
                    orderDetail: orderDetail,
                    favcode: this.data.favcode,
                    contact: `${this.data.userName},${this.data.phone},${this.data.email},${this.data.wechat}`
                }).then(() => this.afterPayment(paid))
            }
        }
    },
    afterPayment(paid: []) {
        //付款结束，跳转到成功界面
        setTimeout(() => {
            wx.reLaunch({
                url: `/pages/cart-settle-success/cart-settle-success`
            })
        }, 500)

        //删除购物车已支付商品
        const carts = getApp().globalData.carts;
        for (let i = 0; i < carts.length; i++) {
            if (paid.findIndex((item: { commodityId: number }) => carts[i].commodityId == item.commodityId) != -1) {
                carts.splice(i--, 1)
            }
        }

        //删除后，存于全局用于下次启动
        wx.setStorageSync('carts', carts);
    }
});