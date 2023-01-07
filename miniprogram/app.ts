// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    
    const updateManager = wx.getUpdateManager()
    updateManager.applyUpdate()
  }
})
