module.exports = {
    loading: (str) => {
        wx.showLoading({
            title: str
        });
    },
    loadingEnd: () => {
        wx.hideLoading();
    },
    showToast: (msg, type) => {
        let _msg = msg || '成功';
        let _type = type || 'success';
        wx.showToast({
            title: _msg,
            icon: _type,
            duration: 2000
        });
    },
    errorDialog: (msg, callback) => {
        wx.showModal({
            title: '错误',
            content: msg,
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    if (callback) callback();
                }
            }
        })
    },
    warnDialog: (msg, callback) => {
        wx.showModal({
            title: '警告',
            content: msg,
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    if (callback) callback();
                }
            }
        })
    },
    navTo: (name) => {
        wx.navigateTo({
            url: '../' + name + '/' + name
        });
    },
    modalOpen: () => {
        //定义动画
        var modalOpenView = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        })
        modalOpenView.top(0).step();
        return modalOpenView.export();
    },
    modalClose: () => {
        //定义动画
        var modalOpenView = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        })
        modalOpenView.top('100%').step();
        return modalOpenView.export();
    },
    formatTime: (date) => {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return [year, month, day].map(module.exports.formatNumber).join('-') + ' ' + [hour, minute, second].map(module.exports.formatNumber).join(':')
    },
    formatNumber: (n) => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
}