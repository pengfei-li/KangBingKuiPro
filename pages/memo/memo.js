// pages/memo/memo.js
var utils = require('./utils.js');
var tools = require('../../utils/tools.js');
Page({
  data: {
    memo: [{
      name: '赶火车',
      date: '2017-04-01',
      content: '下午赶火车',
      state: 0//状态0：正常 1：进行中  2：过时 3:完成
    }, {
      name: '赶火车',
      date: '2017-04-01',
      content: '下午赶火车',
      state: 3//状态0：正常 1：进行中  2：过时 3:完成
    }, {
      name: '功能增加',
      date: '2017-04-01',
      content: '功能正在缓慢增加...',
      state: 1//状态0：正常 1：进行中  2：过时
    }, {
      name: '超时的备忘录',
      date: '2017-04-01',
      content: '这条信息已经超时，右上角可以修改状态。',
      state: 2//状态0：正常 1：进行中  2：过时
    }]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    utils.getData();
  },
  setState: function (e) {
    let _ = this, index = e.target.dataset.index;
    let _memo = _.data.memo;
    wx.showActionSheet({
      itemList: ['进行中', '超时', '完成'],
      success: function (res) {
        console.log(res.tapIndex);
        _memo[index].state = res.tapIndex + 1;
        _.setData({
          memo: _memo
        });
        //重新保存数据

      },
      fail: function (res) {
        tools.errorDialog('状态修改失败，请重新尝试！');
      }
    });
  },
  addMemo: function () {

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})