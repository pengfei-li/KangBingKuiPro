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
    navigation: function(e) {
        wx.openLocation({
            latitude: e.target.dataset.latitude,
            longitude: e.target.dataset.longitude,
            name: e.target.dataset.name,
            address: e.target.dataset.address
        });
    },
    call: function(e) {
        let _phoneNum = e.target.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: _phoneNum //仅为示例，并非真实的电话号码
        })
    },
    selectLocation: function(e) {
        //选中地图上的点，设置滚动的显示为当前坐标的信息
        var _ = this;
        var id = e.markerId;
        _.setData({
            swiperIndex: id,
            markers: tools.bMapChangeIcon(_.data.markers, id),
            latitude: _.data.markers[id].latitude,
            longitude: _.data.markers[id].longitude
        });
    },
    selectChange: function(e) {
        //滑动改变选项，改变地图中的标注
        let _ = this;
        let _index = e.detail.current;
        _.setData({
            markers: tools.bMapChangeIcon(_.data.markers, _index),
            latitude: _.data.markers[_index].latitude,
            longitude: _.data.markers[_index].longitude
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
        let _heigt = tools.getSysInfo().windowHeight - 350;
        _.setData({
            resultHeight: _heigt
        });
    },
    hotSearch: function(e) {
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
            _.setData({
                markers: tools.bMapChangeIcon(data, 0)
            });
            if (data.length > 0) {
                _.setData({
                    latitude: data[0].latitude
                });
                _.setData({
                    longitude: data[0].longitude
                });
            }
        });
    }
})
