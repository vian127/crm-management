// 滚动变量
var myScroll1,myScroll2,myScroll3,myScroll4,myScroll5,myScroll6,myScroll7,myScroll8,myScroll9,myScroll10,myScroll11,myScroll12,myScroll13,myScroll14,myScroll15,myScroll16,myScroll17,myScroll18,myScroll19,myScroll20;
// 自定义方法
var $m={
    // 分享链接
    share_href: window.location.href,
    // 分享配置
    share_arr:{
        appId: "", 
        timestamp: "", 
        nonceStr: "", 
        signature: "", 
    },
    // 图片地址前缀
    img_url:"images/",
    head_place: "defult_pic.jpg",   //头像占位图片
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
        }else if(type==4){
            myScroll4.refresh();
        }else if(type==5){
            myScroll5.refresh();
        }else if(type==6){
            myScroll6.refresh();
        }else if(type==7){
            myScroll7.refresh();
        }else if(type==8){
            myScroll8.refresh();
        }else if(type==9){
            myScroll9.refresh();
        }else if(type==10){
            myScroll10.refresh();
        }else if(type==11){
            myScroll11.refresh();
        }else if(type==12){
            myScroll12.refresh();
        }else if(type==13){
            myScroll13.refresh();
        }else if(type==14){
            myScroll14.refresh();
        }else if(type==15){
            myScroll15.refresh();
        }else if(type==16){
            myScroll16.refresh();
        }else if(type==17){
            myScroll17.refresh();
        }else if(type==18){
            myScroll18.refresh();
        }else if(type==19){
            myScroll19.refresh();
        }else if(type==20){
            myScroll20.refresh();
        }else if(type==21){
            myScroll21.refresh();
        }else if(type==22){
            myScroll22.refresh();
        }
    },
    // ajax 请求地址前缀
    ajax_link:"http://120.25.68.163/citytravel/index.php?g=admin&m=app&a=",
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
    },
    setPassword:{                   //修改密码的json
        "name":"姓名",
        "phone":"手机号",
        "code":"验证码",
        "password":"新密码",
        "autocode":1515
    },
    user_info:{
        "phone":      18821725490,                  //手机号码
        "page":       1,                             //我的行程当前页面
        "is_add":     false,                             
        "is_get":     false,                            
    },
    order_arr:null,
    my_coupon:{                                     //我的优惠券去当前信息
        is_add:false,
        npage:1,
        is_get: false,
    },
    invoice:{},                                     //发票提交信息
}
// 获取连接数据
var link_obj=GetRequest();
// 用户id
var user_id="";
var page_link=link_obj["page_link"]?link_obj["page_link"]:"";
$(function(){
    // 绑定滚动
    myScroll1=new IScroll('.page1',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll2=new IScroll('.page2',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll3=new IScroll('.page3',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll4=new IScroll('.page4',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll5=new IScroll('.page5',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll6=new IScroll('.page6',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true,probeType:3});
    myScroll7=new IScroll('.page7',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll8=new IScroll('.page8',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll9=new IScroll('.page9',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll10=new IScroll('.page10',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll11=new IScroll('.page11',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll12=new IScroll('.page12',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll13=new IScroll('.page13',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll14=new IScroll('.page14',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll15=new IScroll('.page15',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll16=new IScroll('.page16',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll17=new IScroll('.page17',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll18=new IScroll('.page18',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll19=new IScroll('.page19',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll20=new IScroll('.page20',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll21=new IScroll('.page21',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    myScroll22=new IScroll('.page22',{mouseWheel: true,hideScrollbar: true,click:true,bounce:false,tap:true});
    $m.rs();
    // 显示
    (function(){
        // 判断是否登录
        var is_sign=getLocalStorage("is_sign")?getLocalStorage("is_sign"):"";
        var id=getLocalStorage("id")?getLocalStorage("id"):"";
        var phone=getLocalStorage("phone")?getLocalStorage("phone"):"";
        if(is_sign=="" || id=="" || phone==""){
            // 没登录
            $m.toDirect($(".page15"),function(){
                $m.showPage();
                $m.active_scroll=15;
                $m.refreshPage();
            });
        }else{
            // 获取个人信息
            user_id=id;
            $m.user_info["phone"]=phone;
            var arr={"user_id":user_id};
            subAjax(arr,$m.ajax_link+"getSelfInfos",setUserInfo);
        }
    })();
    // 绑定返回事件
    $(".js_back").on("tap",function(){
        $m.toPrev($(this).parents(".page"));
    });
    // 个人信息
    $(".js_personal_info").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page19"),function(){
            $m.active_scroll=19;
            $m.refreshPage();
        });
        var arr={"user_id":user_id};
        subAjax(arr,$m.ajax_link+"getSelfInfos",function(re){
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
            var avatar=re["data"]["avatar"]?re["data"]["avatar"]:$m.img_url+$m.head_place;
            var user_nicename=re["data"]["user_nicename"]?re["data"]["user_nicename"]:"请填写";
            var sex=re["data"]["sex"]?re["data"]["sex"]:0;
            var signature=re["data"]["signature"]?re["data"]["signature"]:"";
            var phone=$m.user_info["phone"];
            var q=phone.substr(0,3);
            var h=phone.substr(7);
            var str=q+"****"+h;
            $(".page19 .js_mobile_txt1").text(str).attr("data-mobile",phone);
            $(".page19 .js_header_pic").attr("src",avatar);
            $(".page19 .js_nicename").text(user_nicename);
            $(".page19 .js_autograph_txt").text(signature);
            var txt="";
            if(sex==1){
                txt="男";
            }else if(sex==2){
                txt="女";
            }else{}
            $(".page19 .js_sex_txt").text(txt);
        });
    });
    // 点击修改头像
    $(".js_choice_head_pic").on("tap",function(){
        $(".head_pic_div").show().siblings(".bg_div").fadeIn(400);;
    });
    // 相册
    $(".js_album_btn").on("tap",function(){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                $(".js_occupying_image").attr("src",localIds);
                $m.toNext($(".page23"),function(){

                })
            }
        });
    });
    // 相机
    $(".js_photograph_btn").on("tap",function(){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                $(".js_occupying_image").attr("src",localIds);
                $m.toNext($(".page23"),function(){

                })
            }
        });
    });
    //确认选择图片
    $(".js_sure_pic_choice").on("tap",function(){
        var src=$(this).siblings(".js_occupying_image").attr("src")?$(this).siblings(".js_occupying_image").attr("src"):"";
        if(src!=""){
            $(".js_head_pic").attr("src",src);
        }
    });
    // 修改昵称
    $(".js_rename").on("tap",function(){
        var txt=$(this).find(".js_nicename").text()?$(this).find(".js_nicename").text():"";
        txt=txt.reSpace();
        $(".js_rename_box").find(".js_rename_area").val(txt);
        $(".js_rename_box").show().siblings(".bg_div").fadeIn(400);;
    });
    // 确认修改昵称
    $(".js_rename_btn").on("click",function(){
        var txt=$(".js_rename_area").val()?$(".js_rename_area").val():"";
        if(txt==""){
            msg("昵称不能为空。",800);
        }else{
            $(".js_rename_box").fadeOut(200);
            $(".bg_div").fadeOut(400);
            $(".js_nicename").text(txt);
            var arr={"user_nicename":txt,"user_id":user_id};
            subAjax(arr,$m.ajax_link+"goModifiedSelfInfo",function(){
                $(".js_nicename").text(txt);
            });
        }
    });
    // 修改性别
    $(".js_sex").on("tap",function(){
        var sex=$(".js_sex").attr("data-sex")?$(".js_sex").attr("data-sex"):1;
        console.log(sex)
        if(sex==1){
            $(".js_sex_div>a").eq(0).addClass("now_choice_a").siblings("a").removeClass("now_choice_a");
        }else{

            $(".js_sex_div>a").eq(1).addClass("now_choice_a").siblings("a").removeClass("now_choice_a");
        }
        $(".js_sex_box").show().siblings(".bg_div").fadeIn(400);;
    });
    // 确认修改性别
    $(".js_sex_div>a").on("click",function(){
        $(this).addClass("now_choice_a").siblings("a").removeClass("now_choice_a");
        var num=$(this).attr("data-sex")?$(this).attr("data-sex"):0;
        $(".js_sex_box").fadeOut(200);
        $(".bg_div").fadeOut(400);
        var txt=num==2?"女":"男";
        $(".js_sex").attr("data-sex",num);
        $(".js_sex_txt").text(txt);
        var arr={"sex":num,"user_id":user_id};
        subAjax(arr,$m.ajax_link+"goModifiedSelfInfo",function(){
            $(".js_sex_txt").text(txt);
        });
    });
    // 修改年龄
    $('.js_birthday').date({theme:"date",ylen:70},function(obj,re){
        $(".js_birth_num").text(re).attr("data-date",re);
        // var arr={"age":re,"user_id":user_id};
        // subAjax(arr,$m.ajax_link+"goModifiedSelfInfo",function(){
        //     $(".js_birth_num").text(re).attr("data-date",re);
        // });
    });
    // 修改手机号
    $(".js_mobile_btn").on("tap",function(){
        var num=$(this).attr("data-mobile")?$(this).attr("data-mobile"):"";
        $(".js_change_mobile").find(".js_input_area").val(num);
        $(".js_change_mobile").show().siblings(".bg_div").fadeIn(400);;
    });
    
    // 确认修改手机号
    $(".js_save_mobile_btn").on("click",function(){
        var a=$(this).parent().siblings(".js_input_area");
        var txt=a.val()?a.val():"";
        var regx=/1[1-9]+[0-9]{9}/;
        if(txt==""){
            msg("请填写手机号",800);
        }else if(txt.length<11 || !regx.test(txt)){
            msg("请填写正确手机号",800);
        }else{
            $(".js_change_mobile").fadeOut(200);
            $(".bg_div").fadeOut(400);
            var q=txt.substr(0,3);
            var h=txt.substr(0,4);
            var str=q+"****"+h;
            $(".js_mobile_txt1").text(str).attr("data-mobile",txt);
            // var arr={"phone":txt,"user_id":user_id};
            // subAjax(arr,$m.ajax_link+"goModifiedSelfInfo",function(){
            //     $(".js_change_mobile").fadeOut(200);
            //     $(".bg_div").fadeOut(400);
            //     var q=txt.substr(0,3);
            //     var h=txt.substr(0,4);
            //     var str=q+"****"+h;
            // });
        }
    });
    
    // 修改签名
    $(".js_autograph").on("tap",function(){
        var txt=$(this).find(".js_autograph_txt").text()?$(this).find(".js_autograph_txt").text():"";
        txt=txt.reSpace();
        if(txt!="" && txt!="请填写"){
            $(".js_change_autograph").find(".js_text_area").val(txt);
        }
        $(".js_change_autograph").show().siblings(".bg_div").fadeIn(400);;
    });
    // 确认修改手机号
    $(".js_autograph_btn").on("click",function(){
        var a=$(this).parent().siblings(".js_text_area");
        var txt=a.val()?a.val():"";
        if(txt==""){
            msg("请填写签名",800);
        }else{
            $(".js_change_autograph").fadeOut(200);
            $(".bg_div").fadeOut(400);
            $(".js_autograph").find(".js_autograph_txt").text(txt);
            var arr={"signature":txt,"user_id":user_id};
            subAjax(arr,$m.ajax_link+"goModifiedSelfInfo",function(){
                $(".page19 .js_autograph_txt").text(txt);
            });
        }
    });
    // 取消修改
    $(".js_cancel_btn").on("click",function(){
        $(this).parent().parent().fadeOut(200);
        $(".bg_div").fadeOut(400);
    });
    $(".js_cancel_choice_pic").on("click",function(){
        $(this).parent().fadeOut(200);
        $(".bg_div").fadeOut(400);
    });
    
    // 我的行程
    $(".js_my_trip").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page2"),function(){
            $m.active_scroll=2;
            $m.refreshPage();
        });
        if(!$m.user_info["is_add"]){
            var arr={"phone":$m.user_info["phone"],"user_id":user_id,"page":$m.user_info["page"]};
            $m.user_info["is_get"]=true;
            subAjax(arr,$m.ajax_link+"getOrderListByPhone",setMyTrip,function(){
                $m.user_info["is_get"]=false;
            });
        }else{
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
        }
    });
    // 优惠券滚动监听
    myScroll2.on("scrollEnd",function(){
        var ph=this.wrapperHeight;
        var oh=this.scrollerHeight;
        var y=this.y;
        if(y<ph-oh+10){
            // 开始请求
            if(!$m.user_info["is_get"]){
                $m.user_info["is_get"]=true;
                $("#atten_box").fadeIn(100);
                $(".bg_div").fadeIn(200);
                var arr={"phone":$m.user_info["phone"],"user_id":user_id,"page":$m.user_info["page"]};
                subAjax(arr,$m.ajax_link+"getOrderListByPhone",setMyTrip,function(){
                    $m.user_info["is_get"]=false;
                    myScroll2.refresh();
                });
            }else{
                myScroll2.refresh();
            }
        }  
    });
    // 行程详情
    $(".page2").on("tap",".js_trip_list>li",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page3"),function(){
            $m.active_scroll=3;
            $m.refreshPage();
        });
        var orderId=$(this).attr("data-orderid")?$(this).attr("data-orderid"):"";
        var arr={"orderId":orderId,"user_id":user_id};
        subAjax(arr,$m.ajax_link+"getOrderDetail",setMyTripDetail);
    });
    // 取消订单框
    $(".js_del_order").on("tap",function(){
        $(".js_del_order_box").show().siblings(".bg_div").fadeIn(400);
    });
    // 选择取消订单原因
    $(".js_del_reason>li").on("click",function(){
        $(this).addClass("js_now").siblings("li").removeClass("js_now");
        $(this).children("img").addClass("now_choice_img");
        $(this).siblings("li").children("img").removeClass("now_choice_img");
    });
    // 确认取消订单
    $(".js_order_btn").on("click",function(){
        var a=$(".js_del_reason>li.js_now");
        var txt=a.text();
        if(a.length==0){
            msg("请先选择取消订单原因",800);
        }else{
            var orderid=$(".page3 .js_del_order").attr("data-orderid");
            var arr={"orderId":orderid,"user_id":user_id,"type":1};
            subAjax(arr,$m.ajax_link+"goCancelOrder",function(){
                msg("取消订单成功",800);
                $(".js_cancel_div").show().siblings(".js_order_detail_box").hide();
                $(".page3 .js_del_order").hide();
                $(".p3_btn_div").hide();
                $(".js_refund_div").hide();
                $(".js_cancel_div").children("span").text(txt);
                $(".js_del_order_box").fadeOut(200);
                $(".bg_div").fadeOut(400,function(){
                    myScroll3.refresh();
                });
            });
        }
    });
    // 评星星数量
    $(".page").on("tap",".js_star_list>li",function(){
        var a=$(this),b=a.children("img"),c=a.parent();
        var leven=a.attr("data-star")?a.attr("data-star"):"3";
        c.children("li").each(function(i){
            if(i<leven){
                $(this).addClass("js_now").children("img").attr("src",$m.img_url+"icon17.png");
            }else{
                $(this).removeClass("js_now").children("img").attr("src",$m.img_url+"icon16.png");
            }
        });
    });
    // 提交评价
    $(".js_sub_evaluate").on("tap",function(){
        var a=$(this);
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        var orderId=$(".js_del_order").attr("data-orderid")?$(".js_del_order").attr("data-orderid"):"";
        var toUid=$(".js_del_order").attr("data-driverid")?$(".js_del_order").attr("data-driverid"):"";
        var preview=[];
        $(".js_can_star").each(function(){
            var n_len=$(this).children("li.js_now").length;
            preview.push(n_len);
        });
        var arr={"orderId":orderId,"skills":preview[1],"service":preview[2],"environment":preview[3],"toUid":toUid,"starLevel":preview[0],"user_id":user_id};
        subAjax(arr,$m.ajax_link+"goDriverComments",function(re){
            var txt=re["data"]?re["data"]:"评论成功！";
            msg(re["data"],800);
            a.parent().hide();
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
            $(".js_can_star").removeClass("js_star_list");
            myScroll3.refresh();
        });
    });
    // 去支付剩余
    $(".js_to_pay").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page20"),function(){
            $m.active_scroll=20;
            $m.refreshPage();
        });
        var arr=$m.order_arr?$m.order_arr:"";
        if(arr!=""){
            setPayDom(arr);
        }
    });
    // 去选择优惠券
    $(".js_to_get_coupon").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $(".page6").css({"z-index":50});
        $(".p6_btn_div").show();
        $(".coupon_list").addClass("js_coupon_list");
        $(".coupon_list>li").removeClass("now_choice_li");
        $m.toNext($(".page6"),function(){
            $m.active_scroll=6;
            $m.refreshPage();
        });
        if(!$m.my_coupon["is_add"]){
            var arr={"user_id":user_id,"page":$m.my_coupon["npage"]};
            subAjax(arr,$m.ajax_link+"getMyBonus",setMyCoupon,function(){
                $m.my_coupon["is_get"]=false;
            });
        }else{
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
        }
    });
    // 选择优惠券
    $(".page6").on("tap",".js_coupon_list>li",function(){
        if(!$(this).hasClass("now_choice_li")){
            $(this).addClass("now_choice_li");
        }else{
            $(this).removeClass("now_choice_li");
        }
    });
    // 确认选择优惠券
    $(".js_choice_btn").on("tap",function(){
        var a=$(".js_mycoupon_list").children("li.now_choice_li");
        var id=a.attr("data-bonusid")?a.attr("data-bonusid"):"";
        var price=a.attr("data-price")?a.attr("data-price"):0;
        $(".js_to_get_coupon").attr("data-bonusid",id);
        $(".js_to_get_coupon").children("span").text(price);
        var totalprice=$m.order_arr["totalprice"]?$m.order_arr["totalprice"]:0;
        $(".page20 .js_pay_price").text(totalprice-price);
        $m.toPrev($(".page6"),function(){
            $m.active_scroll=20;
            $m.refreshPage();
            $(".page6").css({"z-index":10});
        });
    });
    
    // 选择支付方式
    $(".js_pay_list>li").on("tap",function(){
        $(this).addClass("js_now").siblings("li").removeClass("js_now");
        var a=$(this).children("a").children("span");
        a.addClass("now_choice_spn");
        $(this).siblings("li").children("a").children("span").removeClass("now_choice_spn");
    });
    // 线下支付
    $(".js_offline_btn").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        // 开始提交
        var payType=1;
        var orderId=$m.order_arr["orderid"]?$m.order_arr["orderid"]:"";
        var bonusId=$(".page20 .js_to_get_coupon").attr("data-bonusid")?$(".page20 .js_to_get_coupon").attr("data-bonusid"):"";
        var arr={"orderId":orderId,"bonusId":bonusId,"payType":payType,"paypwd":"","user_id":user_id};
        subAjax2(arr,$m.ajax_link+"goPayOrder",function(re){
            $("#atten_box").fadeOut(50);
            $(".bg_div").fadeOut(100);
            msg("提交成功！",800);
            $(".page3 .js_del_order").hide();
            $(".page3 .js_can_star").addClass("js_star_list");
            $(".page3 .p3_btn_div").children(".js_to_pay").hide();
            $m.toPrev($(".page20"),function(){
                $m.active_scroll=3;
                $m.refreshPage();
            });
        });
    });
    // 确认支付按钮
    $(".js_pay_sure_btn").on("tap",function(){
        var type=$(".js_pay_list>li.js_now").attr("data-type")?$(".js_pay_list>li.js_now").attr("data-type"):2;
        var payType=1;
        if(type==2){
            // 余额支付
            payType=5;
            $m.toNext($(".page21"),function(){
                $m.active_scroll=21;
                $m.refreshPage();
            });
        }else{
            // 微信支付
            payType=3;
            var orderId=$m.order_arr["orderid"]?$m.order_arr["orderid"]:"";
            // 商户id
            var partnerId=$m.order_arr["partnerId"]?$m.order_arr["partnerId"]:"";
            var ip=returnCitySN["cip"]?returnCitySN["cip"]:"";
            var nprice=222;
            var str='bank_type=WX&body=微信支付&fee_type=1&input_charset=UTF-8&notify_url=http://weixin.qq.com&out_trade_no='+orderId+'&partner='+partnerId+'&spbill_create_ip='+ip+'&total_fee='+nprice;
            wx.chooseWXPay({
                timestamp: $m.share_arr["timestamp"], // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: $m.share_arr["nonceStr"], // 支付签名随机串，不长于 32 位
                package: str, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: '', // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    console.log(res);
                }
            });
        }
        var orderId=$m.order_arr["orderid"]?$m.order_arr["orderid"]:"";
        var bonusId=0;
        var arr={"orderId":orderId,"bonusId":bonusId,"payType":payType,"user_id":user_id};
        subAjax(arr,$m.ajax_link+"goPayOrder",function(re){
            $m.order_arr["paysn"]=re["data"]["paysn"]?re["data"]["paysn"]:"";
            $m.order_arr["payprice"]=re["data"]["payprice"]?re["data"]["payprice"]:0;
            $(".page21 .js_payprice_spn").text($m.order_arr["payprice"]);
        });
    });
    // 密码输入控制
    $(".js_pass_area").on("keyup",function(){
        var txt=$(this).val();
        if(txt.length>=6){
            $(this).blur();
        }
    });
    // 找回密码
    $(".js_get_pass").on("tap",function(){
        $m.toNext($(".page22"),function(){
            $m.active_scroll=22;
            $m.refreshPage();
        });
    });
    // 获取验证码
    $(".page22 .js_get_code").on("tap",function(){
        checkpost($(this),"page22 .js_mobile",3);
    });
    // 确认修改密码
    $(".js_sure_resetpass").on("tap",function(){
        toSubPass($(this),function(){
            $m.toPrev($(".page22"),function(){
                $m.active_scroll=21;
                $m.refreshPage();
            });
        });
    });
    // 手机限制输入字母和汉字
    $(".js_mobile").bind("input propertychange",function(){
        var txt=$(this).val();
        var regx=/\D/g;
        $(this).val(txt.replace(regx,''));
    });
    // 确认余额支付
    $(".js_pay_balance_now").on("tap",function(){
        var a=$(this);
        var pass=$(".page21 .js_pass_area").val()?$(".page21 .js_pass_area").val():"";
        if(pass==""){
            msg("请输入支付密码",800);
        }else{
            $("#atten_box").fadeIn(100);
            $(".bg_div").fadeIn(200);
            // 开始提交
            var paysn=$m.order_arr["paysn"]?$m.order_arr["paysn"]:"";
            var arr={"user_id":user_id,"paypwd":md5(pass),"paysn":paysn};
            subAjax2(arr,$m.ajax_link+"goUseBalancePay",function(re){
                $("#atten_box").fadeOut(100);
                $(".bg_div").fadeOut(200);
                msg("支付成功！","确定",function(){
                    a.siblings(".js_pass_area").val("");
                    $(".page3").css({"left":"100%"});
                    $(".page20").css({"left":"100%"});
                    $m.toPrev($(".page21"),function(){
                        $m.active_scroll=2;
                        $m.refreshPage();
                    });
                },true);
            });
        }
    });
    // 我的钱包
    $(".js_my_wallet").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page4"),function(){
            $m.active_scroll=4;
            $m.refreshPage();
        });
        var arr={"user_id":user_id};
        subAjax(arr,$m.ajax_link+"getMyWalletData",function(re){
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
            var user_money=re["data"]["user_money"]?re["data"]["user_money"]:0;
            var user_bonuscount=re["data"]["user_bonuscount"]?re["data"]["user_bonuscount"]:0;
            $(".js_balance_spn").text(user_money);
            $(".page4 .js_coupon_num").text(user_bonuscount);
        });
    });
    // 钱包余额
    $(".page4 .js_balance").on("tap",function(){
        // $("#atten_box").fadeIn(100);
        // $(".bg_div").fadeIn(200);
        $m.toNext($(".page5"),function(){
            $m.active_scroll=5;
            $m.refreshPage();
        });
        // 开始提交
        // var arr={"orderId":orderId,"bonusId":bonusId,"payType":payType,"paypwd":"","user_id":user_id};
        // subAjax(arr,$m.ajax_link+"goPayOrder",function(re){
        //     $m.setHeight($(".circular_div").eq(0),1);
        // });
        $m.setHeight($(".circular_div").eq(0),1);
    });
    // 充值
    $(".page4 .js_recharge").on("tap",function(){
        msg("此功能暂时未开通。",800);
    });
    // 提现
    $(".page4 .js_cash").on("tap",function(){
        msg("此功能暂时未开通。",800);
    });
    // 优惠券
    $(".js_coupon").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page6"),function(){
            $m.active_scroll=6;
            $m.refreshPage();
        });
        if(!$m.my_coupon["is_add"]){
            var arr={"user_id":user_id,"page":$m.my_coupon["npage"]};
            subAjax(arr,$m.ajax_link+"getMyBonus",setMyCoupon,function(){
                $m.my_coupon["is_get"]=false;
            });
        }else{
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
        }
    });
    // 优惠券滚动监听
    myScroll6.on("scrollEnd",function(){
        var ph=this.wrapperHeight;
        var oh=this.scrollerHeight;
        var y=this.y;
        if(y<ph-oh+10){
            // 开始请求
            if(!$m.my_coupon["is_get"]){
                $m.my_coupon["is_get"]=true;
                $("#atten_box").fadeIn(100);
                $(".bg_div").fadeIn(200);
                var arr={"user_id":user_id,"page":$m.my_coupon["npage"]};
                subAjax(arr,$m.ajax_link+"getMyBonus",setMyCoupon,function(){
                    $m.my_coupon["is_get"]=false;
                });
            }
        }  
    });
    // 使用详情
    $(".js_rule").on("tap",function(){
        $(".page8").css({"z-index":50});
        $m.toNext($(".page8"),function(){
            m.active_scroll=8;
            $m.refreshPage();
        });
    });
    // 添加优惠券
    $(".js_add_coupon").on("tap",function(){
        $(".page7").css({"z-index":50});
        $m.toNext($(".page7"),function(){
            m.active_scroll=7;
            $m.refreshPage();
        });
    });
    // 扫一扫添加优惠券
    $(".js_sweep_btn").on("tap",function(){
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
        });
    });
    // 确定添加优惠券
    $(".js_add_coupon_btn").on("tap",function(){
        var str_arr=[];
        $(".page7 .js_input_area").each(function(){
            var txt=$(this).val()?$(this).val():"";
            str_arr.push(txt);
        });
        if(str_arr[0]==""){
            msg("请输入编号",800);
        }else if(str_arr[1]==""){
            msg("请输入密码",800);
        }else{
            $("#atten_box").fadeIn(100);
            $(".bg_div").fadeIn(200);
            // $m.toPrev($(".page7"),function(){
            //     $m.active_scroll=6;
            //     $m.refreshPage();
            // });
            var arr={"bonusSN":str_arr[0],"passcode":str_arr[1],"user_id":user_id};
            subAjax(arr,$m.ajax_link+"addBonus",function(re){
                console.log(re);
                $("#atten_box").fadeIn(50);
                $(".bg_div").fadeIn(100);
                mgs("添加成功！",800);
            });
        }
    });
    // 开发票
    $(".js_invoice").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page9"),function(){
            $m.active_scroll=9;
            $m.refreshPage();
        });
        var arr={"phone":$m.user_info["phone"],"user_id":user_id};
        subAjax(arr,$m.ajax_link+"getNoIssueInvoice",setMyInvoice);
    });
    // 选择发票订单
    $(".page9").on("tap",".js_invoice_list>li",function(){
        var all_price=$(".page9 .js_invoice_price").text()?$(".page9 .js_invoice_price").text():0;
        all_price=Number(all_price)?Number(all_price):0;
        var all_count=$(".page9 .js_invoice_num").text()?$(".page9 .js_invoice_num").text():0;
        var nprice=$(this).attr("data-price")?$(this).attr("data-price"):0;
        nprice=Number(nprice)?Number(nprice):0;
        var id=$(this).attr("data-orderid")?$(this).attr("data-orderid"):"";
        if(!$(this).hasClass("now_choice_li")){
            $(this).addClass("now_choice_li");
            all_price+=nprice;
            all_count++;
        }else{
            all_price=(all_price-nprice)<0?0:all_price-nprice;
            all_count=all_price==0?0:all_count--;
            $(this).removeClass("now_choice_li");
        }
        // var nprice=$(this).attr("data-price")?$(this).attr("data-price"):0;
        // var id=$(this).attr("data-orderid")?$(this).attr("data-orderid"):"";
        // $(this).addClass("now_choice_li").siblings("li").removeClass("now_choice_li");
        $(".page9 .js_invoice_price").text(all_price);
        $(".page9 .js_invoice_num").text(all_count);
    });
    // 全选
    $(".js_choice_all_invoice").on("tap",function(){
        var type=0;
        if(!$(this).hasClass("all_chocie_btn")){
            type=1;
            $(this).addClass("all_chocie_btn").removeClass("all_nchocie_btn");
            $(".page9 .js_invoice_list>li").addClass("now_choice_li");
        }else{
            type=2
            $(this).addClass("all_nchocie_btn").removeClass("all_chocie_btn");
            $(".page9 .js_invoice_list>li").removeClass("now_choice_li");
        }
        var all_price=0;
        var all_count=$(".page9 .js_invoice_list>li").length;
        $(".page9 .js_invoice_list>li").each(function(){
            var nprice=$(this).attr("data-price")?$(this).attr("data-price"):0;
            nprice=Number(nprice)?Number(nprice):0;
            all_price+=nprice;
        });
        if(type==2){
            all_price=0;
            all_count=0;
        }
        $(".page9 .js_invoice_price").text(all_price);
        $(".page9 .js_invoice_num").text(all_count);
    });
    // 填写信息
    $(".js_fill_info").on("tap",function(){
        if($(".js_invoice_list").children("li.now_choice_li").length<1){
            msg("请先选择订单。",800);
        }else{
            var all_price=0;
            var all_count=$(".page9 .js_invoice_list>li").length;
            var idstr="";
            $(".page9 .js_invoice_list>li.now_choice_li").each(function(i){
                var nprice=$(this).attr("data-price")?$(this).attr("data-price"):0;
                var id=$(this).attr("data-orderid")?$(this).attr("data-orderid"):"";
                nprice=Number(nprice)?Number(nprice):0;
                all_price+=nprice;
                if(i==0){
                    idstr=id;
                }else{
                    idstr+=","+id;
                }
            });
            $m.invoice["price"]=all_price;
            $m.invoice["orderIds"]=idstr;
            $m.invoice["getType"]=1;
            $(".page10").find(".js_input_area").eq(0).val(all_price);
            $m.toNext($(".page10"),function(){
                $m.active_scroll=10;
                $m.refreshPage();
            });
        }
    });
    // 送达服务站
    $(".js_to_service_station").on("tap",function(){
        $m.invoice["getType"]=1;
        $(this).addClass("choice_btn").siblings("a").removeClass("choice_btn");
        // $(".js_service_station").show();
        $(".js_address_ele").hide();
        myScroll10.refresh();
    });
    // 服务站选择
    // $(".page10").on("tap",".js_choice_service_station",function(){
    //     $(this).find(".js_choice_pic").attr("src",$m.img_url+"icon22.png");
    //     $(this).siblings(".js_choice_service_station").find(".js_choice_pic").attr("src",$m.img_url+"icon21.png");
    // });
    // 快递
    $(".js_to_express").on("tap",function(){
        $m.invoice["getType"]=2;
        $(this).addClass("choice_btn").siblings("a").removeClass("choice_btn");
        // $(".js_service_station").hide();
        $(".js_address_ele").show();
        $(".page10 .js_address_txt").focus();
        myScroll10.refresh();
    });
    // 提交发票信息
    $(".js_save_info").on("tap",function(){
        var a=$(".page10 .js_input_area");
        var invoiceTitle=a.eq(1).val()?a.eq(1).val():"";
        var service=a.eq(2).val()?a.eq(2).val():"";
        var consignee=a.eq(3).val()?a.eq(3).val():"";
        var phone=a.eq(4).val()?a.eq(4).val():"";
        var address=$(".page10 .js_address_txt").val()?$(".page10 .js_address_txt").val():"";
        var regx=/1[1-9]+[0-9]{9}/;
        if(invoiceTitle==""){
            msg("请填写发票抬头",800);
        }else if(consignee==""){
            msg("请填写收件人姓名",800);
        }else if(phone==""){
            msg("请填写手机号",800);
        }else if(phone.length<11 || !regx.test(phone)){
            msg("请填写正确手机号",800);
        }else if($m.invoice["getType"]==2 && address==""){
            msg("请填写邮寄地址",800);
        }else{
            $("#atten_box").fadeIn(100);
            $(".bg_div").fadeIn(200);
            $m.invoice["user_id"]=user_id;
            $m.invoice["invoiceTitle"]=invoiceTitle;
            $m.invoice["service"]=service;
            $m.invoice["consignee"]=consignee;
            $m.invoice["phone"]=phone;
            $m.invoice["address"]=address;
            subAjax($m.invoice,$m.ajax_link+"goIssueInvoice",function(){
                $("#atten_box").fadeOut(100);
                $(".bg_div").fadeOut(200);
                $(".page9").css({"left":"100%"});
                msg("提交成功","确定",function(){
                    $m.toPrev($(".page10"),function(){
                        $m.active_scroll=4;
                    });
                },true);
            });
        }
    });
    // 我的积分
    $(".js_integral").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.setHeight($(".circular_div").eq(1),1);
        $m.toNext($(".page11"),function(){
            $m.active_scroll=11;
            $m.refreshPage();
        });
        var arr={"user_id":user_id};
        subAjax(arr,$m.ajax_link+"getSelfInfos",function(re){
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
            var score=re["data"]["score"]?re["data"]["score"]:0;
            $(".page11 .js_integral_spn").text(score);
        });
    });
    // 使用积分
    $(".js_use_integral").on("tap",function(){
        msg("暂时未开通此业务。",800);
        // var arr={"user_id":user_id};
        // subAjax(arr,$m.ajax_link+"getSelfInfos",function(re){
        //     $("#atten_box").fadeOut(100);
        //     $(".bg_div").fadeOut(200);
        //     var score=re["data"]["score"]?re["data"]["score"]:0;
        //     $(".page11 .js_integral_spn").text(score);
        // });
    });
    // 我的分享
    $(".js_share").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page12"),function(){
            $m.active_scroll=12;
            $m.refreshPage();
        });
        var arr={"user_id":user_id};
        subAjax(arr,$m.ajax_link+"getMyShare",setMyShare,function(){

        });
    });
    // 切换分享
    $(".js_btn_div").on("tap",function(){
        var _index=$(".js_btn_div").index($(this));
        $(this).addClass("weui_bar_item_on").siblings(".js_btn_div").removeClass("weui_bar_item_on");
        $(".js_detail_div").eq(_index).show().siblings(".js_detail_div").hide();
        myScroll12.refresh();
    });
    // 申请提现
    $(".js_get_cash_btn").on("tap",function(){
        msg("暂时未开通此业务。",800);
        // $("#atten_box").fadeIn(100);
        // $(".bg_div").fadeIn(200);
        // var arr={"user_id":user_id};
        // subAjax(arr,$m.ajax_link+"getMyShare",setMyShare,function(){

        // });
    });
    // 关于我们
    $(".js_about").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page13"),function(){
            $m.active_scroll=13;
            $m.refreshPage();
        });
        // var arr={};
        // subAjax(arr,$m.ajax_link+"abount",function(re){
        //     console.log(re)
        // });
    });
    // 意见反馈
    $(".js_feedback").on("tap",function(){
        $m.toNext($(".page14"),function(){
            $m.active_scroll=14;
            $m.refreshPage();
        });
    });
    // 提交反馈
    $(".js_sub_feedback").on("tap",function(){
        var msg_content=$(".page14 .js_txt_area").val()?$(".page14 .js_txt_area").val():"";
        if(msg_content==""){
            msg("请填写您的意见。",800);
        }else{
            $("#atten_box").fadeIn(100);
            $(".bg_div").fadeIn(200);
            var arr={"user_id":user_id,"msg_content":msg_content};
            subAjax(arr,$m.ajax_link+"goFeedBack",function(){
                $("#atten_box").fadeOut(50);
                $(".bg_div").fadeOut(100);
                msg("您的反馈内容已经提交成功！","确定",function(){
                    $m.toPrev($(".page14"),function(){
                        $m.active_scroll=1;
                    });
                },true);
            });
        }
    });
    // 退出登录
    $(".js_sign_out").on("tap",function(){
        delLocalStorage(["is_sign","id"]);
        $m.toNext($(".page15"),function(){
            $m.active_scroll=15;
            $m.refreshPage();
        });
    });
    // 登录
    $(".js_sign_btn").on("tap",function(){
        signInFuc($(this),function(re){
            msg("登录成功！",800);
            user_id=re["data"]["id"]?re["data"]["id"]:"";
            var phone=re["data"]["user_login"]?re["data"]["user_login"]:"";
            $m.user_info["phone"]=phone;
            setLocalStorage({"id":user_id,"is_sign":true,"phone":phone});
            if(page_link && page_link!=""){
                window.location.replace(page_link);
            }else{
                $m.toPrev($(".page15"),function(){
                    $m.active_scroll=1;
                });
                $("#atten_box").fadeIn(100);
                $(".bg_div").fadeIn(200);
                // 获取个人信息
                
                setUserInfo(re);
            }
            
        });
    });
    // 注册
    $(".js_to_register").on("tap",function(){
        $m.toNext($(".page16"),function(){
            $m.active_scroll=16;
            $m.refreshPage();
        });
    });
    // 获取验证码
    $(".page16 .js_get_code").on("tap",function(){
        checkpost($(this),"page16 .js_mobile",1);
    });
    // 提交注册
    $(".js_register_btn").on("tap",function(){
        registerFunc($(this),function(){
            msg("注册成功，立即登录。","确定",function(){
                $m.toPrev($(".page16"),function(){
                    $m.active_scroll=15;
                });
            },true);
        });
    });
    
    // 找回密码
    $(".js_get_ps").on("tap",function(){
        var phone=$(".page15 .js_input_area").eq(0).val()?$(".page15 .js_input_area").eq(0).val():"";
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $(".page17 .js_input_area").eq(0).val(phone);
        $m.toNext($(".page17"),function(){
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
            $m.active_scroll=17;
        });
        
    });
    // 获取验证码
    $(".page17 .js_get_code").on("tap",function(){
        checkpost($(this),"page17 .js_mobile",2);
    });
    // 提交找密码
    $(".js_get_ps_btn").on("tap",function(){
        getSignPass($(this),function(){
            msg("密码找回成功。",800);
            $m.toPrev($(".page17"),function(){
                $m.active_scroll=15;
                $m.refreshPage();
            });
        });
    });
    $(window).on("resize",function(){$m.rs()});
});
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
// 请求数据
function subAjax(arr,url,successFunc,errorFunc){
    $.ajax({
        type: "POST",
        url: url,
        data:arr,
        dataType: "json",
        success: function(data){
            if(data["status"]==1){
                if(typeof successFunc==="function" && successFunc instanceof Function){
                    successFunc(data);
                }
            }else{
                if(typeof errorFunc==="function" && errorFunc instanceof Function){
                    errorFunc();
                }
                msg(data["data"],800);
                $("#atten_box").fadeOut(100);
                $(".bg_div").fadeOut(200);
            }
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            msg("请求失败，请稍后重试！","确定");
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
        }
    });
}
// 请求数据
function subAjax2(arr,url,func){
    $.ajax({
        type: "POST",
        url: url,
        data:arr,
        dataType: "json",
        success: function(data){
            if(data["status"]==-2){
                if(typeof func==="function" && func instanceof Function){
                    func(data);
                }
            }else{
                msg(data["data"],800);
                $("#atten_box").fadeOut(100);
                $(".bg_div").fadeOut(200);
            }
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            msg("请求失败，请稍后重试！","确定");
            $("#atten_box").fadeOut(100);
            $(".bg_div").fadeOut(200);
        }
    });
}
// 生成dom
function setUserInfo(re){
    console.log(re)
    var re_arr=re["data"]?re["data"]:{};
    var avatar=re_arr["avatar"]?re_arr["avatar"]:$m.img_url+$m.head_place;
    var age=re_arr["age"]?re_arr["age"]:0;
    var sex=re_arr["sex"]?re_arr["sex"]:0;
    var score=re_arr["score"]?re_arr["score"]:0;
    var star=re_arr["star"]?re_arr["star"]:0;
    var user_login=re_arr["user_login"]?re_arr["user_login"]:"";
    var user_nicename=re_arr["user_nicename"]?re_arr["user_nicename"]:"";
    var user_star=parseInt(star)?parseInt(star):0;
    for(var i=0;i<user_star;i++){
        $(".page1 .js_user_star>li").eq(i).children("img").attr("src",$m.img_url+"icon17.png");
    }
    $(".page19 .js_sex").attr("data-sex",sex);
    $(".js_header_pic").attr("src",avatar);
    $(".js_nicename").text(user_nicename);
    $(".js_integral_spn").text(score);
    // $(".js_balance_spn").text(balance);
    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    $m.showPage();
}
// 登录
function signInFuc(obj,func){
    var _this=obj;
    var input_txt=[];
    var regx=/1[1-9]+[0-9]{9}/;
    $(".page15 .js_input_area").each(function(){
        input_txt.push($(this).val());
        return input_txt;
    });
    if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]=="undefined"){
        msg("请填写手机号",800);
    }else if(input_txt[0].length<11 || !regx.test(input_txt[0])){
        msg("请填写正确手机号",800);
    }else if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]=="undefined"){
        msg("请输入密码",800);
    }else{
        _this.off("click");
        _this.text("登录中...");
        // 赋值
        // if(typeof func==="function" && func instanceof Function){
        //     func();
        // }
        // return false;
        // 请求开始
        var pass=md5(input_txt[1]);
        $.ajax({
            type: "POST",
            url: $m.ajax_link+"goLogin",
            dataType: "json",
            data: {"phone":input_txt[0],"user_pass":pass},
            success: function(data){
                if(data["status"]==1){
                    console.log("ok");
                    if(typeof func==="function" && func instanceof Function){
                        func(data);
                    }
                    _this.text("登录");
                    _this.on("click",function(){
                        signInFuc(_this,func);
                    });
                }else if(data["status"]==0){
                    msg(data["data"],"确定");
                    _this.text("登录");
                    _this.on("click",function(){
                        signInFuc(_this,func);
                    });
                }
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                // 请求失败
                msg("网络似乎出现了问题，请重试。","确定");
                _this.text("登录");
                _this.on("click",function(){
                    signInFuc(_this,func);
                });
            }
        });
        
    }
}
// 注册
function registerFunc(obj,func){
    var _this=obj;
    var input_txt=[];
    var regx=/1[1-9]+[0-9]{9}/;
    $(".page16 .js_input_area").each(function(){
        input_txt.push($(this).val());
        return input_txt;
    });
    if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]=="undefined"){
        msg("请填写手机号",800);
    }else if(input_txt[0].length<11 || !regx.test(input_txt[0])){
        msg("请填写正确手机号",800);
    }else if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]=="undefined"){
        msg("请输入验证码",800);
    }else if(input_txt[1]!=$m.setPassword["autocode"]){
        msg("验证码错误",800);
    }else if(input_txt[2]=="" || input_txt[2]==null || input_txt[2]=="undefined"){
        msg("请输入密码",800);
    }else{
        _this.off("click");
        _this.text("提交中...");
        // 赋值
        // if(typeof func==="function" && func instanceof Function){
        //     func();
        // }
        // return false;
        var pass=md5(input_txt[2]);
        // 请求开始
        $.ajax({
            type: "POST",
            url: $m.ajax_link+"goRegister",
            dataType: "json",
            data: {"phone":input_txt[0],"code":input_txt[1],"user_pass":pass},
            success: function(data){
                if(data["status"]==1){
                    user_id=data["data"];
                    console.log("ok");
                    if(typeof func==="function" && func instanceof Function){
                        func();
                    }
                    _this.text("注册");
                    _this.on("click",function(){
                        registerFunc(_this,func);
                    });
                }else if(data["status"]==0){
                    msg(data["data"],"确定");
                    _this.text("注册");
                    _this.on("click",function(){
                        registerFunc(_this,func);
                    });
                }
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                // 请求失败
                msg("网络似乎出现了问题，请重试。","确定");
                _this.text("注册");
                _this.on("click",function(){
                    registerFunc(_this,func);
                });
            }
        });
        
    }
}
// 找回密码
function getSignPass(obj,func){
    var _this=obj;
    var input_txt=[];
    var regx=/1[1-9]+[0-9]{9}/;
    $(".page17 .js_input_area").each(function(){
        input_txt.push($(this).val());
        return input_txt;
    });
    if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]=="undefined"){
        msg("请填写手机号",800);
    }else if(input_txt[0].length<11 || !regx.test(input_txt[0])){
        msg("请填写正确手机号",800);
    }else if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]=="undefined"){
        msg("请输入验证码",800);
    }else if(input_txt[1]!=$m.setPassword["autocode"]){
        msg("验证码错误",800);
    }else if(input_txt[2]=="" || input_txt[2]==null || input_txt[2]=="undefined"){
        msg("请输入密码",800);
    }else{
        _this.off("click");
        _this.text("提交中...");
        // 赋值
        // if(typeof func==="function" && func instanceof Function){
        //     func();
        // }
        // return false;
        var pass=md5(input_txt[2]);
        // 请求开始
        $.ajax({
            type: "POST",
            url: $m.ajax_link+"goFindPwd",
            dataType: "json",
            data: {"phone":input_txt[0],"code":input_txt[1],"user_pass":pass},
            success: function(data){
                if(data["status"]==1){
                    user_id=data["data"];
                    console.log("ok");
                    if(typeof func==="function" && func instanceof Function){
                        func();
                    }
                    _this.text("找回密码");
                    _this.on("click",function(){
                        getSignPass(_this,func);
                    });
                }else if(data["status"]==0){
                    msg(data["data"],"确定");
                    _this.text("找回密码");
                    _this.on("click",function(){
                        getSignPass(_this,func);
                    });
                }
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                // 请求失败
                msg("网络似乎出现了问题，请重试。","确定");
                _this.text("找回密码");
                _this.on("click",function(){
                    getSignPass(_this,func);
                });
            }
        });
        
    }
}

