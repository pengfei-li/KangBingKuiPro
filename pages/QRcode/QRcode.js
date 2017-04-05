// pages/QRcode/QRcode.js
let QR = require('./qrcode-lib.js');
let tools = require('../../utils/tools.js');
Page({
    data: {
        maskHidden: true,
        imagePath: '',
        placeholder: '请输入网址...', //'请输入文字...'
        qrtype: ['网站', '文字'],
        qrtypeIndex: 0
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        let size = this.setCanvasSize(); //动态设置画布大小
        let default_char = '康兵奎Pro';
        this.createQrCode(default_char, 'kbk_pro_qrcode', size.w, size.h);
    },
    bindPickerChange: function(e) {
        let _val = e.detail.value;
        let _str = '请输入网址...';
        if (_val == 1)
            _str = '请输入文字...';
        this.setData({
            qrtypeIndex: _val,
            placeholder: _str
        })
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
    //适配不同屏幕大小的canvas
    setCanvasSize: function() {
        var size = {};
        try {
            var res = wx.getSystemInfoSync();
            var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽
            var width = res.windowWidth / scale;
            var height = width; //canvas画布为正方形
            size.w = width;
            size.h = height;
        } catch (e) {
            // Do something when catch error
            console.log("获取设备信息失败" + e);
        }
        return size;
    },
    createQrCode: function(url, canvasId, cavW, cavH) {
        //调用插件中的draw方法，绘制二维码图片
        QR.qrApi.draw(url, canvasId, cavW, cavH);
        let _ = this;
        //二维码生成之后调用canvasToTempImage();延迟1s，否则获取图片路径为空
        var st = setTimeout(function() {
            _.canvasToTempImage();
            clearTimeout(st);
        }, 1000);

    },
    //获取临时缓存照片路径，存入data中
    canvasToTempImage: function() {
        let _ = this;
        wx.canvasToTempFilePath({
            canvasId: 'kbk_pro_qrcode',
            success: function(res) {
                var tempFilePath = res.tempFilePath;
                _.setData({
                    imagePath: tempFilePath,
                });
            },
            fail: function(res) {
                console.log(res);
            }
        });
    },
    //点击图片进行预览，长按保存分享图片
    previewImg: function(e) {
        var img = this.data.imagePath
        wx.getImageInfo({
            src: img,
            success: function(res) {
                console.log(res.width)
                console.log(res.height)
            }
        })
        wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls: [img] // 需要预览的图片http链接列表
        })
    },
    formSubmit: function(e) {
        let _type = e.detail.value.type,
            _val = e.detail.value.value,
            _ = this;
        //判空
        if (_val == '') {
            tools.warnDialog('生成内容不能为空！');
            return false;
        }
        if (_type == 0) {
            _val = 'http://' + _val;
        }
        _.setData({
            maskHidden: false
        });
        tools.showToast('生成中...', 'loading');
        let st = setTimeout(() => {
            wx.hideToast()
            let size = _.setCanvasSize();
            //绘制二维码
            _.createQrCode(_val, 'kbk_pro_qrcode', size.w, size.h);
            _.setData({
                maskHidden: true
            });
            clearTimeout(st);
        }, 2000)

    }
})
