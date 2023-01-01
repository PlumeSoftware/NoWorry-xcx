/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Order } from "../../entity/order";
import { webGet } from "../../utils/http";


Page({
    data: {
        userInfo: {
            userName: '',
            phone: '',
            email: '',
            handSignCity: ''
        },
        token: '',
        orderOutline: [0, 0, 0]
    },

    setByLocal() {
        this.setData({
            userInfo: {
                userName: wx.getStorageSync("userInfo").userName,
                phone: wx.getStorageSync("userInfo").phone,
                email: wx.getStorageSync("userInfo").email,
                handSignCity: wx.getStorageSync("userInfo").handSignCity
            }
        })
    },

    login() {
        if (!wx.getStorageSync('token')) {
            setTimeout(function () {
                wx.showLoading({
                    title: '登录中',
                })
            }, 250)

            setTimeout(function () {
                wx.hideLoading()
            }, 1000)
        }
        wx.login().then(async res => {
            const data = await webGet<{ userInfo: { userName: string, phone: string, email: string, handSignCity: string }, token: string }>(`/user/login/${res.code}`)
            if (data) {
                this.setData({ userInfo: data.userInfo, token: data.token })
                wx.setStorageSync('userInfo', data.userInfo)
                wx.setStorageSync('token', data.token)

                if (data.userInfo.userName == null) {
                    wx.navigateTo({ url: "/pages/user-set/user-set" })
                }
            }

            const result: Array<Order> | null = await webGet<Array<Order>>(`/order/${wx.getStorageSync('token')}`)
            const orderOutline: Array<number> = [0, 0, 0]
            if (result) {
                result.forEach((item: Order) => {
                    if (item.orderStatus == 3) {
                        orderOutline[0] += item.orderDetailInfoGroup!.length
                    } else {
                        orderOutline[item.orderStatus!] += item.orderDetailInfoGroup!.length
                    }
                })
                this.setData({ orderOutline: orderOutline })
            }
        })
    },

    toOrder() {
        wx.navigateTo({ url: "/pages/user-order/user-order" })
    },
    toCus() {
        wx.navigateTo({ url: "/pages/user-qaa/user-qaa" })
    },
    toCop() {
        wx.navigateTo({ url: "/pages/user-cop/user-cop" })
    },
    toSet() {
        wx.navigateTo({ url: "/pages/user-set/user-set" })
    }
});
