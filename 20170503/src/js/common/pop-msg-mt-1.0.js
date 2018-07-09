/*
	# purpose popup
	# author  lut000
	# date    2016-07-19
	# edition 1.0
	# terminal mt
	# required jquery
	# btn change  2016-11-30
*/
!function(g){
	function atten(){
		this.box=null;			//包含框
		this.bg=null;			//背景元素
		this.tar=null;		//文本内容
		this.btn_box=null;		//按钮框
		this.btn1=null;		//确定按钮
		this.btn2=null;		//取消按钮
		this.v_list={		//相关属性
			ww:"",
			wh:"",
			suFunc:null,
			is_delay:false,
			times:800,
			def_css:{
				btns:{display:"inline-block",padding:"0.3em 1.5em","text-decoration": "none","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box"},
				sbtn:{color: "#fff","background-color": "#DD1C5B",border: "1px solid #DD1C5B"},
				cbtn:{"margin-right":"1em",color: "#DD1C5B","background-color": "#fff",border: "1px solid #DD1C5B"},
				box:{display: "none","z-index": 9999,position: "fixed",left: "37.5px",top: "227.467px",width: "80%","font-size": "0.8rem",padding: "2em 0px",margin: "auto","text-align": "center","background-color": "rgb(255, 255, 255)"},
				btn_div:{"margin-top": "1.6em"},
				p:{"font-size": "0.8em",padding: "0 1.5em","line-height": "1.2em"}
			},
			_html:'<!-- 弹出提示 --><div id="msg-box"><p class="atten-p">网络似乎出现了问题，请稍后再试。</p><div class="btn-div"><a class="js-cancel" href="javascript:void(0);" title="">取消</a><a class="js-sure" href="javascript:void(0);" title="">确定</a></div></div><div id="msg-bg" style="display: none;z-index: 9998;position: fixed;left: 0px;top: 0;width: 100%;height:100%;opacity: 0.7;filter:alpha(opacity=70);background-color: #000;"></div>'
		}
	}
	atten.prototype={
		init:function(){				//初始化参数
			var a=this,b=a.v_list;
			a.box=$("#msg-box");			
			a.bg=$("#msg-bg");			
			a.tar=$("#msg-box .atten-p");	
			a.btn_box=$("#msg-box .btn-div");		
			a.btn1=$("#msg-box .js-sure");		
			a.btn2=$("#msg-box .js-cancel");		
			a.resizeFunc();
			a.bindFunc();
			a.setCss(b.def_css);
		},
		resizeFunc:function(){			//重新计算
			var a=this,b=a.v_list;
			b["ww"]=document.documentElement.clientWidth || document.body.clientWidth;
			b["wh"]=document.documentElement.clientHeight || document.body.clientHeight;
			a.setPos();
		},
		msg:function(options,func,times){					//配置
			var a=this,b=a.tar,c=a.btn1,d=a.btn2,e=a.btn_box,f=a.v_list,g=false;
			f.suFunc=null;
			f.erFunc=null;
			if(times && typeof times ==="number"){
				e.hide();
				f.is_delay=true;
				f.times=times;
			}else{
				e.show();
				f.is_delay=false;
			}
			if(func && func instanceof Function){
				f.suFunc=func;
			}else{
				if(typeof func ==="number"){
					e.hide();
					f.is_delay=true;
					f.times=func;
				}
			};
			if(options && options instanceof Object){			//配置属性
				for(var key in options){
					switch(key){
						case "txt":
							b.html(options[key]);
							d.show();
							break;
						case "rname":
							c.text(options[key]);
							break;
						case "cname":
							d.text(options[key]);
							break;
						case "rcss":
							g=true;
							break;
						case "btn":
							d.hide();
							break;
						case "success":
							f.suFunc=options[key];
							break;
						case "error":
							f.erFunc=options[key];
							break;
						default:
							console.log(options[key]);
					}
				}
			};
			if(g==false){
				a.setCss(b.def_css);
			}else{
				a.setCss(options["rcss"]);
			}
			a.setPos();
			a.showFunc();
			if(f.is_delay){
				var timer=setTimeout(function(){
					clearTimeout(timer);
					a.hideFunc(f.suFunc);
				},f.times);
			}
		},
		bindFunc:function(){			//事件绑定
			var a=this,b=a.v_list;
			a.btn1.on("click",function(){
				a.hideFunc(b.suFunc);
			});
			a.btn2.on("click",function(){
				a.hideFunc(b.erFunc);
			});
		},
		setCss:function(options){				//设置样式
			var a=this,b=a.btn1,c=a.btn2,d=a.tar,e=a.box,f=a.btn_box;
			if(options && options instanceof Object){
				for(var key in options){
					switch(key){
						case "btns":      				//按钮样式
							b.css(options[key]);
							c.css(options[key]);
							break;
						case "sbtn":  					//确定按钮
							b.css(options[key]);
							break;
						case "cbtn":  					//取消按钮
							c.css(options[key]);
							break;
						case "box":  					//包含框
							e.css(options[key]);
							break;
						case "btn_div":  					//按钮框
							f.css(options[key]);
							break;
						case "p":  					//文本对象
							d.css(options[key]);
							break;
						default:
							console.log(null);
					}
				}
			}
		},
		setPos:function(){				//设置位置
			var a=this,w=a.v_list["ww"],h=a.v_list["wh"],box=a.box;
			var ow=box.width();
			var oh=box.height();
			a.box.css({"left":(w-ow)/2+"px","top":(h-oh)*2/5+"px"});
		},
		showFunc:function(){			//显示
			var a=this,box=a.box,bg=a.bg;
			box.fadeIn(200);
			bg.fadeIn(400);
		},
		hideFunc:function(fn){			//隐藏
			var a=this,box=a.box,bg=a.bg;
			box.fadeOut(200,function(){
				if(fn && fn instanceof Function){
					fn();
				}
			});
			bg.fadeOut(400);
		}
	}
	g.msg=new atten();
	$(function(){
		$("body").append(msg.v_list._html);
		msg.init();
		$(window).on("resize",function(){msg.resizeFunc()});
	});
}(window);