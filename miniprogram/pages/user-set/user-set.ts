/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webPost } from "../../utils/http";

Page({
    data: {
        userName: wx.getStorageSync("userInfo").userName,
        phone: wx.getStorageSync("userInfo").phone,
        email: wx.getStorageSync("userInfo").email,
        handSignCity: wx.getStorageSync("userInfo").handSignCity
    },

    onShow() {
        this.setData({
            userName: wx.getStorageSync("userInfo").userName,
            phone: wx.getStorageSync("userInfo").phone,
            email: wx.getStorageSync("userInfo").email,
            handSignCity: wx.getStorageSync("userInfo").handSignCity
        })
    },
    inp(e: { currentTarget: { id: string } }) {
        wx.hideKeyboard()
        setTimeout(() => {
            this.setData({
                focusId: e.currentTarget.id
            })
        }, 300)
    },

    toPrivacy() {
        wx.navigateTo({ url: '/pages/user-set-privacy/privacy' })
    },

    toNotice() {
        wx.navigateTo({ url: '/pages/user-set-notice/notice' })
    },

    async save() {
        const result = await webPost<{ status: 0 | 1 }>("/user/updateUserInfo", {
            userName: this.data.userName,
            phone: this.data.phone,
            email: this.data.email,
            handSignCity: this.data.handSignCity,
        })

        if (result?.status) {
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000
            })
            wx.setStorageSync('userInfo', {
                userName: this.data.userName,
                phone: this.data.phone,
                email: this.data.email,
                handSignCity: this.data.handSignCity,
            })
            setTimeout(() => {
                wx.navigateBack()
            }, 2200)
        } else {
            wx.showToast({
                title: '修改失败',
                //@ts-ignore
                icon: 'error',
                duration: 2000
            })
        }
    }
});
