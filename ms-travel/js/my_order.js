//调整布局
$(function(){rs();});
	$(window).resize(function(){rs();});
var rs=function(){
	var dw=document.documentElement.clientWidth;
	var dh=document.documentElement.clientHeight;
	$("body").css({"font-size":1*dw/360+"em"});
	
	
}
$(function(){

	// 查看签证类型列表
	$(".js_btn1").click(function(){
		toLeft($(".page2"));
	});
	// 返回首页
	$(".back_btn").click(function(){
		toRight($(this).parent().parent());
	});

});
function toLeft(obj){
	obj.stop(true).animate({"left":0},200);
}
function toRight(obj){
	obj.stop(true).animate({"left":"100%"},200);
}