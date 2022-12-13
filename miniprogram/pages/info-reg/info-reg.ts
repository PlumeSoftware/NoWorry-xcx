/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars


Page({
    data: {
        pageIndex: 0
    },

    change() {
        console.log("eee")
        if (this.data.pageIndex <=4) {
            this.setData({
                pageIndex: this.data.pageIndex + 1
            })
        }
    }

});
