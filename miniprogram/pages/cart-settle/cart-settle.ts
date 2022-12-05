/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPrice2: 8.6231
    },
    updateCart() {
        console.log("assa")
        this.setData({ carts: wx.getStorageSync('carts') })
    },

    onShow() {
        this.updateCart()
    }
});