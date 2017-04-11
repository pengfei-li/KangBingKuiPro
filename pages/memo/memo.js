// pages/memo/memo.js
var util = require('./util.js');
var tools = require('../../utils/tools.js');
Page({
    data: {
        memo: []
    },
    onLoad: function(options) {
        let _ = this;
        util.getAllData((data) => {
            _.setData({
                memo: data
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
        let _ = this;
        let _id = e.target.dataset.id;
        wx.showActionSheet({
            itemList: ['进行中', '超时', '完成', '修改', '删除'],
            success: function(res) {
                let _seetIndex = res.tapIndex;
                if (_seetIndex < 3) {
                    util.updateState(_id, _seetIndex + 1, (data) => {
                        _.updateDataNoRefresh(data);
                    });
                } else if (_seetIndex == 3) {
                    //跳转到修改页面
                    wx.navigateTo({
                        url: './modify/modify?id=' + _id
                    })
                } else if (_seetIndex == 4) {
                    //删除数据
                    util.deleteOneItem(_id, () => {
                        _.refreshData();
                    });
                }
            },
            fail: function(res) {
                // tools.errorDialog('状态修改失败，请重新尝试！');
            }
        });
    },
    addOneMemo: function(e) {
        wx.navigateTo({
            url: './add/add'
        });
    },
    updateDataNoRefresh: function(_data) {
        //无刷新改变数据，无后台请求
        let _d = this.data.memo;
        for (let i = 0; i < _d.length; i++) {
            if (_d[i].id == _data.id) {
                _d[i].state = _data.state;
            }
        }
        this.setData({
            memo: _d
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
    refreshData: function() {
        let _ = this;
        util.getAllData((data) => {
            _.setData({
                memo: data
            });
        });
    },
    onShow: function() {
        // 页面显示
        this.refreshData();
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})
