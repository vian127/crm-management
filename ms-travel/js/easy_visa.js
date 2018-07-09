// 表单验证
	var user_arr={"account":"","password":"","yzm":"","number":"","name":"","mail":"","address":"","price":""}
	var txt_arr=["请填写账号","请输入密码","请输入验证码","请输入正确密码","验证码错误，请重新发送","请填写手机号","请输入正确手机号","请填写姓名","请填写邮箱","请选择联系人"];
// 数据库的库存
// 城市
var arr=["北京","上海","天津","广东","深圳","常州","无锡","昆山","南京","兰州","西安","郑州","合肥","乌鲁木齐","拉萨","天水","定西","常熟","大理","苏州","兰芝"];
// 国家
var country_arr=[{"name":"美国","pic_src":"5.jpg"},{"name":"法国","pic_src":"4.jpg"},{"name":"奥地利","pic_src":"2.jpg"},{"name":"澳大利亚","pic_src":"3.jpg"},{"name":"韩国","pic_src":"4.jpg"}];
$(function(){
	// 提示信息
	m.setcss({"butbg":"#3b81c6"});
	// 后台给出判断  status=0有联系人 status=1需要填写
	var status=0;
	if(status==1){
		console.log(2);
		$(".status_div").hide().eq(1).show();
	}
	// 定位
	var geolocation=new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus()==BMAP_STATUS_SUCCESS){
			var mk=new BMap.Marker(r.point);
			var theurl="http://api.map.baidu.com/geocoder/v2/?ak=5ZmIO6bXbDtdllzdMZwfXmFm&location="+r.point.lat+","+r.point.lng+"&output=json&pois=0";
			 $.ajax({type:"POST",url:theurl,dataType:'jsonp',
				success: function(response){  
					var res=response.result;
					var ac=res.addressComponent;
					// console.log(pcformat(ac.city));
					$(".js_pos_btn").text(pcformat(ac.city));
					$(".pos_city_spn").text(pcformat(ac.city));
				},
				error:function(){
					$(".js_pos_btn").text("");
					$(".pos_city_spn").text("很抱歉，获取不到您当前的位置！");
				}
			}); 
		}     
	},{enableHighAccuracy:true});
	// 生成国家列表
	sort_country(country_arr);
	// 生成城市列表
	sort_city(arr);
	// 搜索目的地
	$(".search_input").focus(function(){
		var txt=$(this).val();
		var default_txt=this.defaultValue;
		if(txt==default_txt){
			$(this).val("");
			$(this).addClass("js_nbg");
		}
	}).blur(function(){
		var txt=$(this).val();
		var default_txt=this.defaultValue;
		if(txt==default_txt || txt=="" || txt==null){
			$(this).val(default_txt);
			$(this).removeClass("js_nbg");
		}
	});
	// 国家搜索
	$(".js_country").bind("input propertychange",function(){
		var txt=$(this).val();
		if(txt=="" || txt==null){
			$(".hot_li").show();
			$(".country_ul").show();
			$(".country_li").hide();
			$(".country_list").html("");
			$(".attention_txt").text("").hide();
		}else{
			$(".hot_li").hide();
			$(".country_ul").hide();
			toMatch(country_arr,txt,$(".country_list"));
		}
	});
	// 驻地搜索
	$(".js_city").bind("input propertychange",function(){
		var txt=$(this).val();
		if(txt=="" || txt==null){
			$(".city_box>li").show();
			$(".city_ul").show();
			$(".city_li").hide();
			$(".city_list").html("");
			$(".attention_txt1").text("").hide();
		}else{
			$(".city_box>li").hide();
			$(".city_ul").hide();
			toMatch1(arr,txt,$(".city_list"));
		}
	});
	// 查看签证类型列表
	$(document).on("click",".js_btn1",function(){
		toLeft($(".page3"));
	});
	// 选择常驻地
	$(".js_pos_btn").click(function(){
		toLeft($(".page2"));
	});
	// 确认常驻地
	$(document).on("click",".js_btn2",function(){
		var txt=$(this).children(".pos_name").text();
		$(".js_pos_btn").text(txt);
		toRight($(".page2"));
	});
	// 查看签证详情
	$(".js_btn3").click(function(){
		toLeft($(".page4"),showBtn);
	});
	// 返回签证列表
	$(".back_btn1").click(function(){
		$(".fix_box").hide();
	});
	// 返回签证详情
	$(".back_btn2").click(function(){
		$(".fix_box").show();
	});
	// 购买
	$("#js_buy").click(function(){
		toLeft($(".page5"),hideBtn);
	});
	// 减人数
	$(".reduce_spn").click(function(){
		var val=toSetNum($(".num"),1);
		$(".num").val(val);
	});
	// 增人数
	$(".add_spn").click(function(){
		var val=toSetNum($(".num"));
		$(".num").val(val);
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
	// 下单
	$("#js_order").click(function(){
		user_arr.num=$(".num").val();
		if(status==1){
			toCheck();
		}else{
			if($(".js_chioce").length<=0){
				msg(txt_arr[9],"好的");
			}else{
				toLeft($(".page6"));
			}
		}
	});
	// 确认购买
	$("#js_to_buy").click(function(){
		toLeft($(".page7"));
	});
	// 确认购买
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
function showBtn(){
	$(".fix_box").show();
};
function hideBtn(){
	$(".fix_box").hide();
};
// 动画
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
//格式化省市自治区
function pcformat(txt){
	return txt.replace("省","").replace("市","").replace("维吾尔族自治区","").replace("特别行政区","").replace("自治区","");
}
// 表单验证
function toCheck(){
		user_arr["name"]=$(".input_area").eq(0).val();
		user_arr.number=$(".input_area").eq(1).val();
		user_arr.mail=$(".input_area").eq(2).val();
		user_arr.address=$(".input_area").eq(3).val()?$(".input_area").eq(3).val():"";
		if(user_arr["name"]=="" || user_arr["name"]==null || user_arr["name"]==undefined){
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
// 搜索国家
function toMatch(arr,txt,oEle){
                var _html1="";
                var _html2="";
                var _html3="";
                var _html4="";
                var a={"jp":"","qp":"","hp":""};
                var b={"jp":"","qp":"","hp":""};
                // 获取简拼
                b.fw=Pinyin.GetQP(txt)[0];
                b.jp=Pinyin.GetJP(txt);
                // 全拼
                b.qp=Pinyin.GetQP(txt);
                // 混拼
                b.hp=Pinyin.GetHP(txt);
                for(var i=0,len=arr.length;i<len;i++){
                	a.fw=Pinyin.GetQP(arr[i]["name"])[0];
                    a.jp=Pinyin.GetJP(arr[i]["name"]);
                    a.qp=Pinyin.GetQP(arr[i]["name"]);
                    a.hp=Pinyin.GetHP(arr[i]["name"]);
                    if(a.fw==b.fw){
                    	// 首字母匹配
                    	if(a.qp==b.qp){
	                        console.log(1);
	                        // 匹配
	                        _html1+='<li><a class="btn1 js_btn1" href="javascript:;"><img class="pos_pic" src="images/'+arr[i].pic_src+'" alt="'+arr[i]["name"]+'"/><span class="pos_name">'+arr[i]["name"]+'</span></a></li>';
	                        oEle.html("");
	                        oEle.html(_html1);
	                        $(".country_li").show();
	                    }else if(a.jp==b.jp){
	                        _html2+='<li><a class="btn1 js_btn1" href="javascript:;"><img class="pos_pic" src="images/'+arr[i].pic_src+'" alt="'+arr[i]["name"]+'"/><span class="pos_name">'+arr[i]["name"]+'</span></a></li>';
	                        oEle.html(_html2);
	                        $(".country_li").show();
	                    }
	                    else if(a.hp==b.hp){
	                        _html3+='<li><a class="btn1 js_btn1" href="javascript:;"><img class="pos_pic" src="images/'+arr[i].pic_src+'" alt="'+arr[i]["name"]+'"/><span class="pos_name">'+arr[i]["name"]+'</span></a></li>';
	                        oEle.html(_html3);
	                        $(".country_li").show();
	                    }else{
	                    	_html4+='<li><a class="btn1 js_btn1" href="javascript:;"><img class="pos_pic" src="images/'+arr[i].pic_src+'" alt="'+arr[i]["name"]+'"/><span class="pos_name">'+arr[i]["name"]+'</span></a></li>';
	                        oEle.html(_html4);
	                        $(".country_li").show();
	                    }
                    }
                    
                }
                if($(".country_list>li").length<1){
					$(".attention_txt").text("很抱歉，暂不支持您检索的国家！").show();
				}else{
					$(".attention_txt").text("").hide();
				}
            }
// 搜索城市
function toMatch1(arr,txt,oEle){
                var _html1="";
                var _html2="";
                var _html3="";
                var _html4="";
                var a={"jp":"","qp":"","hp":""};
                var b={"jp":"","qp":"","hp":""};
                // 获取简拼
                b.fw=Pinyin.GetQP(txt)[0];
                b.jp=Pinyin.GetJP(txt);
                // 全拼
                b.qp=Pinyin.GetQP(txt);
                // 混拼
                b.hp=Pinyin.GetHP(txt);
                for(var i=0,len=arr.length;i<len;i++){
                	a.fw=Pinyin.GetQP(arr[i])[0];
                    a.jp=Pinyin.GetJP(arr[i]);
                    a.qp=Pinyin.GetQP(arr[i]);
                    a.hp=Pinyin.GetHP(arr[i]);
                    if(a.fw==b.fw){
                    	// 首字母匹配
                    	if(a.qp==b.qp){
	                        // 匹配
	                        _html1+='<li><a class="btn1 js_btn2" href="javascript:;"><span class="pos_name">'+arr[i]+'</span></a></li>';
	                        oEle.html("");
	                        oEle.html(_html1);
	                        $(".city_li").show();
	                    }else if(a.jp==b.jp){
	                        _html2+='<li><a class="btn1 js_btn2" href="javascript:;"><span class="pos_name">'+arr[i]+'</span></a></li>';
	                        oEle.html(_html2);
	                        $(".city_li").show();
	                    }
	                    else if(a.hp==b.hp){
	                        _html3+='<li><a class="btn1 js_btn2" href="javascript:;"><span class="pos_name">'+arr[i]+'</span></a></li>';
	                        oEle.html(_html3);
	                        $(".city_li").show();
	                    }else{
	                    	_html4+='<li><a class="btn1 js_btn2" href="javascript:;"><span class="pos_name">'+arr[i]+'</span></a></li>';
	                        oEle.html(_html4);
	                        $(".city_li").show();
	                    }
                    }
                    
                }
                if($(".city_list>li").length<1){
					$(".attention_txt1").text("很抱歉，暂不支持您检索的地区！").show();
				}else{
					$(".attention_txt1").text("").hide();
				}
            }

// 排序国家
function sort_country(arr){
	var letter_arr=["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var name_arr=[];
	for(var i=0,len=letter_arr.length;i<len;i++){
		var a=Pinyin.GetQP(letter_arr[i]).toLowerCase();
		$(".country_ul").append('<li class="sort_li"><h2>'+letter_arr[i]+'</h2><ol class="recommend_list ol_'+i+'"></ol></li>');
		for(var j=0,len1=arr.length;j<len1;j++){
			var b=Pinyin.GetQP(arr[j]["name"])[0];
			if(a==b){
				var _html='<li><a class="btn1 js_btn1" href="javascript:;"><img class="pos_pic" src="images/'+arr[j].pic_src+'" alt="'+arr[j]["name"]+'"/><span class="pos_name">'+arr[j]["name"]+'</span></a></li>';
				$(".ol_"+i).append(_html);
			}
		}
	}
	$(".sort_li").each(function(){
		if($(this).children(".recommend_list").children("li").length<1){
			$(this).hide();
		}
	});
}

// 排序城市
function sort_city(arr){
	var letter_arr=["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var name_arr=[];
	for(var i=0,len=letter_arr.length;i<len;i++){
		var a=Pinyin.GetQP(letter_arr[i]).toLowerCase();
		$(".city_ul").append('<li class="sort_li1"><h2>'+letter_arr[i]+'</h2><ol class="pos_item_list ol1_'+i+'"></ol></li>');
		for(var j=0,len1=arr.length;j<len1;j++){
			var b=Pinyin.GetQP(arr[j])[0];
			if(a==b){
				var _html='<li><a class="btn1 js_btn2" href="javascript:;"><span class="pos_name">'+arr[j]+'</span></a></li>';
				$(".ol1_"+i).append(_html);
			}
		}
	}
	$(".sort_li1").each(function(){
		if($(this).children(".pos_item_list").children("li").length<1){
			$(this).hide();
		}
	});
}