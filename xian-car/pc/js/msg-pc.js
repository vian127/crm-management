var ud="undefined";
var mcd={
	covercolor:"#000",				//遮罩层颜色
	coveropacity:0.75,				//遮罩层透明度
	boxwidth:"350px",				//盒子最小宽度
	boxpadding:"1em 5% 1.5em",		//盒子padding
	boxbg:"#fff",					//盒子颜色
	boxborder:"0.1em solid #555",	//盒子描边
	boxshadow:"none",				//盒子阴影
	boxradius:"0.5em",				//盒子圆角
	falign:"center",				//文字位置
	fcolor:"#555",					//文字颜色
	fsize:"16px",					//文字字体
	fweight:"normal",				//文字加粗
	fstyle:"normal",				//文字斜体
	flineh:"1.6em",					//文字行距
	butfloat:"left",				//按钮float
	butwidth:"38%",					//按钮宽度百分比(只能是百分比,小于50%会一行显示两个按钮)
	butbg:"#273244",				//按钮颜色
	butborder:"none",				//按钮描边
	butshadow:"none",				//按钮阴影
	butradius:"0.4em",				//按钮圆角
	butfcolor:"#fff",				//按钮文字颜色
	butfsize:"16px",				//按钮文字字体
	butfweight:"bold",				//按钮文字加粗
	butfstyle:"normal",				//按钮文字斜体
	butflineh:"36px",				//按钮文字行距
	butls:"0.6em",					//按钮字间距
	butmargintop:"1em"				//按钮margin-top
};
$(function(){
	var divmsg="<div class='msg'></div>"
	$("body").append(divmsg);
});
function msg(a,b,c,d){
	this.start=function(){
		this.cd=mcd;
		this.init();
	}
	this.init=function(){
		var dw=document.documentElement.clientWidth;
		var m='<div class="msg_b"></div><table class="msg_f" cellspacing="0" cellpadding="0"><tr><td style="height:100%;text-align:center;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center"><div class="msg_m"><div class="msg_t"></div><div class="msg_but msg_b1"><span></span></div><div class="msg_but msg_b2"><span></span></div></div></td></tr></table>';
		$(".msg").html(m).css({position:"fixed",width:"100%",height:"100%",top:0,left:0,display:"none",zIndex:999999});
		var cd=this.cd;
		$(".msg_b").css({position:"fixed",width:"100%",height:"100%",background:cd.covercolor,opacity:cd.coveropacity});
		$(".msg_f").css({position:"fixed",width:"100%",height:"100%",border:"none",borderCollapse:"collapse",borderSpacing:0});
		$(".msg_f td").css({padding:0});
		var x=cd.boxpadding.split(" ");
		bx=parseInt(x[1]);
		$(".msg_m").css({position:"static",minWidth:cd.boxwidth,maxWidth:"80%",width:"auto",padding:cd.boxpadding,background:cd.boxbg,border:cd.boxborder,boxShadow:cd.boxshadow,borderRadius:cd.boxradius,float:cd.butfloat,textAlign:"center"});
		$(".msg_m div").css({position:"static",float:cd.butfloat});
		$(".msg_t").css({position:"static",width:"100%",textAlign:cd.falign,color:cd.fcolor,fontSize:cd.fsize,fontWeight:cd.fweight,fontStyle:cd.fstyle,lineHeight:cd.flineh,wordBreak:"break-all",wordWrap:"break-word"});
		$(".msg_but").css({position:"static",width:cd.butwidth,background:cd.butbg,border:cd.butborder,boxShadow:cd.butshadow,borderRadius:cd.butradius,color:cd.butfcolor,fontSize:cd.butfsize,fontWeight:cd.butfweight,fontStyle:cd.butfstyle,lineHeight:cd.butflineh,letterSpacing:cd.butls,marginTop:cd.butmargintop,textAlign:"center",cursor:"pointer"});
		$(".msg_but span").css({paddingLeft:cd.butls});
	}
	this.setcss=function(c){
		if(typeof(c)=="object"){
			this.cd=mcd;
			var cd=this.cd;
			if(!isnull(c.covercolor)){cd.covercolor=c.covercolor;}
			if(!isnull(c.coveropacity)){cd.coveropacity=c.coveropacity}
			if(!isnull(c.boxwidth)){cd.coveropacity=c.boxwidth}
			if(!isnull(c.boxpadding)){cd.boxpadding=c.boxpadding}
			if(!isnull(c.boxbg)){cd.boxbg=c.boxbg}
			if(!isnull(c.boxborder)){cd.boxborder=c.boxborder}
			if(!isnull(c.boxshadow)){cd.boxshadow=c.boxshadow}
			if(!isnull(c.boxradius)){cd.boxradius=c.boxradius}
			if(!isnull(c.falign)){cd.falign=c.falign}
			if(!isnull(c.fcolor)){cd.fcolor=c.fcolor}
			if(!isnull(c.fsize)){cd.fsize=c.fsize}
			if(!isnull(c.fweight)){cd.fweight=c.fweight}
			if(!isnull(c.fstyle)){cd.fstyle=c.fstyle}
			if(!isnull(c.flineh)){cd.flineh=c.flineh}
			if(!isnull(c.butfloat)){cd.butfloat=c.butfloat}
			if(!isnull(c.butwidth)){cd.butwidth=c.butwidth}
			if(!isnull(c.butbg)){cd.butbg=c.butbg}
			if(!isnull(c.butborder)){cd.butborder=c.butborder}
			if(!isnull(c.butshadow)){cd.butshadow=c.butshadow}
			if(!isnull(c.butradius)){cd.butradius=c.butradius}
			if(!isnull(c.butfcolor)){cd.butfcolor=c.butfcolor}
			if(!isnull(c.butfsize)){cd.butfsize=c.butfsize}
			if(!isnull(c.butfweight)){cd.butfweight=c.butfweight}
			if(!isnull(c.butfstyle)){cd.butfstyle=c.butfstyle}
			if(!isnull(c.butflineh)){cd.butflineh=c.butflineh}
			if(!isnull(c.butls)){cd.butls=c.butls}
			if(!isnull(c.butmargintop)){cd.butmargintop=c.butmargintop}
			this.cd=cd;
			this.init();
		}
	}
	this.t=function(a,b,c,d){
		var cd=this.cd;
		var at=typeof(a);
		var bt=typeof(b);
		var ct=typeof(c);
		var dt=typeof(d);
		var butwidth1=(100-parseInt(cd.butwidth))/2;
		var butwidth2=(100-(parseInt(cd.butwidth)*2))/3;
		if(at=="string"&&bt==ud&&ct==ud){
			//一个参数的情况
			$(".msg_but").css({"margin-left":butwidth1+"%"});
			$(".msg_t").html(a);
			$(".msg_b1").hide();
			$(".msg_b2 span").html("关闭");
			$(".msg").fadeIn(400,function(){
				$(".msg_b2").unbind().bind("click",closemsg);
			});
		}else if(at=="string"&&bt=="string"&&ct==ud){
			//两个参数的情况:文字及按钮文字
			$(".msg_but").css({"margin-left":butwidth1+"%"});
			$(".msg_t").html(a);
			$(".msg_b1").hide();
			$(".msg_b2 span").html(b);
			$(".msg").fadeIn(400,function(){
				$(".msg_b2").unbind().bind("click",closemsg)
			});
		}else if(at=="string"&&bt=="number"&&ct==ud){
			//两个参数的情况:文字及延时自动关闭
			$(".msg_but").css({"margin-left":butwidth1+"%"});
			$(".msg_t").html(a);
			$(".msg_b1").hide();
			$(".msg_b2").hide();
			$(".msg").fadeIn(300,function(){
				setTimeout(function(){$(".msg").fadeOut(300)},b)
			});
		}else if(at=="string"&&bt=="function"&&ct==ud){
			//两个参数的情况:文字及回调函数
			if(parseInt(cd.butwidth)>=50){
				$(".msg_but").css({"margin-left":butwidth1+"%"});
			}else{
				$(".msg_but").css({"margin-left":butwidth2+"%"});
			}
			$(".msg_t").html(a);
			$(".msg_b1 span").html("确定").show();
			$(".msg_b2 span").html("取消");
			$(".msg").fadeIn(400,function(){
				$(".msg_b1").unbind().bind("click",function(){$(".msg_b1").unbind();closemsg(b);});
				$(".msg_b2").unbind().bind("click",closemsg);
			});
		}else if(at=="string"&&bt=="object"&&ct=="function"){
			//三个参数的情况
			if(parseInt(cd.butwidth)>=50){
				$(".msg_but").css({"margin-left":butwidth1+"%"});
			}else{
				$(".msg_but").css({"margin-left":butwidth2+"%"});
			}
			$(".msg_t").html(a);
			$(".msg_b1 span").html(b[0]).show();
			$(".msg_b2 span").html(b[1]);
			$(".msg").fadeIn(400,function(){
				$(".msg_b1").unbind().bind("click",function(){$(".msg_b1").unbind();closemsg(c);});
				$(".msg_b2").unbind().bind("click",closemsg);
			});
		}else if(at=="string"&&bt=="function"&&ct=="boolean"&&c==true){
			//三个参数的情况
			$(".msg_but").css({"margin-left":butwidth1+"%"});
			$(".msg_t").html(a);
			$(".msg_b1 span").html("确定").show();
			$(".msg_b2").hide();
			$(".msg").fadeIn(400,function(){
				$(".msg_b1").unbind().bind("click",function(){$(".msg_b1").unbind();closemsg(b);});
			});
		}else if(at=="string"&&bt=="string"&&ct=="function"&&dt=="boolean"&&d==true){
			//四个参数的情况
			$(".msg_but").css({"margin-left":butwidth1+"%"});
			$(".msg_t").html(a);
			$(".msg_b1 span").html(b).show();
			$(".msg_b2").hide();
			$(".msg").fadeIn(400,function(){
				$(".msg_b1").unbind().bind("click",function(){$(".msg_b1").unbind();closemsg(c);});
			});
		}else{}
	}
	this.start();
	if(!isnull(a)){
		this.t(a,b,c,d);
	}
}
function closemsg(fun){
	$(".msg_b1").unbind();
	$(".msg_b2").unbind();
	$(".msg").fadeOut(400,function(){
		if(typeof(fun)=="function"){fun();}
	});
}
var m=new msg();
function isnull(vt){if(vt==""||vt==null||typeof(vt)==ud||vt.length<=0){return true}else{return false}}