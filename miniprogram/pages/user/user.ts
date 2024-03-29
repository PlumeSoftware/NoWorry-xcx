/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Order } from "../../entity/order";
import { webGet } from "../../utils/http";


Component({
  data: {
    userInfo: {
      userName: '',
      phone: '',
      email: '',
      handSignCity: '',
      avatarUrl: ''
    },
    token: '',
    orderOutline: [0, 0, 0],
    hasInterval: false //判断是否存在更新用户信息的定时器
  },

  methods: {
    login() {
      this.setData({ userInfo: getApp().globalData.userInfo, token: getApp().globalData.token })
      webGet<Array<Order>>(`/order/${getApp().globalData.token}`)
        .then(result => {
          const orderOutline: Array<number> = [0, 0, 0]
          if (result) {
            result.forEach((item: Order) => {
              if (item.orderStatus == 3) orderOutline[0] += item.orderDetailInfoGroup!.length
              else orderOutline[item.orderStatus!] += item.orderDetailInfoGroup!.length
            })
            this.setData({ orderOutline: orderOutline })
          }
        })
    },

    updata() {
      this.login()
      if (!this.data.hasInterval) setInterval(() => this.login(), 30 * 1000)
      this.setData({ hasInterval: true })
    },


    toOrder() {
      wx.navigateTo({ url: "/pages/user-order/user-order" })
    },
    toGroup() {
      wx.navigateTo({ url: "/pages/user-group/user-group" })
    },
    toCus() {
      wx.navigateTo({ url: "/pages/user-qaa/user-qaa" })
    },
    toSet() {
      wx.navigateTo({ url: "/pages/user-set/user-set" })
    },
    toOrderManage() {
      wx.navigateTo({ url: "/pages/user-manager-order/order" })
    },
    toFav() {
      wx.navigateTo({ url: "/pages/user-manager-fav/favarable" })
    },
    toPro() {
      wx.navigateTo({ url: "/pages/user-manager-product/product" })
    },
  },
  lifetimes: {
    ready() {
      this.updata();
    }
  }
});
