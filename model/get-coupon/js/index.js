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
};
// 主体
$(function(){
	// 页面初始化加载显示
	(function(){
		// level表示当前用户的会员信息   1=是CRM会员但尚未绑定； 2=已经注册了粉丝会员的 3=可直接抢
    	// type_status代码用户的抢的状态 1=未抢 2=已抢
		var user_info={"level":3,"type_status":[1,1,1]}
		// 产品的状态 type_limit=0表示还没有过期，type_limit=1表示第一个过期， type_limit=2表示第二个过期
		var type_limit=0;
		// can_chioce=1表示还没有开始 can_chioce=2开始
		var product_status=[{"num":100,"can_chioce":1},{"num":100,"can_chioce":1},{"num":100,"can_chioce":1}]
		var now_type=parseInt($("#product_type").attr("nowType"))-1;

		// 后台获取当前时间
	    var now_time=new Date();
	    var now_y=now_time.getFullYear();
	    var now_m=parseInt(now_time.getMonth())+1;
	    var now_d=now_time.getDate();
	    var now_timeVal=now_time.getTime();
		
	    var time_obj=[{"timer":"","time_node":now_y+'/'+now_m+'/'+now_d+' 12:00:00'},{"timer":"","time_node":now_y+'/'+now_m+'/'+now_d+' 15:00:00'},{"timer":"","time_node":now_y+'/'+now_m+'/'+now_d+' 18:00:00'}];
	    for(var i=0,len=time_obj.length;i<len;i++){
	    	toShow(user_info,product_status,i,now_type);
	    	// 倒计时显示
	    	toShowTime(time_obj[i],i,now_timeVal);
	    	// 判断显示
	    	mainFunc(time_obj[i],i,now_timeVal);
	    }
		// 切换产品
		var mySwiper=new Swiper(".swiper-container",{
	        mode:'horizontal',
	        loop: false,
	        onSlideChangeEnd: function(swiper){
      			tab();
    		}
	    }); 
	    function tab(){
	    	var j = parseInt(mySwiper.activeIndex);
	            //这里可判断当前滑动到哪个产品
	            if(j==0){
	                $("#prev").hide();  
	                $("#next").show();
	                $("#product_type").attr("nowType",1);
	            }if(j==1){
	                $("#prev").show();
	                $("#next").show();
	                $("#product_type").attr("nowType",2);
	            }if(j==2){
	                $("#prev").show();
	                $("#next").hide();
	                $("#product_type").attr("nowType",3);
	            }
	            if(product_status[j].can_chioce==2 || product_status[j].can_chioce==3 || product_status[j].num<=0){
				    $(".time_box").hide();
				}else{
				    $(".time_box").eq(j).show().siblings(".time_box").hide();    
				}
				$(".js_btn").eq(j).show().siblings(".js_btn").hide();
	    }
	    mySwiper.slideTo(now_type,150,true);
	    $("#next").bind("click",function(e){
	        e.preventDefault();
	        mySwiper.slideNext();
	    });
	    $("#prev").bind("click",function(e){
	        e.preventDefault();
	        mySwiper.slidePrev();
	    });
	    // 查看规则
	    $(".rule_spn").on("click",function(){
	    	$(".float_pic").attr("src","images/bg1.jpg");
	    	$(".rule_box").show();
	    	$("#index_container").hide();
	    });
	    // 关闭规则
	    $(".close_spn").on("click",function(){
	    	$(".float_pic").attr("src","images/bg2.jpg");
	    	$("#index_container").show();
	    	$(".rule_box").hide();
	    });
	    $(".js_return").on("click",function(){
	    	$(".float_pic").attr("src","images/bg2.jpg");
	    	$("#index_container").show();
	    	$(".rule_box").hide();
	    });

	    // 判断显示页面
	    function toShow(user_arr,type_arr,now_type,show_index){
	    	if(type_arr[now_type].num>0){
	    		if(type_arr[show_index].can_chioce==2){
		    		$(".time_box").hide();
				}else{
				    $(".time_box").eq(show_index).show().siblings(".time_box").hide();
				}
		    	determine1();
	    	}else{
	    		// 抢光了
				$(".js_btn").eq(now_type).children("img").attr("src","images/btn7.png");
				$(".js_btn").eq(now_type).removeClass("can_sub");
				$(".time_box").hide();
	    	}
	    	$(".js_btn").eq(show_index).show().siblings(".js_btn").hide();
	    	$(".btn_box").show();
	    	function determine1(){
	    		// 会员判断
		    	if(user_arr.level==1){
		    		$(".js_btn").children("img").attr("src","images/btn2.png");
		    		$(".js_btn").removeClass("can_sub");
		    		$(".crm_div").show();
		    	}else if(user_arr.level==2){
		    		$(".js_btn").children("img").attr("src","images/btn2.png");
		    		$(".js_btn").removeClass("can_sub");
		    		$(".fs_div").show();
		    	}else if(user_arr.level==3){
		    		// 符合抢的条件用户
		    		if(user_arr.type_status[now_type]==1){
		    			if(type_arr[now_type].can_chioce==1){
		    				// console.log("没开始");
			    			// 还没开始
			    			$(".js_btn").eq(now_type).children("img").attr("src","images/btn6.png");
			    			$(".js_btn").eq(now_type).removeClass("can_sub");
		    			}else if(type_arr[now_type].can_chioce==2){
		    				// console.log("开始了");
			    			// 已开始
			    			// 没有抢光
			    			$(".js_btn").eq(now_type).addClass("can_sub").children("img").attr("src","images/btn5.png");
			    		}else if(type_arr[now_type].can_chioce==3){
			    			if(now_type==2){
			    				$(".time_box").hide();
			    				$(".js_btn").eq(now_type).addClass("can_sub").children("img").attr("src","images/btn5.png");
			    			}else{
			    				// 过期
			    				var _html='还剩<span style="border-left: 1px solid #555">0</span><span>0</span><span>0</span>套';
			    				$(".txt_pan3").eq(now_type).html(_html);
		    					$(".js_btn").eq(now_type).removeClass("can_sub").children("img").attr("src","images/btn7.png");
			    			}
			    		}
		    		}
		    		else{
		    			// 抢过了
				    	$(".js_btn").eq(now_type).removeClass("can_sub").children("img").attr("src","images/btn8.png");
		    		}
		    	}else{
		    		return false;
		    	}
	    	}
	    }
	    // 提交开抢
	    $(".can_sub").on("click",function(){
	    	window.location.replace("success.html");
	    });
    
    // 倒计时
    function toShowTime(obj,index,now_timeVal){
    	clearInterval(obj.timer);
    	obj.timer=setInterval(function(){
    		mainFunc(obj,index,now_timeVal);
    		now_timeVal+=1000;
    	},1000);
    }
    function mainFunc(obj,index,now_timeVal){
    	now_timeVal=Math.abs(now_timeVal);
    	var time_node=new Date(obj.time_node);
    		var time_nodeVal=time_node.getTime();
    		var has_time=parseInt(time_nodeVal-now_timeVal)/1000;
    		if(has_time>0){
	    		// 未开始
	    		var d=Math.floor(has_time /(60*60*24))
	    		var h=Math.floor((has_time-d*3600*24)/3600);
	    		var m=Math.floor((has_time-d*3600*24-h*3600)/60);
	    		var s=Math.floor((has_time-d*3600*24-h*3600-m*60));
	    		h=toDouble(h);
	    		m=toDouble(m);
	    		s=toDouble(s);
	    		$(".time_spn").eq(index).text(h+":"+m+":"+s);
	    		now_timeVal+=1000;
	    		product_status[index].can_chioce=1;
	    	}else{
	    		if(has_time<-3*3600){
	    			product_status[index].can_chioce=3;
	    		}
	    		else{
	    			product_status[index].can_chioce=2;
	    		}
	    		$(".time_spn").eq(index).text("00:00:00");
	    		clearInterval(obj.timer);
	    		toShow(user_info,product_status,index,now_type);
	    	}
    }
    // 加双
    function toDouble(num){
    	num=parseInt(num);
    	num=num<10?"0"+num:num;
    	return num;
    }
    })();
});