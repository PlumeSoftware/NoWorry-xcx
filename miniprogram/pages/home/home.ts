/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { webGet } from "../../utils/http"
Page({
    data: {
        coverUrlList: [
            "https://s1.imagehub.cc/images/2023/01/06/f626d816429614277cb1d8b600fe642d.png",
            "https://s1.imagehub.cc/images/2023/01/06/163f0feb04241d50f78401ef5c245655.png",
            "https://s1.imagehub.cc/images/2023/01/06/2840af5f963708275a4a0b9f82f3157e.png",
            "https://s1.imagehub.cc/images/2023/01/06/38f598da5418545e37e45483056d8737.png",
        ],
        coverIndex: 0,

        VisaList: [] as any
    },
    toShare() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage']
        })
    },

    onShareAppMessage() {},

    toPoster(e: any) {
        wx.navigateTo({ url: '/pages/home-poster/poster' + "?posterId=" + e.currentTarget.dataset["id"] })
    },
    toIntroduce() {
        wx.navigateTo({ url: "/pages/home-introduce/home-introduce" })
    },
    toDetail(e: any) {
        const commodityId = e.currentTarget.dataset.commodityid
        wx.navigateTo({ url: '/pages/visa-detail/visa-detail' + `?commodityId=${commodityId}` })
    },
    //事件 显示时触发

    //页面渲染完毕
    async start() {
        this.setData({ VisaList: await webGet(`/visa/group/hot`) })
        setInterval(() => {
            this.setData({ coverIndex: (this.data.coverIndex + 1) % this.data.coverUrlList.length })
        }, 5000)
    }
});
