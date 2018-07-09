//调整布局
$(function(){rs();});
$(window).resize(function(){rs();});
var rs=function(){
	var dw=document.documentElement.clientWidth;
	var dh=document.documentElement.clientHeight;
	$("body").css({"font-size":1*dw/360+"em"});
	var ratio=100;
	if(dh/dw*720<1136){
		ratio=dh/dw*720/1136*100;
	}
	$(".bg_div").height(118*dw/72+"px");
};
// 主体
$(function(){
	// 验证表单
	toTest("user_info","#000","#666");
});
function toTest(input_class,txt_color,default_color){
	$("."+input_class).bind("focus",function(){
		$(this).css({"color":txt_color});
		if($(this).val()==this.defaultValue){
			$(this).val("");
		}
	}).bind("blur",function(){
		var txt=$(this).val();
		if(txt=="" || txt==null){
			$(this).val(this.defaultValue);
			this.style.color=default_color;
		}
	});
	$("."+input_class).eq(0).bind("input propertychange",function(){
		var txt=$(this).val();
		var regx=/\D/g;
		$(this).val(txt.replace(regx,''));
	});
	// 获取验证码
	$("#checkbut").bind("click",function(){
		checkpost();
	});
	// 默认值
	var txt_arr=["手机号码","验证码"];
	// 提示语
	var attention_txt=["请填写手机号","请填写验证码"];
	function checkpost(){
		var input_txt=[];
		var regPartton=/1[1-9]+[0-9]{9}/;
		$("."+input_class).each(function(){

			input_txt.push($(this).val());
			return input_txt;
		});
		if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]==txt_arr[0]){
			alert(attention_txt[0]);
		}
		else if(input_txt[0].length<11 || !regPartton.test(input_txt[0])){
			alert("请输入正确的手机号");
		}
		else{
			var timer=null;
			var seconds=59;
			$("#checkbut").unbind(("touchstart click"));
			// 发送验证码后台切入口

			$("#checkbut").text("已发送(60)");
			timer=setInterval(function(){
				$("#checkbut").text("已发送("+seconds+")");
				seconds--;
				if(seconds<0){
					clearInterval(timer);
					$("#checkbut").text("获取验证码(60)");
					$("#checkbut").bind("touchstart click",function(){
						checkpost();
					});
				}
			},1000);
		}
	}
	// 提交
	$("#submit_form").bind("click",function(){
		var _this=$(this);
		var input_txt=[];
		var select_txt=[];
		var regx=/1[1-9]+[0-9]{9}/;
		$("."+input_class).each(function(){

			input_txt.push($(this).val());
			return input_txt;
		});
		$(".select").each(function(){

			select_txt.push($(this).val());
			return select_txt;

		});
		if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]==txt_arr[0]){
			alert(attention_txt[0]);
		}
		else if(input_txt[0].length<11 || !regx.test(input_txt[0])){
			alert("请填写正确手机号");
		}
		else if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]==txt_arr[1]){
			alert(attention_txt[1]);
		}
		else{
			// 提交放这里
			_this.removeClass("form_btn").val("提交中...");
			location.replace("index.html");
		}
	});
}