/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */

import { webGet } from "../../utils/http";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Page({
    data: {
        posterList: [
            {
                posterId: 0,
                posterTitle: "申根签优惠活动详情",
                posterInfo: "NoWorry 于11月推出申根签优惠，在此期间和小伙伴组队5人以上办理申根签，即可每人优惠5磅，组队刷签更是每人优惠10磅！",
                posterImg: "http://manager.noworry.cloud/static/home/poster1.jpg"
            },
            {
                posterId: 1,
                posterTitle: "申根签+美签套餐详情",
                posterInfo: "NoWorry 于11月推出申根签+美签套餐，在此期间办理签证套餐的同学每人立减10磅！所有优惠都可叠加，最多省40磅！",
                posterImg: "http://manager.noworry.cloud/static/home/poster2.jpg"
            },
            {
                posterId: 2,
                posterTitle: "美签优惠活动详情",
                posterInfo: "NoWorry 于11月推出美签优惠，2人即成团，2人成团递交美签每人优惠10磅；3人成团每人优惠20磅；4人成团每人优惠30磅！",
                posterImg: "http://manager.noworry.cloud/static/home/poster3.jpg"
            },
            {
                posterId: 3,
                posterTitle: "",
                posterInfo: "",
                posterImg: "https://s1.imagehub.cc/images/2023/01/06/e945cc195b827fd24acf15bdb14202e2.png"
            }
        ],
        tabledata: {
            handCountry: [
                "",
                "法国",
                "西班牙",
                "葡萄牙",
                "德国",
                "冰岛",
                "挪威",
                "芬兰",
                "丹麦",
                "瑞典",
                "瑞士",
                "意大利",
                "美国",
            ],
            handCity: [
                {
                    city: "伦敦",
                    date: [
                        "/",
                        "/",
                        "/",
                        "/",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                    ]
                },
                {
                    city: "曼切斯特",
                    date: [
                        "/",
                        "/",
                        "/",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                    ]
                },
                {
                    city: "爱丁堡",
                    date: [
                        "/",
                        "/",
                        "/",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                        "01/10",
                    ]
                },
            ],
        },


        posterIndex: 0
    },

    onShow() {
        const pages = getCurrentPages();
        const index = pages[pages.length - 1].options.posterId;
        const tabledata = this.data.tabledata;
        tabledata.handCountry.push("", "", "", "", "", "", "", "", "", "", "", "", "", "", "")
        tabledata.handCity.push({ city: "", date: [] }, { city: "", date: [] }, { city: "", date: [] })
        const need1 = tabledata.handCountry.findIndex(i => i == "") < 13 ? 13 : tabledata.handCountry.findIndex(i => i == "")
        tabledata.handCountry = tabledata.handCountry.slice(0, need1)
        const need2 = tabledata.handCity.findIndex(i => i.city == "") < 3 ? 3 : tabledata.handCity.findIndex(i => i.city == "")
        tabledata.handCity = tabledata.handCity.slice(0, need2)
        this.setData({ posterIndex: Number(index), tabledata: tabledata })

        webGet<{ handCountry: string[], handCity: { city: string, date: string[] }[] }>("/visa/slotinfo").then((res) => {
            if (res) {
                res.handCountry.push("", "", "", "", "", "", "", "", "", "", "", "", "", "", "")
                res.handCity.push({ city: "", date: [] }, { city: "", date: [] }, { city: "", date: [] })
                const need1 = res.handCountry.findIndex(i => i == "") < 13 ? 13 : res.handCountry.findIndex(i => i == "")
                res.handCountry = res.handCountry.slice(0, need1)
                const need2 = res.handCity.findIndex(i => i.city == "") < 3 ? 3 : res.handCity.findIndex(i => i.city == "")
                res.handCity = res.handCity.slice(0, need2)
                this.setData({ tabledata: res })
            }
        })
    }
});
