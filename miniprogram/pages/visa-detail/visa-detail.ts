/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

Page({
    data: {
        activeVisa: 0,
        moveY: 0,
        show: true,
        showToast: false,
        citiesArray: ['伦敦', '贝尔法斯特', '伯明翰'],
        cityIndex: 0
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
        setTimeout(() => {
            this.setData({ showToast: false })
        }, 1500)
    }
});
