/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webGet, webPost } from "../../utils/http";


Page({
    data: {
        orderDetailId: "",

        chineseName: "",
        firstName: "",
        lastName: "",

        birthday: "",
        sex: 0,
        marriedStatus: 0,
        birthplace: "",
        nationality: "",
        nationalityPre: "",

        phoneEngland: "",
        email: "",
        passportCode: "",

        handSignCity: "",

        tableDLS: 0,

        DLS_number: "",

        visaType: 0,

        handHistoryExist: 0,

        handHistoryValidity: "",

        estInterviewTime: "",

        wechatId: "",

        mailAddress: "",

        mailAddress1: '',
        mailAddress2: '',
        mailAddress3: '',
        mailAddress4: '',
        mailAddress5: '',

        pageIndex: 0,

        //允许提交
        allow: 0
    },

    inp(e: { currentTarget: { id: string } }) {
        wx.hideKeyboard()
        setTimeout(() => {
            this.setData({
                focusId: e.currentTarget.id
            })
        }, 300)

        wx.setStorageSync('infoRegA', this.data)
    },

    toPrivacy() {
        wx.navigateTo({ url: '/pages/user-set-privacy/privacy' })
    },

    toNotice() {
        wx.navigateTo({ url: '/pages/user-set-notice/notice' })
    },

    onShow() {
        const pages = getCurrentPages();
        const orderDetailId = pages[pages.length - 1].options.orderDetailId!
        this.setData({
            orderDetailId: orderDetailId
        })

        const storage = wx.getStorageSync('infoRegA')
        if (storage) {
            const keys = Object.keys(storage)
            keys.forEach(key => this.setData(JSON.parse(`${key}:${storage[key]}`)))
        }

        if(pages[pages.length - 1].options['s']){
            wx.showModal({
                title:"隐私信息提醒",
                content:"您的信息将用于刷签登记，如您不清楚该链接来源请勿填写"
            })
        }

        if (!getApp().globalData.token) {
            wx.showModal({ title: "您还未登录" })
        }

        if (!getApp().globalData.token) {
            wx.login().then(async res => {
                const data = await webGet<{ userInfo: Object, token: string }>(`/user/login/${res.code}`)
                wx.setStorageSync('userInfo', data!.userInfo)
                wx.setStorageSync('token', data!.token)
            })
        }
    },

    back(e: { currentTarget: { dataset: { pageindex?: number } } }) {
        if (e.currentTarget.dataset.pageindex !== undefined) {
            this.setData({
                pageIndex: e.currentTarget.dataset.pageindex
            })
        } else if (this.data.pageIndex > 0) {
            this.setData({
                pageIndex: this.data.pageIndex - 1
            })
        }

        wx.pageScrollTo({
            scrollTop: 0,
            duration: 200
        })
    },

    change(e: { currentTarget: { dataset: { pageindex?: number } } }) {
        if (e.currentTarget.dataset.pageindex !== undefined) {
            this.setData({
                pageIndex: e.currentTarget.dataset.pageindex
            })
        } else if (this.data.pageIndex <= 2) {
            this.setData({
                pageIndex: this.data.pageIndex + 1
            })
        }

        wx.pageScrollTo({
            scrollTop: 0,
            duration: 200
        })
    },

    choose(e: { currentTarget: { dataset: { keyname: string, value: number | string } } }) {
        const { keyname, value } = e.currentTarget.dataset;
        const kv = JSON.parse(`{"${keyname}":"${value}"}`)
        this.setData(kv)
    },

    submit() {
        const mailAddress =
            [
                this.data.mailAddress1,
                this.data.mailAddress2,
                this.data.mailAddress3,
                this.data.mailAddress4,
                this.data.mailAddress5
            ].join(',')

        this.setData({
            mailAddress: mailAddress,
            // addressEngland: addressEngland
        })

        webPost('/order/usvisa', { token: getApp().globalData.token, sheet: this.data })
            .then(() => {
                wx.removeStorageSync('infoRegA')
                wx.reLaunch({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
            .catch(() => {
                wx.reLaunch({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
    }
});
