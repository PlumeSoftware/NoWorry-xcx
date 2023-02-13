/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { culFavFromCarts } from "../../utils/cart";
import { Visa } from "../../entity/visa";
import { webGet } from "../../utils/http"
Component({
    data: {
        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPrice2: 0,
        favourable: [] as Array<{ title: string, amount: number }>,
        favourableTotal: 0,
        show: false
    },

    methods: {
        async updateCart() {
            const carts = getApp().globalData.carts;

            carts.forEach(async (cart: any, index: number) => {
                //检查团购订单是否可用
                if (cart.group) {
                    const result = await webGet<{ status: number }>(`/order/group/info/${cart.group.orderGroupId}${cart.commodityId}`)
                    if (result!.status > 1) {
                        carts[index].err = true
                    }
                }

                //去除不可用的
                if (carts[index].err) {
                    carts[index].select = false
                }
            })

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

            if (carts[index].err) {
                wx.showToast({ title: "该商品已经失效", icon: "none" })
                return;
            }

            //检查此前所有被选择的商品是否含有团购商品
            let groupId = 0;
            carts[index].select = !carts[index].select

            //检查团购
            carts.filter((i: any) => i.select).forEach((cart: any) => {
                if (cart.group) {//商品存在团购字段
                    if (groupId === 0) groupId = cart.group.orderGroupId
                    else if (groupId !== cart.group.orderGroupId) {
                        carts.forEach((i: any) => i.select = false)
                        wx.showToast({ title: "不同团购订单的商品不能一起结算哦~", icon: "none" })
                    }
                } else {//商品为普通购买
                    if (groupId !== 0 && groupId !== -1) {
                        carts.forEach((i: any) => i.select = false)
                        wx.showToast({ title: "不同团购订单的商品不能一起结算哦~", icon: "none" })
                    }
                    groupId = -1;
                }
            })

            //检查加急
            if (carts.filter((i: any) => i.select && i.urgentsign).length &&
                carts.filter((i: any) => i.select && i.urgentsign).length < carts.filter((i: any) => i.select).length) {
                carts.forEach((i: any) => i.select = false)
                wx.showToast({ title: "加急商品不能和非加急商品一起结算哦~", icon: "none" })
            }

            wx.setStorageSync('carts', carts);
            this.setAllSelect()
            this.culTotal()
        },

        allSelect() {
            const carts = this.data.carts;
            carts.forEach((i: any) => i.select = !this.data.allselect)

            let groupId = 0;
            carts.filter((i: any) => i.select).forEach((cart: any) => {
                if (cart.group) {//商品存在团购字段
                    if (groupId === 0) groupId = cart.group.orderGroupId
                    else if (groupId !== cart.group.orderGroupId) {
                        console.log("选定的是", groupId, "当前的是", cart.group.orderGroupId)
                        carts.forEach((i: any) => i.select = false)
                        wx.showToast({ title: "不同团购订单的商品不能一起结算哦~", icon: "none" })
                    }
                } else {//商品为普通购买
                    if (groupId !== 0 && groupId !== -1) {
                        carts.forEach((i: any) => i.select = false)
                        wx.showToast({ title: "不同团购订单的商品不能一起结算哦~", icon: "none" })
                    }
                    groupId = -1;
                }
            })
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
            if (this.data.favourableTotal > 0) this.setData({ show: !this.data.show })
        },

        //重新计算价格
        culTotal() {
            let total = 0;
            const carts = this.data.carts;
            carts.filter((item: any) => item.select).forEach(
                (item: any) => {
                    total += (item.currentPrice + (item.urgentsign ? 20 : 0)) * item.quantity;
                }
            )

            let favourableTotal = 0;

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

            //触发该方法保证待结算团购商品至多有一个
            const checkGroupItem = this.data.carts.find((i: any) => i.group && i.select)
            if (checkGroupItem) {
                const result = await webGet<{ status: number }>(`/order/group/info/${checkGroupItem.group.orderGroupId}${checkGroupItem.commodityId}`);
                if (result!.status != 0) {
                    setTimeout(() => { wx.showToast({ title: '该团购订单已结束', icon: 'none', duration: 2000 }) }, 700)
                    return;
                }
            }

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
        }
    },
    lifetimes: {
        async ready() {
            await this.updateCart();
            await this.setAllSelect();
            await this.culTotal();
        }
    }
});
