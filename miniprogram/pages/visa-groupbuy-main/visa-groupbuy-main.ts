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
    }
});
