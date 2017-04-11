// pages/memo/add/add.js
let tools = require('../../../utils/tools');
let util = require('../util.js');
Page({
    data: {},
    addOneMemo: function(e) {
        let _ = this;
        let _title = e.detail.value.title;
        let _content = e.detail.value.content;
        if (_title) {
            var _item = {
                title: _title,
                state: 0,
                content: _content,
                date: tools.formatDate(new Date())
            }
            util.addOneItem(_item, (data) => {
                //成功返回
                tools.back();
                tools.showToast('添加成功');
            });
        } else {
            tools.warnDialog('备忘名不能为空');
        }
    },
    back: function() {
        tools.back();
    }
})
