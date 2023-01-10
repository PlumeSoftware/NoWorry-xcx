/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webGet, webPost } from "../../utils/http";


Page({
    data: {
        pageIndex: 0,

        orderDetailId: '',
        chineseName:'',
        lastName:'',
        firstName:'',
        handSignCity:'',
        birthday:'',
        sex: 0,
        marriedStatus:0,
        birthplace:'',
        nationality:'',
        nationalityPre:'',
        phoneEngland: '',
        email: '',
        addressEngland: '',
        passportCode:'',
        passportFrom: '',
        passportIssue:'',
        passportValidity: '',
        BRPNumber:'',
        BRPIssue:'',
        BRPValidity: '',
        applyPurpose:'',
        personStatus:'',
        collegeName:'',
        collegeAddress:'',
        collegePhone:'',
        collegeEmail: '',
        subjectName:'',
        estDepartureTime:'',
        estReturnTime:'',
        wechatId:'',

        addressEngland1: '',
        addressEngland2: '',
        addressEngland3: '',
        addressEngland4: '',
        addressEngland5: '',

        collegeAddress1: '',
        collegeAddress2: '',
        collegeAddress3: '',
        collegeAddress4: '',


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
                content:"您的信息将用于Noworry刷签登记，如您不清楚该链接来源请勿填写~"
            })
        }

        if (!getApp().globalData.token) {
            wx.login().then(async res => {
                const data = await webGet<{ userInfo: Object, token: string }>(`/user/login/${res.code}`)
                getApp()
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
        } else if (this.data.pageIndex <= 4) {
            this.setData({
                pageIndex: this.data.pageIndex + 1
            })
        }

        wx.pageScrollTo({
            scrollTop: 0,
            duration: 200
        })
    },

    choose(e: { currentTarget: { dataset: { keyname:'', value: number | string } } }) {
        const { keyname, value } = e.currentTarget.dataset;
        const kv = JSON.parse(`{"${keyname}":"${value}"}`)
        this.setData(kv)
    },

    toPrivacy() {
        wx.navigateTo({ url: '/pages/user-set-privacy/privacy' })
    },

    toNotice() {
        wx.navigateTo({ url: '/pages/user-set-notice/notice' })
    },
    
    submit() {
        const collegeAddress =
            [
                this.data.collegeAddress1,
                this.data.collegeAddress2,
                this.data.collegeAddress3,
                this.data.collegeAddress4
            ].join(',')

        const addressEngland =
            [
                this.data.addressEngland1,
                this.data.addressEngland2,
                this.data.addressEngland3,
                this.data.addressEngland4,
                this.data.addressEngland5
            ].join(',')

        this.setData({
            collegeAddress: collegeAddress,
            addressEngland: addressEngland
        })

        webPost('/order/jpvisa', { token:getApp().globalData.token, sheet: this.data })
            .then(() => {
                wx.reLaunch({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
            .catch(() => {
                wx.reLaunch({ url: "/pages/user-cop-commit/user-cop-commit" })
            })
    }
});
