var todaytemp;
//格式化日期
var format=function(txt){
	var tempdate=new Date(Date.parse(txt.replace(/-/g,"/")));
	return tempdate;
}
//页面加载时初始化插件
var cela=function(obj,today,arr){
	//数据处理
	var dbc="#E8551F";//设置主题颜色
	var weektip=["日","一","二","三","四","五","六"];
	//页面布局
	var cf=$("<div></div>"),cf_top=$("<div></div>"),cf_but_l=$("<div></div>"),cf_title=$("<div></div>"),cf_but_r=$("<div></div>"),cf_main=$("<div></div>"),cfm_title=$("<div></div>"),cfm_main=$("<div></div>");
	cf.attr("id","cf");cf.addClass("clear");cf_top.attr("id","cf_top");cf_but_l.attr("id","cf_but_l");cf_title.attr("id","cf_title");cf_but_r.attr("id","cf_but_r");cf_main.attr("id","cf_main");cfm_title.attr("id","cfm_title");cfm_main.attr("id","cfm_main");cfm_title.addClass("clear");cfm_main.addClass("clear");cf_top.addClass("clear");
	cf_but_l.append('<img src="images/21.png" alt="上一月" style="width:1.5em;vertical-align: middle;">');
	cf_but_r.append('<img src="images/22.png" alt="上一月" style="width:1.5em;vertical-align: middle;">');
	cf.css({width:"92%","min-height":"12em","margin":"auto","border-radius":"0.3em","border":"1px solid #d2e9ff","font-family":"微软雅黑","overflow":"hide"});
	cf_top.css({width:"100%","min-height":"40px","padding":"0.5em 0em",background:"#f3f3f3","color":"#3b82c5"});
	cf_but_l.css({float:"left",width:"20%","text-align":"center","font-weight":"bold"});
	cf_title.css({float:"left",width:"60%","text-align":"center","border-radius":"5px"});
	cf_but_r.css({float:"left",width:"20%","text-align":"center","line-height":"40px","font-weight":"bold"});
	cf_main.css({width:"92%","min-height":"3em","margin":"auto","text-align":"center",border:"1px solid #ddd","border-radius":"0.3em"});
	cfm_title.css({float:"left",width:"100%","border-radius":"5px",background:"#d2e9ff","padding":"0.3em 0em","margin-top":"0.5em"});
	cfm_main.css({width:"100%","border-radius":"5px",color:"#000","padding-left":"0.1em"});

	for(var i=0;i<weektip.length;i++){
		var weekday=$("<div>"+weektip[i]+"</div>");
		weekday.css({display:"inline-block",width:"12.5%"});
		cfm_title.append(weekday);
	}
	//生成当月日历
	cf_main.append(cfm_main);
	cf_top.append(cf_but_l);
	cf_top.append(cf_title);
	cf_top.append(cf_but_r);
	cf_top.append(cfm_title);
	cf.append(cf_top);
	cf.append(cf_main);
	obj.html(cf);
	//填充当前月份
	todaytemp=today;
	titlehtml(today.getFullYear(),today.getMonth()+1,arr,obj);

	
}
//绑定切换按钮
$(document).on("click","#cf_but_l",function(){
	prevmonth(date_arr);
});
$(document).on("click","#cf_but_r",function(){
	nextmonth(date_arr);
});
// 阻止事件冒泡
function stopBubble(e){
	if(e && e.stopPropagation){
		e.stopPropagation();
	}
	else{
		window.event.cancelBubble=true;
	}
	return false;
}
//变更月份
function titlehtml(y,m,arr){
	$("#cf_title").eq(0).html(y+"年"+m+"月");
	$("#cf_title").eq(0).attr("data-id",y+"/"+m+"/1");
	month(y,m,arr);
}
//切换上个月
function prevmonth(arr){
	var nowdate=format($("#cf_title").eq(0).attr("data-id"));
	var y=nowdate.getFullYear(),m=nowdate.getMonth()+1;
	if(m==1){m=12;y--}else{m--}
	titlehtml(y,m,arr);
}
//切换下个月
function nextmonth(arr){

	var nowdate=format($("#cf_title").eq(0).attr("data-id"));
	var y=nowdate.getFullYear(),m=nowdate.getMonth()+1;
	if(m==12){m=1;y++}else{m++}
	titlehtml(y,m,arr);
}
//根据开始年月及日历长度初始化日历
// monthload=function(y,m,mar,today,res,sd){
// 	var mlstr="";
// 	for(var i=0;i<mar;i++){
// 		var tempm=(m+i)%12;
// 		if(tempm==0){tempm=12}
// 		var addy=(m+i)/12;
// 		if(addy==Math.floor(addy)){
// 			addy=addy=Math.floor(addy)-1;
// 		}else{
// 			addy=Math.floor(addy)
// 		}
// 		mlstr=mlstr+month(y+addy,tempm,today,res,sd);
// 	}
// 	return mlstr;
// }
//根据年月返回当月日历
var month=function(y,m,arr,list,obj){
	var mstr="";
	var date=[];
	var num=0;
	// hot日期数组
	for(var i=0,len=arr.length;i<len;i++){
		date.push(format(arr[i].date));
	}
	//填充日历开始空白
	var firstday=format(y+"/"+m+"/1");
	var x=0;
	for(var i=0;i<firstday.getDay();i++){
		x++;
		mstr=mstr+"<div style='position:static;text-align:center;float:left;width:13.8%;height: 2em; border: 1px solid #ccc;border-top: none'>&nbsp;</div>";
	}
	//填充日历
	var monthlength=30;
	if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
		monthlength=31;
	}else if(m==2&&islyear(y)==true){
		monthlength=29;
	}else if(m==2&&islyear(y)==false){
		monthlength=28;
	}else{}
	for(var i=0;i<monthlength;i++){
		var iday=format(y+"/"+m+"/"+(i+1));
		if(iday>=todaytemp){
			// 未过期
			if(arr){
				
				// 是否存在日期列表
				if(date.join("").indexOf(iday)!=-1){
					mstr=mstr+"<div class='chioce_div js_hot' style='position:relative;text-align:center;float:left;width:13.8%;height: 2em;border: 1px solid #ccc;border-top: none' data-full='"+y+'-'+m+'-'+(i+1)+"' data-price='"+arr[num].price+"' onclick=showdate('"+y+"','"+m+"','"+(i+1)+"',this)>"+(i+1)+"<br/><span class='hot_price_spn'>￥"+arr[num].price+"</span><img src='images/23.png' style='position: absolute;top:0;right:0;width:50%' alt='hot'></div>";
					num++;
				}
				else{
					mstr=mstr+"<div class='chioce_div' style='position:static;text-align:center;float:left;width:13.8%;height: 2em;border: 1px solid #ccc;border-top: none' data-full='"+y+'-'+m+'-'+(i+1)+"' onclick=showdate('"+y+"','"+m+"','"+(i+1)+"',this)>"+(i+1)+"</div>";
				}
			}
			else{
				mstr=mstr+"<div class='chioce_div' style='position:static;text-align:center;float:left;width:13.8%;height: 2em;border: 1px solid #ccc;border-top: none' data-full='"+y+'-'+m+'-'+(i+1)+"' onclick=showdate('"+y+"','"+m+"','"+(i+1)+"',this)>"+(i+1)+"</div>";
			}
			
		}else{
			// 过期的时间
			mstr=mstr+"<div class='has_over' style='position:static;text-align:center;float:left;width:13.8%;height: 2em;border: 1px solid #ccc;border-top: none'>"+(i+1)+"</div>";	
		}
	}
	// 日期填补
	var fill_len=(7-(monthlength-7+x)%7)%7;
	for( var t=0;t<fill_len;t++){
		mstr+="<div style='position:static;text-align:center;float:left;width:13.8%;height: 2em;border: 1px solid #ccc;border-top: none'>&nbsp;</div>";
	}
	$("#cfm_main").html(mstr);
}

//判断闰年
function islyear(ynum) {  
	if((ynum%4==0&&ynum%100!=0)||(ynum%100==0&&ynum%400==0)){ 
		return true;  
	}else{
		return false;
	}  
}
//选择日期触发
function showdate(y,m,d,obj){
	$("#cfm_main").find(".js_chioce").removeClass("js_chioce");
	if(!$(obj).hasClass("js_chioce")){
		if($(obj).hasClass("js_hot")){
			user_arr.date=$(obj).attr("data-full");
			user_arr.price=$(obj).attr("data-price");
		}else{
			user_arr.date=$(obj).attr("data-full");
			user_arr.price=normal_price;
		}
		$(obj).addClass("js_chioce");
	}else{
		user_arr.date="";
		user_arr.price="";
		$(obj).removeClass("js_chioce");
	}
}