/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        carts: [
            {
                title: "美国签证顺位",
                describe: "顺位预约，包含材料",
                price: 46,
                quantity: 1,
                select: false
            },
            {
                title: "美国签证顺位",
                describe: "顺位预约，包含材料",
                price: 46,
                quantity: 1,
                select: false
            },
            {
                title: "美国签证顺位",
                describe: "顺位预约，包含材料",
                price: 48,
                quantity: 1,
                select: false
            },

        ],
        allselect: false,
        totalPrice: 0,
        totalPrice2: 0
    },
    checkBtn(e: any) {
        const index = e.currentTarget.dataset.index
        const carts = this.data.carts;
        carts[index].select = !carts[index].select
        if (carts.findIndex(item => !item.select) == -1) {
            this.setData({ allselect: true })
        } else {
            this.setData({ allselect: false })
        }

        this.setData({ carts: carts })
        this.culTotal()
    },

    add(e: any) {
        console.log(e)
        const index = e.currentTarget.dataset.index
        const add = e.currentTarget.dataset.add
        const carts = this.data.carts;
        carts[index].quantity = carts[index].quantity + add
        this.setData({ carts: carts })
        this.culTotal()
    },

    culTotal() {
        let total = 0;
        const carts = this.data.carts;
        carts.forEach(item => {
            total += item.select ? item.price * item.quantity : 0
        })
        const total2 = Number((total * 8.6231).toFixed(2));
        this.setData({ totalPrice: total, totalPrice2: total2 })
    }

});
