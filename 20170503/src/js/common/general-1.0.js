/*
	#author		lut000
	#date 		2017/04/21
*/
define(["jquery","msg"],function(){
	var re={
		environment:/^m\.uliaobao\.com/i
	};
    var pop={
        def:{
            golbal_path:"",
//            api_link:"http://192.168.20.51:8080/uliaow-war-pop/v2/",
            api_link:"",
            o_golbal_path:"",
            img_href:"src/images/",
            img:{
                general:"default_pic.jpg",         //默认图片
                fabric_a:"default_fabric.png"         //面料默认图片
            },
            font_size:20
        },
        _boolean:{
            is_shence_set:false
        },
        source:{        //资源相关
            is_online_environment:re.environment.test(window.location.host)===true?true:false,
            page_url:(window.location.href.split("?"))[0]
        },
        fn:{
            /*--------------dom操作-----------------*/ 
            importCss:function(opt){
                if(opt && typeof opt =="object"){
                    var link_ele=document.createElement("link"),
                        head_ele=document.getElementsByTagName("head")[0],
                        target_ele=opt["target_ele"]?opt["target_ele"]:(head_ele.getElementsByTagName("script"))[0];
                    link_ele.rel="stylesheet";
                    link_ele.href=opt["url"]?opt["url"]+"?r="+(new Date()).getTime():"";
                    head_ele.insertBefore(link_ele,target_ele);
                }else{
                    throw "opt必须为对象！";
                }
            },
            setRootSize:function(){         /*字体设置*/
                var ow=document.documentElement.clientWidth || document.body.clientWidth;
                var root_ele=document.getElementsByTagName("html")[0],font_size=20;
                if(ow<320){
                    font_size=20;
                }else if(ow>720){
                    font_size=40;
                }else{
                    font_size=parseInt(ow/(720/40));
                }
                root_ele.style.fontSize = font_size+'px';
                pop.def.font_size=font_size;
            },
            imgLoadError:function(obj,relative_path){             //默认图片
                var times=obj.getAttribute("data-times")?obj.getAttribute("data-times")-0:0;
                if(times<=2){
                    var _key=obj.getAttribute("data-key")?obj.getAttribute("data-key"):"general";
                    var _src=pop.def.img[_key] || pop.def.img["general"];
                    if(arguments.length>1){
                        _src=relative_path+_src;
                    }
                    obj.src=pop.def.img_href+_src;
                    times++;
                    obj.setAttribute("data-times",times);
                }
            },
            /*-----------事件------------*/
            stopBubble:function(ev){            // 阻止事件冒泡
                var e=ev || window.event;
                if(e && e.stopPropagation){
                    e.stopPropagation();
                }else{
                    window.event.cancelBubble=true;
                }
                return false;
            },
            stopDefault:function(ev){           //阻止默认事件
                var e=ev || window.event;
                if(e && e.preventDefault){
                    e.preventDefault();
                }
                else{
                    window.event.returnValue=false;
                }
                return false;
            },
            toEven:function(num){                       //数字补零
                if(parseInt(num)<10){
                    num="0"+num;
                }
                return num;
            },
            cutStr:function(str,len){                   //截取字符串
                if(typeof str==="string" && len>0){
                    if(str.length>len){
                        str=str.substr(0,len)+"...";
                    }
                }
                return str;
            },
            cutByWidth:function(str,wid,fontSize){               //通过宽度截取字符串
                var nstr="",fk=parseInt($("body").css("font-size")) || 16;
                if(typeof str==="string" && wid>0){
                    var nfs=fontSize!==undefined?fontSize*fk:14;
                    nstr=str,limit_val=wid,is_length=false;
                    recursionFunc(nstr);
                    function recursionFunc(keys){
                        var nw=textSize({
                            "fontSize":nfs
                        },keys);
                        if(nw>limit_val*fk){
                            is_length=true;
                            var nkey=keys.substr(0,keys.length-1);
                            arguments.callee(nkey);
                        }else{
                            if(is_length===true){
                               nstr=keys+"..."; 
                            }else{
                                nstr=keys;
                            }
                            return keys;
                        }
                    };
                    function textSize(cssList,text) {               // 通过元素获取文字宽高
                        var span = document.createElement("span");
                        var result = {};
                        result.width = span.offsetWidth;
                        result.height = span.offsetWidth; 
                        span.style.visibility = "hidden";
                        span.style.cssText="font-size:14px;line-height:1em;display:inline;padding:0;margin:0;border:none;letter-spacing:0px";
                        span.style.fontSize=cssList["fontsize"]!==undefined?cssList["fontsize"]+"px":"14px";
                        span.style.lineHeight=cssList["lineheight"]!==undefined?cssList["lineheight"]:"1em";
                        document.body.appendChild(span);
                        if (typeof span.textContent != "undefined"){span.textContent = text;}else{span.innerText = text;}
                        result.width = span.offsetWidth - result.width;
                        result.height = span.offsetHeight - result.height;
                        span.parentNode.removeChild(span);
                        return result.width;
                    }
                }
                return nstr;
            },
            textSize:function(cssList,text) {               // 通过元素获取文字宽高
                var a=pop.fn;
                var span = document.createElement("span");
                var result = {};
                result.width = span.offsetWidth;
                result.height = span.offsetWidth; 
                span.style.visibility = "hidden";
                span.style.cssText="font-size:14px;line-height:1em;display:inline;padding:0;margin:0;border:none;letter-spacing:0px";
                span.style.fontSize=cssList["fontsize"]!==undefined?cssList["fontsize"]+"px":"14px";
                span.style.lineHeight=cssList["lineheight"]!==undefined?cssList["lineheight"]:"1em";
                document.body.appendChild(span);
                if (typeof span.textContent != "undefined"){span.textContent = text;}else{span.innerText = text;}
                result.width = span.offsetWidth - result.width;
                result.height = span.offsetHeight - result.height;
                span.parentNode.removeChild(span);
                return result.width;
            },
            getLocationParameter:function(){              // 获取浏览器参数
                var url = location.search; //获取url中"?"符后的字串 
                var theRequest={};
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            },
            /*----------------浏览器存储-----------------*/ 
            getSto:function(session_name){                  //获取本地存储
                if(window.localStorage){
                    // 支持localStorage
                    var val=localStorage.getItem(session_name);
                    if(val!=="undefined"){
                        try{
                            return JSON.parse(val)?JSON.parse(val):"";
                        }catch(e){
                            return val;
                        };
                    }
                }else{
                    // 用cookie
                    return "";
                }
            },
            setSto:function(session_name,data){                 // 存储本地
                if(window.localStorage){
                    localStorage.setItem(session_name,JSON.stringify(data));
                }
            },
            delSto:function(session_name){                  // 删除本地存储
                if(window.localStorage){
                    if(localStorage.getItem(session_name)){
                        localStorage.removeItem(session_name);
                    }
                }
            },
            setCookie:function(name,value,Days){        // 设置cookie
                var exp = new Date();
                exp.setTime(exp.getTime() + Days*24*60*60*1000);    //设置过期时间
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
            },
            getCookie:function(name){  //获取cookie
                    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
                    if(arr != null){  
                        return unescape(arr[2]);   
                    }else{  
                        return null;  
                }  
            },
            /*--------------性能优化---------------*/
            throttle:function(method,context){          //函数节流
                clearTimeout(method.tid);
                method.tid=setTimeout(function(){
                    method.call(context);
                });
            },
            /*-------------ajax-------------*/
            subAjax:function(options){                  //jquery  ajax封装
                var opt={
                    "url":"",
                    "ctp":"",
                    "data":{},
                    "successFunc":null,
                    "errorFunc":null,
                    "isError":true,
                    "header":"",
                    "code":"code",          //状态字段名称  默认为code
                    "code_value":0,         //请求成功码  默认为0
                    "message":"message"     //请求失败话术字段名  默认为message
                };
                opt["url"]=options["url"]?options["url"]:"";
                opt["data"]=options["data"]?options["data"]:{};
                opt["ctp"]=options["ctp"]!==undefined?options["ctp"]:"application/json";
                opt["successFunc"]=options["successFunc"]?options["successFunc"]:null;
                opt["errorFunc"]=options["errorFunc"]?options["errorFunc"]:null;
                opt["isError"]=options["isError"]!==undefined?options["isError"]:true;
                opt["code"]=options["code"]?options["code"]:"code";
                opt["code_value"]=options["code_value"]!==undefined?options["code_value"]:0;
                opt["message"]=options["message"]!==undefined?options["message"]:"message";
                if(typeof options["header"]!="undefined"){
                    opt["header"]=options["header"];
                }else{
                    /*这里设置默认头部*/
//                    opt["header"]={
//                    	"app-name":"uliaow-app",
//                    	"device-type":"msite",
//                    	"version":"5.3.7"
//                    };
                }
                $.ajax({
                    headers:opt["header"],
                    type: "POST",
                    url: opt["url"],
                    data:opt["data"],
                    timeout: 2000,
                    dataType: "json",
                    contentType:opt["ctp"],
                    success: function(data){
                        if(data[opt["code"]]===opt["code_value"]){
                            if(opt.successFunc && opt.successFunc instanceof Function){
                                opt.successFunc(data);
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc(data);
                            }
                            if(opt["isError"]===true){
                                msg.msg({"txt":data[opt["message"]]},800);
                            }
                        }
                    },
                    error: function(XMLHttpRequest,textStatus,errorThrown){
                        if(opt["isError"]===true){
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                msg.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定","error":opt.errorFunc},opt.errorFunc);
                            }else{
                                msg.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定"});  
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc
                            }
                        }
                    }
                });
            },
            subAjaxGet:function(options){                  //jquery  ajax封装
                var opt={
                    "url":"",
                    "ctp":"",
                    "successFunc":null,
                    "errorFunc":null,
                    "isError":true,
                    "header":null,
                    "code":"code",          //状态字段名称  默认为code
                    "code_value":0,         //请求成功码  默认为0
                    "message":"message"     //请求失败话术字段名  默认为message
                };
                opt["url"]=options["url"]?options["url"]:"";
                opt["ctp"]=options["ctp"]?options["ctp"]:"application/json";
                opt["successFunc"]=options["successFunc"]?options["successFunc"]:null;
                opt["errorFunc"]=options["errorFunc"]?options["errorFunc"]:null;
                opt["isError"]=options["isError"]!==undefined?options["isError"]:true;
                opt["code"]=options["code"]?options["code"]:"code";
                opt["code_value"]=options["code_value"]!==undefined?options["code_value"]:0;
                opt["message"]=options["message"]!==undefined?options["message"]:"message";
                if(typeof options["header"]!="undefined"){
                    opt["header"]=options["header"];
                }else{
                    /*这里设置默认头部
                    opt["header"]={
                        
                    };*/
                }
                $.ajax({
                    headers:opt["header"],
                    type: "GET",
                    url: opt["url"],
                    timeout: 20000,
                    dataType: "json",
                    contentType:opt["ctp"],
                    success: function(data){
                        if(data[opt["code"]]===opt["code_value"]){
                            if(opt.successFunc && opt.successFunc instanceof Function){
                                opt.successFunc(data);
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc(data);
                            }
                            if(opt["isError"]===true){
                                msg.msg({"txt":data[opt["message"]]},800);
                            }
                        }
                    },
                    error: function(XMLHttpRequest,textStatus,errorThrown){
                        if(opt["isError"]===true){
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                msg.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定","error":opt.errorFunc},opt.errorFunc);
                            }else{
                                msg.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定"});  
                            }
                        }else{
                            if(opt.errorFunc && opt.errorFunc instanceof Function){
                                opt.errorFunc
                            }
                        }
                    }
                });
            },
            // 原生的ajax post
            originSubAjax:function(options){
                var opt={
                    "url":"",
                    "ctp":"",
                    "data":'{}',
                    "successFunc":null,
                    "errorFunc":null,
                    "isError":true,
                    "header":{
                        
                    },
                    "code":"code",          //状态字段名称  默认为code
                    "code_value":0,         //请求成功码  默认为0
                    "message":"message"     //请求失败话术字段名  默认为message
                };
                opt["url"]=options["url"]?options["url"]:"";
                opt["data"]=options["data"]?options["data"]:'{}';
                opt["ctp"]=options["ctp"]?options["ctp"]:"application/json";
                opt["successFunc"]=options["successFunc"]?options["successFunc"]:null;
                opt["errorFunc"]=options["errorFunc"]?options["errorFunc"]:null;
                opt["isError"]=options["isError"]!==undefined?options["isError"]:true;

                opt["code"]=options["code"]?options["code"]:"code";
                opt["code_value"]=options["code_value"]!==undefined?options["code_value"]:0;
                opt["message"]=options["message"]!==undefined?options["message"]:"message";

                if(typeof options["header"]!="undefined"){
                    opt["header"]=options["header"];
                }else{
                    
                }
                var xhr=null;
                if(typeof XMLHttpRequest !="undefined"){
                    xhr=new XMLHttpRequest();
                }else if(typeof ActiveXObject!="undefined"){
                    xhr=new ActiveXObject('Microsoft.XMLHTTP');
                }else{
                    console.log("你的浏览器版本不支持XHR");
                }
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4){
                        if((xhr.status>=200 && xhr.status<300) || xhr.status===304){
                            //console.log(xhr.responseText);
                            var data=xhr.responseText;
                            data=JSON.parse(data);
                            if(data[opt["code"]]===opt["code_value"]){
                                if(opt.successFunc && opt.successFunc instanceof Function){
                                    opt.successFunc(data);
                                }
                            }else{
                                if(opt["isError"]===true){
                                    msg.msg({"txt":data[opt["message"]]},800);
                                }
                                if(opt.errorFunc && opt.errorFunc instanceof Function){
                                    opt.errorFunc(data);
                                }
                            }
                        }else{
                            // alert(xhr.status);
                            var data=xhr.responseText;
                            if(opt["isError"]===true){
                                if(opt.errorFunc && opt.errorFunc instanceof Function){
                                    msg.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定","error":opt.errorFunc},opt.errorFunc);
                                }else{
                                    msg.msg({"txt":"网络似乎出现了错误，请稍后重试。","rname":"确定"});  
                                }
                            }else{
                                if(opt.errorFunc && opt.errorFunc instanceof Function){
                                    opt.errorFunc
                                }
                            }
                        }
                    }
                }
                xhr.open("POST",opt["url"],true);
                for(var key in opt["header"]){
                    xhr.setRequestHeader(key,opt["header"][key]);
                }
                xhr.setRequestHeader("Content-Type",opt["ctp"]);
                xhr.send(opt["data"]);
            }
        }
    };
    window.pop=pop;
    return pop;
});