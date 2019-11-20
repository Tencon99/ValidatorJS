$(function() {
	
	'use strict';
	
// 1 选中页面中所有的input[data-rule]属性
	var $inputs = $('[data-rule]')
	  ,	$form = $('#signup')
	  ,	inputs = []; 
	  
	// jQuery里的迭代方法
	$inputs.each(function(index, node) {
		// console.log('index:', index);
		// console.log('node', node);
		// 2 解析每一个input的验证规则
		var tmp = new Input(node);
		inputs.push(tmp);
	})
	// console.log('inputs:', inputs);
	
	$form.on('submit',function(e) {
		e.preventDefault();//取消默认行为
		
		
		for(var i = 0 ;i < inputs.length;i++) {
			var item = inputs[i];
			$inputs.trigger('blur');
			var r = item.validator.is_valid();
			if(!r) {
				alert('invalid!');
				return;
			}
		}
		// signup();
		alert('注册成功');
	})
	
	function signup() {
		// window.location.href='success.html';
		// $.post('/api/signup',{...});
	}
})