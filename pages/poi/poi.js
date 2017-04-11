// 引用百度地图微信小程序JSAPI模块 
let bmap = require('../../libs/bmap-wx.js');
let config = require('../../utils/config');
let tools = require('../../utils/tools');
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        isShow: false,
        resultHeight: 0,
        swiperIndex: 0,
        uiSearchTipDefaultData: ['酒店', '美食', '银行', '超市', 'KTV', '医院']
    },
    onLoad: function() {
        var _ = this
        _.setResultHeight();
    },
    onShow: function() {
        let _ = this;
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                _.setData({
                    latitude: res.latitude
                });
                _.setData({
                    longitude: res.longitude
                });
            }
        });
    },
    selectLocation: function(e) {
        //选中地图上的点，设置滚动的显示为当前坐标的信息
        var _ = this;
        var id = e.markerId;
        _.setData({
            swiperIndex: id,
            markers: tools.bMapChangeIcon(_.data.markers, id)
        });
    },
    selectChange: function(e) {
        //滑动改变选项，改变地图中的标注
        let _ = this;
        let _index = e.detail.current;
        _.setData({
            markers: tools.bMapChangeIcon(_.data.markers, _index)
        });
    },
    searchFocus: function() {
        this.setData({
            isShow: true
        });
    },
    cancleSearch: function() {
        this.setData({
            isShow: false
        });
    },
    setResultHeight: function() {
        let _ = this;
        let _heigt = tools.getSysInfo().windowHeight - 356;
        console.log(_heigt);
        console.log(tools.getSysInfo().windowHeight);
        _.setData({
            resultHeight: _heigt
        });
    },
    hotSearch: function(e) {
        console.log(e);
        let _val = e.currentTarget.dataset.key;
        this.__search(_val);
    },
    searchInfo: function(e) {
        let _val = e.detail.value;
        this.__search(_val);
    },
    __search: function(str) {
        var _ = this
        tools.bMapSearch(str, (data) => {
            _.cancleSearch();
            console.log(data);
            _.setData({
                markers: data
            });
            _.setData({
                latitude: data[0].latitude
            });
            _.setData({
                longitude: data[0].longitude
            });
        });

    }
})