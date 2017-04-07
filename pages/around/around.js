// pages/around/around.js
let bmap = require('../../libs/bmap-wx.js');
let config = require('../../utils/config');
let tools = require('../../utils/tools')
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {},
        sugData: [],
        mapStyle: ''
    },
    makertap: function(e) {
        let _ = this;
        tools.warnDialog(e.markerId + '');
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        // 获取当前地址
        let _ = this;
        _.getSysInfo();
        var BMap = new bmap.BMapWX({
            ak: config.baiduAK
        });
        let success = function(data) {
            console.log(data);
            let wxMarkerData = data.wxMarkerData;
            _.setData({
                markers: wxMarkerData
            });
            _.setData({
                latitude: wxMarkerData[0].latitude
            });
            _.setData({
                longitude: wxMarkerData[0].longitude
            });
        };
        BMap.search({
            query: '',
            fail: function() {},
            success: success,
            // 此处需要在相应路径放置图片文件 
            iconPath: config.mapIconRed,
            // 此处需要在相应路径放置图片文件 
            iconTapPath: config.mapIconRed
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
            //console.log(data.result);
            that.setData({
                sugData: data.result
            });
        };
        console.log(e);
        // 发起suggestion检索请求 
        BMap.suggestion({
            query: e.detail.value,
            region: '北京',
            city_limit: true,
            fail: fail,
            success: success
        });
    },
    controlTap: function(e) {
        console.log('in');
    },
    getSysInfo: function() {
        try {
            var res = wx.getSystemInfoSync()
            this.setData({
                mapStyle: 'height:' + (res.windowHeight - 400) + 'px;'
            });
        } catch (e) {
            //重试
            this.getSysInfo();
        }
    }
})
