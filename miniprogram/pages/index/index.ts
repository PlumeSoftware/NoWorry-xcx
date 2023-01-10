// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    active: 0,
    tarbar: [
      { item: "首页", icon: "home" },
      { item: "签证", icon: "visa" },
      { item: "购物车", icon: "cart" },
      { item: "我的", icon: "user" },
    ],
  },

  toShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage','shareTimeline']
    })
  },

  onShareAppMessage() { },

  onLoad() {
    this.selectComponent('#home').start();
  },
  async onChange(event: any) {
    // event.detail 的值为当前选中项的索引
    if (!getApp().globalData.token && (event.detail != 0)) {
      await new Promise<void>(r => {
        wx.showModal({
          title: '提示',
          content: '您之前可能登录未成功，请重启小程序或联系客服',
          showCancel: false,
          confirmText: "好的",
          success: () => {
            event.detail = 0
            r()
          }
        })
      })
    }

    this.setData({ active: event.detail });

    switch (event.detail) {
      case 0: {
        this.selectComponent('#cart').setAllSelect();
        this.selectComponent('#cart').culTotal();
        break;
      }
      case 2: {
        this.selectComponent('#cart').updateCart();
        this.selectComponent('#cart').setAllSelect();
        this.selectComponent('#cart').culTotal();
        break;
      }
      case 3: {
        await this.selectComponent('#user').updata();
        break;
      }
    }


    wx.setNavigationBarTitle({
      title: this.data.tarbar[this.data.active].item
    })
  },
});
