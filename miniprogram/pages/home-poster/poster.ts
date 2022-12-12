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
                posterImg: "http://122.9.107.17/static/home/poster1.png"
            },
            {
                posterId: 1,
                posterTitle: "申根签优惠活动详情",
                posterInfo: "NoWorry 于11月推出申根签优惠，在此期间和小伙伴组队5人以上办理申根签，即可每人优惠5磅，组队刷签更是每人优惠10磅！",
                posterImg: "http://122.9.107.17/static/home/poster2.png"
            },
            {
                posterId: 2,
                posterTitle: "申根签优惠活动详情",
                posterInfo: "NoWorry 于11月推出申根签优惠，在此期间和小伙伴组队5人以上办理申根签，即可每人优惠5磅，组队刷签更是每人优惠10磅！",
                posterImg: "http://122.9.107.17/static/home/poster3.png"
            },
            {
                posterId: 3,
                posterTitle: "申根签优惠活动详情",
                posterInfo: "NoWorry 于11月推出申根签优惠，在此期间和小伙伴组队5人以上办理申根签，即可每人优惠5磅，组队刷签更是每人优惠10磅！",
                posterImg: "http://122.9.107.17/static/home/poster4.png"
            }
        ],
        posterIndex: 0
    },

    onShow() {
        const pages = getCurrentPages();
        const index = pages[pages.length - 1].options.posterId;
        this.setData({ posterIndex: index })
    }
});
