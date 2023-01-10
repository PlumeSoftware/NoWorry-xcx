import { webGet } from "./utils/http"

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: {
      openid: '',
      unionid: null,
      userName: '',
      userStatus: 0,
      avatarUrl: '',
      phone: '',
      email: '',
      handSignCity: ''
    },
    token: '',
    carts: []
  } as {
    userInfo: {
      openid: string,
      unionid: string | null,
      userName: string,
      userStatus: 0,
      avatarUrl: string,
      phone: string,
      email: string,
      handSignCity: string
    },
    token: string,
    carts: Array<any>
  },

  //嘻嘻，我不知道我在写什么^.^
  //要是有什么力量阻止IOS扩大中国市场，你微信是中流砥柱
  onLaunch() {
    const updateManager = wx.getUpdateManager()
    updateManager.applyUpdate()
    this.globalData.carts.push(...wx.getStorageSync('carts') || [])
    wx.showLoading({ title: "加载中", mask: true })
    login().then((data) => {
      if (data?.token) {
        wx.hideLoading()
        this.globalData.userInfo = data.userInfo
        this.globalData.token = data.token
      } else {
        wx.showLoading({ title: "重试中", mask: true })
        login().then((data) => {
          if (data?.token) {
            wx.hideLoading()
            this.globalData.userInfo = data.userInfo
            this.globalData.token = data.token
          } else {
            wx.hideLoading()
            wx.showModal({ title: '连接错误', content: '请您检查网络后重试', showCancel: false })
          }
        })
      }
    })
  },
})

async function login(): Promise<null | { userInfo: { userName: string, phone: string, email: string, handSignCity: string }, token: string }> {
  return new Promise(r =>
    wx.login().then(async res => {
      const data = await webGet<{ userInfo: { userName: string, phone: string, email: string, handSignCity: string }, token: string }>(`/user/login/${res.code}`)
      r(data)
    }))
}
