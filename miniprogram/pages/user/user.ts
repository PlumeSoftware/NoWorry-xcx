/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Order } from "../../entity/order";
import { webGet } from "../../utils/http";


Page({
    data: {
        userInfo: {
            userName: '',
            phone: '',
            email: '',
            handSignCity: '',
            avatarUrl:''
        },
        token: '',
        orderOutline: [0, 0, 0]
    },

    async login() {
        const data=getApp().globalData

        console.log(data.userInfo)
        
        this.setData({ userInfo: data.userInfo, token: data.token })

        if (data.userInfo.userName == null) {
            wx.navigateTo({ url: "/pages/user-set/user-set" })
          }

          const result: Array<Order> | null = await webGet<Array<Order>>(`/order/${getApp().globalData.token}`)
          const orderOutline: Array<number> = [0, 0, 0]
          if (result) {
            result.forEach((item: Order) => {
              if (item.orderStatus == 3) {
                orderOutline[0] += item.orderDetailInfoGroup!.length
              } else {
                orderOutline[item.orderStatus!] += item.orderDetailInfoGroup!.length
              }
            })
            this.setData({ orderOutline: orderOutline })
          }
    },

    toOrder() {
        wx.navigateTo({ url: "/pages/user-order/user-order" })
    },
    toCus() {
        wx.navigateTo({ url: "/pages/user-qaa/user-qaa" })
    },
    toCop() {
        wx.navigateTo({ url: "/pages/user-cop/user-cop" })
    },
    toSet() {
        wx.navigateTo({ url: "/pages/user-set/user-set" })
    }
});
