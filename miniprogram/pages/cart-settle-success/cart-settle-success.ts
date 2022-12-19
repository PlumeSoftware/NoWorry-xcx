/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({

    toOrderList() {
        wx.reLaunch({ url: "/pages/user-order/user-order" })
    },

    toHome() {
        wx.reLaunch({ url: "/pages/index/index" })
    }
});