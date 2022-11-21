/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    toOrder() {
        wx.navigateTo({ url: "/pages/user-order/user-order" })
    },
    toCop() {
        wx.navigateTo({ url: "/pages/user-cop/user-cop" })
    }
});
