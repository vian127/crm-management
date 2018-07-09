/*
#author      lut
#project     dior 二期
#date        2016-03-28
*/
// 假数据
var data=[[{"fieldlist_percentages":"2","myavatar":null,"firstavatar":null,"the_proportion_of":"100%","title":"\u603b\u5206","datetime":"8","value":"879"},{"datetime":"12","value":"879"},{"datetime":"11","value":"840"},{"datetime":"10","value":"780"}],[{"fieldlist_percentages":"2","myavatar":null,"the_proportion_of":"-871%","title":"\u5f69\u5986","datetime":"8","value":"3578710"},{"datetime":"12","value":"3578710"},{"datetime":"11","value":"3375905"},{"datetime":"10","value":"3339515"}],[{"fieldlist_percentages":"2","myavatar":null,"the_proportion_of":"-5486%","title":"\u62a4\u80a4","datetime":"8","value":"389"},{"datetime":"12","value":"389"},{"datetime":"11","value":"385"},{"datetime":"10","value":"373"}],[{"fieldlist_percentages":"1","myavatar":null,"the_proportion_of":"100%","title":"\u9999\u6c34","datetime":"8","value":"0.6066838046272494"},{"datetime":"12","value":"236"},{"datetime":"11","value":"217"},{"datetime":"10","value":"207"}],[{"fieldlist_percentages":"2","myavatar":null,"the_proportion_of":"100%","title":"\u8de8\u54c1\u7c7b","datetime":"8","value":"236"},{"datetime":"12","value":"0.61"},{"datetime":"11","value":"0.56"},{"datetime":"10","value":"0.55"}],[{"fieldlist_percentages":"2","myavatar":null,"the_proportion_of":"100%","title":"\u4ea4\u6613\u7b14\u6570","datetime":"8","value":"1150"},{"datetime":"12","value":"1150"},{"datetime":"11","value":"1150"},{"datetime":"10","value":"1150"}]];
// 定义滚动
var myScroll = new IScroll('#content',
	{ 
		mouseWheel: true,
		hideScrollbar: true,
		click: true
	}
);
// 图表值得文字大小
var font_arr=[12,8,12];
var link_obj=GetRequest();
var userid=link_obj["userid"]?link_obj["userid"]:"";
// var rt_type=link_obj["rt_type"]?link_obj["rt_type"]:2;
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
	// 预处理货物
	for(var i=1,len=data.length;i<len;i++){
		var type=data[i][0]["fieldlist_percentages"]?data[i][0]["fieldlist_percentages"]:0;
		$m.data_type.push(type);
	}
	$m.data_arr1=data.shift();
	$m.data_arr2=data;
	$m.setSty();
	var nlen=data.length?data.length:0;
	$(".js_object").text(nlen+"项单项");
	$m.toSetDom(data);
	// $.ajax({
	// 	type: "POST",
	// 	url: $m.ajax_link,
	// 	dataType: "json",
	// 	data: {userid:userid,rt_type:2},
	// 	success: function(data){
	// 		if(data){
	// 			// 有货
	// 			// 预处理货物
	// 			// 预处理货物
	// 			for(var i=1,len=data.length;i<len;i++){
	// 				var type=data[i][0]["fieldlist_percentages"]?data[i][0]["fieldlist_percentages"]:0;
	// 				$m.data_type.push(type);
	// 			}
	// 			$m.data_arr1=data.shift();
	// 			$m.data_arr2=data;
	// 			$m.setSty();
	// 			var nlen=data.length?data.length:0;
	// 			$(".js_object").text(nlen+"项单项");
	// 			$m.toSetDom(data);
	// 		}else{
	// 			$("#swiper").hide();
	// 	        $(".att_p1").hide();
	// 	        $(".att_p3").show();
	// 		}
	// 	},
	// 	error: function(XMLHttpRequest,textStatus,errorThrown){
 //            $("#swiper").hide();
	//         $(".att_p1").hide();
	//         $(".att_p2").show();
 //        }
	// });
	
	// 定义滚动
	myScroll = new IScroll('#wrapper',
		{ 
			mouseWheel: true,
			hideScrollbar: false,
			click: true
		}
	);
	// 重设属性
	toResize();
	// 重新加载页面
	$(".js_reload").on("click",function(){
		var href=window.location.href;
		window.location.replace(href);
	});
	// 切换项
	$(".p2_list>li").on("click",function(){
		var n_index=$(".p2_list>li").index($(this));
		$(".p2_chart_box").eq(n_index).show().siblings(".p2_chart_box").hide();
		$(this).addClass("js_now").siblings("li").removeClass("js_now");
		myScroll.refresh();
	});
	// $m.toSetChart();
});
// 零件
// 切换结束执行
function changeIndex(){
	var n_index=mySwiper.activeIndex;
}
// 重新刷新
function toResize(){
	// 刷新滚动用它
	myScroll.refresh();
}
// 微信静禁止分享
function onBridgeReady(){
	WeixinJSBridge.call('hideOptionMenu');
}
// 自定义方法
var $m={
	ajax_link:"http://givenchy.weshwx.cn/dior_golden_bc/get_user",
	img_url: "images/",
	data_type: [],
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
        this.setSty();
    },
	dw: $(".page2").width() || document.documentElement.clientWidth,
	dh: document.documentElement.clientHeight,
	data_arr1:null,
	data_arr2:null,
	getM :function(){
		var n=new Date().getMonth()+1;
		var arr=[];
		for(var i=0;i<13;i++){
			arr.push(i);
		}
		return arr;
	},
	toSquare: function(obj,num){
		var ow=obj.width();
		obj.height(ow);
		var val=num?num:50;
		obj.css({"border-radius":val+"%"});
	},
	init:function(){
		var _this=this;
		$("#p2_chart1").width(this.dw);
		$("#p2_chart1").height(this.dh*0.45);
		$(".p2_chart2").each(function(){
			$(this).width(_this.dw);
			$(this).height(_this.dh*0.45);
		});
	},
	setSty:function(){
		var fs=this.dw/320;
		for(var i=0,len=font_arr.length;i<len;i++){
			var m=font_arr[i];
			font_arr[i]=m*fs;
		}
	},
	toSetDom: function(arr){
		var _html='';
		for(var i=0,len=arr.length;i<len;i++){
			var rato=arr[i][0]["the_proportion_of"]?arr[i][0]["the_proportion_of"]:"0%";
			if(parseInt(rato)<0){
				rato="0%";
			}
			var val=arr[i][0]["value"]?arr[i][0]["value"]:0;
			if(arr[i][0]["fieldlist_percentages"]==1){
				val=val*100;
				val=val.toFixed(0)+"%";
				for(var j=0,len1=$m.data_arr2[i].length;j<len1;j++){
					$m.data_arr2[i][j]["value"]=$m.data_arr2[i][j]["value"]*100;
				}
			}else if(arr[i][0]["fieldlist_percentages"]==2){
				var str=val.toString();
				var aa=str.split(".");
				if(aa.length>1){
					// 小数不处理
				}else{
					val=$m.cuter10(val);
				}
			};
			_html+='<li>';
			_html+='<h3><span>'+arr[i][0]["title"]+':</span><span>'+val+'</span></h3>';
			_html+='<!-- 坐标轴 --><div class="line_box"><div class="line_div"><div class="p2_line_t">';
			_html+='<!-- 坐标轴 --><div class="axis" style="width: '+rato+'"><!-- 人头 -->';
			_html+='<div class="my_div"><div class="p2_point_box"><div class="p2_point_div"></div>';
			_html+='<img class="p2_point" src="'+$m.img_url+'point_pic.png" alt="位置"></div>';
			_html+='<span class="js_val">'+rato+'</span></div></div></div></div></div><!-- 图表 -->';
			_html+='<div id="chart_ele'+i+'" class="p2_chart2"></div></li>';
		}
		// 生成dom先
		$(".p2_chart_list").html(_html);
		// 初始化样式
		$m.init();
		var tit_val=$m.data_arr1[0]["value"]?$m.data_arr1[0]["value"]:0;
		tit_val=$m.cuter10(tit_val);
		var txt="当月总分:"+tit_val+"（"+this.data_arr1[0]["datetime"]+"月）";
		$(".p2_tit").text(txt);
		// 初始化数据
		this.toSetChart();
	},
	toSetChart: function(){
		// 初始化图表
		// Step:3 conifg ECharts's path, link to echarts.js from current page.
	    // Step:3 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
	    require.config({
	        paths: {
	            echarts: 'js'
	            // echarts: '../js/dior'
	        }
	    });
	    // Step:4 require echarts and use it in the callback.
	    // Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
	    require(
	        [
	            'echarts',
	            'echarts/chart/line'
	        ],
	        function (ec) {
	            chart(ec);
	        }
	    );
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
}
// 图表
function chart(ec){
	// 总图表数据
	var data_obj1={"val":[],"title":"","month":[],"label":[]};
	var dotted_obj1={"val":[]};
	// var title=$m.data_arr1[0]["value"]?$m.data_arr1[0]["value"]:"";
	// data_obj1["title"]=title;
	$(".js_axis").width($m.data_arr1[0]["the_proportion_of"]);
	$(".js_myVal").text($m.data_arr1[0]["the_proportion_of"]);
	var pic1=$m.data_arr1[0]["myavatar"]?$m.data_arr1[0]["myavatar"]:$m.img_url+"defualt_pic.jpg";
	var pic2=$m.data_arr1[0]["firstavatar"]?$m.data_arr1[0]["firstavatar"]:$m.img_url+"defualt_pic.jpg";
	$(".my_h_pic").attr("src",pic1);
	$(".first_h_pic").attr("src",pic2);


	// 最后一个月数据
	var last_m=$m.data_arr1[0]["datetime"]?$m.data_arr1[0]["datetime"]:12;
	last_m=parseInt(last_m);
	// 倒序数组
	var b=$m.data_arr1.reverse();
	// 首月数据
	var first_val=b[0]["value"]?b[0]["value"]:0;
	if(first_val!=0){
		first_val=10000/first_val;
	}else{
		first_val="-";
	}
	// 初始化
	for(var j=0;j<13;j++){
		data_obj1.val[j]="-";
		dotted_obj1["val"][j]=first_val;
		data_obj1.month[j]=j;
	};
	for(var i=last_m;i<13;i++){
		dotted_obj1["val"][i]="-";
	};
	// 生成主要数据
	for(var i=0,len=b.length;i<len;i++){
		var n_num=b[i]["datetime"]?b[i]["datetime"]:12;
		n_num--;
		n_num++;
		var yValue=b[i]["value"]?b[i]["value"]:0;
		if(yValue!=0){
			yValue=10000/yValue;
		}else{
			yValue="-";
		}
		data_obj1.val[n_num]=yValue;
		dotted_obj1.val[n_num+1]="-";
		data_obj1["label"].push({
			name: i,
			value: yValue,
			xAxis: n_num,
			yAxis: yValue
		});
	};
	setLine1(ec,"p2_chart1",data_obj1,dotted_obj1,font_arr);
	// 循环生成多个图表
	for(var i=0,len=$m.data_arr2.length;i<len;i++){
		// 处理数据
		var data_obj2={"val":[],"title":"","month":[],"label":[]};
		var dotted_obj2={"val":[]};
		// var title=$m.data_arr2[0][0]["value"]?$m.data_arr2[0][0]["value"]:"";
		// data_obj2["title"]=title;
		// 最后一个月数据
		var last_m=$m.data_arr2[i][0]["datetime"]?$m.data_arr2[i][0]["datetime"]:12;
		last_m=parseInt(last_m);
		// 倒序数组
		var b=$m.data_arr2[i].reverse();
		// 首月数据
		var first_val=b[0]["value"]?b[0]["value"]:"-";
		// 初始化
		for(var j=0;j<13;j++){
			data_obj2.month[j]=j;
			data_obj2.val[j]="-";
			dotted_obj2["val"][j]=first_val;
		};
		for(var n=last_m;n<13;n++){
			dotted_obj2["val"][n]="-";
		};
		// 主数据
		for(var m=0,lenm=b.length;m<lenm;m++){
			var n_num=b[m]["datetime"]?b[m]["datetime"]:12;
			n_num--;
			n_num++;
			data_obj2.val[n_num]=b[m]["value"]?b[m]["value"]:0;
			dotted_obj2.val[n_num+1]="-";
			// data_obj2["label"][n_num]["yAxis"]=b[m]["value"]?b[m]["value"]:0;
			data_obj2["label"].push({
				name: m,
				value: b[m]["value"]?b[m]["value"]:0,
				xAxis: n_num,
				yAxis: b[m]["value"]?b[m]["value"]:0
			});
		}
		// dom
		var dom="chart_ele"+i;
		var type=$m.data_type[i];
		if(type==1){
		// 	// 百分率的
			setLine3(ec,dom,data_obj2,dotted_obj2,font_arr);
		}else if(type==2){
		// 	// 数字的
			setLine2(ec,dom,data_obj2,dotted_obj2,font_arr);
		}
	}
	// 加载结束
	$("#wrapper").fadeIn(200);
	$("#atten").hide();
	toResize();
}
// 生成图表
function setLine1(ec,str,arr,arr2,font_arr){
	//---  ---
    var myChart = ec.init(document.getElementById(str));
    myChart.setOption({
   		tooltip:{
   			show: true,
   		},
        grid : 
        	{
        		borderColor: "#fff",
        		// x: "12%",
        		// width: "82%",
        	}
        ,
        // calculable: true,
        xAxis : [
            {
                splitLine: {show : false},
                axisLabel:{
                	textStyle:{
                		fontSize: font_arr[1]
                	}
                },
                // axisTick:{
                // 	length: 20
                // },
                boundaryGap:false,
                data : arr["month"]
            }
        ],
        yAxis : [
            {
            	// show: false,
                type : 'value',
                splitLine: {show : false},
                axisTick: {show: true},
                axisLabel:{
                	show: false,
                	textStyle:{
                		fontSize: font_arr[1]
                	},
                },
            }
        ],
        series : [
            {
                // name:'总分是',
                type:'line',
                data:arr["val"],
	            itemStyle:{
					normal:{
						color: "#ff0064",
						lineStyle:{
							color: "#F95910"
						}
					}
				},
				// 点击效果
				tooltip : {             // Series config.
	                trigger: 'item',
	                backgroundColor: '#9BC1DA',
	                position : function(p) {
			            // 位置回调
			            return [p[0] -10, p[1] - 0];
			        },
	                // formatter: "{a}{b}月:{c}分",
	                formatter: function (params,ticket,callback) {
	                	var res=params.data;
			            res =10000/res;
			            res=res.toFixed(0);
			            // setTimeout(function (){
			            //     // 仅为了模拟异步回调
			                
			            // }, 500);

			            return res;
			        },
			        textStyle:{
			        	color: "#fff",
			        }
	            },
	            stack: '数据项',
            },
            {
            	type:'line',
            	data: arr2["val"],
            	symbol:"none",
            	itemStyle:{
					normal:{
						color: "#ff0064",
						lineStyle:{
							type: "dashed",
							color: "#aaa"
						}
					}
				}
            }
        ]
    });
	window.onresize = myChart.resize;
}
// 生成图表
function setLine2(ec,str,arr,arr2,font_arr){
	//---  ---
    var myChart = ec.init(document.getElementById(str));
    myChart.setOption({
    	// 设置标题
   //  	title:{
   //  		text:arr["title"],
   //  		textStyle:{
			//     fontSize: font_arr[0],
			//     fontWeight: 'bolder',
			//     color: '#242425'
			// },
			// x:20,
			// y:15,
   //  	},
	   	tooltip:{
	   		show: true,
	   			// formatter: function(){
	   			// 	return this.xAxis[0].data
	   			// },
	   	},
        grid : 
        	{
        		borderColor: "#fff",
        		y: "10%",
        		// width: "70%",
        	}
        ,
        xAxis : [
            {
                splitLine: {show : false},
                axisLabel:{
                	textStyle:{
                		fontSize: font_arr[1]
                	}
                },
                // axisTick:{
                // 	length: 20
                // },
                boundaryGap:false,
                data : arr["month"]
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {show : false},
                // axisTick: {show: true},
                axisLabel:{
                	textStyle:{
                		fontSize: font_arr[1]
                	}
                }
            }
        ],
        series : [
            {
                // name:'蒸发量',
                type:'line',
                data:arr["val"],
     //            markPoint : {
     //            	data : arr["label"],
					// itemStyle:{
					// 	normal:{
					// 		// 设置标注背景颜色
					// 		// color:"#555",
					// 		// 设置标注文字的样式
					// 		label:{
					// 			position:"top",
					// 			textStyle:{
					// 				color:"#ff0064",
					// 				fontSize:font_arr[2]
					// 			}
					// 		}
					// 	}
					// },
					// // 设置标注的大小
					// // symbol:"pin"
					// symbolSize:0
	    //         },
	            itemStyle:{
					normal:{
						color: "#ff0064",
						lineStyle:{
							color: "#F95910"
						}
					}
				}
            },
            {
            	type:'line',
            	data: arr2["val"],
            	symbol:"none",
            	itemStyle:{
					normal:{
						color: "#ff0064",
						lineStyle:{
							type: "dashed",
							color: "#aaa"
						}
					}
				}
            }
        ]
    });
	window.onresize = myChart.resize;
}


