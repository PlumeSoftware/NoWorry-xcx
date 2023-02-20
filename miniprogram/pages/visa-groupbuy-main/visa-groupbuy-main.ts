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

    onLoad(){
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
          })
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

    onShareAppMessage(){
        const pages = getCurrentPages()
        const groupcode = pages[pages.length - 1].options.groupcode;
        return {
            title:this.data.commodity.commodityName    ,
            path:`pages/visa-groupbuy-main/visa-groupbuy-main?groupcode=${groupcode}`,
            imageUrl:this.data.commodity.picLinkTem
        }
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

    buyNow() {
        wx.showToast({
            title: 'loading',
            icon: 'loading',
            duration: 700
        })

        //触发该方法保证待结算团购商品至多有一个
        // const checkGroupItem = this.data.carts.find((i: any) => i.group && i.select)
        // if (checkGroupItem) {
        //     const result = await webGet<{ status: number }>(`/order/group/info/${checkGroupItem.group.orderGroupId}${checkGroupItem.commodityId}`);
        //     if (result!.status != 0) {
        //         setTimeout(() => { wx.showToast({ title: '该团购订单已结束', icon: 'none', duration: 2000 }) }, 700)
        //         return;
        //     }
        // }
        const carts = getApp().globalData.carts

        //清空购物车的选择
        carts.forEach((i:{select:boolean})=>i.select=false)

        carts.push({
            commodityId: this.data.commodity.commodityId,
            commodityName: this.data.commodity.commodityName,
            commodityBrief: this.data.commodity.commodityBrief,
            currentPrice: this.data.commodity.currentPrice,
            remark: this.data.commodity.remark,
            quantity: 1,
            picLinkTem:this.data.commodity.picLinkTem,
            groupsign: true,
            group: {
                orderGroupId: this.data.orderGroup.orderGroupId,
                title: this.data.favourable[0].title,
                amount: this.data.favourable[0].amount
            },
            select: true
        })

        const userInfo = getApp().globalData.userInfo
        setTimeout(() => {
            if (userInfo.userName && userInfo.email && userInfo.phone && userInfo.handSignCity && userInfo.userName != '微信用户') {
                wx.navigateTo({ url: "/pages/cart-settle/cart-settle" })
            } else wx.showModal({
                title: '提示',
                content: '您的个人资料未完善',
                showCancel: false,
                confirmText: "前往设置",
                success: () => wx.navigateTo({ url: "/pages/user-set/user-set" })
            })
        }, 800)
    },

    genGroupBuy() {
        wx.showModal({ title: '提示', content: "你的团购码是" })
    }
});
