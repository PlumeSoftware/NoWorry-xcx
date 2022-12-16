/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { webGet } from "../../utils/http"
Component({
    data: {
        activeVisa: 0,
        show: false,
        visaList: [
            [
                // {
                //     commodityName: "法国签证刷签",
                //     currentPrice: 88,
                //     commodityCover: "http://122.9.107.17/static/visa/visa-fra.png"
                // },
                // {
                //     commodityName: "法国签证刷签代办",
                //     currentPrice: 128,
                //     commodityCover: "http://122.9.107.17/static/visa/visa-fra.png"
                // },
                // {
                //     commodityName: "美国签证刷签",
                //     currentPrice: 88,
                //     picLink: "http://122.9.107.17/static/visa/visa-usa.png"
                // },
            ]
        ]
    },

    methods: {
        toDetail(e: any) {
            const commodityId = e.currentTarget.dataset.commodityid
            console.log(e.currentTarget)
            wx.navigateTo({ url: '/pages/visa-detail/visa-detail' + `?commodityId=${commodityId}` })
        },

    },
    lifetimes: {
        async ready() {
            const visaList = []
            visaList.push(await webGet(`/visa/group/hot`))
            visaList.push(await webGet(`/visa/group/11`))
            visaList.push(await webGet(`/visa/group/12`))
            visaList.push(await webGet(`/visa/group/13`))
            visaList.push(await webGet(`/visa/group/14`))

            // @ts-ignore
            this.setData({ visaList: visaList })
            //修复vant-tab渲染延时错误
            // @ts-ignore
            setTimeout(() => { this.setData({ show: true }) }, 2500)

        }
    }
});
