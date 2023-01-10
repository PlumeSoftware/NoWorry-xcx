/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webGet } from "../../utils/http";
import { OrderDetailInfo, Order } from "../../entity/order"
import { Visa } from "../../entity/visa"

Page({
    data: {
        userName: wx.getStorageSync('userInfo').userName,
        orderDetailId: '',
        total: 0,
        favourablePrice: 0,
        paid: 0,
        invPrice: 0,
        status: -1,
        commodityId: 0,
        orderDetailName: '',
        commodityType: 11,
        showQr: false
    },

    async onShow() {
        //获取详单id
        const pages = getCurrentPages()
        const orderDetailId = pages[pages.length - 1].options['orderDetailId']
        //获取详单
        const detail = (await webGet<OrderDetailInfo>(`/order/detail/${orderDetailId}`))!
        const order = (await webGet<Order>(`/order/info/${detail.orderId}`))
        this.setData({
            userName: wx.getStorageSync('userInfo').userName,
            orderDetailId: 'EC' + orderDetailId,
            total: order?.orderTotalPrice,
            paid: order?.orderPaymentPrice,
            orderDetailName: detail.commodityName,
            favourablePrice: order!.favourablePrice,
            invPrice: detail.invPrice,
            status: detail.status,
            commodityId: detail.commodityId
        })
    },

    async toWrite() {
        const pages = getCurrentPages()
        const orderDetailId = pages[pages.length - 1].options['orderDetailId']
        const commodity = await webGet<Visa>(`/visa/detail/${this.data.commodityId}`)
        this.setData({ commodityType: commodity!.commodityType || 11 })
        if (this.data.commodityType == 13) {
            wx.navigateTo({ url: `/pages/info-reg-A/info-reg-A?orderDetailId=${orderDetailId}` })
        } else if (this.data.commodityType == 14) {
            wx.navigateTo({ url: `/pages/info-reg-J/info-reg-J?orderDetailId=${orderDetailId}` })
        } else {
            wx.navigateTo({ url: `/pages/info-reg/info-reg?orderDetailId=${orderDetailId}` })
        }
    },

    toContact() {
        wx.showModal({
            title: "提示",
            content: "长按扫描下方二维码以联系客服",
            showCancel: false,
            success: () => this.setData({ showQr: true })
        })
    },

    toShare() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage']
        })
    },

    toWait() {
        wx.showToast({ title: '静候佳音~', icon: 'none' })
    },

    onShareAppMessage() {
        let url = ''
        if (this.data.commodityType == 13) {
            url = url + `/pages/info-reg-A/info-reg-A?`
        } else if (this.data.commodityType == 14) {
            url = url + `/pages/info-reg-J/info-reg-J?`
        }
        else {
            url = url + `/pages/info-reg/info-reg?`
        }
        url = url + `orderDetailId = ${this.data.orderDetailId}&s=1`

        return {
            path: url
        }
    }
});
