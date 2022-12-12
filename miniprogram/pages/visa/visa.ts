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
        async getData(id: number | 'hot') {
            return new Promise((resolve) => {
                wx.request({
                    url: http.BASE_URL + `/visa/group/${id}`,
                    success: (res) => {
                        console.log(res.data)
                        resolve(res.data)
                    },
                    fail: () => {
                        resolve([])
                    }
                })
            })

        }

    },
    lifetimes: {
        async ready() {
            const visaList = []
            visaList.push(await this.getData('hot'))
            visaList.push(await this.getData(11))
            visaList.push(await this.getData(12))
            visaList.push(await this.getData(13))
            visaList.push(await this.getData(14))

            this.setData({ visaList: visaList })
            //修复vant-tab渲染延时错误
            // @ts-ignore
            setTimeout(() => { this.setData({ show: true }) }, 2500)

        }
    }
});
