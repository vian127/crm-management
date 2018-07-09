/*
#author      lut
#project     dior 二期
#date        2016-03-28
*/
// 假数据
var data=[{"id":"1723","name":null,"userid":null,"counter":"\u5929\u6d25\u53cb\u8c0a","avatar":null,"datetime":"2015-12-01","yield":"4705245","yield_ranking":"12","aus":"405","aus_ranking":"374","guests":"162","guests_ranking":"81","newguests":"0.4","newguests_ranking":"54","oldguests":"708","oldguests_ranking":"188","return_rate":"1057","return_rate_ranking":"3","retention_rate":null,"retention_rate_ranking":null,"trailer":null,"trailer_ranking":null,"type":"1","type_name":"CRM \u4f1a\u5458\u8be6\u60c5","trailer_ranking_order":3,"yield_ranking_order":1,"aus_ranking_order":2,"guests_ranking_order":1,"newguests_ranking_order":1,"oldguests_ranking_order":1,"return_rate_ranking_order":1,"retention_rate_ranking_order":3,"count":910},{"id":"880","name":null,"userid":null,"counter":"\u5929\u6d25\u53cb\u8c0a","avatar":null,"datetime":"2015-11-01","yield":"4172670","yield_ranking":"13","aus":"379","aus_ranking":"369","guests":"137","guests_ranking":"94","newguests":"0.36","newguests_ranking":"67","oldguests":"708","oldguests_ranking":"189","return_rate":"1164","return_rate_ranking":"4","retention_rate":null,"retention_rate_ranking":null,"trailer":null,"trailer_ranking":null,"type":"1","type_name":"CRM \u4f1a\u5458\u8be6\u60c5","trailer_ranking_order":3,"yield_ranking_order":1,"aus_ranking_order":1,"guests_ranking_order":1,"newguests_ranking_order":1,"oldguests_ranking_order":1,"return_rate_ranking_order":3,"retention_rate_ranking_order":3,"count":844},{"id":"16","name":null,"userid":null,"counter":"\u5929\u6d25\u53cb\u8c0a","avatar":null,"datetime":"2015-10-01","yield":"3855580","yield_ranking":"16","aus":"363","aus_ranking":"371","guests":"118","guests_ranking":"100","newguests":"0.33","newguests_ranking":"89","oldguests":"708","oldguests_ranking":"196","return_rate":"1183","return_rate_ranking":"4","retention_rate":null,"retention_rate_ranking":null,"trailer":null,"trailer_ranking":null,"type":"1","type_name":"CRM \u4f1a\u5458\u8be6\u60c5","trailer_ranking_order":3,"yield_ranking_order":3,"aus_ranking_order":3,"guests_ranking_order":3,"newguests_ranking_order":3,"oldguests_ranking_order":3,"return_rate_ranking_order":3,"retention_rate_ranking_order":3,"count":876}];

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
	$(document).on("change",".p1_select",function(){
		var n_index=this.selectedIndex;
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
		data: {userid:userid,rt_type:$m.rt_type},
		success: function(data){
			console.log("返回的数据是"+data);
			if(data){
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
	rt_type: 9,                   //请求参数
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
		var id,total_score,type,type_name,count,h_pic,name,usercode,counter,yield,yield_ranking,aus,aus_ranking,guests,guests_ranking,newguests,newguests_ranking,oldguests,oldguests_ranking,return_rate,return_rate_ranking,retention_rate,retention_rate_ranking,trailer,trailer_ranking,trailer_ranking_order,yield_ranking_order,aus_ranking_order,guests_ranking_order,newguests_ranking_order,oldguests_ranking_order,return_rate_ranking_order,retention_rate_ranking_order;
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
			_html+='<div class="detail_div1">';
			_html+='<label>姓名：</label><span>'+name+'</span><br/>';
			_html+='<label>工号：</label><span>'+usercode+'</span><br/>';
			_html+='<label>柜台：</label><span class="txt_l">'+counter+'</span><br/>';;
			_html+='<img src="images/line1.png" alt="分割线">';
			_html+='</div>';
			_html+='<!-- 数据项 -->';
			
			yield=arr[i]["yield"]?arr[i]["yield"]:0;
			yield_ranking=arr[i]["yield_ranking"]?arr[i]["yield_ranking"]:0;
			aus=arr[i]["aus"]?arr[i]["aus"]:0;
			aus_ranking=arr[i]["aus_ranking"]?arr[i]["aus_ranking"]:0;
			guests=arr[i]["guests"]?arr[i]["guests"]:0;
			guests_ranking=arr[i]["guests_ranking"]?arr[i]["guests_ranking"]:0;
			newguests=arr[i]["newguests"]?arr[i]["newguests"]:0;
			newguests_ranking=arr[i]["newguests_ranking"]?arr[i]["newguests_ranking"]:0;
			oldguests=arr[i]["oldguests"]?arr[i]["oldguests"]:0;
			oldguests_ranking=arr[i]["oldguests_ranking"]?arr[i]["oldguests_ranking"]:0;
			return_rate=arr[i]["return_rate"]?arr[i]["return_rate"]:0;
			return_rate_ranking=arr[i]["return_rate_ranking"]?arr[i]["return_rate_ranking"]:0;
			retention_rate=arr[i]["retention_rate"]?arr[i]["retention_rate"]:0;
			retention_rate_ranking=arr[i]["retention_rate_ranking"]?arr[i]["retention_rate_ranking"]:0;
			trailer=arr[i]["trailer"]?arr[i]["trailer"]:0;
			trailer_ranking=arr[i]["trailer_ranking"]?arr[i]["trailer_ranking"]:0;
			trailer_ranking_order=arr[i]["trailer_ranking_order"]?arr[i]["trailer_ranking_order"]:0;
			yield_ranking_order=arr[i]["yield_ranking_order"]?arr[i]["yield_ranking_order"]:0;
			aus_ranking_order=arr[i]["aus_ranking_order"]?arr[i]["aus_ranking_order"]:0;
			guests_ranking_order=arr[i]["guests_ranking_order"]?arr[i]["guests_ranking_order"]:0;
			newguests_ranking_order=arr[i]["newguests_ranking_order"]?arr[i]["newguests_ranking_order"]:0;
			oldguests_ranking_order=arr[i]["oldguests_ranking_order"]?arr[i]["oldguests_ranking_order"]:0;
			return_rate_ranking_order=arr[i]["return_rate_ranking_order"]?arr[i]["return_rate_ranking_order"]:0;
			retention_rate_ranking_order=arr[i]["retention_rate_ranking_order"]?arr[i]["retention_rate_ranking_order"]:0;
			_html+='<ul class="detail_list">';
			_html+='<li><span class="font12 fw_b detail_spn1">单产</span>';
			_html+='<span><span class="color1 font12 fw_b">'+yield+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+yield_ranking+'</span>';
			if(yield_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(yield_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span></li>';
			_html+='<li><span class="font12 fw_b">AUS</span>';
			_html+='<span><span class="color1 font12 fw_b">'+aus+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+aus_ranking+'</span>';
			if(aus_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(aus_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span></li>';
			_html+='<li class="num_item"><span class="font12 fw_b">客人数量</span>';
			_html+='<span class="txt_l"><span class="color1 font12 fw_b">'+guests+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+guests_ranking+'</span>';
			if(guests_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(guests_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span>';
			_html+='<div class="detail_txt_div1">';
			_html+='<img src="images/icon8.png" alt="icon"><br/>';
			_html+='<div class="txt_r"><div><span class="color1 font12 fw_b">'+newguests+'</span><br/>';
			_html+='<span>新客数量</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+newguests_ranking+'</span>';
			if(newguests_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(newguests_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</div><br/>';
			_html+='<div><span class="color1 font12 fw_b">'+return_rate+'</span><br/>';
			_html+='<span>二次回柜率</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+return_rate_ranking+'</span>';
			if(return_rate_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(return_rate_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</div></div>';
			_html+='<div class="detail_div2"><div><span class="color1 font12 fw_b">'+oldguests+'</span><br/>';
			_html+='<span>老客数量</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+oldguests_ranking+'</span>';
			if(oldguests_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(oldguests_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</div><br/>';
			_html+='<div><span class="color1 font12 fw_b">'+retention_rate+'</span><br/>';
			_html+='<span>老客保有率</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+retention_rate_ranking+'</span>';
			if(retention_rate_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(retention_rate_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</div>';
			_html+='</div></div></li>';
			_html+='<li><span class="p8_spn1">预告下个月即将<br/>到期的老客数量</span>';
			_html+='<span><span class="color1 font12 fw_b">'+trailer+'</span><br/>';
			_html+='<span class="font08">本月排名</span>';
			_html+='<span class="font08 color1">'+trailer_ranking+'</span>';
			if(trailer_ranking_order==1){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon3.png" alt="icon">';
			}else if(trailer_ranking_order==2){
				_html+='<img class="icon_pic1" src="'+$m.img_url+'icon4.png" alt="icon">';
			}else{}
			_html+='</span>';
			_html+='</li></ul>';





			_html+='</div></div>';
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