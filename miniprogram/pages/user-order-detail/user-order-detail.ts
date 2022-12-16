/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        userName: wx.getStorageSync('userInfo').userName,
        orderDetailId: ''
    },

    onShow() {
        const pages = getCurrentPages()
        const orderDetailId= pages[pages.length - 1].options['orderDetailId']
        this.setData({ orderDetailId: 'EC' + orderDetailId })
    }
});
