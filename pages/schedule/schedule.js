// pages/schedule/schedule.js
let tools = require('../../utils/tools.js');
let util = require('./util');
Page({
    data: {
        schedule: [],
        popupAnimate: {}
    },
    operateItem: function(e) {
        let _ = this;
        let _id = e.currentTarget.dataset.id;
        //状态0：正常 1：进行中  2：过时  3：完成
        //长按底部谈出操作菜单
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
    addOneSchedule: function() {
        wx.navigateTo({
            url: './add/add'
        })
    },
    updateDataNoRefresh: function(_data) {
        //无刷新改变数据，无后台请求
        let _d = this.data.schedule;
        for (let i = 0; i < _d.length; i++) {
            if (_d[i].id == _data.id) {
                _d[i].state = _data.state;
            }
        }
        this.setData({
            schedule: _d
        });
    },
    refreshData: function() {
        let _ = this;
        util.getAllData((data) => {
            _.setData({
                schedule: data
            });
        });
    },
    onShow: function() {
        // 页面显示，加载数据显示
        this.refreshData();
    }
})