/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Order, OrderDetailInfo } from "miniprogram/entity/order";

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
        const result: Order[] = await new Promise(re => {
            wx.request({
                url: `http://127.0.0.1:3000/v1/mp/order/${wx.getStorageSync('token')}`,
                success: (res) => {
                    re(res.data as Order[])
                },
                fail: () => re([])
            })
        })

        const orderGroup: Array<Array<OrderDetailInfo>> = [[], [], []];
        result.forEach((item: Order) => {
            if (item.orderStatus == 0 || item.orderStatus == 3) {
                orderGroup[0].push(...(item.orderDetailInfoGroup!))
            }
        })

        this.setData({ orderGroup: orderGroup })
    },
    toProcess() {
        wx.navigateTo({
            url: '/pages/user-order-detail/user-order-detail?orderId=1'
        })
    }
});
