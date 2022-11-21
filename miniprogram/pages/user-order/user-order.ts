/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        active: 0,
        orderNameGroup: [
            "未支付", "进行中", "已完成"
        ],

        orderGroup: [
            [
                {
                    title: "英国11月刷签",
                    describe: "本月刷位预约，包含递签材料"
                }
            ],
            [
                {
                    title: "美国11月刷签",
                    describe: "本月刷位预约，包含递签材料"
                },
                {
                    title: "美国11月刷签",
                    describe: "本月刷位预约，包含递签材料"
                },
                {
                    title: "美国11月刷签",
                    describe: "本月刷位预约，包含递签材料"
                }
            ]
        ],
    },
    toProcess(){
        console.log("ajkaksa")
        wx.navigateTo({
            url: '/pages/user-order-detail/user-order-detail?orderId=1'
        })
    }
});
