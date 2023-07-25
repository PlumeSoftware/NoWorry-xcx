import { webPost } from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorable: [] as Array<string>,
  },

  async generateFav() {
    const current = new Date().getTime();
    const endTime = new Date(current + 1000 * 60 * 48);
    const favResponse = await webPost<Array<string>>('/manager/fav', {
      endTime: endTime, offPrice: 10, genNum: 5, comment: "测试"
    })
    this.setData({
      favorable: favResponse
    })
    if (favResponse.length === 0) {
      wx.showToast({
        title: '生成数量已达上限',
        icon: 'none'
      })
    }
  },

  newFav() {
    this.generateFav()
  },

  copy(e:{currentTarget:{dataset:{fav:string}}}) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.fav
    })
  },

  copyAll() {
    const result = this.data.favorable.join("\n")
    wx.setClipboardData({
      data: result
    })
  }
})