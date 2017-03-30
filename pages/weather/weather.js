// pages/weather/weather.js
// 引用百度地图微信小程序JSAPI模块 
let bmap = require('../../libs/bmap-wx.js');
let tools = require('../../utils/tools.js');
let utils = require('./util.js');
Page({
  data: {
    style: '',
    show: 'hide',
    mapIconSrc: '../../src/img/map.png',
    todyWeather: '', //今天天气
    futureThreeDay: [], //未来三天
    variousIndex: '' //各项指数
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let _ = this;
    tools.loading('加载中...');
    let BMap = new bmap.BMapWX({
      ak: 'g4I2oOxpdnhxmuQwYaDrrLayDqZBft78'
    });
    let fail = function(data) {
      console.log(data);
      tools.loadingEnd();
      tools.errorDialog('数据获取失败，重新加载', query);
    };
    let success = function(data) {
      //处理数据，返回自定义格式数据
      let _tody = _.dealTodayData(data.currentWeather[0]);
      let _future = _.dealFuture(data.originalData.results[0].weather_data);
      console.log(_future);

      _.setData({
        show: 'show',
        todyWeather: _._addItemData(_tody),
        futureThreeDay: _future
      });
      tools.loadingEnd();
    }
    let query = function() {
      // 发起weather请求 
      BMap.weather({
        fail: fail,
        success: success
      });
    }
    query();
  },
  dealTodayData: function(data) {
    let _date = data.date.split('(')[0];
    let _now = parseInt(data.date.split('：')[1].replace(/[\(-\)]/g, '')) + '°';
    let _result = {
      city: data.currentCity,
      pm25: data.pm25,
      date: _date,
      realtimeTemperature: _now,
      temperature: utils.dealTemperature(data.temperature),
      weather: data.weatherDesc,
      wind: data.wind
    };
    return _result;
  },
  dealFuture: function(data) {
    let _result = [];
    for (let i = 1; i < data.length; i++) {
      let _item = {
        weather: data[i].weather,
        date: data[i].date,
        img: data[i].dayPictureUrl,
        temperature: utils.dealTemperature(data[i].temperature)
      };
      _result.push(_item);
    }
    return _result;
  },
  // 返回背景颜色，并设置背景色
  _addItemData: function(item) {
    var _ = this;
    let _weather = item.weather;
    if (_weather.indexOf('雪') > 0) {
      //下雪
      return item;
    }
    if (_weather.indexOf('雨') > 0) {
      //雨天
      item.style = 'rain';
      return item;
    }
    if (_weather.indexOf('晴') > 0) {
      //晴天
      item.style = 'sunny';
      return item;
    }
    if (_weather.indexOf('云') > 0) {
      //多云
      item.style = 'cloudy';
      return item;
    }
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