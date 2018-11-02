module.exports = {
	/**
	 * 获取url参数
	 * @param name  参数名 
	 * by wuyi
	 **/
	GetQueryString: function(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let r = window.location.search.substr(1).match(reg);
		if (r != null)
			return decodeURIComponent(r[2]);
		return null;
	},
	/**
	 *  心跳方法
	 *  @param waitSecond秒数   fn：每次的执行方法    backFn  退出时的方法
	 *  
	 */
	setInterval: function(waitSecond, fn, backFn) {
		let wait = waitSecond;

		//设置秒数(单位秒) 
		let i = 0,
			ind = '',
			timer = function() {
				let r = wait - i;
				if (r == 0) {
					clearInterval(ind);
					backFn && backFn();
				} else {
					fn && fn(r);
					i++;
				}
			}

		ind = setInterval(timer, 1000);
	},

	/**
	 *获取URL参数
	 */
	getURLParam: function() {
		let search = location.search,
			reg = /[^\&]+=[^\&]+/g;

		if (!search) return {};

		//解析出锚点参数
		search = search.slice(1);

		let arr, arrs, result = {};
		while (arr = reg.exec(search)) {
			if (arrs = arr[0].match(/[^\=]+/g)) {
				result[arrs[0]] = arrs[1];
			}
		}
		return result;
	},
	getParam: function() {
		let search = location.search,
			reg = /[^\&]+=[^\&]+/g,
			arr, arrs, result = {};
		if (this.isAndriod() || this.isPhone()) {
			return plus.webview.currentWebview();
		} else {
			if (!search) return {};
			//解析出锚点参数
			search = search.slice(1);
			while (arr = reg.exec(search)) {
				if (arrs = arr[0].match(/[^\=]+/g)) {
					result[arrs[0]] = arrs[1];
				}
			}
			return result;
		}
	},

	/**
	 * 给URL增加参数
	 */
	addURLParam: function(url, param) {
		let p = param || {},
			noP = url.indexOf('?') === -1,
			tpl = '&{0}={1}',
			params = '';
		$.each(param, function(k, v) {
			params += tpl.format(k, v);
		})

		noP && (params = params.replace('&', '?'));

		return url + params;
	},

	//当后台数据库返回为0或者是null的时候将其当做字符串"0"处理
	zeroDisplay: function(Param) {
		for (let key in Param) {
			if (Param[key] == 0 || Param[key] == undefined || Param[key] == null || Param[key] == 0.00) {
				Param[key] = "0";
			}
		}
	},
	//判断是不是JSON
	//	isJSON: function(obj) {
	//		let isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
	//		return isjson;
	//	},
	//对象数组去重
	removalObj: function(tmp, prop) {
		let result = [],
			hash = {};
		for (let i = 0; i < tmp.length; i++) {
			let elem = tmp[i][prop] ? tmp[i][prop] : tmp[i];
			if (!hash[elem]) {
				result.push(tmp[i]);
				hash[elem] = true;
			}
		}

		return result;
	},
	//去除所有空格，包括中间
	trimAll: function(str) {
		if (typeof str != "string") {
			alert("类型不正确，请重新输入！");
			return;
		}
		let result;
		str = $.trim(str);
		result = str.replace(/\s*/g, function(item) {
			return "";
		})
		return result;
	},
	unique: function(arr) {
		let res = [];
		let json = {};
		for (let i = 0; i < arr.length; i++) {
			if (!json[arr[i]]) {
				res.push(arr[i]);
				json[arr[i]] = 1;
			}
		}
		return res;
	}

}
