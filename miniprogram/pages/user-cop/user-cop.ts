/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

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
        wx.request({
            url: "http://122.9.107.17:3000/v1/mp/user/cooperate",
            method: 'POST',
            data: this.data,
            success: () => {
                this.setData({})
                wx.navigateTo({ url: "/pages/user-cop-commit/user-cop-commit" })
            },
            fail: function () {
                wx.navigateTo({ url: "/pages/user-cop-commit/user-cop-commit" })
            }
        })
        //提交成功的回调
    }
});
