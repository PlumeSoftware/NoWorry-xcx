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
            case 13: this.setData({ citiesArray: ['伦敦', '贝尔法斯特'] }); break;
            case 14: this.setData({ citiesArray: ['伦敦'] }); break;
            case 15: this.setData({ citiesArray: ['线上办理', '线下办理'] }); break;
        }
    },

    initValue: 0,
    move(e: { detail: { x: number, y: number } }) { this.setData({ moveY: e.detail.y - 310 }) },

    bindPickerChange(e: { detail: { value: number } }) { this.setData({ cityIndex: e.detail.value }) },
    addCart() {
        Toast({ type: 'success', message: '加购成功', duration: 2000 });
        this.setData({ commodityId: Number((Math.random() * 100).toFixed(0)) })

        const carts = wx.getStorageSync('carts') || [];

        const targerIndex = carts.findIndex(
            (item: any) => item.commodityId == this.data.commodity.commodityId && item.remark == this.data.citiesArray[this.data.cityIndex]
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

        wx.setStorageSync('carts', carts)

        setTimeout(() => { this.setData({ showToast: false }) }, 1500)
    },

    groupBuy(){
        wx.navigateTo({
            url:`/pages/visa-groupbuy/visa-groupbuy?commodityId=${this.data.commodity.commodityId}`
        })
    }
});
