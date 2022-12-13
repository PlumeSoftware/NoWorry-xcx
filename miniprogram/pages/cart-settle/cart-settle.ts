/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Cart } from "../../../miniprogram/entity/cart";
import { CartDetail} from "../../../miniprogram/entity/order";

Page({
    data: {
        userName: '',
        phone: '',
        email: '',
        liveCity: '',

        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPrice2: 0,

        agree: false,

        allowSubmit: false
    },
    updateCart() {
        let total = 0;
        const carts = wx.getStorageSync('carts');
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].select) {
                total += carts[i].currentPrice * carts[i].quantity
            } else {
                carts.splice(i--, 1)
            }
        }

        const total2 = Number((8.6231 * total).toFixed(2));
        this.setData({ totalPrice: total, totalPrice2: total2, carts: carts })
    },

    agreeChange() {
        this.setData({
            agree: !this.data.agree
        })
    },

    submitOrder() {
        wx.showLoading({
            title: '加载中',
        })

        setTimeout(() => {
            wx.hideLoading()
        }, 2000)

        setTimeout(() => {
            wx.navigateTo({
                url: "/pages/cart-settle-success/cart-settle-success"
            })
        }, 2400)

        const orderDetail:CartDetail[] = []
        const paid = this.data.carts;
        console.log("paid", paid)
        paid.forEach((cart: Cart) => {
            if (cart.select) {
                orderDetail.push({
                    boughtQuantity: cart.quantity,
                    invPrice: cart.quantity * cart.currentPrice,
                    commodityId: cart.commodityId
                })
            }
        })
        wx.request({
            url: "http://127.0.0.1:3000/v1/mp/order/submit",
            method: "POST",
            data:
            {
                token: wx.getStorageSync('token'),
                orderTotalPrice: this.data.totalPrice,
                payWay: 1,
                orderDetail: orderDetail
            }
        })


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