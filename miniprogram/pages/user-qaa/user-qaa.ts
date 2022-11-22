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
            "关键词",
            "点击即可",
            "快捷搜索",
            "关键词",
            "真的",
            "很关键的",
            "不一定相关",
        ]
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
