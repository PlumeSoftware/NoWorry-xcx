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
        //商品详细参数
        commodity: [] as Cart,
        favourable: [] as Array<{ title: string, amount: number }>,
        orderGroup: [] as any,
    },

    async onShow() {
        const pages = getCurrentPages()
        const groupcode = pages[pages.length - 1].options.groupcode;
        const orderGroup = await webGet<any>(`/order/group/info/${groupcode}`);
        orderGroup.select = true;
        orderGroup.remark = orderGroup.handCity[0]

        this.setData({ commodity: orderGroup as Cart, orderGroup: orderGroup })

        this.culFav()
    },

    async culFav() {
        const commodity = this.data.commodity;
        const fav = await culFavFromCarts([commodity]);
        this.setData({ favourable: fav })
    },

    changeHandCity(e: { currentTarget: { dataset: { city: string } } }) {
        const commodity = this.data.commodity;
        commodity.remark = e.currentTarget.dataset.city;
        this.setData({ commodity: commodity })
    },

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
                item.remark == this.data.commodity.remark &&
                item.group && item.group.orderGroupId == this.data.orderGroup.orderGroupId
        )
        if (targerIndex != -1) {
            carts[targerIndex].quantity++;
        } else {
            carts.push({
                commodityId: this.data.commodity.commodityId,
                commodityName: this.data.commodity.commodityName,
                commodityBrief: this.data.commodity.commodityBrief,
                currentPrice: this.data.commodity.currentPrice,
                remark: this.data.commodity.remark,
                quantity: 1,
                groupsign: true,
                group: {
                    orderGroupId: this.data.orderGroup.orderGroupId,
                    title: this.data.favourable[0].title,
                    amount: this.data.favourable[0].amount
                },
                select: false
            })
        }
        getApp().globalData.carts = carts
        //存于系统中用于下次加入再使用
        wx.setStorageSync('carts', carts)
    },

    genGroupBuy() {
        wx.showModal({ title: '提示', content: "你的团购码是" })
    }
});
