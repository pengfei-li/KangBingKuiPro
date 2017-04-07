//index.js
//获取应用实例
var app = getApp();
let tools = require('../../utils/tools');
let config = require('../../utils/config')
Page({
    data: {
        userInfo: config.userInfo
    },
    //事件处理函数
    tapToWeather: () => {
        tools.navTo('weather');
    },
    tapToCalc: () => {
        tools.navTo('calc');
    },
    tapToMemo: () => {
        tools.navTo('memo');
    },
    tapTo2048: () => {
        tools.navTo('2048');
    },
    tapToQRcode: () => {
        tools.navTo('QRcode');
    },
    tapToSchedule: () => {
        tools.navTo('schedule');
    },
    tapToPoi: () => {
        tools.navTo('poi');
    },
    tapToAround: () => {
        tools.navTo('around');
    },
    clearAllMemo: () => {
        wx.removeStorage({
            key: 'kangbingkui_pro_memo',
            success: function() {
                tools.showToast('清除成功!')
            }
        });
    },
    onLoad: function() {

    }
})
