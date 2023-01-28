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
        showEnterGroup(e: { detail: string }) {
            if (e.detail == 'confirm') {
                //@ts-ignore
                const groupcode = this.data.groupcode
                //@ts-ignore
                webGet<any>(`/order/group/info/${groupcode}`)
                    .then((res) => {
                        if (res) {
                            wx.reLaunch({ url: `/pages/visa-groupbuy-main/visa-groupbuy-main?groupcode=${groupcode}` })
                        } else {
                            wx.showToast({ title: '该团购已结束', icon: 'none' })
                        }
                    })
            }
            //@ts-ignore
            this.setData({ show: !this.data.show, groupcode: '' })

        },

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
