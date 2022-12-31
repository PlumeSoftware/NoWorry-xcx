/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        input: false,
        keywordIndex: -1,
        keywordList: [
            "银行流水",
            "刷签",
            "入境国",
            "签证时长",
            "面签城市",
            "NoWorry",
            "有效期",
        ],
        qaList: []
    },
    focus() {
        this.setData({ input: true })
    },

    init() {
        this.setData({ input: false, keywordIndex: -1 })
    },
    // blur() {
    //     this.setData({ input: false })
    // },
    chooseKeyword(e: any) {
        this.setData({
            keywordIndex: e.currentTarget.dataset.index,
            input: true
        })
    }
});
