/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webGet } from "../../utils/http";
import { OrderDetailInfo, Order } from "../../entity/order"

Page({
    data: {
        userName: wx.getStorageSync('userInfo').userName,
        orderDetailId: '',
        total: 0,
        paid: 0,
        invPrice: 0,
        status: -1
    },

    async onShow() {
        //获取详单id
        const pages = getCurrentPages()
        const orderDetailId = pages[pages.length - 1].options['orderDetailId']
        //获取详单
        const detail = (await webGet<OrderDetailInfo>(`/order/detail/${orderDetailId}`))!
        const order = (await webGet<Order>(`/order/info/${detail.orderId}`))
        this.setData({
            orderDetailId: 'EC' + orderDetailId,
            total: order?.orderTotalPrice,
            paid: order?.orderPaymentPrice,
            invPrice: detail.invPrice,
            status: detail.status
        })


    },

    toWrite() {
        const pages = getCurrentPages()
        const orderDetailId = pages[pages.length - 1].options['orderDetailId']
        wx.navigateTo({ url: `/pages/info-reg/info-reg?orderDetailId=${orderDetailId}` })
    },
});
