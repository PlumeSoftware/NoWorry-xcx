// pages/home-cust/home-cust.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    btnStyle: -1,
    qaList: [//问题存储数组
      {
        q: "你想去哪",
        a: [
          "西欧",
          "北欧",
          "美国",
          "其他"
        ],
      },
      {
        q: "具体是",
        a: [
          ["法国",
            "西班牙",],

          ["冰岛",
            "芬兰",
            "瑞典",
            "挪威",],
          [],
          ["日本",
            "新加坡"]
        ],
      },
      {
        q: "需要代办服务吗？",
        a: [
          "需要",
          "不需要",
        ],
      },
    ],

    choice: [//用户所选择答案暂存
      {
        qId: 1,
        answer: 0
      },
      {
        qId: 2,
        answer: 0
      },
      {
        qId: 3,
        answer: 0
      },
    ]
  },

  onShow() {
    this.setData({
      pageIndex: 0
    })
  },

  back() {
    if (this.data.pageIndex > 0) {
      this.setData({ pageIndex: this.data.choice[0].answer == 2 ? this.data.pageIndex - 2 : this.data.pageIndex - 1})
      this.setData({btnStyle: this.data.choice[this.data.pageIndex].answer})
    }
  },

  next() {
    this.setData({ pageIndex: this.data.choice[0].answer == 2 ? this.data.pageIndex + 2 : this.data.pageIndex + 1 ,btnStyle: -1})
  },

  getAnswer(e: any) {
    if (this.data.btnStyle == e.currentTarget.dataset.index) {
      this.setData({
        btnStyle: -1
      })
    } else {
      this.setData({
        btnStyle: e.currentTarget.dataset.index
      })
    }
    const choice = this.data.choice;
    choice[this.data.pageIndex].answer = e.currentTarget.dataset.index//存储用户所填写的选项用数字表示
    this.setData({ choice: choice })

  },

  save() {
    wx.setStorageSync("hot",this.data.choice)
    wx.reLaunch({ url: '/pages/index/index' })
  }
})