//调整布局
$(function(){msgrs();});
$(window).resize(function(){msgrs();});
var msgrs=function(){
	var dw=document.documentElement.clientWidth;
	$("body").css({"font-size":1*dw/360+"em"});
};
var mcd={
	covercolor:"#000",				//遮罩层颜色
	coveropacity:0.75,				//遮罩层透明度
	boxwidth:"70%",					//盒子宽度（只能是百分比）
	boxpadding:"1em 5% 1.5em",		//盒子padding(左右padding只能是百分比)
	boxbg:"#fff",					//盒子颜色
	boxborder:"0.1em solid #555",	//盒子描边
	boxshadow:"none",				//盒子阴影
	boxradius:"0.5em",				//盒子圆角
	falign:"center",				//文字位置
	fcolor:"#555",					//文字颜色
	fsize:"0.9em",					//文字字体
	fweight:"normal",				//文字加粗
	fstyle:"normal",				//文字斜体
	flineh:"1.5em",					//文字行距
	butfloat:"left",				//按钮float
	butwidth:"80%",					//按钮宽度(只能是百分比,小于50%会一行显示两个按钮)
	butbg:"#555",					//按钮颜色
	butborder:"none",				//按钮描边
	butshadow:"none",				//按钮阴影
	butradius:"0.4em",				//按钮圆角
	butfcolor:"#fff",				//按钮文字颜色
	butfsize:"0.9em",				//按钮文字字体
	butfweight:"bold",				//按钮文字加粗
	butfstyle:"normal",				//按钮文字斜体
	butflineh:"1.8em",				//按钮文字行距
	butls:"0.6em",					//按钮字间距
	butmargintop:"1em"				//按钮margin-top
};
$(function(){
	var divmsg="<div class='msg'></div>"
	$("body").append(divmsg);
	$(".msg").css({position:"fixed",width:"100%",height:"100%",top:0,left:0,display:"none","z-index":999999});
});
function msg(a,b,c){
	var ud="undefined";
	this.start=function(){
		this.cd=mcd;
		this.init();
	}
	this.init=function(){
		var m='<div class="msg_b"></div><table class="msg_f" cellspacing="0" cellpadding="0"><tr><td><div class="msg_m"><div class="msg_t"></div><div class="msg_but msg_b1"><span></span></div><div class="msg_but msg_b2"><span></span></div></div></td></tr></table>';
		$(".msg").html(m);
		var cd=this.cd;
		$(".msg_b").css({position:"fixed",width:"100%",height:"100%",background:cd.covercolor,opacity:cd.coveropacity});
		$(".msg_f").css({position:"fixed",width:"100%",height:"100%",border:"none"});
		var x=cd.boxpadding.split(" ");
		bx=parseInt(x[1]);
		$(".msg_m").css({position:"static",width:cd.boxwidth,"margin-left":((100-parseInt(cd.boxwidth))/2-bx)+"%",padding:cd.boxpadding,background:cd.boxbg,border:cd.boxborder,"box-shadow":cd.boxshadow,"border-radius":cd.boxradius,float:cd.butfloat});
		$(".msg_m div").css({float:cd.butfloat});
		$(".msg_t").css({position:"static",width:"100%","text-align":cd.falign,color:cd.fcolor,"font-size":cd.fsize,"font-weight":cd.fweight,"font-style":cd.fstyle,"line-height":cd.flineh});
		$(".msg_but").css({position:"static",width:cd.butwidth,background:cd.butbg,border:cd.butborder,"box-shadow":cd.butshadow,"border-radius":cd.butradius,color:cd.butfcolor,"font-size":cd.butfsize,"font-weight":cd.butfweight,"font-style":cd.butfstyle,"line-height":cd.butflineh,"letter-spacing":cd.butls,"margin-top":cd.butmargintop,"margin-left":cd.butmarginleft,"text-align":"center"});
		$(".msg_but span").css({"padding-left":cd.butls});
	}
		
	this.setcss=function(c){
		if(typeof(c)=="object"){
			this.cd=mcd;
			var cd=this.cd;
			if(typeof(c.covercolor)!==ud){cd.covercolor=c.covercolor;}
			if(typeof(c.coveropacity)!==ud){cd.coveropacity=c.coveropacity}
			if(typeof(c.boxwidth)!==ud){cd.coveropacity=c.boxwidth}
			if(typeof(c.boxpadding)!==ud){cd.boxpadding=c.boxpadding}
			if(typeof(c.boxbg)!==ud){cd.boxbg=c.boxbg}
			if(typeof(c.boxborder)!==ud){cd.boxborder=c.boxborder}
			if(typeof(c.boxshadow)!==ud){cd.boxshadow=c.boxshadow}
			if(typeof(c.boxradius)!==ud){cd.boxradius=c.boxradius}
			if(typeof(c.falign)!==ud){cd.falign=c.falign}
			if(typeof(c.fcolor)!==ud){cd.fcolor=c.fcolor}
			if(typeof(c.fsize)!==ud){cd.fsize=c.fsize}
			if(typeof(c.fweight)!==ud){cd.fweight=c.fweight}
			if(typeof(c.fstyle)!==ud){cd.fstyle=c.fstyle}
			if(typeof(c.flineh)!==ud){cd.flineh=c.flineh}
			if(typeof(c.butfloat)!==ud){cd.butfloat=c.butfloat}
			if(typeof(c.butwidth)!==ud){cd.butwidth=c.butwidth}
			if(typeof(c.butbg)!==ud){cd.butbg=c.butbg}
			if(typeof(c.butborder)!==ud){cd.butborder=c.butborder}
			if(typeof(c.butshadow)!==ud){cd.butshadow=c.butshadow}
			if(typeof(c.butradius)!==ud){cd.butradius=c.butradius}
			if(typeof(c.butfcolor)!==ud){cd.butfcolor=c.butfcolor}
			if(typeof(c.butfsize)!==ud){cd.butfsize=c.butfsize}
			if(typeof(c.butfweight)!==ud){cd.butfweight=c.butfweight}
			if(typeof(c.butfstyle)!==ud){cd.butfstyle=c.butfstyle}
			if(typeof(c.butflineh)!==ud){cd.butflineh=c.butflineh}
			if(typeof(c.butls)!==ud){cd.butls=c.butls}
			if(typeof(c.butmargintop)!==ud){cd.butmargintop=c.butmargintop}
			this.cd=cd;
			this.init();
		}
	}
	this.t=function(a,b,c){
		var cd=this.cd;
		var at=typeof(a);
		var bt=typeof(b);
		var ct=typeof(c);
		if(at=="string"&&bt==ud&&ct==ud){
			//一个参数的情况
			$(".msg_but").css({"margin-left":(100-parseInt(cd.butwidth))/2+"%"});
			$(".msg_t").html(a);
			$(".msg_b1").hide();
			$(".msg_b2 span").html("关闭");
			$(".msg").fadeIn(400,function(){
				$(".msg_b2").unbind().bind("touchend",closemsg);
			});
		}else if(at=="string"&&bt=="string"&&ct==ud){
			//两个参数的情况:文字及按钮文字
			$(".msg_but").css({"margin-left":(100-parseInt(cd.butwidth))/2+"%"});
			$(".msg_t").html(a);
			$(".msg_b1").hide();
			$(".msg_b2 span").html(b);
			$(".msg").fadeIn(400,function(){
				$(".msg_b2").unbind().bind("touchend",closemsg);
			});
		}else if(at=="string"&&bt=="function"&&ct==ud){
			//两个参数的情况:文字及回调函数
			if(parseInt(cd.butwidth)>=50){
				$(".msg_but").css({"margin-left":(100-parseInt(cd.butwidth))/2+"%"});
			}else{
				$(".msg_but").css({"margin-left":(100-(parseInt(cd.butwidth)*2))/3+"%"});
			}
			$(".msg_t").html(a);
			$(".msg_b1 span").html("确定").show();
			$(".msg_b2 span").html("取消");
			$(".msg").fadeIn(400,function(){
				$(".msg_b1").unbind().bind("touchend",function(){$(".msg_b1").unbind();closemsg(b);});
				$(".msg_b2").unbind().bind("touchend",closemsg);
			});
		}else if(at=="string"&&bt=="object"&&ct=="function"){
			//三个参数的情况
			if(parseInt(cd.butwidth)>=50){
				$(".msg_but").css({"margin-left":(100-parseInt(cd.butwidth))/2+"%"});
			}else{
				$(".msg_but").css({"margin-left":(100-(parseInt(cd.butwidth)*2))/3+"%"});
			}
			$(".msg_t").html(a);
			$(".msg_b1 span").html(b[0]).show();
			$(".msg_b2 span").html(b[1]);
			$(".msg").fadeIn(400,function(){
				$(".msg_b1").unbind().bind("touchend",function(){$(".msg_b1").unbind();closemsg(c);});
				$(".msg_b2").unbind().bind("touchend",closemsg);
			});
		}else{}
	}
	this.start();
	if(typeof(a)!==ud){
		this.t(a,b,c);
	}
}
//关闭msg
function closemsg(fun){
	$(".msg_b1").unbind();
	$(".msg_b2").unbind();
	$(".msg").fadeOut(400,function(){
		if(typeof(fun)=="function"){fun();}
	});
}
var m=new msg();