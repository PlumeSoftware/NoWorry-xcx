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

        //商品细节备注
        tips: [
            {
                title: "办理条件",
                children: [
                    "法国为第一入境或者是停留时间最久的国家。",
                    "出签时间：10-15个工作日",
                    "签证有效期：3个月-6个月（第一次申请多为3个月）",
                    "Brp持有3个月以上的有效期，护照持有6个月以上的有效期。",
                    "银行流水：要求较为宽松，如果银行流水不足3个月可开银行开户证明"
                ]
            }, {
                title: "所需材料",
                children: [
                    "护照原件及复印件",
                    "护照首页、以往申根签签证页（如有）",
                    "BRP原件及复印件（正反面）",
                    "近3个月本地银行流水",
                    "递签前7日内开具，存款1000磅以上，不满3个月流水可以开一张开户证明。咨询客服或当地分行。",
                    "学生证明，递签前7日内由学校开具，咨询客服或大学官网",
                    "照片35*45mm"]
            }
        ]
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
        this.setData({ commodityId: Number((Math.random() * 100).toFixed(0)) })

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

        wx.setStorageSync('carts', carts)

        setTimeout(() => {
            this.setData({ showToast: false })
        }, 1500)
    }
});
