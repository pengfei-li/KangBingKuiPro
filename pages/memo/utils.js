// 备忘录扩展方法
var tools = require('../../utils/tools.js');
var _key = 'kangbingkui_pro_memo';
module.exports = {
    addOne: function () {
        //获取当前key的数据，没有返回空数组
        var _memo = this.getData();
        _memo.push({
            name: '超时的备忘录',
            date: '2017-04-01',
            content: '这条信息已经超时，右上角可以修改状态。',
            state: 2//状态0：正常 1：进行中  2：过时
        });
        wx.setStorage({
            key: _key,
            data: "value"
        })
    },
    deleteOne: function () { },
    updateData: function () { },
    getData: function () {
        wx.getStorage({
            key: _key,
            success: function (res) {
                console.log(res.data)
            }, fail: function () {
                console.log('error');
                return [];
            }
        })
    },


}