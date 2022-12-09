/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars


Page({
    data: {
        userInfo: {
            userName: '',
            phone: '',
            email: '',
            handSignCity: ''
        },
        token: ''
    },

    setByLocal() {
        this.setData({
            userInfo: {
                userName: wx.getStorageSync("userInfo").userName,
                phone: wx.getStorageSync("userInfo").phone,
                email: wx.getStorageSync("userInfo").email,
                handSignCity: wx.getStorageSync("userInfo").handSignCity
            }
        })
    },

    login() {
        if (!this.data.userInfo.userName) {
            setTimeout(() => {
                wx.showToast({
                    title: '登录中',
                    icon: 'loading',
                    mask: true,
                    duration: 1000
                })
            }, 300)
        }

        const _this = this;
        wx.login().then(res => {
            wx.request({
                url: "http://127.0.0.1:3000/v1/mp" + `/user/login/${res.code}`,
                success(re) {
                    re.data = re.data as {}
                    _this.setData({ userInfo: re.data.userInfo, token: re.data.token })

                    wx.setStorageSync('userInfo', re.data.userInfo)
                    wx.setStorageSync('token', re.data.token)

                    if (re.data.userInfo.userName == null) {
                        wx.navigateTo({ url: "/pages/user-set/user-set" })
                    }
                }
            })
        })
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
