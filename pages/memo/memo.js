// pages/memo/memo.js
var utils = require('./utils.js');
var tools = require('../../utils/tools.js');
Page({
    data: {
        memo: [],
        modalAnimate: {},
        detailAnimate: {},
        detalItem: {},
        detailStyle: ''
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        let _ = this;
        utils.getData((_memo) => {
            _.setData({
                memo: _memo
            });
        });
    },
    updateMemoData: function(_memo) {
        this.setData({
            memo: _memo
        });
        //更新localStorage
        utils.updateData(_memo);
    },
    setState: function(e) {
        let _ = this,
            index = e.target.dataset.index;
        let _memo = _.data.memo;
        wx.showActionSheet({
            itemList: ['进行中', '超时', '完成', '删除'],
            success: function(res) {
                let _seetIndex = res.tapIndex;
                if (_seetIndex == 3) {
                    //删除当前选中的数据
                    _memo = utils.deleteOne(_memo, index);
                    _.updateMemoData(_memo);
                } else if (_seetIndex != 4 && _seetIndex != undefined) {
                    _memo[index].state = res.tapIndex + 1;
                    _.updateMemoData(_memo);
                }
            },
            fail: function(res) {
                // tools.errorDialog('状态修改失败，请重新尝试！');
            }
        });
    },
    openAddModal: function() {
        this.setData({
            modalAnimate: tools.modalOpen()
        });
    },
    closeAddModal: function() {
        this.setData({
            modalAnimate: tools.modalClose()
        });
    },
    addOneMemo: function(e) {
        let _ = this;
        let _title = e.detail.value.title.trim();
        let _content = e.detail.value.content.trim();
        if (!_title || !_content) {
            tools.warnDialog('备忘名和内容不能为空！');
            return false;
        }
        //清空输入框和文本域
        //
        _.closeAddModal();
        utils.addOne(_title, _content, (data) => {
            _.updateMemoData(data);
            console.log(e);
            let _openId = tools.getUserOpenId();
            let _formId = e.detail.formId;
            //发送模版消息
            _.sendTemplateMsg(_openId, _formId, {
                name: _title,
                content: _content,
                date: tools.formatTime(new Date())
            });
        });

    },
    sendTemplateMsg: function(userId, formId, data) {
        console.log('access_token', tools.getAccessToken());
        let _opts = {
            "touser": userId,
            "template_id": "eKpMYdRrVjjhiSGkHlMp18JV3c7AFzvMFZY0b2iZD28",
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
                    "value": data.content,
                    "color": "#173177"
                }
            }
        };
        console.log('传递数据', _opts);
        let _url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + tools.getAccessToken();
        tools.post(_url, _opts, (res) => {
            console.log(res);
        });
    },
    /*showDetail: function(e) {
        let _index = e.currentTarget.dataset.index;
        let _item = this.data.memo[_index];
        let _s = '';
        switch (_item.state) {
            case 1:
                _s = 'realtime';
                break;
            case 2:
                _s = 'outtime';
                break;
            case 3:
                _s = 'success';
                break;
            default:
                _s = '';
                break;
        }
        console.log(_item);
        this.setData({
            detalItem: _item,
            detailStyle: _s
        });
        //定义动画
        var modalOpenView = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        })
        modalOpenView.top(0).step();

        this.setData({
            detailAnimate: modalOpenView.export()
        });
    },
    closeDetail: function() {
        console.log('in');
        //定义动画
        var modalOpenView = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        })
        modalOpenView.top('100%').step();

        this.setData({
            detailAnimate: modalOpenView.export()
        });
    },*/
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
