// pages/schedule/schedule.js
let tools = require('../../utils/tools.js');
Page({
    data: {
        date: tools.formatDate(new Date()),
        start: tools.formatDate(new Date()),
        end: '',
        time: '09:00'
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log(tools.formatDate(new Date()));
        console.log(tools.formatDateAddMouth(6, new Date()));

        var _item = {
            wx_openid: 'ohhIL0eDizGxbTDJzK9BiSwYWdXw',
            title: '开会讨论小程序',
            state: 1,
            desc: '带上电脑',
            date: '2017-04-07',
            startTime: '09:00',
            endTime: '12:00'
        };
        // tools.ApiCloudPost('https://d.apicloud.com/mcm/api/schedule', _item, (res) => {
        //     console.log(res);
        // });
        let _filter = {
            "wx_openid": tools.getUserOpenId()
        };
        tools.ApiCloudGet('https://d.apicloud.com/mcm/api/schedule', _filter, (res) => {
            console.log(res);
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
