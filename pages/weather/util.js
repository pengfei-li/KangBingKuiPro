// 天气类抽离方法
module.exports = {
	dealTemperature: (t) => {
		t = t.replace('℃', '°').replace(/\s/g, '');
		let _arr = t.split('~');
		t = _arr[0] + '°/' + _arr[1];
		return t;
	},
	rainLevel: (str) => {
		var _arr = ['晴', '多云', '阴', '阵雨', '大雨', '中雨', '小雨', '暴雨', '大暴雨', '特大暴雨', '', '', '', '']
	}
}