/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        userName: wx.getStorageSync("userInfo").userName,
        phone: wx.getStorageSync("userInfo").phone,
        email: wx.getStorageSync("userInfo").email,
        handSignCity: wx.getStorageSync("userInfo").handSignCity
    },



    save() {
        const _this = this
        wx.request({
            url: "http://127.0.0.1:3000/v1/mp" + `/user/updateUserInfo`,
            method: "POST",
            header: {
                cookie: wx.getStorageSync("token")
            },
            data: {
                userName: this.data.userName,
                phone: this.data.phone,
                email: this.data.email,
                handSignCity: this.data.handSignCity,
            },
            success(res) {
                if (res.data.status) {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 2000
                    })

                    wx.setStorageSync('userInfo', {
                        userName: _this.data.userName,
                        phone: _this.data.phone,
                        email: _this.data.email,
                        handSignCity: _this.data.handSignCity,
                    })

                    setTimeout(() => {
                        wx.navigateBack()
                    }, 2200)
                } else {
                    wx.showToast({
                        title: '修改失败',
                        icon: 'error',
                        duration: 2000
                    })
                }
            }
        })
    }
});
