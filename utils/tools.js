let config = require('./config.js');
let bmap = require('../libs/bmap-wx.js');
module.exports = {
    getUserOpenId: () => {
        try {
            var value = wx.getStorageSync('userOpenId')
            if (value) {
                return value;
            }
        } catch (e) {
            module.exports.getUserOpenId();
        }
    },
    getAccessToken: () => {
        try {
            var value = wx.getStorageSync('AccessToken')
            if (value) {
                return value;
            }
        } catch (e) {
            module.exports.getAccessToken();
        }
    },
    query: (url, data, callback) => {
        wx.request({
            url: url,
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if (typeof(callback) == "function") callback(res.data);
            }
        });
    },
    ApiGet: (url, data, callback) => {
        module.exports.loading('加载中...');
        wx.request({
            url: url,
            data: data,
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'X-APICloud-AppId': config.APICloud_AppId,
                'X-APICloud-AppKey': config.APICloud_AppKey
            },
            success: function(res) {
                module.exports.loadingEnd();
                if (typeof(callback) == "function") callback(res.data);
            }
        });
    },
    ApiPost: (url, data, callback) => {
        module.exports.loading('提交中...');
        wx.request({
            url: url,
            data: data,
            method: 'POST',
            header: {
                'content-type': 'application/json',
                'X-APICloud-AppId': config.APICloud_AppId,
                'X-APICloud-AppKey': config.APICloud_AppKey
            },
            success: function(res) {
                module.exports.loadingEnd();
                if (typeof(callback) == "function") callback(res.data);
            }
        });
    },
    ApiCloudLogin: (url, _data, callback) => {
        module.exports.ApiPost(url, _data, (data) => {
            if (typeof(callback) == "function") callback(data);
        });
        // wx.request({
        //     url: 'https://d.apicloud.com/mcm/api/user/login',
        //     data: {
        //         "username": "kangbingkui",
        //         "password": "123456"
        //     },
        //     method: 'POST',
        //     header: {
        //         'content-type': 'application/json',
        //         'X-APICloud-AppId': config.APICloud_AppId,
        //         'X-APICloud-AppKey': config.APICloud_AppKey
        //     },
        //     success: function(res) {
        //         console.log(res);
        //         wx.setStorage({
        //             key: 'sessionId',
        //             value: res.data.id
        //         })
        //     }
        // });
    },
    ApiCloudPost: (url, _data, callback) => {
        module.exports.ApiPost(url, _data, (data) => {
            if (typeof(callback) == "function") callback(data);
        });
    },
    ApiCloudGet: (url, filter, callback) => {
        url = url + '?filter=' + encodeURIComponent(JSON.stringify(filter));
        module.exports.ApiGet(url, '', (data) => {
            if (typeof(callback) == "function") callback(data);
        });
    },
    ApiCloudPut: (url, id, _data, callback) => {
        url = url + '/' + id;
        _data._method = "PUT";
        module.exports.ApiPost(url, _data, (data) => {
            if (typeof(callback) == "function") callback(data);
        });
    },
    ApiCloudDelete: (url, id, callback) => {
        url = url + '/' + id;
        let _data = {
            "_method": "DELETE"
        };
        module.exports.ApiPost(url, _data, (data) => {
            if (typeof(callback) == "function") callback(data);
        });
    },
    ApiCloudBatch: (data, callback) => {
        let url = 'https://d.apicloud.com/mcm/api/batch';
        let _data = {
            "requests": data
        };
        module.exports.ApiPost(url, _data, (data) => {
            if (typeof(callback) == "function") callback(data);
        });
    },
    ApiCloudDeleteUserAllData: (name, ids, callback) => {
        let _opts = [];
        for (let i = 0; i < ids.length; i++) {
            _opts.push({
                "method": "DELETE",
                "path": "https://d.apicloud.com/mcm/api/" + name + '/' + ids[i].id
            });
        }
        module.exports.ApiCloudBatch(_opts, (data) => {
            if (typeof(callback) == "function") callback(data);
        });
    },
    post: (url, data, callback) => {
        wx.request({
            url: url,
            data: data,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if (typeof(callback) == "function") callback(res.data);
            }
        });
    },
    loading: (str) => {
        wx.showLoading({
            title: str
        });
    },
    loadingEnd: () => {
        wx.hideLoading();
    },
    showToast: (msg, type) => {
        let _msg = msg || '成功';
        let _type = type || 'success';
        wx.showToast({
            title: _msg,
            icon: _type,
            duration: 2000
        });
    },
    errorDialog: (msg, callback) => {
        wx.showModal({
            title: '错误',
            content: msg,
            showCancel: false,
            success: function(res) {
                if (res.confirm) {
                    if (typeof(callback) == "function") callback();
                }
            }
        })
    },
    warnDialog: (msg, callback) => {
        wx.showModal({
            title: '警告',
            content: msg,
            showCancel: false,
            success: function(res) {
                if (res.confirm) {
                    if (typeof(callback) == "function") callback();
                }
            }
        })
    },
    tipDialog: (msg, callback) => {
        wx.showModal({
            title: '确认',
            content: msg,
            success: function(res) {
                if (res.confirm) {
                    if (typeof(callback) == "function") callback();
                }
            }
        })
    },
    navTo: (name) => {
        wx.navigateTo({
            url: '../' + name + '/' + name
        });
    },
    back: () => {
        wx.navigateBack()
    },
    backDelay: () => {
        setTimeout(() => {
            wx.navigateBack()
        }, 1000);
    },
    modalOpen: () => {
        //定义动画
        var modalOpenView = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        })
        modalOpenView.top(0).step();
        return modalOpenView.export();
    },
    modalClose: () => {
        //定义动画
        var modalOpenView = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        })
        modalOpenView.top('100%').opacity(0).step();
        return modalOpenView.export();
    },
    formatTime: (date) => {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return [year, month, day].map(module.exports.formatNumber).join('-') + ' ' + [hour, minute, second].map(module.exports.formatNumber).join(':')
    },
    formatDate: (date) => {
        let _date = module.exports.formatTime(date).split(' ')[0];
        return module.exports.formatToString(_date);
    },
    formatToString: (dateStr) => {
        let _date = dateStr.split('-');
        return _date[0] + '年' + _date[1] + '月' + _date[2] + '日';
    },
    formatDateAddMouth: (mounth, date) => {
        let _date = module.exports.formatTime(date).split(' ')[0];
        let _d = _date.split('-');
        let _new = new Date(_d[0], _d[1] - 1 + mounth, _d[2]);
        return module.exports.formatDate(_new);
    },
    returnIntervalDate: (length, date) => {
        let _start = module.exports.formatTime(date).split(' ')[0];
        let _d = _start.split('-');
        let _temp = new Date(_d[0], _d[1] - 1 + length, _d[2]);
        let _end = module.exports.formatTime(_temp).split(' ')[0]
        let _result = {
            start: _start,
            end: _end
        };
        return _result;
    },
    formatNumber: (n) => {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    bMapSearch: (str, callback) => {
        module.exports.loading('查询中...');
        var BMap = new bmap.BMapWX({
            ak: config.baiduAK
        });
        var fail = function(data) {
            module.exports.errorDialog('查询出错，请重试！');
            module.exports.loadingEnd();
        };
        var success = function(data) {
            callback(data.wxMarkerData);
            module.exports.loadingEnd();
        };
        // 发起POI检索请求 
        BMap.search({
            query: str,
            fail: fail,
            success: success,
            // 此处需要在相应路径放置图片文件 
            iconPath: config.mapIconRed,
            // 此处需要在相应路径放置图片文件 
            iconTapPath: config.mapIconRed
        });
    },
    bMapChangeIcon: (data, i) => {
        var markers = [];
        for (var j = 0; j < data.length; j++) {
            if (j == i) {
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = config.mapIconBlue;
            } else {
                // 此处需要在相应路径放置图片文件 
                data[j].iconPath = config.mapIconRed;
            }
            markers[j] = data[j];
        }
        return markers;
    },
    getSysInfo: () => {
        try {
            var res = wx.getSystemInfoSync()
            return res;
        } catch (e) {
            //重试
            module.exports.getSysInfo();
        }
    }
}
