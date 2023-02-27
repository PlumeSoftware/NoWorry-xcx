/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { webGet, webPost } from "../../utils/http"
//@ts-ignore
import Toast from '@vant/weapp/toast/toast';
import { Cart } from "../../entity/cart";
import { culFavFromCarts } from "../../utils/cart";

Page({
    data: {
        //page 参数
        activeVisa: 0,
        showVisaList: false,
        numArray: [2, 3, 4, 5] as Array<{}>,
        numIndex: 0,

        //商品详细参数
        commodity: {} as Cart,
        favourable: [] as Array<{}>,

        //待选商品列表
        commodityList: [] as AnyArray,

    },


    async onShow() {
        const pages = getCurrentPages()
        const commodityId = pages[pages.length - 1].options?.commodityId
        const commodityList = (await webGet<AnyArray>('/visa/group/hot'))!
        this.setData({ commodityList: commodityList })

        if (commodityId) {
            const commodity = (await webGet<Cart>(`/visa/detail/${commodityId}`))!
            commodity.select = true
            commodity.groupsign = true
            this.setData({ commodity: commodity })
        }
        else {
            this.changeCommodity();
        }
    },

    changeCommodity(e?: any) {
        if (e?.currentTarget?.dataset?.item) {
            this.setData({ commodity: e.currentTarget.dataset.item })
        }
        this.setData({ showVisaList: !this.data.showVisaList })
    },
    async genGroupBuy() {
        const result = await webPost<number>('/order/group/create', {
            commodityId: this.data.commodity.commodityId,
            quantity: this.data.commodity.quantity,
            openid: getApp().globalData.userInfo.openid
        });
        wx.navigateTo({ url: `/pages/visa-groupbuy-build/visa-groupbuy-build?groupcode=${result}` })
    },

    changeChooseNum(e: any) {
        const commodity = this.data.commodity;
        commodity.quantity = Number(e.currentTarget.dataset.number)
        this.setData({ commodity: commodity, numIndex: e.currentTarget.dataset.index })
        culFavFromCarts([commodity]).then(fav => {
            console.log(fav)
            this.setData({ favourable: fav })
            if (!fav[0]?.amount) Toast({ type: 'fail', message: '团购量过少~', duration: 2000 });
        }).catch(() => Toast({ type: 'fail', message: '团购量过少~', duration: 2000 }));
    }
});
