/*
#author      lut
#project     dior 二期
#date        2016-03-28
*/
// 假数据
var data=[{"id":"1","name":null,"userid":null,"counter":"Event Team","avatar":null,"datetime":"2015-10-01","activity_sales":"20097150","activity_sales_ranking":"0","activity_reach_rate":"1.15","activity_reach_rate_ranking":"0","new_customer":"2253","new_customer_ranking":"0","new_customer_reach":"1.68","new_customer_reach_ranking":"0","manage_score":"97","manage_score_ranking":"0","total_score":"=SUM(F2,H2,J2,L2,N2)","total_score_ranking":"0","type":"5","type_name":"Event Team","total_score_ranking_order":3,"activity_sales_ranking_order":3,"activity_reach_rate_ranking_order":3,"new_customer_ranking_order":3,"new_customer_reach_ranking_order":3,"manage_score_ranking_order":3,"count":9}];
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
var userid=link_obj["userid"]?link_obj["userid"]:"T2827";
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
	console.log("".substr(0,7))
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
	if(n_index==0){
		$(".swiper-slide").eq(1).find(".p1_mask").each(function(){
			$(this).stop(true,true);
		});
	}else{
		$(".swiper-slide").eq(n_index-1).find(".p1_mask").each(function(){
			$(this).stop(true,true);
		});
	}
	// 刷新滚动用它
	$m.mainAnimate($(".swiper-slide").eq(n_index),$(".swiper-slide").eq(n_index).attr("data-type"));
	// myScroll.refresh();
}
// 重新刷新
function toResize(){
	$m.toSquare($(".p1_tit"));
	$m.toSquare($(".p1_head_picbox"));
	$m.toSquare($(".p1_b_txt"));
	$m.toSetSty();
	// 动画
	$(".swiper-slide").eq(0).attr("data-move",false);
	// $m.mainAnimate($(".swiper-slide").eq(0),$(".swiper-slide").eq(0).attr("data-type"));
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
	rt_type: 1,                   //请求参数
	// 图片前缀
	img_url: "images/",
	// 图片地址
	img_src:["images/icon3.png","images/icon4.png"],
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
	// 话术文本
	txt_arr:{
		"type1":[
			"本年单产","本月排名","新客招募人数","本月排名","新客二次回柜数","本月排名","新客二次回柜率","本月排名","2014活跃客人数",
			"本月排名","2015回柜客人数","本月排名","老客回柜率","本月排名","总交易笔数","本月排名","连带交易笔数","本月排名","连带率","本月排名"
		],
		"type2":[
			"满床率","本月排名","每月美容坊销售","本月排名","美容坊销售占比","本月排名","美容坊购买率",
			"本月排名","新客招募","本月排名","转化","本月排名","升级","本月排名","维护","本月排名"
		],
		"type3":[
			"神秘访客分数","本月排名","对比Chanel指数","本月排名","柜台新客二次回柜率","本月排名","柜台老客回柜率","本月排名","柜台连带率",
			"本月排名"
		],
		"type4":[
			"活动实际销售","本月排名","活动达成率","本月排名","新客招募人数","本月排名","新客招募达成","本月排名","主管评分","本月排名"
		],
		"type5":[
			"活动实际销售","本月排名","活动达成率","本月排名","新客招募人数","本月排名","新客招募达成","本月排名","主管评分","本月排名"
		]
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
	// 调整样式
	toSetSty: function(type){
		var _this=this;
		if(type!=1){
			// 调整
			$(".swiper-slide").each(function(){
				var a=$(this).find(".p1_txt_div5");
				var b=$(this).find(".p1_txt_div6");
				var c=$(this).find(".base_info1");
				var d=$(this).find(".base_info2");
				_this.contrast(a,b);
				_this.contrast(c,d);
			});
		}
	},
	// 对比设置大小
	contrast: function(a,b){
		if(a.height()>b.height()){
			b.height(a.height());
		}else{
			a.height(b.height());
		}
	},
	// 初始化
	init: function(obj,type){
		// 前页动画全部停住
		obj.find(".p1_mask").each(function(){
			$(this).stop(true);
		});
		// 清零
		var a=obj.find(".js_move1");
		var b=obj.find(".js_move2");
		var c=obj.find(".js_move3");
		var d=obj.find(".js_move4");
		var e=obj.find(".js_move5");
		var f=obj.find(".js_move6");
		var g=obj.find(".js_move7");
		a.css({"right":0}).show();
		b.css({"left":0}).show();
		c.css({"right":0}).show();
		d.css({"right":0}).show();
		e.css({"left":0}).show();
		f.css({"right":0}).show();
		g.css({"left":0}).show();
		this.n=0;
	},
	// 奇葩之动画
	mainAnimate: function(obj,type,index){
		var a=obj.find(".js_move1");
		var b=obj.find(".js_move2");
		var c=obj.find(".js_move3");
		var d=obj.find(".js_move4");
		var e=obj.find(".js_move5");
		var f=obj.find(".js_move6");
		var g=obj.find(".js_move7");
		if(type==1){
			a.delay(500).animate({"right":"100%"},500,function(){
				$(this).hide();
			});
			b.delay(500).animate({"left":"100%"},500,function(){
				$(this).hide();
				c.animate({"right":"100%"},500,function(){
					$(this).hide();
					d.animate({"right":"150%"},500,function(){
						$(this).hide();
						e.animate({"left":"150%"},500,function(){
							$(this).hide();
							f.animate({"left":"150%"},500,function(){
								$(this).hide();
								g.animate({"left":"150%"},500,function(){
									$(this).hide();								
								});									
							});	
						});	
					});
				});
			});
		}else if(type==2){
			a.delay(500).animate({"right":"100%"},500,function(){
				$(this).hide();
			});
			b.delay(500).animate({"left":"100%"},500,function(){
				$(this).hide();
				c.animate({"right":"100%"},500,function(){
					$(this).hide();
					d.animate({"right":"150%"},500,function(){
						d.hide();
						e.animate({"left":"100%"},500,function(){
							$(this).hide();
							f.animate({"left":"100%"},500,function(){
								$(this).hide();
							});
						});
					});
				});
			});
		}else if(type==3){
			a.delay(500).animate({"right":"100%"},500,function(){
				$(this).hide();
			});
			b.delay(500).animate({"left":"100%"},500,function(){
				$(this).hide();
				c.animate({"right":"100%"},500,function(){
					$(this).hide();
					d.animate({"right":"150%"},500,function(){
						d.hide();

						e.animate({"left":"100%"},500,function(){
							$(this).hide();
							f.animate({"left":"100%"},500,function(){
								$(this).hide();
							});
						});
					});
				});
			});
		}else if(type==4){
			a.delay(500).animate({"right":"100%"},500,function(){
				$(this).hide();
			});
			b.delay(500).animate({"left":"100%"},500,function(){
				$(this).hide();
				c.animate({"right":"100%"},500,function(){
					$(this).hide();
					d.animate({"right":"150%"},500,function(){
						d.hide();

						e.animate({"left":"100%"},500,function(){
							$(this).hide();
							f.animate({"left":"100%"},500,function(){
								$(this).hide();
							});
						});
					});
				});
			});
		}else if(type==5){
			a.delay(500).animate({"right":"100%"},500,function(){
				$(this).hide();
			});
			b.delay(500).animate({"left":"100%"},500,function(){
				$(this).hide();
				c.animate({"right":"100%"},500,function(){
					$(this).hide();
					d.animate({"right":"150%"},500,function(){
						d.hide();

						e.animate({"left":"100%"},500,function(){
							$(this).hide();
						});
					});
				});
			});
		}
	},
	// 生成页面
	toSetDom: function(arr){
		var a=this.txt_arr;
		var nType=arr[0]["type"];
		// 赋值
		var _html='';
		var arr=arr.reverse();
		if(nType==1){
			// BC
			for(var i=0,len=arr.length;i<len;i++){
				// 搞一个日期先
				var op_html='';
				var datetime="";
				for(var j=0;j<len;j++){
					datetime=arr[j]["datetime"]?arr[j]["datetime"]:"";
					if(i==j){
						op_html+='<option selected="selected">'+datetime.substr(0,7)+'</option>'
					}else{
						op_html+='<option>'+datetime.substr(0,7)+'</option>';
					}
					
				}
				// 页面主题
				var id=arr[i]["id"]?arr[i]["id"]:"";
				var total_score=arr[i]["total_score"]?arr[i]["total_score"]:"";
				var type=arr[i]["type"]?arr[i]["type"]:"";
				var type_name=arr[i]["type_name"]?arr[i]["type_name"]:"";
				var count=arr[i]["count"]?arr[i]["count"]:"";
				_html+='<div class="swiper-slide p1_slide_type1" data-id="'+id+'" data-total="'+total_score+'" data-type="'+type+'">';
				_html+='<!-- 顶部半圆 --><div class="p1_tit"><div class="p1_h_div">';
				_html+='<span>'+type_name+'</span><br/>';
				_html+='<span>共'+count+'人</span><br/>';
				_html+='<select class="js_select p1_select inputstyle">'+op_html+'</select>';
				_html+='</div></div>';
				var h_pic=arr[i]["avatar"]?arr[i]["avatar"]:$m.img_url+"defualt_pic.jpg";
				var name=arr[i]["name"]?arr[i]["name"]:"";
				var userid=arr[i]["userid"]?arr[i]["userid"]:"";
				var counter=arr[i]["counter"]?arr[i]["counter"]:"";
				_html+='<!-- 头像 --><div class="p1_head_picbox"><img src="'+h_pic+'" alt="头像"/></div>';
				_html+='<!-- 中间部分 --><div class="p1_center"><!-- 中线 --><div class="line_center"></div><!-- 人物基本信息 --><div class="p1_sect1 clear" style="padding-top:0.5em">';
				_html+='<!-- 左 --><div class="p1_l"><div class="p1_l_box base_info1">';
				_html+='<span>姓名:</span><span>'+name+'</span><br/>';
				_html+='<span>工号:</span><span>'+userid+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move1"></div></div></div>';
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box base_info2"><div class="p1_txt_div1">';
				_html+='<span>柜台:</span><span>'+counter+'</span></div><!-- 遮罩 --><div class="p1_mask p1_mask_r js_move2"></div></div></div></div>';
				// 蓝色开始 本年单产
				var annual_sales=arr[i]["annual_sales"]?arr[i]["annual_sales"]:0;
				var annual_sales_ranking_order=arr[i]["annual_sales_ranking_order"]?arr[i]["annual_sales_ranking_order"]:0;
				var annual_sales_ranking=arr[i]["annual_sales_ranking"]?arr[i]["annual_sales_ranking"]:0;
				_html+='<!-- 蓝色 --><div class="p1_sect1 clear p1_type" style="margin-top: 0.5em;"><!-- 左 --><div class="p1_l"><div class="p1_l_box">';
				var val=$m.cuter10(annual_sales);
				_html+='<!-- '+a["type1"][0]+' --><div class="p1_txt_div2 type1_div2"><span class="p1_spn6">'+val+'</span><span>'+a["type1"][0]+'</span><br/>';
				if(annual_sales_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(annual_sales_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type1"][1]+'</span><span>'+annual_sales_ranking+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move3"></div></div>';
				// 新客招募人数
				var new_client=arr[i]["new_client"]?arr[i]["new_client"]:0;
				var new_client_ranking_order=arr[i]["new_client_ranking_order"]?arr[i]["new_client_ranking_order"]:0;
				var new_client_ranking=arr[i]["new_client_ranking"]?arr[i]["new_client_ranking"]:0;
				var val=$m.cuter10(new_client);
				_html+='<!-- '+a["type1"][2]+' --><div class="p1_txt_div3"><span class="p1_spn2">'+val+'</span><span>'+a["type1"][2]+'</span><br/>';
				if(new_client_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(new_client_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type1"][3]+'</span><span>'+new_client_ranking+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move4 type1_mask"></div></div>';
				_html+='</div></div>';
				// 新客户二次回柜数
				var new_client_back=arr[i]["new_client_back"]?arr[i]["new_client_back"]:0;
				var new_client_back_ranking_order=arr[i]["new_client_back"]?arr[i]["new_client_back"]:0;
				var new_client_back_ranking=arr[i]["new_client_back_ranking"]?arr[i]["new_client_back_ranking"]:0;
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box"><div class="p1_txt_div4">';
				var val=$m.cuter10(new_client_back);
				_html+='<!-- '+a["type1"][4]+' --><span class="p1_spn2">'+val+'</span><span>'+a["type1"][4]+'</span><br/>';
				_html+='<span>'+a["type1"][5]+'</span><span>'+new_client_back_ranking+'</span>';
				if(new_client_back_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(new_client_back_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
	       		// 新客户二次回柜率
	       		var new_client_back_rate=arr[i]["new_client_back_rate"]?arr[i]["new_client_back_rate"]:0;
	       		var new_client_back_rate_ranking_order=arr[i]["new_client_back_rate_ranking_order"]?arr[i]["new_client_back_rate_ranking_order"]:0;
	       		var new_client_back_rate=arr[i]["new_client_back_rate"]?arr[i]["new_client_back_rate"]:0;
				var val=new_client_back_rate*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type1"][6]+' --><span class="p1_spn2">'+val+'</span>';
				_html+='<span>'+a["type1"][6]+'</span><br/>';
				
				_html+='<span>'+a["type1"][7]+'</span><span>'+new_client_back_rate_ranking+'</span>';
				if(new_client_back_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(new_client_back_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
				_html+='</div>';
				_html+='</div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_r js_move5 type1_mask"></div>';
				// }
				_html+='</div></div></div>';
				// 去年活跃客人数
				var last_year_active=arr[i]["last_year_active"]?arr[i]["last_year_active"]:0;
				var last_year_active_ranking_order=arr[i]["last_year_active_ranking_order"]?arr[i]["last_year_active_ranking_order"]:0;
				var last_year_active_ranking=arr[i]["last_year_active_ranking"]?arr[i]["last_year_active_ranking"]:0;
				_html+='<!-- 紫色、红色 --><div class="p1_sect1 clear p1_type"><!-- 左 --><div class="p1_l"><div class="p1_l_box"><div class="p1_txt_div5">';
				var val=$m.cuter10(last_year_active);
				_html+='<!-- '+a["type1"][8]+' --><span class="p1_spn3">'+val+'</span><span>'+a["type1"][8]+'</span><br/>';
				if(last_year_active_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(last_year_active_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type1"][9]+'</span><span>'+last_year_active_ranking+'</span><br/>';
				// 今年回柜客数
				var this_year_back=arr[i]["this_year_back"]?arr[i]["this_year_back"]:0;
				var this_year_back_ranking_order=arr[i]["this_year_back_ranking_order"]?arr[i]["this_year_back_ranking_order"]:0;
				var this_year_back_ranking=arr[i]["this_year_back_ranking"]?arr[i]["this_year_back_ranking"]:0;
				var val=$m.cuter10(this_year_back);
				// 有保留客户
				_html+='<div><!-- '+a["type1"][10]+' --><span class="p1_spn3">'+val+'</span><span>'+a["type1"][10]+'</span><br/>';
				if(this_year_back_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(this_year_back_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type1"][11]+'</span><span>'+this_year_back_ranking+'</span></div>';
				// 老客回柜率
				var old_client_back=arr[i]["old_client_back"]?arr[i]["old_client_back"]:0;
				var old_client_back_ranking_order=arr[i]["old_client_back_ranking_order"]?arr[i]["old_client_back_ranking_order"]:0;
				var old_client_back_ranking=arr[i]["old_client_back_ranking"]?arr[i]["old_client_back_ranking"]:0;
				var val=old_client_back*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type1"][12]+' --><span class="p1_spn3">'+val+'</span><span>'+a["type1"][12]+'</span><br/>';
				if(old_client_back_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(old_client_back_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type1"][13]+'</span><span>'+old_client_back_ranking+'</span></div>';
				_html+='</div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_l js_move6 type1_mask"></div>';
				// }
				
				_html+='</div></div>';
				// 总交易笔数
				var total_trade=arr[i]["total_trade"]?arr[i]["total_trade"]:0;
				var total_trade_ranking_order=arr[i]["total_trade_ranking_order"]?arr[i]["total_trade_ranking_order"]:0;
				var total_trade_ranking=arr[i]["total_trade_ranking"]?arr[i]["total_trade_ranking"]:0;
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box"><div class="p1_txt_div6">';
				var val=$m.cuter10(total_trade);
				_html+='<!-- '+a["type1"][14]+' --><span class="p1_spn4">'+val+'</span><span>'+a["type1"][14]+'</span><br/>';
				
				_html+='<span>'+a["type1"][15]+'</span><span>'+total_trade_ranking+'</span>';
				if(total_trade_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(total_trade_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
	       		// 连带交易笔数
	       		var related_trade=arr[i]["related_trade"]?arr[i]["related_trade"]:0;
	       		var related_trade_ranking_order=arr[i]["related_trade_ranking_order"]?arr[i]["related_trade_ranking_order"]:0;
	       		var related_trade_ranking=arr[i]["related_trade_ranking"]?arr[i]["related_trade_ranking"]:0;
				val=$m.cuter10(related_trade);
				_html+='<!-- '+a["type1"][16]+' --><div><span class="p1_spn4">'+val+'</span><span>'+a["type1"][16]+'</span><br/>';
				
				_html+='<span>'+a["type1"][17]+'</span><span>'+related_trade_ranking+'</span>';
				if(related_trade_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(related_trade_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
				_html+='</div>';
				// 连带率
				var related_rate=arr[i]["related_rate"]?arr[i]["related_rate"]:0;
				var related_rate_ranking_order=arr[i]["related_rate_ranking_order"]?arr[i]["related_rate_ranking_order"]:0;
				var related_rate_ranking=arr[i]["related_rate_ranking"]?arr[i]["related_rate_ranking"]:0;
				var val=related_rate*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<!-- '+a["type1"][18]+' --><div><span class="p1_spn4">'+val+'</span><span>'+a["type1"][18]+'</span><br/>';
				
				_html+='<span>'+a["type1"][19]+'</span><span>'+related_rate_ranking+'</span>';
				if(related_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(related_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
				_html+='</div>';
				_html+='</div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_r js_move7 type1_mask"></div>';
				// }
				_html+='</div></div></div></div><!-- end of center -->';
				// 底部半圆
				_html+='<!-- 底部半圆 --><div class="p1_bot_div"><div class="p1_b_txt">';
				var datetime=arr[i]["datetime"]?arr[i]["datetime"]:"";
				var date_arr=datetime.split("-");
				var y=date_arr[0]?date_arr[0]:2016;
				var m=date_arr[1]?date_arr[1]:1;
				var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				_html+='<span class="p1_date_spn">'+y+'年'+m+'月</span><br>';
				_html+='<span class="ranking_spn">总排名:第'+total_score_ranking+'位</span><br>';
				_html+='<span>比上月进步:'+arr[i]["total_score_ranking"]+'位</span><br>';
				_html+='<span>进步排名:第'+arr[i]["total_score_ranking"]+'位</span><br>';

		        if(len==1 || i==len-1){
					if(arr[i]["total_score_ranking"]<=90){
			            _html+='<span class="p1_atten_spn">恭喜你上榜了，好棒！请继续保持！</span>';
			        }else{
			            _html+='<span class="p1_atten_spn">很遗憾，本月没有上榜，请继续加油哦~</span>';
			        }
				}else{
					var now_month=arr[i]["total_score_ranking"];
					var prev_month=arr[i+1]["total_score_ranking"];
					if(prev_month<=90){
						if(now_month<=90){
							_html+='<span class="p1_atten_spn">连续两个月都上榜，好棒！请继续保持！</span>';
						}else{
							_html+='<span class="p1_atten_spn">很遗憾，这个月掉出了榜单，请继续加油哦~</span>';
						}
					}else if(prev_month<=180){
						if(now_month<=90){
							_html+='<span class="p1_atten_spn">本月上榜啦，恭喜！请继续保持！</span>';
						}else if(now_month<=180){
							_html+='<span class="p1_atten_spn">再努力一下，进榜不是梦！</span>';
						}else{
							_html+='<span class="p1_atten_spn">本月有退步，请继续加油哦~</span>';
						}
					}else{
						if(now_month<=90){
							_html+='<span class="p1_atten_spn">本月上榜啦，恭喜！请继续保持！</span>';
						}else if(now_month<=180){
							_html+='<span class="p1_atten_spn">本月有进步，离上榜更进一步了，请继续加油~</span>';
						}else{
							_html+='<span class="p1_atten_spn">继续加油哦，你一定会成功~</span>';
						}
					}
				}
		        _html+='</div></div></div>';
			}
		}else if(nType==2){
			// Cabin SEC
			for(var i=0,len=arr.length;i<len;i++){
				// 搞一个日期先
				var op_html='';
				var datetime="";
				for(var j=0;j<len;j++){
					datetime=arr[j]["datetime"]?arr[j]["datetime"]:"";
					if(i==j){
						op_html+='<option selected="selected">'+datetime.substr(0,7)+'</option>'
					}else{
						op_html+='<option>'+datetime.substr(0,7)+'</option>';
					}
					
				}
				// 页面主题
				var id=arr[i]["id"]?arr[i]["id"]:"";
				var total_score=arr[i]["total_score"]?arr[i]["total_score"]:"";
				var type=arr[i]["type"]?arr[i]["type"]:"";
				var type_name=arr[i]["type_name"]?arr[i]["type_name"]:"";
				var count=arr[i]["count"]?arr[i]["count"]:"";
				_html+='<div class="swiper-slide p1_slide_type2" data-id="'+id+'" data-total="'+total_score+'" data-type="'+type+'">';
				_html+='<!-- 底部半圆 --><div class="p1_tit"><div class="p1_h_div">';
				_html+='<span>'+type_name+'</span><br/>';
				_html+='<span>共'+count+'人</span><br/>';
				_html+='<select class="js_select p1_select inputstyle">'+op_html+'</select>';
				_html+='</div></div>';
				var h_pic=arr[i]["avatar"]?arr[i]["avatar"]:$m.img_url+"defualt_pic.jpg";
				var name=arr[i]["name"]?arr[i]["name"]:"";
				var userid=arr[i]["userid"]?arr[i]["userid"]:"";
				var counter=arr[i]["counter"]?arr[i]["counter"]:"";
				_html+='<!-- 头像 --><div class="p1_head_picbox"><img src="'+h_pic+'" alt="头像"/></div>';
				_html+='<!-- 中间部分 --><div class="p1_center"><!-- 中线 --><div class="line_center"></div><!-- 人物基本信息 --><div class="p1_sect1 clear" style="padding-top:0.5em">';
				_html+='<!-- 左 --><div class="p1_l"><div class="p1_l_box base_info1">';
				_html+='<span>姓名:</span><span>'+name+'</span><br/>';
				_html+='<span>工号:</span><span>'+userid+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move1"></div></div></div>';
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box base_info2"><div class="p1_txt_div1">';
				_html+='<span>柜台:</span><span>'+counter+'</span></div><!-- 遮罩 --><div class="p1_mask p1_mask_r js_move2"></div></div></div></div>';
				// 蓝色开始 
				_html+='<!-- 蓝色 --><div class="p1_sect1 clear p2_type" style="margin-top: 0.5em;"><!-- 左 --><div class="p1_l"><div class="p1_l_box">';
				// 满床率
				var full_bed_rate=arr[i]["full_bed_rate"]?arr[i]["full_bed_rate"]:0;
				var full_bed_rate_ranking_order=arr[i]["full_bed_rate_ranking_order"]?arr[i]["full_bed_rate_ranking_order"]:0;
				var full_bed_rate_ranking=arr[i]["full_bed_rate_ranking"]?arr[i]["full_bed_rate_ranking"]:0;
					// 有年度销售额
				var val=full_bed_rate;
				_html+='<!-- '+a["type2"][0]+' --><div class="p1_txt_div2"><span class="p1_spn5">'+val+'</span><span>'+a["type2"][0]+'</span><br/>';
				if(full_bed_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(full_bed_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type2"][1]+'</span><span>'+full_bed_rate_ranking+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move3 type2_mask" data-type="right"></div></div>';
				// 美容坊销售
				var month_sales=arr[i]["month_sales"]?arr[i]["month_sales"]:0;
				var month_sales_ranking_order=arr[i]["month_sales_ranking_order"]?arr[i]["month_sales_ranking_order"]:0;
				var month_sales_ranking=arr[i]["month_sales_ranking"]?arr[i]["month_sales_ranking"]:0;
				var val=$m.cuter10(month_sales);
				_html+='<!-- '+a["type2"][2]+' --><div class="p1_txt_div3"><span class="p1_spn3">'+val+'</span><span>'+a["type2"][2]+'</span><br/>';
				if(month_sales_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(month_sales_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type2"][3]+'</span><span>'+month_sales_ranking+'</span>';
				// 美容坊销售占比
				var sales_account=arr[i]["sales_account"]?arr[i]["sales_account"]:0;
				var sales_account_ranking_order=arr[i]["sales_account_ranking_order"]?arr[i]["sales_account_ranking_order"]:0;
				var sales_account_ranking=arr[i]["sales_account_ranking"]?arr[i]["sales_account_ranking"]:0;
				var val=sales_account*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type2"][4]+' --><span class="p1_spn3">'+val+'</span>';
				_html+='<span>'+a["type2"][4]+'</span><br/>';
				if(sales_account_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(sales_account_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type2"][5]+'</span><span>'+sales_account_ranking+'</span></div>';
				// 美容坊购买率
				var purchase_rate=arr[i]["purchase_rate"]?arr[i]["purchase_rate"]:0;
				var purchase_rate_ranking_order=arr[i]["purchase_rate_ranking_order"]?arr[i]["purchase_rate_ranking_order"]:0;
				var purchase_rate_ranking=arr[i]["purchase_rate_ranking"]?arr[i]["purchase_rate_ranking"]:0;
				var val=purchase_rate*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type2"][6]+' --><span class="p1_spn3">'+val+'</span>';
				_html+='<span>'+a["type2"][6]+'</span><br/>';
				if(purchase_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(purchase_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type2"][7]+'</span><span>'+purchase_rate_ranking+'</span></div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_l js_move4 type2_mask" data-type="right"></div>';
				_html+='</div></div></div>';

				// 新客招募
				var new_custoner=arr[i]["new_custoner"]?arr[i]["new_custoner"]:0;
				var new_customer_ranking_order=arr[i]["new_customer_ranking_order"]?arr[i]["new_customer_ranking_order"]:0;
				var new_customer_ranking=arr[i]["new_customer_ranking"]?arr[i]["new_customer_ranking"]:0;
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box"><div class="p1_txt_div4">';
				var val=new_custoner*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<!-- '+a["type2"][8]+' --><span class="p1_spn2">'+val+'</span><span>'+a["type2"][8]+'</span><br/>';
				_html+='<span>'+a["type2"][9]+'</span><span>'+new_customer_ranking+'</span>';
				if(new_customer_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(new_customer_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
	       		// 转化
	       		var change=arr[i]["change"]?arr[i]["change"]:0;
	       		var change_ranking_order=arr[i]["change_ranking_order"]?arr[i]["change_ranking_order"]:0;
	       		var change_ranking=arr[i]["change_ranking"]?arr[i]["change_ranking"]:0;
				var val=change*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type2"][10]+' --><span class="p1_spn2">'+val+'</span>';
				_html+='<span>'+a["type2"][10]+'</span><br/>';
				
				_html+='<span>'+a["type2"][11]+'</span><span>'+change_ranking+'</span>';
				if(change_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(change_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
				_html+='</div>';
				// 升级
				var promote=arr[i]["promote"]?arr[i]["promote"]:0;
				var promote_ranking_order=arr[i]["promote_ranking_order"]?arr[i]["promote_ranking_order"]:0;
				var promote_ranking=arr[i]["promote_ranking"]?arr[i]["promote_ranking"]:0;
				var val=promote*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type2"][12]+' --><span class="p1_spn2">'+val+'</span>';
				_html+='<span>'+a["type2"][12]+'</span><br/>';
				_html+='<span>'+a["type2"][13]+'</span><span>'+promote_ranking+'</span>';
				if(promote_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(promote_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
				_html+='</div>';
				// 维护
				var maintenance=arr[i]["maintenance"]?arr[i]["maintenance"]:0;
				var maintenance_ranking_order=arr[i]["maintenance_ranking_order"]?arr[i]["maintenance_ranking_order"]:0;
				var maintenance_ranking=arr[i]["maintenance_ranking"]?arr[i]["maintenance_ranking"]:0;
				var val=maintenance*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type2"][14]+' --><span class="p1_spn2">'+val+'</span>';
				_html+='<span>'+a["type2"][14]+'</span><br/>';
				
				_html+='<span>'+a["type2"][15]+'</span><span>'+maintenance_ranking+'</span>';
				if(maintenance_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(maintenance_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
				_html+='</div>';
				// _html+='<!-- 遮罩 --><div class="p1_mask p1_mask_r js_move6 type2_mask" data-type="left"></div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_r js_move5 type2_mask" data-type="right"></div>';
				_html+='</div></div></div>';
				_html+='</div></div>';
				_html+='<!-- end of center -->';
				// 底部半圆
				_html+='<!-- 底部半圆 --><div class="p1_bot_div"><div class="p1_b_txt">';
				var datetime=arr[i]["datetime"]?arr[i]["datetime"]:"";
				var date_arr=datetime.split("-");
				var y=date_arr[0]?date_arr[0]:2016;
				var m=date_arr[1]?date_arr[1]:1;
				var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				_html+='<span class="p1_date_spn">'+y+'年'+m+'月</span><br>';
				_html+='<span class="ranking_spn">总排名:第'+total_score_ranking+'位</span><br>';
				_html+='<span>比上月进步:'+arr[i]["total_score_ranking"]+'位</span><br>';
				_html+='<span>进步排名:第'+arr[i]["total_score_ranking"]+'位</span><br>';

		        if(i==0){
					if(arr[i]["total_score_ranking"]<=4){
			            _html+='<span class="p1_atten_spn">恭喜你上榜了，好棒！请继续保持！</span>';
			        }else{
			            _html+='<span class="p1_atten_spn">很遗憾，本月没有上榜，请继续加油哦~</span>';
			        }
				}else{
					var now_month=arr[i]["total_score_ranking"];
					var prev_month=arr[i-1]["total_score_ranking"];
					if(prev_month<=4){
						if(now_month<=4){
							_html+='<span class="p1_atten_spn">连续两个月都上榜，好棒！请继续保持！</span>';
						}else{
							_html+='<span class="p1_atten_spn">很遗憾，这个月掉出了榜单，请继续加油哦~</span>';
						}
					}else{
						if(now_month<=4){
							_html+='<span class="p1_atten_spn">本月上榜啦，恭喜！请继续保持！</span>';
						}else{
							_html+='<span class="p1_atten_spn">再努力一下，进榜不是梦！</span>';
						}
					}
				}
		        _html+='</div></div></div>';
			}
		}else if(nType==3){
			// Btq mngr
			for(var i=0,len=arr.length;i<len;i++){
				// 搞一个日期先
				var op_html='';
				var datetime="";
				for(var j=0;j<len;j++){
					datetime=arr[j]["datetime"]?arr[j]["datetime"]:"";
					if(i==j){
						op_html+='<option selected="selected">'+datetime.substr(0,7)+'</option>'
					}else{
						op_html+='<option>'+datetime.substr(0,7)+'</option>';
					}
					
				}
				// 页面主题
				var id=arr[i]["id"]?arr[i]["id"]:"";
				var total_score=arr[i]["total_score"]?arr[i]["total_score"]:"";
				var type=arr[i]["type"]?arr[i]["type"]:"";
				var type_name=arr[i]["type_name"]?arr[i]["type_name"]:"";
				var count=arr[i]["count"]?arr[i]["count"]:"";
				_html+='<div class="swiper-slide p1_slide_type3" data-id="'+id+'" data-total="'+total_score+'" data-type="'+type+'">';
				_html+='<!-- 底部半圆 --><div class="p1_tit"><div class="p1_h_div">';
				_html+='<span>'+type_name+'</span><br/>';
				_html+='<span>共'+count+'人</span><br/>';
				_html+='<select class="js_select p1_select inputstyle">'+op_html+'</select>';
				_html+='</div></div>';
				var h_pic=arr[i]["avatar"]?arr[i]["avatar"]:$m.img_url+"defualt_pic.jpg";
				var name=arr[i]["name"]?arr[i]["name"]:"";
				var userid=arr[i]["userid"]?arr[i]["userid"]:"";
				var counter=arr[i]["counter"]?arr[i]["counter"]:"";
				_html+='<!-- 头像 --><div class="p1_head_picbox"><img src="'+h_pic+'" alt="头像"/></div>';
				_html+='<!-- 中间部分 --><div class="p1_center"><!-- 中线 --><div class="line_center"></div><!-- 人物基本信息 --><div class="p1_sect1 clear" style="padding-top:0.5em">';
				_html+='<!-- 左 --><div class="p1_l"><div class="p1_l_box base_info1">';
				_html+='<span>姓名:</span><span>'+name+'</span><br/>';
				_html+='<span>工号:</span><span>'+userid+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move1"></div></div></div>';
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box base_info2"><div class="p1_txt_div1">';
				_html+='<span>柜台:</span><span>'+counter+'</span></div><!-- 遮罩 --><div class="p1_mask p1_mask_r js_move2"></div></div></div></div>';
				// 蓝色开始
				_html+='<!-- 蓝色 --><div class="p1_sect1 clear p3_type" style="margin-top: 0.5em;"><!-- 左 --><div class="p1_l"><div class="p1_l_box">';
				// 神秘访客分数
				var mystery_visitor_score=arr[i]["mystery_visitor_score"]?arr[i]["mystery_visitor_score"]:0;
				var mystery_visitor_score_ranking_order=arr[i]["mystery_visitor_score_ranking_order"]?arr[i]["mystery_visitor_score_ranking_order"]:0;
				var mystery_visitor_score_ranking=arr[i]["mystery_visitor_score_ranking"]?arr[i]["mystery_visitor_score_ranking"]:0;
				var val=$m.cuter10(mystery_visitor_score);
				// 有年度销售额
				_html+='<!-- '+a["type3"][0]+' --><div class="p1_txt_div2"><span class="p1_spn5">'+val+'</span><span>'+a["type3"][0]+'</span><br/>';
				if(mystery_visitor_score_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(mystery_visitor_score_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type3"][1]+'</span><span>'+mystery_visitor_score_ranking+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move3 type2_mask" data-type="right"></div></div>';
				// 对比chanel指数
				var contrast_chanel=arr[i]["contrast_chanel"]?arr[i]["contrast_chanel"]:0;
				var contrast_chanel_ranking_order=arr[i]["contrast_chanel_ranking_order"]?arr[i]["contrast_chanel_ranking_order"]:0;
				var contrast_chanel_ranking=arr[i]["contrast_chanel_ranking"]?arr[i]["contrast_chanel_ranking"]:0;
				var val=contrast_chanel;
				_html+='<!-- '+a["type3"][2]+' --><div class="p1_txt_div3"><span class="p1_spn2">'+val+'</span><span>'+a["type3"][2]+'</span><br/>';
				if(contrast_chanel_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(contrast_chanel_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type3"][3]+'</span><span>'+contrast_chanel_ranking+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move4 type2_mask"></div></div>';
				_html+='</div></div>';

				// 右边的蓝色
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box"><div class="p1_txt_div4">';
				// 柜台新客二次回柜率
				var return_rate=arr[i]["return_rate"]?arr[i]["return_rate"]:0;
				var return_rate_ranking_order=arr[i]["return_rate_ranking_order"]?arr[i]["return_rate_ranking_order"]:0;
				var return_rate_ranking=arr[i]["return_rate_ranking"]?arr[i]["return_rate_ranking"]:0;
				var val=return_rate*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<!-- '+a["type3"][4]+' --><span class="p1_spn4">'+val+'</span><span>'+a["type3"][4]+'</span><br/>';
				if(return_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(return_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type3"][5]+'</span>'+return_rate_ranking+'<span></span>';
				// 柜台老客回柜率
				var old_return_rate=arr[i]["old_return_rate"]?arr[i]["old_return_rate"]:0;
				var old_return_rate_ranking_order=arr[i]["old_return_rate_ranking_order"]?arr[i]["old_return_rate_ranking_order"]:0;
				var old_return_rate_ranking=arr[i]["old_return_rate_ranking"]?arr[i]["old_return_rate_ranking"]:0;
				var val=old_return_rate*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type3"][6]+' --><span class="p1_spn4">'+val+'</span>';
				_html+='<span>'+a["type3"][6]+'</span><br/>';
				if(old_return_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(old_return_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type3"][7]+'</span><span>'+old_return_rate_ranking+'</span></div>';
				// 柜台连带率
				var related_rate=arr[i]["related_rate"]?arr[i]["related_rate"]:0;
				var related_rate_ranking_order=arr[i]["related_rate_ranking_order"]?arr[i]["related_rate_ranking_order"]:0;
				var related_rate_ranking=arr[i]["related_rate_ranking"]?arr[i]["related_rate_ranking"]:0;
				var val=related_rate*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type3"][8]+' --><span class="p1_spn4">'+val+'</span>';
				_html+='<span>'+a["type3"][8]+'</span><br/>';
				if(related_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(related_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type3"][9]+'</span><span>'+related_rate_ranking+'</span></div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_r js_move5 type2_mask" data-type="left"></div>';
				_html+='</div></div></div>';
				_html+='</div></div>';
				_html+='<!-- end of center -->';
				// 底部半圆
				_html+='<!-- 底部半圆 --><div class="p1_bot_div"><div class="p1_b_txt">';
				var datetime=arr[i]["datetime"]?arr[i]["datetime"]:"";
				var date_arr=datetime.split("-");
				var y=date_arr[0]?date_arr[0]:2016;
				var m=date_arr[1]?date_arr[1]:1;
				var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				_html+='<span class="p1_date_spn">'+y+'年'+m+'月</span><br>';
				_html+='<span class="ranking_spn">总排名:第'+total_score_ranking+'位</span><br>';
				_html+='<span>比上月进步:'+arr[i]["total_score_ranking"]+'位</span><br>';
				_html+='<span>进步排名:第'+arr[i]["total_score_ranking"]+'位</span><br>';

		        if(i==0){
					if(arr[i]["total_score_ranking"]<=2){
			            _html+='<span class="p1_atten_spn">恭喜你上榜了，好棒！请继续保持！</span>';
			        }else{
			            _html+='<span class="p1_atten_spn">很遗憾，本月没有上榜，请继续加油哦~</span>';
			        }
				}else{
					var now_month=arr[i]["total_score_ranking"];
					var prev_month=arr[i-1]["total_score_ranking"];
					if(prev_month<=2){
						if(now_month<=2){
							_html+='<span class="p1_atten_spn">连续两个月都上榜，好棒！请继续保持！</span>';
						}else{
							_html+='<span class="p1_atten_spn">很遗憾，这个月掉出了榜单，请继续加油哦~</span>';
						}
					}else{
						if(now_month<=2){
							_html+='<span class="p1_atten_spn">本月上榜啦，恭喜！请继续保持！</span>';
						}else{
							_html+='<span class="p1_atten_spn">再努力一下，进榜不是梦！</span>';
						}
					}
				}
		        _html+='</div></div></div>';
			}

		}else if(nType==4){
			// MUA
		}else if(nType==5){
			// Event Team
			for(var i=0,len=arr.length;i<len;i++){
				// 搞一个日期先
				var op_html='';
				var datetime="";
				for(var j=0;j<len;j++){
					datetime=arr[j]["datetime"]?arr[j]["datetime"]:"";
					if(i==j){
						op_html+='<option selected="selected">'+datetime.substr(0,7)+'</option>'
					}else{
						op_html+='<option>'+datetime.substr(0,7)+'</option>';
					}
					
				}
				// 页面主题
				var id=arr[i]["id"]?arr[i]["id"]:"";
				var total_score=arr[i]["total_score"]?arr[i]["total_score"]:"";
				var type=arr[i]["type"]?arr[i]["type"]:"";
				var type_name=arr[i]["type_name"]?arr[i]["type_name"]:"";
				var count=arr[i]["count"]?arr[i]["count"]:"";
				_html+='<div class="swiper-slide p1_slide_type5" data-id="'+id+'" data-total="'+total_score+'" data-type="'+type+'">';
				_html+='<!-- 底部半圆 --><div class="p1_tit"><div class="p1_h_div">';
				_html+='<span>'+type_name+'</span><br/>';
				_html+='<span>共'+count+'人</span><br/>';
				_html+='<select class="js_select p1_select inputstyle">'+op_html+'</select>';
				_html+='</div></div>';
				var h_pic=arr[i]["avatar"]?arr[i]["avatar"]:$m.img_url+"defualt_pic.jpg";
				var name=arr[i]["name"]?arr[i]["name"]:"";
				var userid=arr[i]["userid"]?arr[i]["userid"]:"";
				var counter=arr[i]["counter"]?arr[i]["counter"]:"";
				_html+='<!-- 头像 --><div class="p1_head_picbox"><img src="'+h_pic+'" alt="头像"/></div>';
				_html+='<!-- 中间部分 --><div class="p1_center"><!-- 中线 --><div class="line_center"></div><!-- 人物基本信息 --><div class="p1_sect1 clear" style="padding-top:0.5em">';
				_html+='<!-- 左 --><div class="p1_l"><div class="p1_l_box base_info1">';
				_html+='<span>姓名:</span><span>'+name+'</span><br/>';
				_html+='<span>工号:</span><span>'+userid+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move1"></div></div></div>';
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box base_info2"><div class="p1_txt_div1">';
				_html+='<span>柜台:</span><span>'+counter+'</span></div><!-- 遮罩 --><div class="p1_mask p1_mask_r js_move2"></div></div></div></div>';
				// 蓝色开始
				_html+='<!-- 蓝色 --><div class="p1_sect1 clear p5_type" style="margin-top: 0.5em;"><!-- 左 --><div class="p1_l"><div class="p1_l_box">';
				// 活动实际销售
				var activity_sales=arr[i]["activity_sales"]?arr[i]["activity_sales"]:0;
				var activity_sales_ranking_order=arr[i]["activity_sales_ranking_order"]?arr[i]["activity_sales_ranking_order"]:0;
				var activity_sales_ranking=arr[i]["activity_sales_ranking"]?arr[i]["activity_sales_ranking"]:0;
				var val=$m.cuter10(activity_sales);
				// 有年度销售额
				_html+='<!-- '+a["type5"][0]+' --><div class="p1_txt_div2"><span class="p1_spn6">'+val+'</span><span>'+a["type5"][0]+'</span><br/>';
				if(activity_sales_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(activity_sales_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type5"][1]+'</span><span>'+activity_sales_ranking+'</span>';
				// 活动达成率
				var activity_reach_rate=arr[i]["activity_reach_rate"]?arr[i]["activity_reach_rate"]:0;
				var activity_reach_rate_ranking_order=arr[i]["activity_reach_rate_ranking_order"]?arr[i]["activity_reach_rate_ranking_order"]:0;
				var activity_reach_rate_ranking=arr[i]["activity_reach_rate_ranking"]?arr[i]["activity_reach_rate_ranking"]:0;
				var val=activity_reach_rate*100;
				val=val.toFixed(0);
				val=val+"%";
				_html+='<div><!-- '+a["type5"][2]+' --><span class="p1_spn6">'+val+'</span>';
				_html+='<span>'+a["type5"][2]+'</span><br/>';
				if(activity_reach_rate_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(activity_reach_rate_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type5"][3]+'</span><span>'+activity_reach_rate_ranking+'</span></div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_l js_move3 type5_mask" data-type="right"></div></div>';
				// 主管评分
				var manage_score=arr[i]["manage_score"]?arr[i]["manage_score"]:0;
				var manage_score_ranking_order=arr[i]["manage_score_ranking_order"]?arr[i]["manage_score_ranking_order"]:0;
				var manage_score_ranking=arr[i]["manage_score_ranking"]?arr[i]["manage_score_ranking"]:0;
				var val=manage_score;
				// 有新客户
				_html+='<!-- '+a["type5"][8]+' --><div class="p1_txt_div3"><span class="p1_spn3">'+val+'</span><span>'+a["type5"][8]+'</span><br/>';
				if(manage_score_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(manage_score_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{}
				_html+='<span>'+a["type5"][9]+'</span><span>'+manage_score_ranking+'</span><!-- 遮罩 --><div class="p1_mask p1_mask_l js_move4 type5_mask"></div></div>';
				_html+='</div></div>';


				// 右边的蓝色
				_html+='<!-- 右 --><div class="p1_r"><div class="p1_r_box"><div class="p1_txt_div4">';
				// 新客招募人数
				var new_customer=arr[i]["new_customer"]?arr[i]["new_customer"]:0;
				var new_customer_ranking_order=arr[i]["new_customer_ranking_order"]?arr[i]["new_customer_ranking_order"]:0;
				var new_customer_ranking=arr[i]["new_customer_ranking"]?arr[i]["new_customer_ranking"]:0;
				var val=$m.cuter10(new_customer);
				// 有二次购买
				_html+='<!-- '+a["type5"][4]+' --><span class="p1_spn2">'+val+'</span><span>'+a["type5"][4]+'</span><br/>';
				_html+='<span>'+a["type5"][5]+'</span>'+new_customer_ranking+'<span></span>';
				if(new_customer_ranking_order==1){
				    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
				}else if(new_customer_ranking_order==2){
				    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
	       		}else{};
				// 新客招募达成
				var new_customer_reach=arr[i]["new_customer_reach"]?arr[i]["new_customer_reach"]:0;
				var new_customer_reach_ranking_order=arr[i]["new_customer_reach_ranking_order"]?arr[i]["new_customer_reach_ranking_order"]:0;
				var new_customer_reach_ranking=arr[i]["new_customer_reach_ranking"]?arr[i]["new_customer_reach_ranking"]:0;
				if(arr[i]["new_customer_reach"] && arr[i]["new_customer_reach"]!=undefined){
					var val=arr[i]["new_customer_reach"]?arr[i]["new_customer_reach"]:0;
					val=val*100;
					val=val.toFixed(0);
					val=val+"%";
					_html+='<div><!-- '+a["type5"][6]+' --><span class="p1_spn2">'+val+'</span>';
					_html+='<span>'+a["type5"][6]+'</span><br/>';
					_html+='<span>'+a["type5"][7]+'</span><span>'+new_customer_reach_ranking+'</span>';
					if(new_customer_reach_ranking_order==1){
					    _html+='<img src="'+this.img_src[0]+'" alt="icon"/>';
					}else if(new_customer_reach_ranking_order==2){
					    _html+='<img src="'+this.img_src[1]+'" alt="icon"/>';
		       		}else{};
					
				}
				_html+='</div>';
				_html+='<!-- 遮罩 --><div class="p1_mask p1_mask_r js_move5 type5_mask" data-type="left"></div>';
				_html+='</div></div></div>';
				_html+='</div></div>';
				_html+='<!-- end of center -->';
				// 底部半圆
				_html+='<!-- 底部半圆 --><div class="p1_bot_div"><div class="p1_b_txt">';
				var datetime=arr[i]["datetime"]?arr[i]["datetime"]:"";
				var date_arr=datetime.split("-");
				var y=date_arr[0]?date_arr[0]:2016;
				var m=date_arr[1]?date_arr[1]:1;
				var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				// var total_score_ranking=arr[i]["total_score_ranking"]?arr[i]["total_score_ranking"]:0;
				_html+='<span class="p1_date_spn">'+y+'年'+m+'月</span><br>';
				_html+='<span class="ranking_spn">总排名:第'+total_score_ranking+'位</span><br>';
				_html+='<span>比上月进步:'+arr[i]["total_score_ranking"]+'位</span><br>';
				_html+='<span>进步排名:第'+arr[i]["total_score_ranking"]+'位</span><br>';

		        if(i==0){
					if(arr[i]["total_score_ranking"]<=2){
			            _html+='<span class="p1_atten_spn">恭喜你上榜了，好棒！请继续保持！</span>';
			        }else{
			            _html+='<span class="p1_atten_spn">很遗憾，本月没有上榜，请继续加油哦~</span>';
			        }
				}else{
					var now_month=arr[i]["total_score_ranking"];
					var prev_month=arr[i-1]["total_score_ranking"];
					if(prev_month<=2){
						if(now_month<=2){
							_html+='<span class="p1_atten_spn">连续两个月都上榜，好棒！请继续保持！</span>';
						}else{
							_html+='<span class="p1_atten_spn">很遗憾，这个月掉出了榜单，请继续加油哦~</span>';
						}
					}else{
						if(now_month<=2){
							_html+='<span class="p1_atten_spn">本月上榜啦，恭喜！请继续保持！</span>';
						}else{
							_html+='<span class="p1_atten_spn">再努力一下，进榜不是梦！</span>';
						}
					}
				}
		        _html+='</div></div></div>';
			}
		}else{}
		// 生成dom节点
		$("#dom_parent").html(_html);
		$("#hide_div").fadeOut(200);
		$("#content").animate({"opacity":1},200);
		// 刷新
		mySwiper.update();
	    toResize();
		var n_index=$("#dom_parent>.swiper-slide").length-1<0?0:$("#dom_parent>.swiper-slide").length-1;

		// 左右切换
		if(n_index==0){
			$m.mainAnimate($(".swiper-slide").eq(0),$(".swiper-slide").eq(0).attr("data-type"));
		}else{
			mySwiper.slideTo(n_index,1);
		}
	}
}