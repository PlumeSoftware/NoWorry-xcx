/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { webGet } from "../../utils/http"
import { Visa } from "../../entity/visa";
//@ts-ignore
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
        //page 参数
        activeVisa: 0,
        moveY: 0,
        show: true,
        citiesArray: [] as Array<{}>,
        cityIndex: 0,

        //商品详细参数
        commodity: {} as Visa
    },

    async onShow() {
        const pages = getCurrentPages()
        const commodityId = pages[pages.length - 1].options.commodityId
        this.setData({ commodity: (await webGet<Visa>(`/visa/detail/${commodityId}`))! })
        switch (this.data.commodity.commodityType) {
            case 11: this.setData({ citiesArray: ['伦敦', '曼彻斯特', "爱丁堡"] }); break;
            case 12: this.setData({ citiesArray: ['伦敦', '曼彻斯特', "爱丁堡"] }); break;
            case 13: this.setData({ citiesArray: ['伦敦', '贝尔法斯特'] }); break;
            case 14: this.setData({ citiesArray: ['伦敦'] }); break;
            case 15: this.setData({ citiesArray: ['线上办理', '线下办理'] }); break;
        }
        if (this.data.commodity.handCity && this.data.commodity.handCity.length > 0) {
            this.setData({ citiesArray: this.data.commodity.handCity })
        }
    },

    initValue: 0,

    bindPickerChange(e: { detail: { value: number } }) { this.setData({ cityIndex: e.detail.value }) },
    addCart() {
        if (!getApp().globalData.token.length) {
            wx.showToast({ title: '网络错误', icon: 'none', duration: 1000 })
            return;
        }

        Toast({ type: 'success', message: '加购成功', duration: 2000 });

        this.setData({ commodityId: Number((Math.random() * 100).toFixed(0)) })

        const carts = getApp().globalData.carts

        const targerIndex = carts.findIndex(
            (item: any) =>
                item.commodityId == this.data.commodity.commodityId &&
                item.remark == this.data.citiesArray[this.data.cityIndex] &&
                !item.group //该页面加入的无法进入团购
        )
        if (targerIndex != -1) {
            carts[targerIndex].quantity++;
        } else {
            carts.push({
                commodityId: this.data.commodity.commodityId,
                commodityName: this.data.commodity.commodityName,
                commodityBrief: this.data.commodity.commodityBrief,
                currentPrice: this.data.commodity.currentPrice,
                remark: this.data.citiesArray[this.data.cityIndex],
                quantity: 1,
                select: false
            })
        }

        //存于系统中用于下次加入再使用
        wx.setStorageSync('carts', carts)
    },

    groupBuy() {
        if (!getApp().globalData.token.length) {
            wx.showToast({ title: '网络错误', icon: 'none', duration: 1000 })
            return;
        }
        // if (getApp().globalData.userInfo.userName != "韦定彩") {
        //     wx.showToast({
        //         title: '本期活动暂未开放',
        //         icon: 'none',
        //         duration: 2000
        //     })
        // } else
        //  {
        wx.navigateTo({
            url: `/pages/visa-groupbuy/visa-groupbuy?commodityId=${this.data.commodity.commodityId}`
        })
        // }
    }
});
