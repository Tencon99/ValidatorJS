// 用于验证的JS
$(function() {
	
	'use strict';
	
	// validator验证器 val用户输入的值 rule验证的规则（rule传进来是一个对象）
	window.Validator = function(val, rule) {
		
		// 总验证，用于解析规则 this指的是生成的对象
		this.is_valid = function(new_val) {
			var key;
			if (new_val !== undefined)
				val = new_val;//当用户输入新的值，那么val变为最新的值，否则不变
			
			// 如果不是必填项且用户未填写任何内容则直接判定为合法
			if(!rule.required && val)
			return true;
			
			
		// 首先迭代rule
		/*
			{
				( key )max: 10,
				( key )min: 2
			}
		*/
			for(key in rule) {
				// 防止重复检查
				if(key === 'required')
				continue;//不继续执行,迭代下一条
				
				// 调用rule中相对应的方法
				var r = this['validate_' + key]();
			 // this.validate_max();	key是动态的
			 if(!r) return false;
			}
			return true;
		}
		// 单个规则的验证
		this.validate_max = function() {
			pre_max_min();
			return val <= rule.max;
		}
		
		this.validate_min = function() {
			pre_max_min();
			return val >= rule.min;
		}
		
		this.validate_maxlength = function() {
			pre_length();
			return val.length <= rule.maxlength;
		}
		
		this.validate_minlength = function() {
			pre_length();
			return val.length >= rule.minlength;
		}
		
		// 用于完成this.validate_max或this.validate_max的前置工作
		function pre_max_min() {
			val = parseFloat(val);
		}
		
		// 用于完成this.validate_maxlength或this.validate_minlength的前置工作
		function pre_length() {
			val = val.toString(); //如果不是字符串，先转化为字符串
		}
		
		// 验证输入值是否为数字
		this.validate_numeric = function() {
			return $.isNumeric(val);
		}
		
		this.validate_required = function() {
			var real = $.trim(val);// 真实输入的值，除去空格
			if(!real && real !== 0)
				return false;
			return true;
		}
		
		// 用正则表达式来验证一些模式
		this.validate_pattern = function() {
			//RegExp(rul.pattern)把为字符串的正则表达语句转化为 正则表达式
			var reg = new RegExp(rule.pattern);//reg此时为正则对象
			return reg.test(val);//测试用户输入的值是否匹配的结果
		}
	}
})