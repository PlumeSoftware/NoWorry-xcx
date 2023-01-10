/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webPost } from "../../utils/http";

Page({
    data: {
        userName: '',
        phone:'',
        email: '',
        handSignCity: ''
    },

    onShow() {
        this.setData({
            userName: getApp().globalData.userInfo.userName,
            phone: getApp().globalData.userInfo.phone,
            email: getApp().globalData.userInfo.email,
            handSignCity: getApp().globalData.userInfo.handSignCity
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

            getApp().globalData.userInfo.userName = this.data.userName;
            getApp().globalData.userInfo.phone = this.data.phone;
            getApp().globalData.userInfo.email = this.data.email;
            getApp().globalData.userInfo.handSignCity = this.data.handSignCity;
            
            setTimeout(() => wx.navigateBack(), 2200)
            
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
