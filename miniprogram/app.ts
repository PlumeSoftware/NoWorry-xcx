// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    
    const updateManager = wx.getUpdateManager()
    updateManager.applyUpdate()
  }
})
