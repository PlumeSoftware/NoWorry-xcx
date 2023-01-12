/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { culFavFromCarts } from "../../utils/cart";
import { Visa } from "../../entity/visa";
import { webGet } from "../../utils/http"

Page({
    data: {
        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPrice2: 0,
        favourable: [] as Array<{ title: string, amount: number }>,
        favourableTotal: 0,
        show: false
    },


    async updateCart() {
        const carts = getApp().globalData.carts;
        for (let i = 0; i < carts.length; i++) {
            const visa = await webGet<Visa>(`/visa/detail/${carts[i].commodityId}`, {})
            carts[i].picLink = visa?.picLink
            carts[i].picLinkTem = visa?.picLinkTem
            carts[i].currentPrice = visa?.currentPrice
        }
        this.setData({ carts: carts })
        this.setAllSelect()
        this.culTotal()
    },

    checkBtn(e: any) {
        const index = e.currentTarget.dataset.index
        const carts = this.data.carts;
        carts[index].select = !carts[index].select

        this.setAllSelect()
        this.culTotal()
    },
    handleVerticalDrag(e: { changedTouches: any }) {
        console.log(e.changedTouches[0])
    },

    allSelect() {
        const carts = this.data.carts;
        carts.forEach((i: any) => i.select = !this.data.allselect)
        this.setAllSelect()
        this.culTotal()
    },
    setAllSelect() {
        const carts = this.data.carts;
        if (carts && carts.findIndex((item: any) => !item.select) == -1) {
            this.setData({ allselect: true })
        } else {
            this.setData({ allselect: false })
        }
        this.setData({ carts: carts })
    },

    add(e: any) {
        const index = e.currentTarget.dataset.index
        const add = e.currentTarget.dataset.add
        const carts = this.data.carts;
        carts[index].quantity = carts[index].quantity + add;
        if (carts[index].quantity < 1) carts.splice(index, 1);
        this.setData({ carts: carts })
        getApp().globalData.carts = carts;
        wx.setStorageSync('carts', carts)
        this.culTotal()
    },

    showFav() {
        if(this.data.favourableTotal>0)            this.setData({ show: !this.data.show })
    },

    //重新计算价格
    culTotal() {
        let total = 0;
        const carts = this.data.carts;
        carts.forEach((item: any) => total += item.select ? item.currentPrice * item.quantity : 0)

        let favourableTotal = 0;

        //生成优惠方案
        culFavFromCarts(carts).then(fav => {
            this.setData({ favourable: fav })
            //计算优惠价格
            fav.forEach((i: any) => {
                favourableTotal += i.amount
            })
            //计算人民币
            const total2 = Number((8.35 * (total - favourableTotal)).toFixed(2));
            this.setData({ totalPrice: total - favourableTotal, totalPrice2: total2, favourableTotal: favourableTotal })
        });


    },

    async settle() {
        wx.showToast({
            title: 'loading',
            icon: 'loading',
            duration: 700
        })
        const userInfo = getApp().globalData.userInfo
        setTimeout(() => {
            if (userInfo.userName && userInfo.email && userInfo.phone && userInfo.handSignCity) {
                wx.navigateTo({ url: "/pages/cart-settle/cart-settle" })
            } else wx.showModal({
                title: '提示',
                content: '您的个人资料未完善',
                showCancel: false,
                confirmText: "前往设置",
                success: () => wx.navigateTo({ url: "/pages/user-set/user-set" })
            })
        }, 800)
    }
});
