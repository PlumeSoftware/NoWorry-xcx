/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webPost } from "../../utils/http";

Page({

    data: {
        openid: wx.getStorageSync('userInfo').openid,
        companyName: '',
        businessDescribe: '',
        contactName: '',
        contactPhone: '',
        wechatId: '',
        email: ''
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
