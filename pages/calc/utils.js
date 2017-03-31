/*计算器基本实现逻辑*/
function checkLength(str) {
	str = str.split('.')[0];
	return str.length < 7 ? true : false;
}
let tools = require('../../utils/tools.js');
module.exports = {

	dealAction: (data, str) => {
		//处理所传过来的字符，进行处理
		let _val = module.exports.dealStr(data, str);
		return _val;
	},
	dealStr: (data, str) => {
		if (data.clear) {
			data = module.exports.clearAll(data);
		}
		switch (str) {
			case 'c':
				//清除
				return module.exports.clearAll(data);
				break;
			case 'd':
				//删除最后一位
				return module.exports.deleteLastOneStr(data);
				break;
			case '+':
				//设置为加
				return module.exports.changeOperate(data, str);
				break;
			case '-':
				return module.exports.changeOperate(data, str);
				break;
			case 'x':
				return module.exports.changeOperate(data, str);
				break;
			case '÷':
				return module.exports.changeOperate(data, str);
				break;
			case '%':
				return module.exports.changeOperate(data, str);
				break;
			case '=':
				return module.exports.calculationResult(true, data);
				break;
			default:
				return module.exports.addToStr(data, str);
				break;
		}
	},
	//删除所有数
	clearAll: (data) => {
		data.expression = {
			first: '',
			operator: '',
			second: '',
			result: ''
		};
		data.clear = false;
		return data;
	},
	//删除一位数
	deleteLastOneStr: (data) => {
		let _str = data.val;
		if (_str.length > 1) {
			data.val = _str.substring(0, _str.length - 1);
		} else {
			data.val = '0';
		}
		let _flag = data.expression.operator.length;
		if (!_flag) {
			//第一个数
			data.expression.first = data.val;
		} else {
			//第二个数
			data.expression.second = data.val;
		}
		return data;
	},
	changeOperate: (data, str) => {
		//更改操作符，如果已经存在结果，则把结果赋给下次计算的第一个值，直接开始输入第二个值
		//如果连个参数都有，则计算结果
		let _result = data.expression.result;
		let _two = data.expression.second;
		//有结果
		if (_result) {
			//赋值
			data.expression.first = data.expression.result;
			//改变操作符
			data.expression.operator = str;
			//清除其他值
			data.expression.second = '';
			data.expression.result = '';
			data.val = '0';
			return data;
		} else if (_two) {
			//console.log(module.exports.calculationResult(data));
			data = module.exports.calculationResult(false, data);
			data.expression.first = data.expression.result;
			//改变操作符
			data.expression.operator = str;
			//清除其他值
			data.expression.second = '';
			data.expression.result = '';
			data.val = '0';
			return data;
		} else {
			//如果
			data.expression.operator = str;
			data.val = '0';
			return data;
		}

	},
	addToStr: (data, str) => {
		//判读当前值是否超过7位数
		if (!checkLength(data.val)) {
			tools.warnDialog('数值不能超过七位数！');
			return data;
		}
		let _flag = data.expression.operator.length;
		if (data.val == '0' || data.val == null || data.val == '') {
			data.val = str;
		} else {
			data.val += str;
		}
		if (!_flag) {
			//第一个数
			data.expression.first = data.val;
		} else {
			//第二个数
			data.expression.second = data.val;
		}
		return data;
	},
	//加
	add: (x, y) => {
		return x + y;
	},
	//减
	minus: (x, y) => {
		return x - y;
	},
	//乘
	ride: (x, y) => {
		return x * y;
	},
	//除
	divide: (x, y) => {
		if (y == 0) {
			tools.warnDialog('除数不能为0！');
			return '无效的表达式';
		} else {
			return x / y;
		}
	},
	//取余
	remainder: (x, y) => {
		if (y == 0) {
			tools.warnDialog('除数不能为0！');
			return '无效的表达式';
		} else {
			return x % y;
		}
	},
	//计算结果
	calculationResult: (flag, data) => {
		//flag为判断是否是点击等号进入计算，如果是下次输入数据前清除数据
		//如果没有运算符，直接返回当前第一个数
		//有运算符，没有第二个数，也直接返回第二个数
		let _operate = data.expression.operator;
		let _two = data.expression.second;
		if (_operate || _two) {
			let x = parseFloat(data.expression.first);
			let y = parseFloat(data.expression.second);
			data.expression.result = module.exports.dealCalculate(x, y, data.expression.operator);
		} else {
			data.expression.result = data.expression.first;
		}
		data.clear = flag;
		data.val = '0';
		return data;
	},
	//计算结果，三个参数，返回结果
	dealCalculate: (x, y, str) => {
		switch (str) {
			case '+':
				return module.exports.add(x, y);
				break;
			case '-':
				return module.exports.minus(x, y);
				break;
			case 'x':
				return module.exports.ride(x, y);
				break;
			case '÷':
				return module.exports.divide(x, y);
				break;
			case '%':
				return module.exports.remainder(x, y);
				break;
		}
	}
}