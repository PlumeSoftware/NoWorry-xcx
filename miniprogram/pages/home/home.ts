/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as http from "../../utils/http"
Page({
    data: {
        coverUrlList: [
            "http://122.9.107.17/static/home/account1.png",
            "http://122.9.107.17/static/home/account2.png",
            "http://122.9.107.17/static/home/account3.png",
            "http://122.9.107.17/static/home/account4.png"
        ],
        coverIndex: 0,

        VisaList:[
            {
                commodityId:1,
                commodityName:"法国签证刷签代办",
                commodityPrice:128,
                commodityCover:"http://122.9.107.17/static/home/French.png"
            },
            {
                commodityId:1,
                commodityName:"西班牙签证刷签代办",
                commodityPrice:128,
                commodityCover:"http://122.9.107.17/static/home/spain.png"
            },
            {
                commodityId:1,
                commodityName:"美国签证刷签代办",
                commodityPrice:88,
                commodityCover:"http://122.9.107.17/static/home/USA.png"
            },
            {
                commodityId:1,
                commodityName:"美国签证刷签代办",
                commodityPrice:88,
                commodityCover:"http://122.9.107.17/static/home/USA.png"
            },
            {
                commodityId:1,
                commodityName:"美国签证刷签代办",
                commodityPrice:88,
                commodityCover:"http://122.9.107.17/static/home/USA.png"
            },
        ]

    },
    toPoster(e:any) {
        console.log(e)
        wx.navigateTo({url:'/pages/home-poster/poster'+"?posterId="+e.currentTarget.dataset["id"]})
    },
    toDetail(e:any) {
        const commodityId = e.currentTarget.dataset.commodityid
        console.log( e.currentTarget)
        wx.navigateTo({ url: '/pages/visa-detail/visa-detail' + `?commodityId=${commodityId}` })
    },
    //事件 显示时触发

    //页面渲染完毕
    start() {
        wx.request({
            url: http.BASE_URL + `/visa/group/11`,
            success: (res) => {
                this.setData({ visaList: res.data })
            }
        })
        wx.pageScrollTo({})
        console.log("aaa")
        setInterval(() => {
            this.setData({ coverIndex: (this.data.coverIndex + 1) % this.data.coverUrlList.length })
        }, 3000)
    }
});
