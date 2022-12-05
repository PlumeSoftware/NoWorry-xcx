/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        carts: [] as any,
        allselect: false,
        totalPrice: 0,
        totalPrice2: 8.6231
    },


    updateCart() {
        console.log("assa")
        this.setData({ carts: wx.getStorageSync('carts') })
    },

    checkBtn(e: any) {
        const index = e.currentTarget.dataset.index
        const carts = this.data.carts;
        carts[index].select = !carts[index].select

        this.setAllSelect()
        this.culTotal()
    },

    setAllSelect() {
        const carts = this.data.carts;
        if (carts.findIndex((item: any) => !item.select) == -1) {
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
        carts[index].quantity = carts[index].quantity + add
        carts[index].quantity = carts[index].quantity ? carts[index].quantity : 1;
        carts[index].quantity = carts[index].quantity < 9 ? carts[index].quantity : 9
        this.setData({ carts: carts })
        this.culTotal()
    },


    //重新计算价格
    culTotal() {
        let total = 0;
        const carts = this.data.carts;
        carts.forEach((item: any) => {
            total += item.select ? item.price * item.quantity : 0
        })
        const total2 = 8.6231;
        this.setData({ totalPrice: total, totalPrice2: total2 })
        wx.setStorageSync('carts', carts)
    }

});
