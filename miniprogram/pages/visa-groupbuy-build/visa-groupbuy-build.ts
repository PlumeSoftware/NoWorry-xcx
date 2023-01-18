/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        groupcode: ''
    },

    onShow() {
        const pages = getCurrentPages();
        const groupcode = pages[pages.length - 1].options.groupcode!
        this.setData({ groupcode: groupcode })
    },

    toOrderGroup() {
        wx.reLaunch({ url: `/pages/visa-groupbuy-main/visa-groupbuy-main?groupcode=${this.data.groupcode}` })
    },

    toHome() {
        wx.reLaunch({ url: "/pages/index/index" })
    }
});