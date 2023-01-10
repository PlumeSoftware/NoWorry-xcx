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
    page: [false, false, false, false]
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
    if (!wx.getStorageSync('token') && (event.detail != 0 && event.detail != 3)) {
      await new Promise<void>(r => {
        wx.showModal({
          title: '提示',
          content: '您还未设置个人资料',
          showCancel: false,
          confirmText: "查看",
          success: () => {
            event.detail = 3
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
        await this.selectComponent('#user').login();
        this.selectComponent('#user').setByLocal()
        break;
      }
    }


    wx.setNavigationBarTitle({
      title: this.data.tarbar[this.data.active].item
    })
  },
});
