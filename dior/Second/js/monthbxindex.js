/*
#author      lut
#project     dior 二期
#date        2016-03-28
*/
// 假数据
var data=[{"id":"1723","name":null,"userid":null,"counter":"\u5929\u6d25\u53cb\u8c0a","avatar":null,"datetime":"2015-12-01","cosmetics":"4705245","cosmetics_sync":null,"cosmetics_ranking":"12","skin_care":"405","skin_sync":null,"skin_care_ranking":"374","perfume":"162","perfume_sync":null,"perfume_ranking":"81","cross_category":"0.4","cross_category_several_rate":null,"cross_category_ranking":"54","transaction_pen":"708","transaction_pen_sync":null,"transaction_pen_ranking":"188","total_score":"1057","total_score_ranking":"3","progress_ranking":null,"type":"1","type_name":"\u666e\u901aBC\/\u67dc\u957f","total_score_ranking_order":1,"cosmetics_ranking_order":1,"skin_care_ranking_order":2,"perfume_ranking_order":1,"cross_category_ranking_order":1,"transaction_pen_ranking_order":1,"count":910},{"id":"880","name":null,"userid":null,"counter":"\u5929\u6d25\u53cb\u8c0a","avatar":null,"datetime":"2015-11-01","cosmetics":"4172670","cosmetics_sync":null,"cosmetics_ranking":"13","skin_care":"379","skin_sync":null,"skin_care_ranking":"369","perfume":"137","perfume_sync":null,"perfume_ranking":"94","cross_category":"0.36","cross_category_several_rate":null,"cross_category_ranking":"67","transaction_pen":"708","transaction_pen_sync":null,"transaction_pen_ranking":"189","total_score":"1164","total_score_ranking":"4","progress_ranking":null,"type":"1","type_name":"\u666e\u901aBC\/\u67dc\u957f","total_score_ranking_order":3,"cosmetics_ranking_order":1,"skin_care_ranking_order":1,"perfume_ranking_order":1,"cross_category_ranking_order":1,"transaction_pen_ranking_order":1,"count":844},{"id":"16","name":null,"userid":null,"counter":"\u5929\u6d25\u53cb\u8c0a","avatar":null,"datetime":"2015-10-01","cosmetics":"3855580","cosmetics_sync":"","cosmetics_ranking":"16","skin_care":"363","skin_sync":"","skin_care_ranking":"371","perfume":"118","perfume_sync":"","perfume_ranking":"100","cross_category":"0.33","cross_category_several_rate":"","cross_category_ranking":"89","transaction_pen":"708","transaction_pen_sync":"","transaction_pen_ranking":"196","total_score":"1183","total_score_ranking":"4","progress_ranking":null,"type":"1","type_name":"\u666e\u901aBC\/\u67dc\u957f","total_score_ranking_order":3,"cosmetics_ranking_order":3,"skin_care_ranking_order":3,"perfume_ranking_order":3,"cross_category_ranking_order":3,"transaction_pen_ranking_order":3,"count":876}];
// 定义滚动
var myScroll = new IScroll('#content',
	{ 
		mouseWheel: true,
		hideScrollbar: true,
		click: true
	}
);
// 初始化切换
var mySwiper = new Swiper('#swiper', {
    // direction: "vertical",
    nextButton:'.swiper-button-next',
    prevButton:'.swiper-button-prev',
    speed: 400,
    spaceBetween: 0,
    onSlideChangeEnd: function(swiper){
        changeIndex();
    }
});
// 获取浏览器数据
var link_obj=GetRequest();
var userid=link_obj["userid"]?link_obj["userid"]:"";
// 获取页面url数据
function GetRequest(){ 
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		}
	} 
	return theRequest; 
};
// 页面跳转链接
$(function(){
	// 设置字体
	$m.rs();
	// $("#hide_div").fadeOut(200);
	// $("#content").animate({"opacity":1},200);
	// 刷新
	// mySwiper.update();
    // toResize();
	//禁止分享 
	if (typeof WeixinJSBridge == "undefined"){
	    if( document.addEventListener ){
	        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	    }else if (document.attachEvent){
	        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	    }
	}else{
	    onBridgeReady();
	};
	// 设置页面
	$m.toSetDom(data);
	// toGetData();
	// 重新加载页面
	$(".js_reload").on("click",function(){
		var href=window.location.href;
		window.location.replace(href);
	});
	// 点击选中月份
	$(document).on("change",".js_select",function(){
		var n_index=this.selectedIndex;
		$(".js_select").each(function(i){
			$(this).find("option").eq(i).attr("selected",true);
		});
		mySwiper.slideTo(n_index,500);
	});
	//调整布局
	$(window).resize(function(){$m.rs();toResize();});	
});
// 零件
// 切换结束执行
function changeIndex(){
	var n_index=mySwiper.activeIndex;
	mySwiper.update();
}
// 重新刷新
function toResize(){
	$m.toSquare($(".p1_tit"));
	$m.toSquare($(".p1_head_picbox"));
	// 刷新滚动用它
	myScroll.refresh();
}
// 微信静禁止分享
function onBridgeReady(){
	WeixinJSBridge.call('hideOptionMenu');
}
function toGetData(){
	$.ajax({
		type: "POST",
		url: $m.ajax_link,
		dataType: "json",
		data: {userid:userid,"rt_type":$m.rt_type},
		success: function(data){
			console.log("返回的数据是"+data);
			if(data!=null){
				// 有货
				$m.toSetDom(data);

			}else{
				console.log(data);
				$("#swiper").hide();
		        $(".att_p1").hide();
		        $(".att_p3").show();
			}
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			console.log(textStatus);
            $("#swiper").hide();
            $(".att_p1").hide();
            $(".att_p2").show();
        }
	});
}
// 自定义方法
var $m={
	ajax_link:"http://givenchy.weshwx.cn/dior_golden_bc/get_user",
	rt_type: 7,                   //请求参数
	// 图片前缀
	img_url: "images/",
	// 字体设置
	rs: function(){
        var limit=720;
        var dw=document.documentElement.clientWidth;
        var dh=document.documentElement.clientHeight;
        var fw=dw>limit?limit:dw;
        $("body").css({"font-size":1*fw/360+"em"});
        var ratio=1;
        if(dh/fw*720<1136){
            ratio=dh/fw*720/1136;
        }
        // if(dw>limit){
        //     $(".center_box").css({"left":(dw-limit)/2+"px"});
        // };
    },
	toSquare: function(obj,num){
		var ow=obj.width();
		obj.height(ow);
		var val=num?num:50;
		obj.css({"border-radius":val+"%"});
	},
	// 格式化数据
	cuter10: function(num){//Rekey
		var result = '', counter = 0;
        num = (num || 0).toString();
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result = num.charAt(i) + result;
            if (!(counter % 3) && i != 0) { result = ',' + result; }
        }
        return result;
	},
	// 初始化
	init: function(obj,type){
		
	},
	// 生成页面
	toSetDom: function(arr){
		// 赋值
		var _html='';
		// var arr=arr.reverse();
		var id,total_score,type,type_name,count,h_pic,name,usercode,counter,cosmetics,cosmetics_sync,cosmetics_ranking,skin_care,skin_sync,skin_care_ranking,perfume,perfume_sync,perfume_ranking,cross_category,cross_category_several_rate,cross_category_ranking,transaction_pen,transaction_pen_sync,transaction_pen_ranking,progress_ranking,total_score_ranking_order,cosmetics_ranking_order,skin_care_ranking_order,perfume_ranking_order,cross_category_ranking_order,transaction_pen_ranking_order;
		var len=arr.length;
		for(var i=len-1;i>-1;i--){
			// 搞一个日期先
			var op_html='';
			var datetime="";
			for(var j=len-1;j>-1;j--){
				datetime=arr[j]["datetime"].substr(0,7)?arr[j]["datetime"].substr(0,7):"";
				if(i==j){
					op_html+='<option selected="selected">'+datetime+'</option>'
				}else{
					op_html+='<option>'+datetime+'</option>';
				}
				
			}
			id=arr[i]["id"]?arr[i]["id"]:"";
			type=arr[i]["type"]?arr[i]["type"]:"";
			type_name=arr[i]["type_name"]?arr[i]["type_name"]:"";
			count=arr[i]["count"]?arr[i]["count"]:"";
			// slide
			_html+='<div class="swiper-slide" data-id="'+id+'" data-total="'+id+'" data-type="'+type+'">';
			_html+='<!-- 顶部半圆 --><div class="p1_tit"><div class="p1_h_div">';
			_html+='<span>'+arr[i]["type_name"]+'</span><br/>';
			_html+='<span>共'+arr[i]["count"]+'人</span><br/>';
			_html+='<select class="js_select p1_select inputstyle">'+op_html+'</select>';
			_html+='</div></div>';
			// 个人信息
			h_pic=arr[i]["avatar"]?arr[i]["avatar"]:$m.img_url+"defualt_pic.jpg";
			name=arr[i]["name"]?arr[i]["name"]:"";
			usercode=arr[i]["userid"]?arr[i]["userid"]:"";
			counter=arr[i]["counter"]?arr[i]["counter"]:"";
			_html+='<!-- 头像 --><div class="p1_head_picbox"><img src="'+h_pic+'" alt="头像"/></div>';
			_html+='<div class="detail_center">';
			_html+='<!-- 个人信息 -->';
			_html+='<div class="detail_div1 clear">';
			_html+='<div class="f_l txt_r">';
			_html+='<label>姓名：</label><span>'+name+'</span><br/>';
			_html+='<label>工号：</label><span>'+usercode+'</span><br/>';
			_html+='</div>'
			_html+='<div class="f_r txt_l counter_div">';
			_html+='<label>柜台：</label><span>'+counter+'</span><br/>';
			_html+='</div>'
			_html+='<img src="images/line2.png" alt="分割线">';
			_html+='</div>';
			// 数据
			
			cosmetics=arr[i]["cosmetics"]?arr[i]["cosmetics"]:0;
			cosmetics_sync=arr[i]["cosmetics_sync"]?arr[i]["cosmetics_sync"]:0;
			cosmetics_ranking=arr[i]["cosmetics_ranking"]?arr[i]["cosmetics_ranking"]:0;
			skin_care=arr[i]["skin_care"]?arr[i]["skin_care"]:0;
			skin_sync=arr[i]["skin_sync"]?arr[i]["skin_sync"]:0;
			skin_care_ranking=arr[i]["skin_care_ranking"]?arr[i]["skin_care_ranking"]:0;
			perfume=arr[i]["perfume"]?arr[i]["perfume"]:0;
			perfume_sync=arr[i]["perfume_sync"]?arr[i]["perfume_sync"]:0;
			perfume_ranking=arr[i]["perfume_ranking"]?arr[i]["perfume_ranking"]:0;
			cross_category=arr[i]["cross_category"]?arr[i]["cross_category"]:0;
			cross_category_several_rate=arr[i]["cross_category_several_rate"]?arr[i]["cross_category_several_rate"]:0;
			cross_category_ranking=arr[i]["cross_category_ranking"]?arr[i]["cross_category_ranking"]:0;
			transaction_pen=arr[i]["transaction_pen"]?arr[i]["transaction_pen"]:"";
			transaction_pen_sync=arr[i]["transaction_pen_sync"]?arr[i]["transaction_pen_sync"]:"0%";
			transaction_pen_ranking=arr[i]["transaction_pen_ranking"]?arr[i]["transaction_pen_ranking"]:0;
			total_score=arr[i]["total_score"]?arr[i]["total_score"]:"";
			total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
			progress_ranking=arr[i]["progress_ranking"]?arr[i]["progress_ranking"]:"";
			total_score_ranking_order=arr[i]["total_score_ranking_order"]?arr[i]["total_score_ranking_order"]:0;
			cosmetics_ranking_order=arr[i]["cosmetics_ranking_order"]?arr[i]["cosmetics_ranking_order"]:0;
			skin_care_ranking_order=arr[i]["skin_care_ranking_order"]?arr[i]["skin_care_ranking_order"]:0;
			perfume_ranking_order=arr[i]["perfume_ranking_order"]?arr[i]["perfume_ranking_order"]:0;
			cross_category_ranking_order=arr[i]["cross_category_ranking_order"]?arr[i]["cross_category_ranking_order"]:0;
			transaction_pen_ranking_order=arr[i]["transaction_pen_ranking_order"]?arr[i]["transaction_pen_ranking_order"]:0;
			_html+='<!-- 数据项 -->';
			_html+='<ul class="detail_list"><li>';
			_html+='<span class=" detail_spn1">彩妆</span>';
			_html+='<img class="p9_pic1" src="images/icon9.png" alt="icon">';
			_html+='<span class="v_b">';
			_html+='<span class="color1 ">'+cosmetics+'</span><br/>';
			_html+='<span class="font08">本年单产</span>';
			_html+='<div class="font09 p9_div2">';
			_html+='<span>';
			_html+='<span class="color1">'+cosmetics_sync+'</span><br/>';
			_html+='<span class="font08">比去年同期</span>'
			_html+='</span>';
			_html+='<span>';
			_html+='<span class="color1">'+cosmetics_ranking+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			if(cosmetics_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(cosmetics_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span>';
			_html+='</div>';
			_html+='</span>';
			_html+='</li>';
			_html+='<li>';
			_html+='<span class="">护肤</span>';
			_html+='<img class="p9_pic1" src="images/icon9.png" alt="icon">';
			_html+='<span>';
			_html+='<span class="color2">'+skin_care+'</span><br/>';
			_html+='<span class="font08">本年单产</span>';
			_html+='<div class="font09 p9_div2">';
			_html+='<span>';
			_html+='<span class="color2">'+skin_sync+'</span><br/>';
			_html+='<span class="font08">比去年同期</span>';
			_html+='</span>';
			_html+='<span>';
			_html+='<span class="color2">'+skin_care_ranking+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			if(skin_care_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(skin_care_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span>';
			_html+='</div>';
			_html+='</span>';
			_html+='</li>';
			_html+='<li>';
			_html+='<span class="">香水</span>';
			_html+='<img class="p9_pic1" src="images/icon9.png" alt="icon">';
			_html+='<span>';
			_html+='<span class="color3">'+perfume+'</span><br/>';
			_html+='<span class="font08">本年单产</span>';
			_html+='<div class="font09 p9_div2">';
			_html+='<span><span class="color3">'+perfume_sync+'</span><br/>';
			_html+='<span class="font08">比去年同期</span></span>';
			_html+='<span><span class="color3">'+perfume_ranking+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			if(perfume_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(perfume_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</div>';
			_html+='</span>';
			_html+='</li></ul>';
			_html+='<div class="p9_div1">';
			_html+='<span class="">交易<br/>笔数</span>';
			_html+='<img class="p9_pic1" src="images/icon9.png" alt="icon">';
			_html+='<span class="v_b"><span class="color4 ">'+cross_category+'</span>';
			if(cross_category_several_rate<0){
				_html+='<span class="font09"><span class="color4 font07">下降</span>';
			}else{
				_html+='<span class="font09"><span class="color4 font07">增长</span>';
			}
			_html+='<span class="color4 font11">'+cross_category_several_rate+'%</span><br/>';
			_html+='<span class="font08">比去年同期</span></span>';
			_html+='<span><span class=" color4">'+cross_category_ranking+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			if(cross_category_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(cross_category_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span></span>';
			_html+='</div>';
			_html+='<div class="p9_div1">';
			_html+='<span class="txt_c">跨<br/>品类</span>';
			_html+='<img class="p9_pic1" src="images/icon9.png" alt="icon">';
			_html+='<span class="v_b"><span class="color5 ">'+transaction_pen+'</span>';
			_html+='<span class="font09">';
			_html+='<span class="color5 font11">'+transaction_pen_sync+'</span><br/>';
			_html+='<span class="font08">连带率</span></span>';
			_html+='<span><span class=" color5">'+transaction_pen_ranking+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			if(transaction_pen_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(transaction_pen_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span></span>';
			_html+='</div>';
			_html+='</div>';
			_html+='</div>';			//结束slide
		}
		// 生成dom节点
		$("#dom_parent").html(_html);
		$("#hide_div").fadeOut(200);
		$("#content").show();
		// 刷新
		mySwiper.update();
	    toResize();
		var n_index=$("#dom_parent>.swiper-slide").length-1<0?0:$("#dom_parent>.swiper-slide").length-1;

		// 左右切换
		if(n_index==0){
			
		}else{
			mySwiper.slideTo(n_index,1);
		}
	}
}