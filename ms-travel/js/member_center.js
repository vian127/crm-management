$(function(){
	// 提示信息
	m.setcss({"butbg":"#3b81c6"});
	var user_arr={"account":"","password":"","yzm":"","number":"","name":"","mail":"","address":""}
	var txt_arr=["请填写账号","请输入密码","请输入验证码","请输入正确密码","验证码错误，请重新发送","请填写手机号","请输入正确手机号","请填写姓名","请填写邮箱"];
	// 绑定页面
	$("#js_bd").click(function(){
		toLeft($(".page2"));
	});
	// 绑定会员
	$("#js_bd_now").click(function(){
		user_arr.account=$(this).siblings(".input_div").children(".input_area").eq(0).val();
		user_arr.password=$(this).siblings(".input_div").children(".input_area").eq(1).val();
		user_arr.yzm=$(this).siblings(".input_div").children(".input_area").eq(2).val();
		if(user_arr.account=="" ||user_arr.account==null || user_arr.account==undefined){
			msg(txt_arr[0],"好的");
		}else if(user_arr.password=="" ||user_arr.password==null || user_arr.password==undefined){
			msg(txt_arr[1],"好的");
		}
		else if(user_arr.yzm=="" ||user_arr.yzm==null || user_arr.yzm==undefined){
			msg(txt_arr[2],"好的");
		}else{
			// 这里后台判断验证码和密码是否正确
			// 成功后运行下面代码
			toLeft($(".page4"));
		}
		
	});
	// 注册页面
	$("#js_zc").click(function(){
		toLeft($(".page3"));
	});
	// 获取验证码
	$("#checkbut").bind("click",function(){
		checkpost($(this));
	});
	// 提交注册
	$("#js_zc_now").click(function(){
		user_arr.number=$(this).siblings(".input_div").children(".input_area").eq(0).val();
		user_arr.yzm=$(this).siblings(".input_div").children(".input_area").eq(1).val();
		if(user_arr.number=="" || user_arr.number==null || user_arr.number==undefined){
			msg(txt_arr[5],"好的");
		}else if(user_arr.number.length<11){
			msg(txt_arr[6],"好的");
		}
		else if(user_arr.yzm=="" || user_arr.yzm==null || user_arr.yzm==undefined){
			msg(txt_arr[2],"好的");
		}else{
			// 可以注册
			toLeft($(".page4"));
		}
		
	});
	// 修改手机
	$(".edit_num").click(function(){
		toLeft($(".page6"));
	});
	// 获取验证码
	$("#checkbut1").bind("click",function(){
		checkpost($(this));
	});
	// 提交修改手机
	$("#js_save_num").click(function(){
		user_arr.number=$(this).siblings(".input_div").children(".input_area").eq(0).val();
		user_arr.yzm=$(this).siblings(".input_div").children(".input_area").eq(1).val();
		if(user_arr.number=="" || user_arr.number==null || user_arr.number==undefined){
			msg(txt_arr[5],"好的");
		}else if(user_arr.number.length<11){
			msg(txt_arr[6],"好的");
		}
		else if(user_arr.yzm=="" || user_arr.yzm==null || user_arr.yzm==undefined){
			msg(txt_arr[2],"好的");
		}else{
			// 可以保存
			$(".js_number").text(user_arr.number);
			toRight($(".page6"));
		}
	});
	// 新增联系人
	$("#add_contact").click(function(){
		toLeft($(".page7"));
	});
	// 确认新增联系人
	$("#js_add_btn").click(function(){
		user_arr["name"]=$(this).siblings(".input_div1").children(".input_area1").eq(0).val();
		user_arr.number=$(this).siblings(".input_div1").children(".input_area1").eq(1).val();
		user_arr.mail=$(this).siblings(".input_div1").children(".input_area1").eq(2).val();
		user_arr.address=$(this).siblings(".input_div1").children(".input_area1").eq(3).val()?$(this).siblings(".input_div1").children(".input_area1").eq(3).val():"";
		if(user_arr["name"]=="" || user_arr["name"]==null || user_arr["name"]==undefined){
			msg(txt_arr[7],"好的");
		}else if(user_arr.number=="" ||user_arr.number==null || user_arr.number==undefined){
			msg(txt_arr[5],"好的");
		}else if(user_arr.number.length<11){
			msg(txt_arr[6],"好的");
		}else if(user_arr.mail=="" ||user_arr.mail==null || user_arr.mail==undefined){
			msg(txt_arr[8],"好的");
		}else{
			var _html='<li><span class="l_spn">姓名:</span><span class="r_spn">'+user_arr["name"]+'</span><span class="l_spn">联系电话:</span><span class="r_spn">'+user_arr.number+'</span><span class="l_spn">电子邮箱:</span><span class="r_spn">'+user_arr.mail+'</span><span class="l_spn">联系地址:</span><span class="r_spn">'+user_arr.address+'</span></li>';
			$(".contact_list").append(_html);
			toRight($(".page7"));
		}
		
	});
	// 常用联系人
	$(".contact_btn").click(function(){
		toLeft($(".page5"));
	});
	// 返回前页
	$(".back_btn").click(function(){
		toRight($(this).parent().parent());
	});
	
//发送验证码
function checkpost(obj){
		var input_txt=obj.siblings(".input_area").eq(0).val();
		if(input_txt=="" || input_txt==null || input_txt==undefined){
			msg(txt_arr[5],"好的");
		}else if(input_txt.length<11){
			msg(txt_arr[6],"好的");
		}
		else{
			var timer=null;
			var seconds=59;
			obj.unbind(("click"));
			// 发送验证码后台切入口
			obj.text("已发送(60)");
			timer=setInterval(function(){
				obj.text("已发送("+seconds+")");
				seconds--;
				if(seconds<0){
					clearInterval(timer);
					obj.text("重新发送");
					obj.bind("click",function(){
						checkpost();
					});
				}
			},1000);
		}
}
});
function toLeft(obj,func){
	obj.stop(true).animate({"left":0},200,function(){
		if(func){
			func();
		}
	});
}
function toRight(obj,func){
	obj.stop(true).animate({"left":"100%"},200,function(){
		if(func){
			func();
		}
	});
}