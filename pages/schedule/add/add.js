// pages/schedule/add/add.js
let tools = require('../../../utils/tools.js');
let util = require('../util.js');
let config = require('../../../utils/config');
Page({
    data: {
        date: tools.formatDate(new Date()),
        startTime: '09:00',
        endTime: '12:30',
        endStart: '09:00',
        desc: '',
        interval_date: tools.returnIntervalDate(9, new Date())
    },
    startTimeChange: function(e) {
        this.setData({
            startTime: e.detail.value,
            endTime: e.detail.value,
            endStart: e.detail.value
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
    addOneSchedule: function(e) {
        //判读标题和描述是否为空
        //为空提示不能为空，不为空提交数据，返回列表，发送模板消息
        let _ = this;
        let _title = e.detail.value.title;
        let _date = e.detail.value.date;
        let _start = e.detail.value.start;
        let _end = e.detail.value.end;
        let _desc = e.detail.value.desc;
        if (_title) {
            var _item = {
                title: _title,
                state: 0,
                desc: _desc,
                date: _date,
                startTime: _start,
                endTime: _end
            }
            util.addOneItem(_item, (data) => {
                //成功返回
                tools.back();
                //发送模板消息
                let _openId = tools.getUserOpenId();
                let _formId = e.detail.formId;
                //发送模版消息
                _.sendTemplateMsg(_openId, _formId, {
                    name: _title,
                    content: _desc,
                    date: _date + ' ' + _start + '-' + _end
                });
            });
        } else {
            tools.warnDialog('主题不能为空');
        }
    },
    formReset: function() {
        this.setDate({
            date: tools.formatDate(new Date()),
            startTime: '09:00',
            endTime: '12:30',
            desc: '',
            interval_date: tools.returnIntervalDate(9, new Date())
        });
    },
    sendTemplateMsg: function(userId, formId, data) {
        let _opts = {
            "touser": userId,
            "template_id": config.template_id.schedule,
            "form_id": formId,
            "page": 'pages/schedule/schedule',
            "data": {
                "keyword1": {
                    "value": data.name,
                    "color": "#173177"
                },
                "keyword2": {
                    "value": data.date,
                    "color": "#173177"
                },
                "keyword3": {
                    "value": data.content,
                    "color": "#173177"
                }
            }
        };
        let _url = config.WXTemplateUrl + '?access_token=' + tools.getAccessToken();
        tools.post(_url, _opts, (res) => {
            tools.showToast('添加成功');
        });
    }
})
