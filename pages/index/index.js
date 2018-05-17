var app = getApp()
let Calc = require("../../utils/calc").default
Page({
  data: {
    calc: {}
  },
  onLoad () {
  },
  btnClicked (event) {
    Calc.addOp(event.target.dataset.num)
    this.setData({calc: Calc})
  },
  showAbout (e) {
    wx.showModal({
      title: '关于',
      content: '一个简单的计算器 @V1.0',
      showCancel: false
    })
  }
})