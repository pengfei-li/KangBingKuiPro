let SHA1 = require('./SHA1.js');
var now = Date.now();
module.exports = {
    userInfo: {
        avatar: '../../src/img/menu-img.jpg',
        name: "康兵奎",
        post: "前端开发工程师",
        desc: "专注于前端的专职工程师，专注发现和学习前端最新的知识和框架，不断提升自己，扩充自己的知识储备！"
    },
    baiduAK: 'g4I2oOxpdnhxmuQwYaDrrLayDqZBft78',
    mapIconRed: '../../src/icon/red_map.png',
    mapIconBlue: '../../src/icon/blue_map.png',
    AppId: 'wx943aa5702a72d768',
    AppSecret: '68a8e2e3e8524014a14abef2ab6d3cac',
    APICloud_AppId: 'A6945218878477',
    APICloud_AppKey: SHA1("A6945218878477" + "UZ" + "A03294DF-3261-840D-3251-B5388E28D63C" + "UZ" + now) + "." + now
}