// 提交修改密码
function toSubPass(obj,func){    
    var _this=obj;
    var input_txt=[];
    var regx=/1[1-9]+[0-9]{9}/;
    var re_m = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    $(".page22 .js_input_area").each(function(){
        input_txt.push($(this).val());
        return input_txt;
    });
    // if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]=="undefined"){
    //     msg("请填写姓名",800);
    // }else 
    if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]=="undefined"){
        msg("请填写手机号",800);
    }else if(input_txt[1].length<11 || !regx.test(input_txt[1])){
        msg("请填写正确手机号",800);
    }else if(input_txt[2]=="" || input_txt[2]==null || input_txt[2]=="undefined"){
        msg("请输入验证码",800);
    }else if(input_txt[2]!=$m.setPassword["autocode"]){
        msg("验证码错误",800);
    }else if(input_txt[3]=="" || input_txt[3]==null || input_txt[3]=="undefined"){
        msg("请设置新密码",800);
    }else if(input_txt[4]=="" || input_txt[4]==null || input_txt[4]=="undefined"){
        msg("请再次确认密码",800);
    }else if(input_txt[3]!=input_txt[4]){
        msg("前后设置的密码不一致",800);
    }else{
        _this.off("click");
        _this.text("提交中...");
        // 赋值
        // $m.setPassword["name"]=input_txt[0];
        $m.setPassword["phone"]=input_txt[1];
        $m.setPassword["code"]=input_txt[2];
        $m.setPassword["user_pass"]=md5(input_txt[3]);
        $m.setPassword["user_id"]=user_id;
        console.log($m.setPassword)
        // 请求开始
        $.ajax({
            type: "POST",
            url: $m.ajax_link+"goFindPwd",
            dataType: "json",
            data: $m.setPassword,
            success: function(data){
                if(data["status"]==1){
                    console.log("ok");
                    if(typeof func==="function" && func instanceof Function){
                        func(data);
                    }
                    _this.text("确认修改");
                    _this.on("click",function(){
                        toSub(_this);
                    });
                }else if(data["status"]==0){
                    msg(data["data"],"确定");
                    _this.text("确认修改");
                    _this.on("click",function(){
                        toSub(_this);
                    });
                }
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                // 请求失败
                msg("网络似乎出现了问题，请重试。","确定");
                _this.text("确认修改");
                _this.on("click",function(){
                    toSub(_this);
                });
            }
        });
        
    }
}
// 验证码
function checkpost(obj,input_class,type){
    var input_txt="";
    var regPartton=/1[1-9]+[0-9]{9}/;
    input_txt=$("."+input_class).val();
    if(input_txt=="" || input_txt==null || input_txt=="undefined"){
        msg("请填写手机号",800);
    }else if(input_txt.length<11 || !regPartton.test(input_txt)){
        msg("请填写正确手机号",800);
    }else{
        obj.off("click");
        // var timer=null;
        // var seconds=59;
        // // 发送验证码后台切入口
        // obj.css({"color":"#acacac"});
        // obj.text("已发送(60)");
        // timer=setInterval(function(){
        //     obj.text("已发送("+seconds+")");
        //     seconds--;
        //     if(seconds<0){
        //         clearInterval(timer);
        //         obj.text("重新发送");
        //         obj.css({"color":"#fff"});
        //         obj.on("click",function(){
        //             checkpost(obj,input_class);
        //         });
        //     }
        // },1000);
        // return false;
        // 请求开始
        $.ajax({
            type: "POST",
            url: $m.ajax_link+"getVerifyCode",
            dataType: "json",
            data: {"phone":input_txt,"type":type},
            success: function(data){
                if(data["status"]==1){
                    console.log("ok");
                    var timer=null;
                    var seconds=59;
                    // 发送验证码后台切入口
                    obj.css({"color":"#acacac"});
                    obj.text("已发送(60)");
                    timer=setInterval(function(){
                        obj.text("已发送("+seconds+")");
                        seconds--;
                        if(seconds<0){
                            clearInterval(timer);
                            obj.text("重新发送");
                            obj.css({"color":"#fff"});
                            obj.on("click",function(){
                                checkpost(obj,input_class,type);
                            });
                        }
                    },1000);
                    $m.setPassword["autocode"]=data["data"];
                }else if(data["status"]==0){
                    msg(data["data"],"确定");
                    clearInterval(timer);
                    obj.text("获取验证码");
                    obj.css({"color":"#fff"});
                    obj.on("click",function(){
                        checkpost(obj,input_class,type);
                    });
                }
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                // 请求失败
                msg("网络似乎出现了问题，请重试。","确定");
                clearInterval(timer);
                obj.text("获取验证码");
                obj.css({"color":"#fff"});
                obj.on("click",function(){
                    checkpost(obj,input_class,type);
                });
            }
        });
    }
}
/*--------------------微信配置-------------------------*/
// 微信配置接口
function weSet(arr){
    wx.config({
        debug: false,
        appId: arr["appid"], 
        timestamp: arr["timestamp"], 
        nonceStr: arr["nonceStr"], 
        signature: arr["signature"], 
        jsApiList:[
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'hideMenuItems',
            'chooseImage',               //拍照或从手机相册中选图接口
            'previewImage',              //预览图片接口
            'uploadImage',               //上传图片接口
            'downloadImage',             //下载图片接口
            'scanQRCode',                //调起微信扫一扫接口
            'chooseWXPay',               //调起微信支付接口
        ] 
    });
    wx.ready(function(){

        wx.onMenuShareTimeline({
            title: '#兰芝2016明星礼赠#快来领取最受欢迎的兰芝明星产品四件套~', // 分享标题
            link: "http://cdn.wemediacn.com/webpage_laneige/api/CoverService.aspx?r_url=http://weapp.wemediacn.com/laneige/applyinfo/201603/index.html", // 分享链接
            imgUrl: "http://bos.bj.baidubce.com/we-sh2/laneige/applyinfo/yun/201603/images/share.jpg", // 分享图标
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: '#兰芝2016明星礼赠#快来领取最受欢迎的兰芝明星产品四件套~', // 分享标题
            desc: '#兰芝2016明星礼赠#快来领取最受欢迎的兰芝明星产品四件套~', // 分享描述
            link: "http://cdn.wemediacn.com/webpage_laneige/api/CoverService.aspx?r_url=http://weapp.wemediacn.com/laneige/applyinfo/201603/index.html", // 分享链接
            imgUrl: "http://bos.bj.baidubce.com/we-sh2/laneige/applyinfo/yun/201603/images/share.jpg", // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
        // 隐藏按钮
        wx.hideMenuItems({
            menuList: [
                'menuItem:readMode', // 阅读模式
                'menuItem:copyUrl' ,// 复制链接
                'menuItem:share:qq',//分享qq
                'menuItem:share:weiboApp',//分享微博
                'menuItem:share:facebook',//分享到FB
                'menuItem:jsDebug',//调试
                'menuItem:editTag',//编辑标签
                'menuItem:delete',//删除
                'menuItem:originPage',//原网页
                'menuItem:openWithQQBrowser',//qq浏览器打开
                'menuItem:openWithSafari',//safari浏览器打开
                'menuItem:share:email',//邮件
                'menuItem:share:brand',//特殊公众号
            ],
            success: function (res) {
                console.log("ok");
            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            }
        });
    });
}
String.prototype.reSpace=function(){
    var c=this.replace(/\s/g,"");
    return c;
}
//格式化日期
function format(txt){
    var tempdate=new Date(Date.parse(txt.replace(/-/g,"/")));
    return tempdate;
}
// 生成行程dom
function setMyTrip(arr){
    var arr=arr["data"];
    if(arr.length<1){
        // 没有数据
        $(".page2").find(".no_list").show().siblings(".trip_box").hide();
    }else{
        var _html='';
        var status,orderid,ordersn,remainpaysn,ordertype,startname,endname,addtime,voice,desc,personnumber,ishelp,isbag,ischildren,totalprice,freeprice,finalprice,bookprice;
        for(var i=0,len=arr.length;i<len;i++){
            status=arr[i]["status"]?arr[i]["status"]:"";                              //订单状态
            orderid=arr[i]["orderid"]?arr[i]["orderid"]:"";                           //点单id
            ordersn=arr[i]["ordersn"]?arr[i]["ordersn"]:"";                           //首次支付订单编号
            remainpaysn=arr[i]["remainpaysn"]?arr[i]["remainpaysn"]:"";               //剩余金额支付订单号
            ordertype=arr[i]["ordertype"]?arr[i]["ordertype"]:1;                      //订单类型 1立即叫车 2预约线路拼车(客服派单) 3预约线路包（选车、不选车）车 4预约包天（选车、不选车）
            startname=arr[i]["startname"]?arr[i]["startname"]:"";                     //起点地址
            endname=arr[i]["endname"]?arr[i]["endname"]:"";                           //终点地址
            addtime=arr[i]["addtime"]?arr[i]["addtime"]:"";                           //下单时间
            voice=arr[i]["voice"]?arr[i]["voice"]:"";                                 //语音
            desc=arr[i]["desc"]?arr[i]["desc"]:"";                                    //留言文字描述
            personnumber=arr[i]["personnumber"]?arr[i]["personnumber"]:"";            //当前乘客数量
            ishelp=arr[i]["ishelp"]?arr[i]["ishelp"]:0;                               //是否帮人约车 0 否 1是
            isbag=arr[i]["isbag"]?arr[i]["isbag"]:0;                                  //是否有包裹 0 否 1是
            ischildren=arr[i]["ischildren"]?arr[i]["ischildren"]:0;                   //是否有小孩 0 否 1是
            totalprice=arr[i]["totalprice"]?arr[i]["totalprice"]:0;                   //总价
            freeprice=arr[i]["freeprice"]?arr[i]["freeprice"]:0;                      //优惠金额
            finalprice=arr[i]["finalprice"]?arr[i]["finalprice"]:0;                   //终需支付金额
            bookprice=arr[i]["bookprice"]?arr[i]["bookprice"]:0;                      //定金金额
            _html+='<li data-status="'+status+'" data-orderid="'+orderid+'" data-ordersn="'+ordersn+'" data-remainpaysn="'+remainpaysn+'" data-ordertype="'+ordertype+'" data-addtime="'+addtime+'" data-voice="'+voice+'" data-desc="'+desc+'" data-personnumber="'+personnumber+'" data-ishelp="'+ishelp+'" data-isbag="'+isbag+'" data-ischildren="'+ischildren+'" data-totalprice="'+totalprice+'" data-freeprice="'+freeprice+'" data-finalprice="'+finalprice+'" data-bookprice="'+bookprice+'">';
            _html+='<ul class="trip_de_list">';
            _html+='<li><img src="images/icon12.png" alt="icon"/>';
            _html+='<span>'+addtime+'</span>';
            _html+='<div class="f_r"><label>订单号：</label><span>'+ordersn+'</span></div>';
            _html+='</li>';
            if(ordertype!=4){
                // 显示终止地址
                _html+='<li><img src="images/icon12.png" alt="icon"/>';
                _html+='<span class="address_spn">'+startname+'</span>';
                _html+='</li>';
                _html+='<li><img src="images/icon13.png" alt="icon"/>';
                _html+='<span class="address_spn">'+endname+'</span>';
                _html+='<div class="f_r">';
                if(status==0){
                    _html+='<span>未支付</span>';
                }else if(status==1){
                    _html+='<span>已关闭</span>';
                }else if(status==2){
                    _html+='<span>已交定金</span>';
                }else if(status==3){
                    _html+='<span>已付全款</span>';
                }else if(status==4){
                    _html+='<span>已退款</span>';
                }else if(status==5){
                    _html+='<span>已完成</span>';
                }else{};
                _html+='</div>';

                _html+='</li>';
            }else{
                _html+='<li><img src="images/icon12.png" alt="icon"/>';
                _html+='<span class="address_spn">'+startname+'</span>';
                _html+='<div class="f_r">';
                if(status==0){
                    _html+='<span>未支付</span>';
                }else if(status==1){
                    _html+='<span>已关闭</span>';
                }else if(status==2){
                    _html+='<span>已交定金</span>';
                }else if(status==3){
                    _html+='<span>已付全款</span>';
                }else if(status==4){
                    _html+='<span>已退款</span>';
                }else if(status==5){
                    _html+='<span>已完成</span>';
                }else{};
                _html+='</div>';
                _html+='</li>'
            }
            _html+='</ul>';
            _html+='</li>'
        }
        $(".js_trip_list").append(_html);
    }
    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    myScroll2.refresh();
    $m.user_info["is_get"]=false;
    var page=$m.user_info["page"];
    page++;
    $m.user_info["page"]=page;
}
// 生成订单详情
function setMyTripDetail(arr){
    var arr=arr["data"];
    if(arr!=null && arr!="undefined"){
        $m.order_arr=arr;
    }
    console.log(arr);
    var orderid=arr["orderid"]?arr["orderid"]:"";
    var status=arr["status"]?arr["status"]:6;
    // var status=5;
    var carno=arr["carno"]?arr["carno"]:"";
    var driver=arr["driverinfo"]?arr["driverinfo"]:{};
    var pic_src=driver["img"]?driver["img"]:$m.img_url+$m.head_place;
    var driverid=driver["driverid"]?driver["driverid"]:0;
    var tel=driver["tel"]?driver["tel"]:"";
    var drivername=driver["drivername"]?driver["drivername"]:"";
    var servicecounts=driver["servicecounts"]?driver["servicecounts"]:0;
    var avgstar=driver["avgstar"]?driver["avgstar"]:0;
    $(".page3 .js_driver_head_pic").attr("src",pic_src);
    $(".page3 .car_number").text(carno);
    $(".page3 .js_driver_name").text(drivername);
    $(".page3 .js_service_num").text(servicecounts);
    $(".page3 .js_driver_ranking").text(driverid);
    $(".page3 .js_driver_mobile").attr("href","tel:"+tel);
    var driver_star=parseInt(avgstar)?parseInt(avgstar):0;
    for(var i=0;i<driver_star;i++){
        $(".page3 .js_driver_star>li").eq(i).children("img").attr("src",$m.img_url+"icon11.png");
    }
    var tit="订单详情";
    var status_txt="支付金额";
    // 订单详情
    var ordertype=arr["ordertype"]?arr["ordertype"]:0;
    var personnumber=arr["personnumber"]?arr["personnumber"]:0;
    var addtime=arr["addtime"]?arr["addtime"]:"";
    var startname=arr["startname"]?arr["startname"]:"";
    var endname=arr["endname"]?arr["endname"]:"";
    var isbag=arr["isbag"]?arr["isbag"]:0;
    var ischildren=arr["ischildren"]?arr["ischildren"]:0;
    var totalprice=arr["totalprice"]?arr["totalprice"]:0;
    var remainpaytype=arr["remainpaytype"]?arr["remainpaytype"]:0;
    // 评价
    var iscomment=arr["iscomment"]?arr["iscomment"]:0;
    if(status==0){
        // 未支付
        tit="订单未完成";
        status_txt="需要支付";
        totalprice=arr["totalprice"]?arr["totalprice"]:0;
        $(".page3 .js_order_time").text(addtime);
        if(ordertype==4){
            // 包天
            var days=arr["days"]?arr["days"]:0;
            $(".page3 .js_end_address").parent().hide();
            $(".page3 .js_customer_div").eq(1).children("span").text(days);
            $(".page3 .js_customer_div").eq(1).show().siblings(".js_customer_div").hide();
        }else{
            $(".page3 .js_end_address").text(endname).parent().show();
            $(".page3 .js_customer_div").eq(0).children("span").text(personnumber);
            $(".page3 .js_customer_div").eq(0).show().siblings(".js_customer_div").hide();   
        }
        $(".page3 .js_start_address").text(startname);
        // $(".page3 .js_end_address").text(endname);
        // 清空dom先
        $(".page3 .js_additional_list").html('');
        if(isbag==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>需要捎一件行李</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        if(ischildren==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>有小孩</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        $(".page3 .js_pay_price").text(totalprice);
        // 隐藏/显示其他状态的元素
        $(".page3 .js_cancel_div").hide();
        $(".page3 .js_refund_div").hide();
        $(".page3 .evaluate_box").hide();
        $(".page3 .js_del_order").show().attr({"data-orderid":orderid,"data-driverid":driverid});
        if(ordertype==1 && remainpaytype==1){
            $(".page3 .p3_btn_div").hide();
        }else{
            $(".page3 .p3_btn_div").show();
            $(".page3 .js_to_pay").show().siblings("a").hide();
        }
        $(".page3 .js_order_detail_box").show();
    }else if(status==1){
        // 订单已经取消
        tit="订单已取消";
        var cancelreason=arr["cancelreason"]?arr["cancelreason"]:0;
        var txt="";
        if(cancelreason==1){
            txt="态度差";
        }else if(cancelreason==2){
            txt="服务不好";
        }else if(cancelreason==3){
            txt="等待时间太长";
        }else if(cancelreason==4){
            txt="我有事";
        }else if(cancelreason==5){
            txt="车内环境差";
        }else if(cancelreason==6){
            txt="不需要用车了";
        }
        $(".page3 .js_cancel_div").show();
        $(".page3 .js_cancel_reason").text(txt);
        $(".page3 .evaluate_box").hide();
        $(".page3 .js_del_order").hide().attr({"data-orderid":orderid,"data-driverid":driverid});
        $(".page3 .p3_btn_div").hide();
        $(".page3 .js_order_detail_box").hide();
    }else if(status==2){
        // 订单已交定金
        status_txt="还需支付";
        $(".page3 .js_order_time").text(addtime);
        
        totalprice=arr["finalprice"]?arr["finalprice"]:0;
        if(ordertype==4){
            // 包天
            var days=arr["days"]?arr["days"]:0;
            $(".page3 .js_end_address").parent().hide();
            $(".page3 .js_customer_div").eq(1).children("span").text(days);
            $(".page3 .js_customer_div").eq(1).show().siblings(".js_customer_div").hide();
        }else{
            $(".page3 .js_end_address").text(endname).parent().show();
            $(".page3 .js_customer_div").eq(0).children("span").text(personnumber);
            $(".page3 .js_customer_div").eq(0).show().siblings(".js_customer_div").hide();   
        }
        $(".page3 .js_start_address").text(startname);
        // $(".page3 .js_end_address").text(endname);
        // 清空dom先
        $(".page3 .js_additional_list").html('');
        if(isbag==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>需要捎一件行李</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        if(ischildren==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>有小孩</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        $(".page3 .js_pay_price").text(totalprice);
        // 隐藏/显示其他状态的元素
        $(".page3 .js_cancel_div").hide();
        $(".page3 .js_refund_div").hide();
        $(".page3 .evaluate_box").hide();
        $(".page3 .js_del_order").show().attr({"data-orderid":orderid,"data-driverid":driverid});

        if(remainpaytype==1){
            $(".page3 .p3_btn_div").hide();
        }else{
            $(".page3 .p3_btn_div").show();
            $(".page3 .js_to_pay").show().siblings("a").hide();
        }
        $(".page3 .js_order_detail_box").show();
    }else if(status==3){
        // 订单已付全款
        tit="订单未完成";
        var days=arr["days"]?arr["days"]:0;
        $(".page3 .js_order_time").text(addtime);
        if(ordertype==4){
            // 包天
            $(".page3 .js_end_address").parent().hide();
            $(".page3 .js_customer_div").eq(1).children("span").text(days);
        $(".page3 .js_customer_div").eq(1).show().siblings(".js_customer_div").hide();
        }else{
            $(".page3 .js_end_address").text(endname).parent().show();
            $(".page3 .js_customer_div").eq(0).children("span").text(personnumber);
            $(".page3 .js_customer_div").eq(0).show().siblings(".js_customer_div").hide();   
        }
        $(".page3 .js_start_address").text(startname);
        // $(".page3 .js_end_address").text(endname);
        // 清空dom先
        $(".page3 .js_additional_list").html('');
        if(isbag==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>需要捎一件行李</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        if(ischildren==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>有小孩</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        $(".page3 .js_pay_price").text(totalprice);
        // 隐藏/显示其他状态的元素
        $(".page3 .js_cancel_div").hide();
        $(".page3 .js_refund_div").hide();
        $(".page3 .evaluate_box").hide();
        $(".page3 .js_del_order").show().attr({"data-orderid":orderid,"data-driverid":driverid});
        $(".page3 .p3_btn_div").hide();
        $(".page3 .js_order_detail_box").show();
    }else if(status==4){
        // 订单已退款
        tit="订单已退款";
        var cancelreason=arr["cancelreason"]?arr["cancelreason"]:0;
        $(".page3 .js_refund_div").show();
        $(".page3 .js_cancel_div").hide();
        $(".page3 .evaluate_box").hide();
        $(".page3 .js_del_order").hide().attr({"data-orderid":orderid,"data-driverid":driverid});
        $(".page3 .p3_btn_div").hide();
        $(".page3 .js_order_detail_box").hide();
    }else if(status==5){
        // 订单已完成
        var cancelreason=arr["cancelreason"]?arr["cancelreason"]:0;
        tit="订单已完成";
        var days=arr["days"]?arr["days"]:0;
        $(".page3 .js_order_time").text(addtime);
        if(ordertype==4){
            // 包天
            $(".page3 .js_end_address").parent().hide();
            $(".page3 .js_customer_div").eq(1).children("span").text(days);
            $(".page3 .js_customer_div").eq(1).show().siblings(".js_customer_div").hide();
        }else{
            $(".page3 .js_end_address").text(endname).parent().show();
            $(".page3 .js_customer_div").eq(0).children("span").text(personnumber);
            $(".page3 .js_customer_div").eq(0).show().siblings(".js_customer_div").hide();   
        }
        $(".page3 .js_start_address").text(startname);
        // $(".page3 .js_end_address").text(endname);
        // 清空dom先
        $(".page3 .js_additional_list").html('');
        if(isbag==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>需要捎一件行李</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        if(ischildren==1){
            var _html='<li><img src="images/icon13.png" alt="icon"/><span>有小孩</span></li>';
            $(".page3 .js_additional_list").append(_html);
        }
        $(".page3 .js_pay_price").text(totalprice);
        // 隐藏/显示其他状态的元素
        $(".page3 .js_cancel_div").hide();
        $(".page3 .js_refund_div").hide();
        $(".page3 .evaluate_box").show();
        $(".page3 .js_del_order").hide().attr({"data-orderid":orderid,"data-driverid":driverid});
        if(iscomment==0){
            // 没有评价
            $(".js_can_star").addClass("js_star_list");
            $(".page3 .p3_btn_div").show();
            $(".page3 .js_sub_evaluate").show().siblings("a").hide();
        }else{
            // 已经评价了
            $(".page3 .evaluate_box").hide();
        }
        $(".page3 .js_order_detail_box").show();
    }else{
        msg("订单异常，请联系客服。","确定");
    }
    $(".page3 .js_status_txt").text(status_txt);
    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    $m.refreshPage();
}
// 生成车辆支付详情
function setPayDom(arr){
    var ordertype=arr["ordertype"]?arr["ordertype"]:0;
    var orderid=arr["orderid"]?arr["orderid"]:"";
    var status=arr["status"]?arr["status"]:6;
    // var status=5;
    var carno=arr["carno"]?arr["carno"]:"";
    var days=arr["days"]?arr["days"]:0;
    var personnumber=arr["personnumber"]?arr["personnumber"]:0;
    var driver=arr["driverinfo"]?arr["driverinfo"]:{};
    var pic_src=driver["img"]?driver["img"]:$m.img_url+$m.head_place;
    var driverid=driver["driverid"]?driver["driverid"]:0;
    var tel=driver["tel"]?driver["tel"]:"";
    var drivername=driver["drivername"]?driver["drivername"]:"";
    var servicecounts=driver["servicecounts"]?driver["servicecounts"]:0;
    var avgstar=driver["avgstar"]?driver["avgstar"]:0;
    $(".page20 .js_driver_head_pic").attr("src",pic_src);
    $(".page20 .car_number").text(carno);
    $(".page20 .js_driver_name").text(drivername);
    $(".page20 .js_service_num").text(servicecounts);
    $(".page20 .js_driver_ranking").text(driverid);
    $(".page20 .js_driver_mobile").attr("href","tel:"+tel);
    var driver_star=parseInt(avgstar)?parseInt(avgstar):0;
    for(var i=0;i<driver_star;i++){
        $(".page20 .js_driver_star>li").eq(i).children("img").attr("src",$m.img_url+"icon11.png");
    }
    // 订单详情
    var addtime=arr["addtime"]?arr["addtime"]:"";
    var startname=arr["startname"]?arr["startname"]:"";
    var endname=arr["endname"]?arr["endname"]:"";
    var isbag=arr["isbag"]?arr["isbag"]:0;
    var ischildren=arr["ischildren"]?arr["ischildren"]:0;
    var totalprice=0;
    if(status==2){
        totalprice=arr["finalprice"]?arr["finalprice"]:0;
    }else{
        totalprice=arr["totalprice"]?arr["totalprice"]:0;
    }
    $(".page20 .js_order_time").text(addtime);
    $(".page20 .js_start_address").text(startname);
    if(ordertype==4){
        // 包天
        $(".page20 .js_end_address").parent().hide();
        $(".page20 .js_customer_div").eq(1).children("span").text(days);
        $(".page20 .js_customer_div").eq(1).show().siblings(".js_customer_div").hide();
    }else{
        $(".page20 .js_end_address").text(endname).parent().show();   
        console.log(personnumber)
        $(".page20 .js_customer_div").eq(0).children("span").text(personnumber);
        $(".page20 .js_customer_div").eq(0).show().siblings(".js_customer_div").hide();
    }
    // 清空dom先
    $(".page20 .js_additional_list").html('');
    if(isbag==1){
        var _html='<li><img src="images/icon13.png" alt="icon"/><span>需要捎一件行李</span></li>';
        $(".page20 .js_additional_list").append(_html);
    }
    if(ischildren==1){
        var _html='<li><img src="images/icon13.png" alt="icon"/><span>有小孩</span></li>';
        $(".page20 .js_additional_list").append(_html);
    }
    $(".page20 .js_pay_price").text(totalprice);


    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    $m.refreshPage();
}
// 生成优惠券
function setMyCoupon(arr){
    var arr=arr["data"];
    var len=arr.length;
    if(len>0){
        var bonusid,bonussn,bonusamount,condition,endtime;
        var _html='';
        for(i=0;i<len;i++){
            bonusid=arr[i]["bonusid"]?arr[i]["bonusid"]:"";
            bonussn=arr[i]["bonussn"]?arr[i]["bonussn"]:"";
            bonusamount=arr[i]["bonusamount"]?arr[i]["bonusamount"]:"";
            condition=arr[i]["condition"]?arr[i]["condition"]:"";
            endtime=arr[i]["endtime"]?arr[i]["endtime"]:"";
            _html+='<li data-bonusid="'+bonusid+'" data-price="'+bonusamount+'">';
            _html+='<div class="txt_r"><label class="font08">编号：</label>';
            _html+='<span class="font08">'+bonussn+'</span></div>';
            _html+='<div><label class="v_base">优惠券</label>';
            _html+='<span class="font18 color6 v_base">'+bonusamount+'</span><span class="v_base">元</span></div>';
            _html+='<div class="txt_r"><span style="margin-right: 2em;">满'+condition+'元可以使用</span></div>';
            _html+='<div class="font08">有效期至 '+endtime+'</div>';
            _html+='</li>';
        }
        $(".js_mycoupon_list").append(_html);
        $(".page6 js_coupon_list").show().siblings(".p6_attention_p").hide().siblings(".js_p6_btn_div").show();
        if(!$m.my_coupon["is_add"]){
            $m.my_coupon["is_add"]=true;
        }
        $m.my_coupon["npage"]++;
    }else{
        $(".page6 .p6_attention_p").show().siblings(".js_coupon_list").show().siblings(".js_p6_btn_div").hide();
    }
    $m.my_coupon["is_get"]=false;
    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    $m.refreshPage();
}
// 获取未开发票列表
function setMyInvoice(arr){
    var arr=arr["data"];
    var len=arr.length;
    if(len>0){
        var orderid,addtime,totalprice,startname,endname;
        var _html='';
        for(i=0;i<len;i++){
            orderid=arr[i]["orderid"]?arr[i]["orderid"]:"";
            addtime=arr[i]["addtime"]?arr[i]["addtime"]:"";
            totalprice=arr[i]["totalprice"]?arr[i]["totalprice"]:0;
            startname=arr[i]["startname"]?arr[i]["startname"]:"";
            endname=arr[i]["endname"]?arr[i]["endname"]:"";
            _html+='<li data-orderid="'+orderid+'" data-price="'+totalprice+'">';
            _html+='<ul class="trip_de_list">';
            _html+='<li><img src="'+$m.img_url+'icon12.png" alt="icon">';
            _html+='<span>'+addtime+'</span>';
            _html+='<div class="f_r">';
            _html+='<label>车费</label><span class="color5">'+totalprice+'</span><label>元</label>';
            _html+='</div></li>';
            _html+='<li><img src="'+$m.img_url+'icon12.png" alt="icon">';
            _html+='<span>'+startname+'</span>';
            _html+='</li>';
            _html+='<li><img src="images/icon13.png" alt="icon">';
            _html+='<span>'+endname+'</span>';
            _html+='</li></ul></li>';
        }
        $(".page9 .js_invoice_list").html(_html);
        $(".page9 .js_invoice_list").show().siblings(".p9_atten_p").hide();
    }else{
        $(".page9 .p9_atten_p").show().siblings(".js_invoice_list").hide();
    }
    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    $m.refreshPage();
}
// 我的分享
function setMyShare(arr){
    console.log(arr);
    var arr=arr["data"];
    var allmemcount=arr["allmemcount"]?arr["allmemcount"]:0;
    var monthmemcount=arr["monthmemcount"]?arr["monthmemcount"]:0;
    var totalyjmoney=arr["totalyjmoney"]?arr["totalyjmoney"]:0;
    $(".page12 .js_btn_div").eq(0).children("span").text(allmemcount);
    $(".page12 .js_btn_div").eq(1).children("span").text(monthmemcount);
    $(".page12 .js_btn_div").eq(2).children("span").text('￥'+totalyjmoney);
    $(".page12 .js_cash_num").text(totalyjmoney);
    // 全部
    var arr1=arr["alluser"]?arr["alluser"]:[];
    var len1=arr1.length;
    if(len1>0){
        var id,user_nicename,avatar,totalcount,totalmoney,yjmoney;
        var _html1='';
        for(i=0;i<len1;i++){
            id=arr1[i]["id"]?arr1[i]["id"]:"";
            user_nicename=arr1[i]["user_nicename"]?arr1[i]["user_nicename"]:"";
            avatar=arr1[i]["avatar"]?arr1[i]["avatar"]:$m.img_url+$m.head_place;
            totalcount=arr1[i]["totalcount"]?arr1[i]["totalcount"]:0;
            totalmoney=arr1[i]["totalmoney"]?arr1[i]["totalmoney"]:0;
            yjmoney=arr1[i]["yjmoney"]?arr1[i]["yjmoney"]:0;
            _html1+='<div href="javascript:void(0);" class="weui_media_box weui_media_appmsg">';
            _html1+='<img class="head_pic" src="'+avatar+'" alt="头像"/>';
            _html1+='<div class="weui_media_bd">';
            _html1+='<h4 class="weui_media_title"><span>'+user_nicename+'</span>';
            _html1+='<span class="f_r">累计提成</span></h4>';
            _html1+='<p class="weui_media_desc"><label>订单数量：</label><span>'+totalcount+'次</span>';
            _html1+='<span class="f_r color6">'+yjmoney+'元</span></p>';
            _html1+='<p class="weui_media_desc"><label>订单金额：</label><span>'+totalmoney+'元</span></p>';
            _html1+='</div></div>';
        }
        $(".page12 .js_share_list").eq(0).children(".weui_panel_bd").html(_html1);
        $(".page12 .js_share_list").eq(0).show().siblings(".p12_atten_p").hide();
    }else{
        $(".page12 .p12_atten_p").eq(0).show().siblings(".js_share_list").hide();
    }
    // 本月
    var arr2=arr["monthuser"]?arr["monthuser"]:[];
    var len2=arr1.length;
    if(len2>0){
        var id,user_nicename,avatar,totalcount,totalmoney,yjmoney;
        var _html2='';
        for(i=0;i<len2;i++){
            id=arr2[i]["id"]?arr2[i]["id"]:"";
            user_nicename=arr2[i]["user_nicename"]?arr2[i]["user_nicename"]:"";
            avatar=arr2[i]["avatar"]?arr2[i]["avatar"]:0;
            totalcount=arr2[i]["totalcount"]?arr2[i]["totalcount"]:0;
            totalmoney=arr2[i]["totalmoney"]?arr2[i]["totalmoney"]:0;
            yjmoney=arr2[i]["yjmoney"]?arr2[i]["yjmoney"]:0;
            _html2+='<div href="javascript:void(0);" class="weui_media_box weui_media_appmsg">';
            _html2+='<img class="head_pic" src="'+avatar+'" alt="头像"/>';
            _html2+='<div class="weui_media_bd">';
            _html2+='<h4 class="weui_media_title"><span>'+user_nicename+'</span>';
            _html2+='<span class="f_r">累计提成</span></h4>';
            _html2+='<p class="weui_media_desc"><label>订单数量：</label><span>'+totalcount+'次</span>';
            _html2+='<span class="f_r color6">'+yjmoney+'元</span></p>';
            _html2+='<p class="weui_media_desc"><label>订单金额：</label><span>'+totalmoney+'元</span></p>';
            _html2+='</div></div>';
        }
        $(".page12 .js_share_list").eq(1).children(".weui_panel_bd").html(_html2);
        $(".page12 .js_share_list").eq(1).show().siblings(".p12_atten_p").hide();
    }else{
        $(".page12 .p12_atten_p").eq(1).show().siblings(".js_share_list").hide();
    }
    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    $m.refreshPage();
}
// 设置本地存储
function setLocalStorage(options){
    if(window.localStorage){
        for(var key in options){
            localStorage.setItem(key,options[key]);
        }
    }else{

    }
}
// 获取本地存储
function getLocalStorage(key){
    var val="";
    if(window.localStorage){
        val=localStorage.getItem(key)?localStorage.getItem(key):"";
    }else{

    }
    return val;
}
// 删除本地存储
function delLocalStorage(arr){
    if(window.localStorage){
        for(var i=0,len=arr.length;i<len;i++){
            if(localStorage.getItem(arr[i])){
                localStorage.removeItem(arr[i]);
            }
        }
    }else{

    }
}