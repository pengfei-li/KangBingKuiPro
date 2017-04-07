// 备忘录扩展方法
var tools = require('../../utils/tools.js');
var _key = 'kangbingkui_pro_memo';
module.exports = {
    addOne: function(title, content, callback) {
        var _ = this;
        //获取当前key的数据，没有返回空数组
        _.getData((_memo) => {
            _memo.push({
                name: title,
                date: tools.formatTime(new Date()),
                content: content,
                state: 0 //状态0：正常 1：进行中  2：过时  3：完成
            });
            _.updateData(_memo);
            tools.showToast('添加成功!');
            callback(_memo);
        });
    },
    deleteOne: function(_memo, _index) {
        _memo.splice(_index, 1);
        this.updateData(_memo);
        tools.showToast('删除成功!');
        return _memo;
    },
    updateData: function(_memo) {
        wx.setStorage({
            key: _key,
            data: _memo
        })
    },
    getData: function(callback) {
        wx.getStorage({
            key: _key,
            success: function(res) {
                callback(res.data);
            },
            fail: function(res) {
                callback([]);
            },
            complete: function(res) {
                // complete
            }
        });
    },


}
