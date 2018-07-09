
// 表单验证
	var user_arr={"account":"","password":"","yzm":"","number":"","name":"","mail":"","address":"","date":"","num":"","price":""}
	var txt_arr=["请填写账号","请输入密码","请输入验证码","请输入正确密码","验证码错误，请重新发送","请填写手机号","请输入正确手机号","请填写姓名","请填写邮箱","请选择联系人","请选择出行日期","请选择人数"];
	//给我一个今天的日期,我不能取本地时间，需要给我一个服务器时间，2015-6-14或2015-06-14或2015/6/14或2015/06/14这几种都可以,我会格式化
	// 日期数据
	var date_arr=[{"date":"2015/8/24","price":"485"},{"date":"2015/8/28","price":"84"},{"date":"2015/8/30","price":"555"}];
	// 一般日期时间的价格
	var normal_price=555;
$(function(){
	// 滑动
	var swiper=null;
	swiper= new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
	    paginationClickable: true,
	    paginationHide : true,
	    onSlideChangeStart: function(swiper){
	    	var num=swiper.activeIndex==4?0:(swiper.activeIndex-1);
      		toTab(num);
    	}     
	});
	// 提示信息
	m.setcss({"butbg":"#3b81c6"});
	// 后台给出判断  status=0有联系人 status=1需要填写
	var status=0;
	if(status==1){
		$(".status_div").hide().eq(1).show();
	}
	// 定位轮播
	function toTab(num){
		$(".num_list>li").eq(num).addClass("active_li").siblings("li").removeClass("active_li")
	}
	// 查看主题详情
	$(".js_btn1").click(function(){
		toLeft($(".page2"),showBtn);
	});
	// 查看产品详情
	$(".js_btn2").click(function(){
		toLeft($(".page2"),showBtn);
	});
	function showBtn(){
		$(".fix_box").show();
	};
	function hideBtn(){
		$(".fix_box").hide();
	};
	$(".back_btn1").click(function(){
		$(".fix_box").hide();
	});
	$(".back_btn2").click(function(){
		$(".fix_box").show();
	});
	// 填写订单
	$("#js_fill").click(function(){
		$(".js_total").text(normal_price);
		toLeft($(".page3"),hideBtn);
	});

	
	//初始化日历插件
	//第一个参数是容器的id，第二个参数是今天的日期，第三个是后台返回的日期数据。
	var today=new Date();
	var ce=cela($("#date_div"),today,date_arr);
	// 选择日期
	$(".js_date").click(function(){
		toLeft($(".page5"),hideBtn);
	});
	// 保存选择日期
	$("#js_date_add").click(function(){
		$(".js_date_spn").text(user_arr.date);
		toRight($(".page5"));
	});
	// 选择人数
	$(".js_num").click(function(){
		toLeft($(".page4"),hideBtn);
	});
	// 减人数
	$(".reduce_spn").click(function(){
		var val=toSetNum($(this).siblings(".num"),1);
		var val1=$(".num").eq(1).val();
		if(2*val<val1){
			$(".num").eq(1).val(2*val);
		}
		$(this).siblings(".num").val(val);
	});
	// 增人数
	$(".add_spn").click(function(){
		var val=toSetNum($(this).siblings(".num"));
		var val1=$(".num").eq(0).val();
		if(2*val1<val){
			msg("一名成人最多可带2名儿童","好的");
		}else{
			$(this).siblings(".num").val(val);
		}
	});
	// 保存选择人数
	$("#js_save_add").click(function(){
		var num=0;
		$(".num").each(function(){
			num+=parseInt($(this).val());
		});
		$(".js_mem_spn").text(num);
		user_arr.num=num;
		toRight($(".page4"));
	});
	// 选择联系人
	$(document).on("click",".check_div",function(){
		$(".check_div").removeClass("js_chioce").children("img").hide();
		$(this).addClass("js_chioce").children("img").show();
		toRight($(".page4"));
	});
	// 添加新的联系人
	$(".add_contact").click(function(){;
		$(".status_div").eq(0).hide().siblings(".status_div").show();
		status=1;
	});
	
	// 展开内容
	$(".drop_div").click(function(){
		var src=$(this).children(".icon_pic").data("a");
		if(src && src!="" && src!=null){
			toDrop($(this),"js_drop",".drop_detail","images/"+src+".png");
		}else{
			toDrop($(this),"js_drop",".drop_detail");
		}
	});
	// 确认订单
	$("#js_buy").click(function(){
		if(status==1){
			toCheck();
		}else{
			console.log(user_arr);
			if(user_arr["date"]=="" || user_arr["date"]==null || user_arr["date"]==undefined){
				msg(txt_arr[10],"好的");
			}else if(user_arr["num"]=="" || user_arr["num"]==null || user_arr["num"]==undefined){
				msg(txt_arr[11],"好的");
			}else if($(".js_chioce").length<=0){
				msg(txt_arr[9],"好的");
			}else{
				toLeft($(".page6"));
			}
		}
	});
	// 下单
	$("#js_order").click(function(){
		toLeft($(".page6"));
	});
	// 确认购买
	$("#js_to_buy").click(function(){
		toLeft($(".page7"));
	});
	// 确认支付
	$("#js_buy_now").click(function(){
		toLeft($(".page8"));
	});
	// 返回首页
	$(".back_btn").click(function(){
		toRight($(this).parent().parent());
	});
	// 切换内容
	$(".tab_list>li").click(function(){
		var _index=$(".tab_list>li").index($(this));
		$(this).addClass("current_li").siblings("li").removeClass("current_li");
		$(".tab_div").eq(_index).show().siblings(".tab_div").hide();
	});

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
// 下拉显示
function toDrop(obj,aClass,eleClass,pic_src){
	if(!obj.hasClass(aClass)){
		obj.addClass(aClass);
		if(pic_src){
			var src=obj.children(".icon_pic").attr("src").split("_")[0];
			obj.addClass("bg_color3").children("span").addClass("w_color2");
			obj.children(".icon_pic").attr("src",pic_src);
			obj.children(".status_pic").attr("src","images/12.png");
		}
		obj.next(eleClass).stop(true,true).slideDown(200,function(){});
	}
	else{
		obj.removeClass(aClass);
		if(pic_src){
			var src=obj.children(".icon_pic").attr("src").split("_")[0];
			obj.removeClass("bg_color3").children("span").removeClass("w_color2");
			obj.children(".icon_pic").attr("src",src+".png");
			obj.children(".status_pic").attr("src","images/11.png");
		}
		obj.next(eleClass).stop(true,true).slideUp(100,function(){});
	}
}
function toCheck(){
		user_arr["name"]=$(".input_area").eq(0).val();
		user_arr.number=$(".input_area").eq(1).val();
		user_arr.mail=$(".input_area").eq(2).val();
		user_arr.address=$(".input_area").eq(3).val()?$(".input_area").eq(3).val():"";
		if(user_arr["date"]=="" || user_arr["date"]==null || user_arr["date"]==undefined){
			msg(txt_arr[10],"好的");
		}else if(user_arr["num"]=="" || user_arr["num"]==null || user_arr["num"]==undefined){
			msg(txt_arr[11],"好的");
		}
		else if(user_arr["name"]=="" || user_arr["name"]==null || user_arr["name"]==undefined){
			msg(txt_arr[7],"好的");
		}else if(user_arr.number=="" ||user_arr.number==null || user_arr.number==undefined){
			msg(txt_arr[5],"好的");
		}else if(user_arr.number.length<11){
			msg(txt_arr[6],"好的");
		}else if(user_arr.mail=="" ||user_arr.mail==null || user_arr.mail==undefined){
			msg(txt_arr[8],"好的");
		}else{
			// 可以提交
			toLeft($(".page6"));
		}
		
}
// 加减人数
function toSetNum(obj,type){
	// type=1 减 type=2 加
	var txt=obj.val()==""?0:obj.val();
	if(type && type==1){
		txt=txt-1;
		if(txt<0){
			txt=0;
		}
	}else{
		txt=parseInt(txt)+1;
	}
	return txt;
}