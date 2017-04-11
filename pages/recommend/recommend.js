// pages/recommend/recommend.js
let tools = require('../../utils/tools');
let config = require('../../utils/config');
let URL = config.RecommendURL;
Page({
    data: {},
    recommend: function(e) {
        let _ = this;
        let _name = e.detail.value.name;
        let _desc = e.detail.value.desc;
        let wx_openid = tools.getUserOpenId();
        //发送数据到云端
        //提示用户成功，发送模版消息
        if (_name) {
            var _item = {
                name: _name,
                desc: _desc,
                wx_openid: wx_openid,
                date: tools.formatDate(new Date())
            };
            tools.ApiCloudPost(URL, _item, (data) => {
                _.sendTemplateMsg(wx_openid, e.detail.formId, data);
                _.sendDevTemplateMsg(e.detail.formId, data);
            });
        } else {
            tools.warnDialog('名字不能为空');
        }
    },
    back: function() {
        tools.back();
    },
    sendTemplateMsg: function(userId, formId, data) {
        let _opts = {
            "touser": userId,
            "template_id": config.template_id.recommend,
            "form_id": formId,
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
                    "value": '我已经收到您的推荐，感谢您的使用！',
                    "color": "#173177"
                }
            }
        };
        let _url = config.WXTemplateUrl + '?access_token=' + tools.getAccessToken();
        tools.post(_url, _opts, (res) => {
            tools.showToast('推荐成功');
            tools.backDelay();
        });
    },
    sendDevTemplateMsg: function(formId, data) {
        let _opts = {
            "touser": config.developerOpenId,
            "template_id": config.template_id.recommendDev,
            "form_id": formId,
            "data": {
                "keyword1": {
                    "value": data.name,
                    "color": "#173177"
                },
                "keyword2": {
                    "value": data.desc,
                    "color": "#173177"
                },
                "keyword3": {
                    "value": data.date,
                    "color": "#173177"
                }
            }
        };
        let _url = config.WXTemplateUrl + '?access_token=' + tools.getAccessToken();
        tools.post(_url, _opts, (res) => {});
    }
})
