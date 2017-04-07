// 引用百度地图微信小程序JSAPI模块 
let bmap = require('../../libs/bmap-wx.js');
let config = require('../../utils/config');
var wxMarkerData = [];
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {},
        sugData: ''
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
    onLoad: function() {
        var that = this;
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
            ak: config.baiduAK
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        };
        // 发起POI检索请求 
        BMap.search({
            "query": '',
            fail: fail,
            success: success,
            // 此处需要在相应路径放置图片文件 
            iconPath: '../../src/img/marker_red.png',
            // 此处需要在相应路径放置图片文件 
            iconTapPath: '../../src/img/marker_red.png'
        });
    },
    showSearchInfo: function(data, i) {
        var that = this;
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone
            }
        });
    },
    changeMarkerColor: function(data, i) {
        var that = this;
        var markers = [];
        for (var j = 0; j < data.length; j++) {
            if (j == i) {
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = "../../src/img/marker_yellow.png";
            } else {
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = "../../src/img/marker_red.png";
            }
            markers[j] = data[j];
        }
        that.setData({
            markers: markers
        });
    },
    // 绑定input输入 
    bindKeyInput: function(e) {
        var that = this;
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
            ak: config.baiduAK
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
                var sugData = '';
                for (var i = 0; i < data.result.length; i++) {
                    sugData = sugData + data.result[i].name + '\n';
                }
                that.setData({
                    sugData: sugData
                });
            }
            // 发起suggestion检索请求 
        BMap.suggestion({
            query: e.detail.value,
            region: '北京',
            city_limit: true,
            fail: fail,
            success: success
        });
    }
})
