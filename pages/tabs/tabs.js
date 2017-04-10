// pages/tabs/tabs.js
Page({
    data: {},
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
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
    },
    searchFocus: function() {
        console.log('in');

        var searchOpen = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1000,
            timingFunction: "ease",
            delay: 0
        })
        searchOpen.width('0').step();
        // return modalOpenView.export();
        this.setData({
            searchOpen: searchOpen.export()
        });
        // searchOpen.opacity(0).step()
        // this.setData({
        //     searchOpen: searchOpen.export()
        // })

        var panel = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1000,
            timingFunction: "ease",
            delay: 0
        })
        panel.width('100%').step();
        this.setData({
            searchPanelShow: panel.export()
        });
    }
})
