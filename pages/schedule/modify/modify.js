// pages/schedule/modify/modify.js
let tools = require('../../../utils/tools.js');
let util = require('../util.js');
Page({
  data: {
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    desc: '',
    id: '',
    interval_date: tools.returnIntervalDate(9, new Date())
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let _ = this;
    _.setData({
      id: options.id
    });
    util.getOneItem(options.id, (data) => {
      _.setData({
        title: data[0].title,
        date: data[0].date,
        startTime: data[0].startTime,
        endTime: data[0].endTime,
        desc: data[0].desc
      });
    });
  },
  updateOneSchedule: function(e) {
    var _item = {
      title: e.detail.value.title,
      desc: e.detail.value.desc,
      date: e.detail.value.date,
      startTime: e.detail.value.start,
      endTime: e.detail.value.end
    };
    util.updateItem(this.data.id, _item, (data) => {
      tools.back();
    });
  },
  back: function() {
    tools.back();
  },
  startTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    });
  },
  endTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: tools.formatToString(e.detail.value)
    });
  },
})