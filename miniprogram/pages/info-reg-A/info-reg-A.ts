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

    onShow() {
        const pages = getCurrentPages();
        const orderDetailId = pages[pages.length - 1].options.orderDetailId!
        this.setData({
            orderDetailId: orderDetailId
        })

        if(pages[pages.length - 1].options['s']){
            wx.showModal({
                title:"隐私信息提醒",
                content:"您的信息将用于刷签登记，如您不清楚该链接来源请勿填写"
            })
        }

        if (!wx.getStorageSync('token')) {
            wx.showModal({ title: "您还未登录" })
        }

        if (!wx.getStorageSync('token')) {
            wx.login().then(async res => {
                const data = await webGet<{ userInfo: Object, token: string }>(`/user/login/${res.code}`)
                wx.setStorageSync('userInfo', data!.userInfo)
                wx.setStorageSync('token', data!.token)
            })
        }
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
        console.log(e.currentTarget)
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

        webPost('/order/usvisa', { token: wx.getStorageSync('token'), sheet: this.data })
            .then(() => {
                wx.reLaunch({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
            .catch(() => {
                wx.reLaunch({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
    }
});
