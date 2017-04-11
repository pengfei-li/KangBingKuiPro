//app.js
let config = require('./utils/config');
let tools = require('./utils/tools.js');
let SHA1 = require('./utils/SHA1.js');
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        wx.login({
            success: function(res) {
                if (res.code) {
                    //发起网络请求
                    let _opts = {
                        appid: config.AppId,
                        secret: config.AppSecret,
                        js_code: res.code,
                        grant_type: 'authorization_code'
                    };
                    let _url = 'https://api.weixin.qq.com/sns/jscode2session';
                    tools.query(_url, _opts, (res) => {
                        //保存openid
                        wx.setStorage({
                            key: 'userOpenId',
                            data: res.openid
                        });
                    });

                    var _ops = {
                        grant_type: 'client_credential',
                        appid: config.AppId,
                        secret: config.AppSecret
                    };
                    tools.query('https://api.weixin.qq.com/cgi-bin/token', _ops, (data) => {
                        wx.setStorage({
                            key: 'AccessToken',
                            data: data.access_token
                        });
                    });
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    }
})
