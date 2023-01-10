/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webPost } from "../../utils/http";

Page({

    data: {
        openid: '',
        companyName: '',
        businessDescribe: '',
        contactName: '',
        contactPhone: '',
        wechatId: '',
        email: ''
    },

    onShow(){
        this.data.openid=getApp().globalData.userInfo.openid
    },

    inp(e: { currentTarget: { id: string } }) {
        wx.hideKeyboard()
        setTimeout(() => {
            this.setData({
                focusId: e.currentTarget.id
            })
        }, 300)
    },

    commit() {
        webPost("/user/cooperate", this.data)
            .then(() => {
                wx.navigateTo({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
            .catch(() => {
                wx.navigateTo({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
    }
});
