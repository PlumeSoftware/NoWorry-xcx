/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Visa } from "../../entity/visa";
import { webGet } from "../../utils/http"
Component({
    data: {
        activeVisa: 0,
        showChoose: false,
        show: false,
        groupcode: '',
        visaList: [
            [
            ]
        ]
    },


    methods: {
        inp() { },
        toDetail(e: any) {
            const commodityId = e.currentTarget.dataset.commodityid
            wx.navigateTo({ url: '/pages/visa-detail/visa-detail' + `?commodityId=${commodityId}` })
        },

        showEnterChoose() {
            //@ts-ignore
            this.setData({ showChoose: !this.data.showChoose})
        },
        showEnterGroup(e: { detail: string }) {
            if (e.detail == 'confirm') {
                //@ts-ignore
                const groupcode = this.data.groupcode
                //@ts-ignore
                webGet<any>(`/order/group/info/${groupcode}`)
                    .then((res) => {
                        if (res.data.status && res.data.status <= 1) {
                            wx.reLaunch({ url: `/pages/visa-groupbuy-main/visa-groupbuy-main?groupcode=${groupcode}` })
                        } else {
                            wx.showToast({ title: '该团购已结束', icon: 'none' })
                        }
                    })
            }
            //@ts-ignore
            this.setData({ show: !this.data.show, groupcode: '' })

        },

        groupBuy() {
            console.log("sss")
            if (!getApp().globalData.token.length) {
                wx.showToast({ title: '网络错误', icon: 'none', duration: 1000 })
                return;
            }
            wx.navigateTo({
                url: `/pages/visa-groupbuy/visa-groupbuy`
            })
        }

    },
    lifetimes: {
        async ready() {
            const visaList = []
            visaList.push([])
            visaList.push(await webGet<Array<Visa>>(`/visa/group/11`))
            visaList.push(await webGet<Array<Visa>>(`/visa/group/12`))
            visaList.push(await webGet<Array<Visa>>(`/visa/group/13`))
            visaList.push([...(await webGet<Array<Visa>>(`/visa/group/14`))!, ...(await webGet<Array<Visa>>(`/visa/group/16`))!])
            visaList.push(await webGet<Array<Visa>>(`/visa/group/15`))

            // @ts-ignore
            this.setData({ visaList: visaList })
        }
    }
});
