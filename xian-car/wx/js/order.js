// 滚动变量
var myScroll1,myScroll2,myScroll3;
// 自定义方法
var $m={
    // 分享链接
    share_href: window.location.href,
    // 图片地址前缀
    img_url:"images/",
    // 当前页面
    active_scroll:1,
    // 重新布局
    rs: function(){
        var a=this;
        var limit=720;
        var dw=document.documentElement.clientWidth;
        var dh=document.documentElement.clientHeight;
        var fw=dw>limit?limit:dw;
        $("body").css({"font-size":1*fw/360+"em"});
        if(dw>limit){
            $(".center_box").css({"left":(dw-limit)/2+"px"});
        };
        a.refreshPage();
    },
    // 刷新scroll
    refreshPage: function(){
        var type=this.active_scroll;
        if(type==1){
            myScroll1.refresh();
        }else if(type==2){
            myScroll2.refresh();
        }else if(type==3){
            myScroll3.refresh();
        }
    },
    // ajax 请求地址
    ajax_link: ["deal_info","is_set_info"],
    // 居中显示
    toCenter:function(obj,par){
        var dh=par.height();
        var oh=obj.outerHeight();
        obj.css({"margin-top": (dh-oh)/2-50+"px"});
    },
    // 设置宽高
    setHeight:function(obj,k){
        var ow=obj.width();
        console.log(ow);
        var num=parseInt(ow*k);
        obj.height(num+"px");
    },
    // 直接到达
    toDirect:function(obj,func){
        obj.css({"left":0});
        if(typeof func==="function" && func instanceof Function){
            func();
        }
    },
    // 到指定页面
    toPage:function(obj,func){
        obj.animate({"left":0},200,function(){
            if(typeof func==="function" && func instanceof Function){
                func();
            }
        });
    },
    // 到指定页面
    toNext:function(obj,func){
        obj.animate({"left":0},200,function(){
            if(typeof func==="function" && func instanceof Function){
                func();
            }
        });
    },
    // 回返前页
    toPrev:function(obj,func){
        obj.animate({"left":"100%"},200,function(){
            if(typeof func==="function" && func instanceof Function){
                func();
            }
        });
    },
    // 初始化显示
    showPage:function(func){
        $("#atten_box").fadeOut(200,function(){
            if(typeof func==="function" && func instanceof Function){
                func();
            }
        });
        $("#bg_div").fadeOut(400);
    }
}
// 获取连接数据
var link_obj=GetRequest();
var page=link_obj["page"]?link_obj["page"]:"";
$(function(){
    // 绑定滚动
    myScroll1=new IScroll('.page1',{mouseWheel: true,hideScrollbar: true,click: true,bounce:false});
    myScroll2=new IScroll('.page2',{mouseWheel: true,hideScrollbar: true,click: true,bounce:false});
    myScroll3=new IScroll('.page3',{mouseWheel: true,hideScrollbar: true,click: true,bounce:false});
    $m.showPage(function(){
        $m.rs();
        $(".page").show();
    });
    // 绑定返回事件
    $(".js_back").on("click",function(){
        $m.toPrev($(this).parents(".page"));
    });
    // 綁定返回的页面
    $(".js_back_page").on("click",function(){
        if(page!==""){
            window.location.href=page+".html";
        }
    });
    // 司机详情
    $(".js_drver").on("click",function(){
        $m.toNext($(".page2"),function(){
            $m.active_scroll=2;
            $m.refreshPage();
        });
    });
    // 立即叫车
    $(".js_called_btn").on("click",function(){
        $m.toNext($(".page3"),function(){
            $m.active_scroll=3;
            $m.refreshPage();
        });
    });
    // 选择支付方式
    $(".js_pay_list>li").on("click",function(){
        var a=$(this).children("a").children("span");
        a.addClass("now_choice_spn");
        $(this).siblings("li").children("a").children("span").removeClass("now_choice_spn");
    });
    // 确认支付
    $(".js_pay_btn").on("click",function(){
        msg("支付成功！","确定",function(){
            window.location.href="member_center.html?page=2";
        },true);
    });
    
    $(window).on("resize",function(){$m.rs()});
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