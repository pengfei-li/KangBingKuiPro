// pages/calc/calc.js
let tools = require('../../utils/tools');
let utils = require('./utils.js');
Page({
  data: {
    expression: {
      first: '',
      operator: '',
      second: '',
      result: ''
    },
    clear: false,
    val: '0',
    show: 'hide'
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  btnClicked: function(e) {
    // console.log(e);
    let _ = this;
    let _val = e.target.dataset.val;
    //console.log(utils.dealAction(_val));
    var _dealVal = utils.dealAction(_.data, _val);
    _.setData({
      show: 'show',
      expression: _dealVal.expression,
      val: _dealVal.val
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})