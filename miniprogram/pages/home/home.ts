/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Page({
    data: {
        coverUrlList: [
            "/static/home/account1.png",
            "/static/home/account2.png",
            "/static/home/account3.png",
            "/static/home/account4.png"
        ],
        coverIndex: 0
    },
    //事件 显示时触发

    //页面渲染完毕
    start() {
        console.log("aaa")
        setInterval(() => {
            this.setData({ coverIndex: (this.data.coverIndex + 1) % this.data.coverUrlList.length })
        }, 3000)
    }
});
