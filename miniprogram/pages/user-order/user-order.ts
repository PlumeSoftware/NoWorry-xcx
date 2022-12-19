/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webGet } from "../../utils/http";
import { Order, OrderDetailInfo } from "../../entity/order";

Page({
    data: {
        active: 0,
        orderNameGroup: [
            "未支付", "进行中", "已完成"
        ],

        orderGroup: [
            [{}],
            [{}, {}, {}],
            [{}]
        ],
    },
    async onShow() {
        const result: Array<Order> | null = await webGet<Array<Order>>(`/order/${wx.getStorageSync('token')}`)
        const orderGroup: Array<Array<OrderDetailInfo>> = [[], [], []];
        if (result) {
            result.forEach((item: Order) => {
                if (item.orderStatus == 0 || item.orderStatus == 3) {
                    orderGroup[0].push(...(item.orderDetailInfoGroup!))
                } else if (item.orderStatus == 1) {
                    orderGroup[1].push(...(item.orderDetailInfoGroup!))
                } else if (item.orderStatus == 2) {
                    orderGroup[2].push(...(item.orderDetailInfoGroup!))
                }
            })
        }

        this.setData({ orderGroup: orderGroup })
    },
    toProcess(e: { currentTarget: { dataset: { orderdetailid: number } } }) {
        wx.navigateTo({
            url: '/pages/user-order-detail/user-order-detail?orderDetailId=' + e.currentTarget.dataset.orderdetailid
        })
    }
});