// 生成图表
function setLine3(ec,str,arr,arr2,font_arr){
	//---  ---
    var myChart = ec.init(document.getElementById(str));
    myChart.setOption({
    	// 设置标题
   //  	title:{
   //  		text:arr["title"],
   //  		textStyle:{
			//     fontSize: font_arr[0],
			//     fontWeight: 'bolder',
			//     color: '#242425'
			// },
			// x:20,
			// y:15,
   //  	},
	   	tooltip:{
	   		show: true,
	   	},
        grid : 
        	{
        		borderColor: "#fff",
        		y: "10%",
        		// width: "70%",
        	}
        ,
        xAxis : [
            {
                splitLine: {show : false},
                axisLabel:{
                	textStyle:{
                		fontSize: font_arr[1]
                	}
                },
                // axisTick:{
                // 	length: 20
                // },
                boundaryGap:false,
                data : arr["month"]
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {show : false},
                // axisTick: {show: true},
                axisLabel:{
                	textStyle:{
                		fontSize: font_arr[1]
                	},
                	interval: 'auto',
                  	formatter: '{value} %',
                },
            }
        ],
        series : [
            {
                // name:'蒸发量',
                type:'line',
                data:arr["val"],
     //            markPoint : {
     //            	data : arr["label"],
					// itemStyle:{
					// 	normal:{
					// 		// 设置标注背景颜色
					// 		// color:"#555",
					// 		// 设置标注文字的样式
					// 		label:{
					// 			position:"top",
					// 			textStyle:{
					// 				color:"#ff0064",
					// 				fontSize:font_arr[2]
					// 			}
					// 		}
					// 	}
					// },
					// // 设置标注的大小
					// // symbol:"pin"
					// symbolSize:0
	    //         },
	            itemStyle:{
					normal:{
						color: "#ff0064",
						lineStyle:{
							color: "#F95910"
						}
					}
				}
            },
            {
            	type:'line',
            	data: arr2["val"],
            	symbol:"none",
            	itemStyle:{
					normal:{
						color: "#ff0064",
						lineStyle:{
							type: "dashed",
							color: "#aaa"
						}
					}
				}
            }
        ]
    });
	window.onresize = myChart.resize;
}
