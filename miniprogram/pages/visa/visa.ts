/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Component({
    data: {
        activeVisa: 0,
        show: false,
        visaList:[
            {
                commodityName:"法国签证刷签",
                commodityPrice:88,
                commodityCover:"/static/visa/visa-fra.png"
            },
            {
                commodityName:"法国签证刷签代办",
                commodityPrice:128,
                commodityCover:"/static/visa/visa-fra.png"
            },
            {
                commodityName:"美国签证刷签",
                commodityPrice:88,
                commodityCover:"/static/visa/visa-usa.png"
            },
        ]
    },

    methods: {
        toDetail() {
            wx.navigateTo({ url: '/pages/visa-detail/visa-detail' })
        },
    },
    lifetimes: {
        ready() {
            //修复vant-tab渲染延时错误
            // @ts-ignore
            setTimeout(() => { this.setData({ show: true }) }, 2500)
        }
    }
});
