/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import * as http from "../../utils/http"
Component({
    data: {
        activeVisa: 0,
        show: false,
        visaList: [
            {
                commodityName: "法国签证刷签",
                currentPrice: 88,
                commodityCover: "/static/visa/visa-fra.png"
            },
            {
                commodityName: "法国签证刷签代办",
                currentPrice: 128,
                commodityCover: "/static/visa/visa-fra.png"
            },
            {
                commodityName: "美国签证刷签",
                currentPrice: 88,
                picLink: "/static/visa/visa-usa.png"
            },
        ]
    },

    methods: {
        toDetail(e:any) {
            const commodityId = e.currentTarget.dataset.commodityid
            console.log( e.currentTarget)
            wx.navigateTo({ url: '/pages/visa-detail/visa-detail' + `?commodityId=${commodityId}` })
        },

    },
    lifetimes: {
        ready() {
            wx.request({
                url: http.BASE_URL + `/visa/group/11`,
                success: (res) => {
                    this.setData({ visaList: res.data })
                }
            })
            //修复vant-tab渲染延时错误
            // @ts-ignore
            setTimeout(() => { this.setData({ show: true }) }, 2500)

        }
    }
});
