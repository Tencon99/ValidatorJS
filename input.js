$(function() {
	
	'use strict';
	
	// 代表页面某个input，所以传入参数为选择器，即可以判定具体Input
	window.Input = function(selector) {
		var $ele
		  , $error_ele
		  ,	me = this
		  , rule = {
			  required: true
		  };//rule默认为空对象
		
		this.load_validator = function() {
			var val = this.get_val();
			this.validator = new Validator(val, rule);
		}
		
		// 外部得到Input的值
		this.get_val = function() {
			return $ele.val();
		}
		
		// 初始化
		function init() {
			find_ele();
			get_error_ele();
			parse_rule();//解析规则
			me.load_validator();//调用Input.load_validator()方法
			listen();//监听用户输入时检测
		}
		
		// 监听用户输入时检测
		function listen() {
			$ele.on('blur',function() {
				var valid = me.validator.is_valid(me.get_val());
				console.log('valid:', valid);
				if(valid)
					$error_ele.hide(10);
				else
					$error_ele.show(10);
			})
		}
		
		//获取 #xxx-input-error的id选择器
		function get_error_selector() {
			return '#' + $ele.attr('name') + '-input-error';
		}
		
		// 专门用于显示错误的
		function get_error_ele() {
			$error_ele = $(get_error_selector());
		}
		
		function find_ele() {
			// 如果它是jquery的后代（孩子）说明已经选好,就不要重新再选，否则选择一次
			if(selector instanceof jQuery) {
				$ele = selector;
			} else {
				$ele = $(selector);
			}
		}
		
		// 解析规则
		function parse_rule() {
			var i;
			//获取选择器中里边的data-rule属性，data(xxx)方法可以直接获取data-xxx的属性内容（对象）
			var rule_str = $ele.data('rule');
			// 如果某个input没有data-rule属性的话，直接跳过它。
			if(!rule_str) return;
			
			// 用split（‘|’）分割字符串转为数组
			var rule_arr = rule_str.split('|');
			/*	rule_arr
				[
					'min:18',
					'maxlength:10',
					...
				]
			*/
		   // 要把该数组转化为对象，用迭代来转化
		   for (i = 0; i < rule_arr.length; i++) {
			   var item_str = rule_arr[i];
			   //此时的item_str为单条的 'min:18'
			   // console.log(item_str);
			   // 所以可以再次分割 用： 分隔出 min 18
			   var item_arr = item_str.split(':');
			   /*	item_arr
					[
						'min',
						'18'
					]
			   */
			  rule[item_arr[0]] = JSON.parse(item_arr [1]);//JSON.parse()不管传输何止，都转化为字符串也就是转化为json语法
			  // console.log(rule);
			  // rule['min'] = '18';
			  /* 打印出来的rule
				{
					min:18
				}
				 成功把rule中的规则转化为对象，并获取它
			  */
		   }
		}
		
		init();
	}
})