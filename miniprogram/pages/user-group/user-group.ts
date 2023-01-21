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
            "我发起的", "我参与的"
        ],

        orderGroup: [
            [],
            [],
        ] as Array<Array<any>>
    },
    async onShow() {
        const result: Array<Array<any>> | null = await webGet<Array<Array<any>>>(`/order/group/all/${getApp().globalData.token}`)
        const orderGroup: Array<Array<any>> = [];
        if (result) {
            orderGroup.push(...result)
        }

        this.setData({ orderGroup: orderGroup })
    },
    toProcess(e: { currentTarget: { dataset: { groupcode: number } } }) {
        wx.navigateTo({
            url: '/pages/visa-groupbuy-main/visa-groupbuy-main?groupcode=' + e.currentTarget.dataset.groupcode
        })
    }
});
