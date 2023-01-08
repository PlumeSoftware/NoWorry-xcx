/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { webGet } from "../../utils/http"
//@ts-ignore
import Toast from '@vant/weapp/toast/toast';
import { Cart } from "../../entity/cart";
import { culFavFromCarts } from "../../utils/cart";

Page({
    data: {
        //page 参数
        activeVisa: 0,
        show: true,
        citiesArray: [] as Array<{}>,
        cityIndex: 0,

        //商品详细参数
        commodity: [] as Cart[],
        favourable: [] as Array<{}>
    },

    async onShow() {
        const pages = getCurrentPages()
        const commodityId = pages[pages.length - 1].options.commodityId
        const commodity = (await webGet<Cart>(`/visa/detail/${commodityId}`))!
        commodity.select = true
        this.setData({ commodity: [commodity] })
        switch (this.data.commodity[0].commodityType) {
            case 11: this.setData({ citiesArray: ['伦敦', '曼彻斯特', "爱丁堡"] }); break;
            case 13: this.setData({ citiesArray: ['伦敦', '贝尔法斯特'] }); break;
            case 14: this.setData({ citiesArray: ['伦敦'] }); break;
            case 15: this.setData({ citiesArray: ['线上办理', '线下办理'] }); break;
        }
    },

    bindPickerChange(e: { detail: { value: number } }) {
        const commodityList = this.data.commodity;
        commodityList[0].quantity = Number(e.detail.value) + 2
        this.setData({ commodity: commodityList })
        const fav = culFavFromCarts(commodityList);
        this.setData({ favourable: fav })
        if (fav.length == 0) Toast({ type: 'fail', message: '团购量过少~', duration: 2000 });
    },

    genGroupBuy(){
        
    }
});
