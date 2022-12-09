/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        //page 参数
        activeVisa: 0,
        moveY: 0,
        show: true,
        showToast: false,
        citiesArray: ['伦敦', '贝尔法斯特', '伯明翰'],
        cityIndex: 0,

        //商品详细参数
        commodityId: 1,
        commoditySkuId: 13,
        commodityName: "美国签证顺位",
        commodityBrief: "顺位预约，包含材料",
        price: 46,
    },

    initValue: 0,
    move(e: { detail: { x: number, y: number } }) {
        this.setData({ moveY: e.detail.y - 310 })
    },

    bindPickerChange(e: { detail: { value: number } }) {
        this.setData({ cityIndex: e.detail.value })
    },
    addCart() {
        this.setData({ showToast: true })
        this.setData({ commodityId: Number((Math.random()*100).toFixed(0)) })

        const carts = wx.getStorageSync('carts') || [];

        const targerIndex = carts.findIndex((item: any) => item.commodityId == this.data.commodityId)
        if (targerIndex != -1) {
            carts[targerIndex].quantity++;
        } else {
            carts.push({
                commodityId: this.data.commodityId,
                commodityName: this.data.commodityName,
                commodityBrief: this.data.commodityBrief,
                price: this.data.price,
                quantity: 1,
                select: false
            })
        }

        wx.setStorageSync('carts',carts)

        setTimeout(() => {
            this.setData({ showToast: false })
        }, 1500)
    }
});
