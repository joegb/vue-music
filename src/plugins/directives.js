import $ from "../../static/js/jquery.js";
export default function(Vue){
	// 注册一个全局自定义指令
	Vue.directive("height",{
		// 当被绑定的元素插入到DOM中时
		inserted:function(el,binding){
			if(typeof binding.value == "undefined"){
				$(el).height($(window).height()-240);
			}else{
				$(el).height(binding.value);
			}
		}
	})
}