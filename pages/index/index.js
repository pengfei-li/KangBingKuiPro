//index.js
//获取应用实例
var app = getApp();
let tools = require('../../utils/tools');
let config = require('../../utils/config');
Page({
    data: {
        userInfo: config.userInfo
    },
    //事件处理函数
    tapToGitHub: () => {
        tools.navTo('github');
    },
    tapToResume: () => {
        tools.navTo('resume');
    },
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
    tapToContentManage: () => {
        tools.navTo('managecon');
    },
    tapToRecommend: () => {
        tools.navTo('recommend');
    }
})