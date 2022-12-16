/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webGet } from "../../utils/http";


Page({
    data: {
        userInfo: {
            userName: '',
            phone: '',
            email: '',
            handSignCity: ''
        },
        token: ''
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
        if (!this.data.userInfo.userName) {
            setTimeout(() => {
                wx.showToast({
                    title: '登录中',
                    icon: 'loading',
                    mask: true,
                    duration: 1000
                })
            }, 300)
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
