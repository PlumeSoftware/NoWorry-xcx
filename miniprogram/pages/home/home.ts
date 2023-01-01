/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { webGet } from "../../utils/http"
Page({
    data: {
        coverUrlList: [
            "https://noworry.cloud/static/home/account1.png",
            "https://noworry.cloud/static/home/account2.png",
            "https://noworry.cloud/static/home/account3.png",
            "https://noworry.cloud/static/home/account4.png"
        ],
        coverIndex: 0,

        VisaList: [] as any

    },
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
