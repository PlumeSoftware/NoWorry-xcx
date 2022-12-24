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
