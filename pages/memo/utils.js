// 备忘录扩展方法
var tools = require('../../utils/tools.js');
var _key = 'kangbingkui_pro_memo';
module.exports = {
    addOne: function (title,content,callback) {
        var _ = this;
        //获取当前key的数据，没有返回空数组
        _.getData((_memo) => {
            _memo.push({
                name: title,
                date: tools.formatTime(new Date()),
                content: content,
                state: 0//状态0：正常 1：进行中  2：过时
            });
            _.updateData(_memo);
            tools.showToast();
            callback(_memo);
        });
    },
    deleteOne: function () { },
    updateData: function (_memo) {
        wx.setStorage({
            key: _key,
            data: _memo
        })
    },
    getData: function (callback) {
        wx.getStorage({
            key: _key,
            success: function (res) {
                callback(res.data);
            },
            fail: function (res) {
                callback([]);
            },
            complete: function (res) {
                // complete
            }
        });
    },


}