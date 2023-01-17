/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { webGet } from "../../utils/http"
Component({
    data: {
        coverUrlList: [
            "http://122.9.107.17/static/home/17b1.jpg",
            "http://122.9.107.17/static/home/17b2.jpg",
            "http://122.9.107.17/static/home/17b3.jpg",
            "http://122.9.107.17/static/home/17b4.jpg",
        ],
        coverIndex: 0,//封面

        VisaList: [] as any,

        qaList: [
            [
                "Q: 我们可以为您做什么？",
                ["A: Noworry可以为您提供保姆级申根签代办服务，给您全包申根签材料，包括机票酒店行程单，您只需要准备自己的brp护照学生证明银行流水这些简单的材料。", "同时，如果您需要我们为您刷法签slot（在理想的时间内递签），我们也可以为您提供法签加急服务。"]
            ],
            [
                "Q: 申请A国申根签证可以去B国吗？",
                "A: 可以。在您出游的第一拥有一个申根国家的签证可以通行整个欧盟26国！只要在签证有效期内入境A国即可。"
            ],
            [
                "Q: 我可以拿到多久的签证？",
                ["A: 申根签不是申请多久就给多久的，所以一般分两种情况，一是国家，二是材料。",
                    "一，法签/西班牙/德签相对于其他国家给的时间比较长，大多数情况都是90天-180天左右，而北欧（挪威/冰岛/丹麦/芬兰）给的时效比较短，10天-90天的情况都存在。",

                    "二，如果有以下情况存在，签证的有效期也会增长: ",
                    "1. 5年内有过几次申根签记录。 ",
                    "2.卡内余额3000磅以上，流水越多越好。",
                    "3.增加行程时间的长度和次数。"]
            ],
            ["Q: 几天可以拿到签证？",
                "A: 递签后一般在10天-20天可以拿到护照，建议您预留充足的签证时间。"
            ],
            ["Q: 需要申请几天的行程？", "A: 大使馆规定需要7天以上的行程，我们提供的基础行程材料是7-10天，如您需要更长的行程时间可联系NoWorry客服办理。"],
            ["Q: 我办了法国签证，就一定要从法国入境吗？", "A: 不是的。法国是第一入境国，或者法国是几个出行国家中停留时间最久的国家，二选一即可。（其他国家也一致）"],
            ["Q: 关于资金证明的要求是怎样的？",
                ["A: 1.英国本人本地卡（中国卡/美国卡/卓隽卡等等不行）", "2.递签前7天内需要打印3个月英国本地卡银行流水，需要体现日常真实消费，没有具体流水金额要求，越多越好。", "3.卡内1000磅以上余额，建议3000+磅，越多越好。", "4.不满3个月的银行流水，开具银行的开户证明即可（递签前流水最少要有1个月），没有足够的流水可以多去超市消费/网购消费/和朋友相互转帐，都可以。", "5.线下银行需要去银行在流水单上盖章（例如桑坦德、小马、苏格兰银行等），线上银行（例如starling、monzo等）不用盖章。", "我们建议每个同学都预约好slot，准备好自己的英国本地卡，还没有的马上去申请张starling网上银行，2-3天就可以使用消费，不满3个月的流水开开户证明即可。"]
            ],
            ["Q: 面签城市有哪些？", "A: 伦敦，曼城，爱丁堡。（西班牙和德国有领域制。）"],
            ["Q: 最早能刷到几号的签证？", "A: 需要您提供理想的递签时间，一般为10天以上的间，例如12月1日-12月10日，递签后一般15个工作日出签返还护照，请算好合理的递签时间。"],
            ["Q: 多久可以刷到？刷到后如何告知？", "A: 一般周期在3-10天内，最快的一晚上就能有结果。尽量把时间区间给足给长就能刷到。法签会用您的账号刷到后我们会主动发消息/发邮件通知您，请您在收到通知之后3h内上账号支付官网的预约费（32磅左右）。"],
            ["Q: 你们刷slot会锁账号吗？", ["A: 绝对不会。NoWorry的加急系统内部有2000个账号实时运行，仅在检测到您心仪的位置之后才会自动登录您的帐号并成功拿到预约位置，只要您的登录与系统不冲突，不会存在锁号的情况。登录的全过程几乎完全模拟了人类登录的过程，至今没有出现过也绝对不会出现网上说的递签时预约不被承认的状况。安全性完全保证。"]]
        ],

        qaIndex: 0
    },
    methods: {
        toShare() {
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage']
            })
        },

        changeQuestion() {
            this.setData({ qaIndex: Math.floor(Math.random() * 1000) % this.data.qaList.length })
        },

        toQuestionAnswer(){
            wx.navigateTo({ url: "/pages/user-qaa/user-qaa" })
        },

        onShareAppMessage() { },

        toPoster(e: any) {
            wx.navigateTo({ url: '/pages/home-poster/poster' + "?posterId=" + e.currentTarget.dataset["id"] })
        },
        toIntroduce() {
            wx.navigateTo({ url: "/pages/home-introduce/home-introduce" })
        },
        toDetail(e: any) {
            const commodityId = e.currentTarget.dataset.commodityid
            wx.navigateTo({ url: '/pages/visa-detail/visa-detail' + `?commodityId=${commodityId}` })
        },
        //事件 显示时触发
        remake(e: any) {
            if (e.detail.current == this.data.coverUrlList.length - 1) {
                this.setData({ coverIndex: 0 })
            }
        },
    },
    lifetimes: {
        async ready() {
            this.setData({ VisaList: await webGet(`/visa/group/hot`) })
            this.setData({ coverIndex: (this.data.coverIndex + 1) % this.data.coverUrlList.length })
            webGet<string[]>('/home/bannerlist').then(res => { if (res && res.length == 4) this.setData({ coverUrlList: res }) })
        }
    }
});
