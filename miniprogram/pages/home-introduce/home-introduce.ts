/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Page({
    data: {
        posterList: [
            {
                posterId: 0,
                posterTitle: "申根签优惠活动详情",
                posterInfo: "NoWorry 于11月推出申根签优惠，在此期间和小伙伴组队5人以上办理申根签，即可每人优惠5磅，组队刷签更是每人优惠10磅！",
                posterImg: "https://noworry.goho.co/static/home/poster1.png"
            },
            {
                posterId: 1,
                posterTitle: "申根签+美签套餐详情",
                posterInfo: "NoWorry 于11月推出申根签+美签套餐，在此期间办理签证套餐的同学每人立减10磅！所有优惠都可叠加，最多省40磅！",
                posterImg: "https://noworry.goho.co/static/home/poster2.png"
            },
            {
                posterId: 2,
                posterTitle: "美签优惠活动详情",
                posterInfo: "NoWorry 于11月推出美签优惠，2人即成团，2人成团递交美签每人优惠10磅；3人成团每人优惠20磅；4人成团每人优惠30磅！四人团为上限哟！",
                posterImg: "https://noworry.goho.co/static/home/poster3.png"
            },
            {
                posterId: 3,
                posterTitle: "",
                posterInfo: "",
                posterImg: "https://noworry.goho.co/static/home/poster4.png"
            }
        ],
        posterIndex: 0
    },

    onShow() {
        const pages = getCurrentPages();
        const index = pages[pages.length - 1].options.posterId;
        this.setData({ posterIndex: Number(index) })
    }
});
