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

  onChange(event: any) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });

    if(event.detail==2){
      this.selectComponent('#cart').updateCart()
      this.selectComponent('#cart').setAllSelect()
      this.selectComponent('#cart').culTotal()
    }

    if(event.detail==3){
      this.selectComponent('#user').login()
    }

    wx.setNavigationBarTitle({
      title: this.data.tarbar[this.data.active].item
    })
  },
});
