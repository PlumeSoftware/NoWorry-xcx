/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Visa } from "miniprogram/entity/visa";
import * as http from "../../utils/http"

Page({
    data: {
        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPrice2: 0
    },


    async updateCart() {
        const carts = wx.getStorageSync('carts')
        console.log(carts)
        for (let i = 0; i < carts.length; i++) {
            await new Promise<void>((r) => {
                wx.request({
                    url: http.BASE_URL + `/visa/detail/${carts[i].commodityId}`,
                    success: (res) => {
                        const visa = res.data as Visa
                        carts[i].picLink = visa.picLink
                        carts[i].currentPrice = visa.currentPrice
                        r()
                    },
                    fail: () => r()
                })
            })
        }
        this.setData({ carts: carts })
        this.culTotal()
    },

    checkBtn(e: any) {
        const index = e.currentTarget.dataset.index
        const carts = this.data.carts;
        carts[index].select = !carts[index].select

        this.setAllSelect()
        this.culTotal()
    },

    setAllSelect() {
        const carts = this.data.carts;
        if (carts.findIndex((item: any) => !item.select) == -1) {
            this.setData({ allselect: true })
        } else {
            this.setData({ allselect: false })
        }
        this.setData({ carts: carts })
    },

    add(e: any) {
        const index = e.currentTarget.dataset.index
        const add = e.currentTarget.dataset.add
        const carts = this.data.carts;
        carts[index].quantity = carts[index].quantity + add
        carts[index].quantity = carts[index].quantity ? carts[index].quantity : 1;
        // carts[index].quantity = 1
        this.setData({ carts: carts })
        this.culTotal()
    },


    //重新计算价格
    culTotal() {
        let total = 0;
        const carts = this.data.carts;
        carts.forEach((item: any) => {
            total += item.select ? item.currentPrice * item.quantity : 0
        })
        console.log("cul", carts)
        const total2 = Number((8.6231 * total).toFixed(2));
        this.setData({ totalPrice: total, totalPrice2: total2 })
        wx.setStorageSync('carts', carts)
    },

    async settle() {
        wx.showToast({
            title: 'loading',
            icon: 'loading',
            duration: 700
        })
        setTimeout(() => {
            wx.navigateTo({ url: "/pages/cart-settle/cart-settle" })
        }, 800)
    }
});
