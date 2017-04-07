let config = require('./config.js');
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
                callback(res.data);
            }
        });
    },
    ApiCloudPost: (url, data, callback) => {
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
                callback(res);
            }
        });
    },
    ApiCloudGet: (url, data, callback) => {
        let filter = {
            "where": data
        };
        url = url + '?filter=' + encodeURIComponent(JSON.stringify(filter));
        // url = 'https://d.apicloud.com/mcm/api/schedule?filter=%7B%22where%22%3A%7B%22wx_openid%22%3A%22ohhIL0eDizGxbTDJzK9BiSwYWdXw%22%7D%2C%22skip%22%3A0%2C%22limit%22%3A20%7D';
        console.log(url);
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'X-APICloud-AppId': config.APICloud_AppId,
                'X-APICloud-AppKey': config.APICloud_AppKey
            },
            success: function(res) {
                callback(res);
            }
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
                callback(res.data);
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
                    if (callback) callback();
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
                    if (callback) callback();
                }
            }
        })
    },
    navTo: (name) => {
        wx.navigateTo({
            url: '../' + name + '/' + name
        });
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
        return module.exports.formatTime(date).split(' ')[0];
    },
    formatDateAddMouth: (mounth, date) => {
        let _date = module.exports.formatDate(date);
        let _d = _date.split('-');
        let _new = new Date(_d[0], _d[1] - 1 + mounth, _d[2]);
        return module.exports.formatDate(_new);
    },
    formatNumber: (n) => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
}
