// pages/memo/modify/modify.js
let tools = require('../../../utils/tools');
let util = require('../util.js');
Page({
    data: {
        memoItem: {}
    },
    modifyOneMemo: function(e) {
        let _id = this.data.memoItem.id;
        let title = e.detail.value.title;
        if (title) {
            var _item = {
                title: title,
                content: e.detail.value.content,
                date: tools.formatDate(new Date())
            };
            util.updateItem(_id, _item, (data) => {
                tools.back();
            });
        } else {
            tools.warnDialog('备忘名不能为空');
        }
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        let _id = options.id;
        let _ = this;
        //查询数据
        util.getOneItem(_id, (data) => {
            //设置data
            _.setData({
                memoItem: data[0]
            });
        });


    },
    back: function() {
        tools.back();
    }
})
