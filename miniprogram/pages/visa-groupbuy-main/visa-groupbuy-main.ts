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
        commodity: [] as Cart,
        favourable: [] as Array<{}>,
        orderGroup: [] as any
    },

    async onShow() {
        const pages = getCurrentPages()
        // const orderGroupId = pages[pages.length - 1].options.orderGroupId;
        const orderGroupId = 12111
        const orderGroup = await webGet<any>(`/order/group/info/${orderGroupId}`);
        orderGroup.select = true;

        console.log(orderGroup, orderGroup.parters)
        // commodity.select = true
        this.setData({ commodity: orderGroup as Cart, orderGroup: orderGroup })

        this.culFav()
        switch (this.data.commodity.commodityType) {
            case 11: this.setData({ citiesArray: ['伦敦', '曼彻斯特', "爱丁堡"] }); break;
            case 13: this.setData({ citiesArray: ['伦敦', '贝尔法斯特'] }); break;
            case 14: this.setData({ citiesArray: ['伦敦'] }); break;
            case 15: this.setData({ citiesArray: ['线上办理', '线下办理'] }); break;
        }
    },

    async culFav() {
        const commodity = this.data.commodity;
        const fav = await culFavFromCarts([commodity]);
        this.setData({ favourable: fav })
        if (!fav || fav.length == 0) Toast({ type: 'fail', message: '团购量过少~', duration: 2000 });
    },
    genGroupBuy() {
        wx.showModal({ title: '提示', content: "你的团购码是" })
    }
});
