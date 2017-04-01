// pages/memo/memo.js
var utils = require('./utils.js');
var tools = require('../../utils/tools.js');
Page({
  data: {
    memo: [],
    modalAnimate: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let _ = this;
    utils.getData((_memo) => {
      console.log(_memo);
      _.setData({
        memo: _memo
      });
    });
  },
  updateMemoData: function (_memo) {
    this.setData({
      memo: _memo
    });
    //更新localStorage
    utils.updateData(_memo);
  },
  setState: function (e) {
    let _ = this, index = e.target.dataset.index;
    let _memo = _.data.memo;
    wx.showActionSheet({
      itemList: ['进行中', '超时', '完成'],
      success: function (res) {
        let _seetIndex = res.tapIndex;
        console.log('_index' + _seetIndex);
        if (_seetIndex != 3 && _seetIndex != undefined) {
          _memo[index].state = res.tapIndex + 1;
          _.updateMemoData(_memo);
        }
      },
      fail: function (res) {
        // tools.errorDialog('状态修改失败，请重新尝试！');
      }
    });
  },
  openAddModal: function () {
    this.setData({
      modalAnimate: tools.modalOpen()
    });
  },
  closeAddModal: function () {
    this.setData({
      modalAnimate: tools.modalClose()
    });
  },
  addOneMemo: function (e) {
    let _ = this;
    let _title = e.detail.value.title.trim();
    let _content = e.detail.value.content.trim();
    if (!_title || !_content) {
      tools.warnDialog('备忘名和内容不能为空！');
      return false;
    }
    _.closeAddModal();
    utils.addOne(_title, _content, (data) => {
      console.log(data);
      _.updateMemoData(data);
    });
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