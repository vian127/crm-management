// 滚动变量
var myScroll1,myScroll2,myScroll3;
// 自定义方法
var $m={
    // 分享链接
    share_href: window.location.href,
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
        }
    },
    // 居中显示
    toCenter:function(obj,par){
        var dh=par.height();
        var oh=obj.outerHeight();
        obj.css({"margin-top": (dh-oh)/2-50+"px"});
    },
    // 设置宽高
    setHeight:function(obj,k){
        var ow=obj.width();
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
    return_arr:{                     /*------------立即约车提交数据------------*/
        "user_id":"",                //用户id
        "phone":"",                  //乘车人手机号码
        "realname":"",               //乘车人姓名
        "startName":"",              //起始地址
        "startPoint":"",             //起点经纬度21,32
        "endName":"",                //终点地址
        "endPoint":"",               //终点经纬度51,65
        "personNumber":1,            //乘车人数
        "isHelp":"",                 //是否帮人约车
        "helpBookPhone":"",          //帮人约车的人电话
        "helpBookName":"",           //帮人约车的人姓名
        "lineId":"",                 //线路ID
        "city":"",                   //起点城市
        "district":"",               //起点地区
        "img":"",                    //图片
        "voice":"",                  //语音
        "desc":"",                   //捎话描述文字
        "isBag":"",                  //是否有行李
        "isChildren":"",             //是否有小孩
        "orderSource":3,             //订单来源
        "orderType":3,               //拼车   、包车
        "type":1,                    //预约类型 1=线路预约
        "goTime":"",                 //出发时间
        "days":1,                   //用车天数
        "carId":"",                  //车辆id
        "bookPrice":"",              //线路预约价格
        "can_order":false,           //是否可以下单
    },
    search_arr:{
        "citycode":"",
        "city":"",
        "district":"",
    },
    s_arr2:[],
    now_city:"",           //当前定位城市
    // ajax 请求地址前缀
    ajax_link:"http://120.25.68.163/citytravel/index.php?g=admin&m=app&a=",
    ncity_arr:{                   //当前选择数据
        "l_scity":"",
        "l_sad":"出发地址",
        "l_ecity":"",
        "l_ead":"目的地址",
        "l_time":"请选择预约时间",
        "o_scity":"",
        "o_sad":"出发地址",
        "o_time":"请选择预约时间",
        "ntype":1,                 //线路预约类型 1=拼车 2=包车
        "type":1,                  //线路预约
    },
    setPassword:{                   //修改密码的json
        "name":"姓名",
        "phone":"手机号",
        "code":"验证码",
        "password":"新密码",
        "autocode":1515
    },
    set_order:{},                   //价格数据
}
// 获取连接数据
var link_obj=GetRequest();
var user_id=link_obj["user_id"]?link_obj["user_id"]:"";
$(function(){
    // 判断登录
    (function(){
        var id=getLocalStorage("id");
        var phone=getLocalStorage("phone");

        if(id=="" || phone==""){
            // window.location.href="member_center.html?page_link=booking.html";
        }else{
            $m.return_arr["user_id"]=id;
            user_id=id;
            $m.return_arr["phone"]=phone;
        }
    })();
    $m.rs();
    // 绑定滚动
    // 绑定滚动
    myScroll1=new IScroll('.page1',{mouseWheel: true,hideScrollbar: true,click: true,bounce:false,tap:true});
    myScroll2=new IScroll('.js_city_box',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll3=new IScroll('.page3',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll4=new IScroll('.page4',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll5=new IScroll('.page5',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll6=new IScroll('.page6',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll7=new IScroll('.page7',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll8=new IScroll('.page8',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll9=new IScroll('.page9',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll10=new IScroll('.page10',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll12=new IScroll('.page12',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll13=new IScroll('.page13',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll14=new IScroll('.page14',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    myScroll15=new IScroll('.js_detail_box',{mouseWheel: true,hideScrollbar: true,click: true,tap:true});
    $m.showPage(function(){});
    // 绑定返回事件
    $(".js_back").on("tap",function(){
        $m.toPrev($(this).parents(".page"));
    });
    $(".js_page_back").on("click",function(){
        $m.toPrev($(this).parents(".page"));
    });
    // 高德地图
    new_city=new ms();
    //初始化地图对象，加载地图
    ////初始化加载地图时，若center及level属性缺省，地图默认显示用户当前城市范围
    map = new AMap.Map('mapContainer', {
        zoom:14,
        // center:"南京"
    });
    map.getCity(function(re){
        var city=re.city;
        var province=re.province;
        var district=re.district;
        city=city==""?pcformat(province):pcformat(city);
        $(".js_get_city").text(city);
        $m.search_arr["city"]=city;
        $m.search_arr["district"]=district;
        $m.search_arr["citycode"]=re.citycode;
        $m.now_city=city;
        $m.return_arr["city"]=city;
        $m.return_arr["district"]=district;
        $m.ncity_arr["l_scity"]=city;
        $m.ncity_arr["l_ecity"]=city;
        $m.ncity_arr["o_scity"]=city;
        // 开始提交
        var arr={"user_id":user_id};
        subAjax(arr,$m.ajax_link+"getCityList",function(data){
            if(data && data["data"]){
                $m.s_arr2=data["data"];
                new_city.init_cs(data["data"],city);
            }4
        });
        // 获得并设置显示价格
        setPrice(city,city,$m.ncity_arr["ntype"]);
    });
    // 点击选择出发地
    $(".js_get_address").on("tap",function(){
        $(".js_detail_search").val("").css({"background-image":searchbg1});
        new_city.init();
        $(".js_get_address").removeClass("js_now_address");
        $(this).addClass("js_now_address");
        var s_city=$(this).siblings(".js_get_city").text()?$(this).siblings(".js_get_city").text():$m.now_city;
        map.setCity(s_city+"市",function(data){
            setCityDetail();
        });
        $m.toNext($(".page15"),function(){
            $m.active_scroll=15;
            $m.refreshPage();
        });
    });
    searchbg1=$(".js_detail_search").css("background-image");
    searchbg2=$(".js_city_search").css("background-image");
    // 城市搜索
    $(".js_city_search").bind("focus",function(event){
        $(this).css({"background-image":"none"});
        stopBubble(event);
    }).bind("blur",function(event){
        var txt=$(this).val();
        if($(this).val()==""||$(this).val()==null){
            $(this).css({"background-image":searchbg2});
            new_city.init();
            stopBubble(event);
        }else{
            new_city.init2($m.s_arr2,txt,$(".js_search_city"));
        }
    }).bind("input propertychange",function(event){
        var txt=$(this).val();
        if(txt==""){
            new_city.init();
        }else{
            new_city.init2($m.s_arr2,txt,$(".js_search_city"));
        }
        stopBubble(event);
    });
    $(".js_city_box").on("tap",function(event){
        $(".js_city_search").blur();
        stopBubble(event);
    });
    $(".js_azban_city td").on("tap",function(event){
        var x=$(this).html();
        // try{ttscroll1.scrollToElement(".jp_"+x,10);}catch(e){}
        $(".js_azban_city td").css({"color":"grey","font-weight":"normal"});
        $(this).css({"color":"#3b81c6","font-weight":"bold"});
        try{myScroll2.scrollToElement(".jp_"+x,10);}catch(e){}
        stopBubble(event);
    });
    // 详情地址选择
    $(".js_detail_search").bind("focus",function(event){
        $(this).css({"background-image":"none"});
        stopBubble(event);
    }).bind("blur",function(event){
        var txt=$(this).val();
        if($(this).val()==""||$(this).val()==null){
            $(this).css({"background-image":searchbg1});
            new_city.init();
            stopBubble(event);
        }else{
            getPoiList(map,$m.search_arr["city"],txt);
            // new_city.init1($m.s_arr2,txt,$(".js_detail_city"));
        }
    }).bind("input propertychange",function(event){
        var txt=$(this).val();
        if(txt==""){
            new_city.init();
        }else{
            getPoiList(map,$m.search_arr["city"],txt);
            // new_city.init1($m.s_arr2,txt,$(".js_detail_city"));
        }
        stopBubble(event);
    });
    $(".js_detail_box").on("tap",function(event){
        $(".js_detail_search").blur();
        stopBubble(event);
    });
    $(".js_azban_detail td").bind("click",function(event){
        var x=$(this).html();
        // try{ttscroll1.scrollToElement(".jp_"+x,10);}catch(e){}
        $(".js_azban_detail td").css({"color":"grey","font-weight":"normal"});
        $(this).css({"color":"#3b81c6","font-weight":"bold"});
        try{myScroll15.scrollToElement(".jp_"+x,10);}catch(e){}
        stopBubble(event);
    });
    // 选择城市
    $(".js_get_city").on("tap",function(){
        $(".js_city_search").val("");
        $(".js_detail_search").val("");
        $(".target_list").show().siblings().hide();
        $(".js_get_city").removeClass("js_now_city");
        $(this).addClass("js_now_city");
        $m.toNext($(".page2"),function(){
            $m.active_scroll=2;
            $m.refreshPage();
        });
    });
    // 确认选择
    $(".js_city_box").on("tap",".js_city_list .opt",function(){
        var ntype=$(".js_list>li>a.now_choice_a").attr("data-type")?$(".js_list>li>a.now_choice_a").attr("data-type"):1;
        var txt=$(this).children("span").text()?$(this).children("span").text():"";
        var ncity=$(".page1 .js_now_city").text()?$(".page1 .js_now_city").text():"";
        $(".page1 .js_now_city").text(txt);
        var type=$(".page1 .js_now_city").attr("data-type")?$(".page1 .js_now_city").attr("data-type"):"";
        var txt1,txt2;
        if(type==1){
            if(ncity!="" && ncity!=txt){
                $m.return_arr["startName"]="";
                $m.return_arr["startPoint"]="";
                $(".page1 .js_now_city").siblings(".js_get_address").text("出发地址");
            }
            $m.return_arr["city"]=txt;
            txt1=txt;
            txt2=$(".js_get_city").eq(1).text();
            if(ntype==1){
                $m.ncity_arr["l_scity"]=txt;
            }else{
                $m.ncity_arr["o_scity"]=txt;
            }
        }else{
            // 选择了终点城市
            if(ncity!="" && ncity!=txt){
                $m.return_arr["endName"]="";
                $m.return_arr["endPoint"]="";
                $(".page1 .js_now_city").siblings(".js_get_address").text("目的地址");
            }
            txt2=txt;
            txt1=$(".js_get_city").eq(0).text();
            if(ntype==1){
                $m.ncity_arr["l_ecity"]=txt;
            }
        }
        // 获得并设置显示价格
        if(ntype==1){
            setPrice(txt1,txt2,$m.ncity_arr["ntype"]);
        }
        $m.toPrev($(".page2"),function(){
            $m.active_scroll=1;
        });
    });
    $(".js_city_box").on("tap",".js_search_city .opt",function(){
        var txt=$(this).children("span").text()?$(this).children("span").text():"";
        txt=pcformat(txt);
        var ncity=$(".page1 .js_now_city").text()?$(".page1 .js_now_city").text():"";
        var type=$(".page1 .js_now_city").attr("data-type")?$(".page1 .js_now_city").attr("data-type"):"";
        var txt1,txt2;
        var ntype=$(".js_list>li>a.now_choice_a").attr("data-type")?$(".js_list>li>a.now_choice_a").attr("data-type"):1;
        if(type==1){
            if(ncity!="" && ncity!=txt){
                $m.return_arr["startName"]="";
                $m.return_arr["startPoint"]="";
                $(".page1 .js_now_city").siblings(".js_get_address").text("出发地址");
            }
            $m.return_arr["city"]=txt;
            txt1=txt;
            txt2=$(".js_get_city").eq(1).text();
            if(ntype==1){
                $m.ncity_arr["l_scity"]=txt;
            }else{
                $m.ncity_arr["o_scity"]=txt;
            }
        }else{
            // 选择了终点城市
            if(ncity!="" && ncity!=txt){
                $m.return_arr["endName"]="";
                $m.return_arr["endPoint"]="";
                $(".page1 .js_now_city").siblings(".js_get_address").text("目的地址");
                $m.ncity_arr["l_ecity"]=txt;
            }
            txt2=txt;
            txt1=$(".js_get_city").eq(0).text();
            if(ntype==1){
                $m.ncity_arr["l_ecity"]=txt;
            }
        }
        $(".page1 .js_now_city").text(txt);
        // 获得并设置显示价格
        if(ntype==1){
            setPrice(txt1,txt2,$m.ncity_arr["ntype"]);
        }
        $m.toPrev($(".page2"),function(){
            $m.active_scroll=1;
        });
    });
    // 确认选择地址
    $(".js_detail_box").on("tap",".js_detail_list .opt",function(){
        var txt=$(this).children("span").text()?$(this).children("span").text():"";
        var district=$(this).attr("data-district")?$(this).attr("data-district"):"";
        var lat=$(this).attr("data-lat")?$(this).attr("data-lat"):"";
        var lng=$(this).attr("data-lng")?$(this).attr("data-lng"):"";
        var district=$(this).attr("data-district")?$(this).attr("data-district"):"";
        var ntype=$(".js_list>li>a.now_choice_a").attr("data-type")?$(".js_list>li>a.now_choice_a").attr("data-type"):1;
        $(".page1 .js_now_address").text(txt);
        var type=$(".page1 .js_now_address").attr("data-type")?$(".page1 .js_now_address").attr("data-type"):"";
        if(ntype==1){
            $m.ncity_arr["l_sad"]=txt;
        }else{
            $m.ncity_arr["o_sad"]=txt;
        }
        if(type==1){
            $m.return_arr["startName"]=txt;
            $m.return_arr["district"]=district;
            $m.return_arr["startPoint"]=lng+","+lat;
        }else if(type==2){
            $m.return_arr["endName"]=txt;
            $m.return_arr["endPoint"]=lng+","+lat;
        }else{}
        $m.toPrev($(".page15"),function(){
            $m.active_scroll=1;
        });
    });
    // 切换约车方式
    $(".js_list>li").on("tap",function(){
        var index=$(".js_list>li").index($(this));
        $(this).children("a").addClass("now_choice_a");
        $(this).siblings("li").children("a").removeClass("now_choice_a");
        if(index==1){
            $(".page1 .js_end_pos_btn").css({"display":"none"});
            $(".page1 .js_car_day_btn").css({"display":"flex"});
            $(".page1 .js_call_type_btn").css({"display":"none"});
            $(".page1 .js_member").css({"display":"none"});
            $(".page1 .js_time_spn").text($m.ncity_arr["o_time"]);
            $(".page1 .js_get_city").eq(0).text($m.ncity_arr["o_scity"]);
            $(".page1 .js_get_address").eq(0).text($m.ncity_arr["o_sad"]);
            var nprice=0.00;
            var arr={"user_id":user_id};
            subAjax(arr,$m.ajax_link+"getIndexData",function(re){
                nprice=re["data"]["bookdayset"]["bookprice"]?re["data"]["bookdayset"]["bookprice"]:0.00;
                var num=$(".page1 .js_day_num").val()?$(".page1 .js_day_num").val():1;
                $(".page1 .js_nprice").text(num*nprice);
            });
            
        }else{
            $(".page1 .js_end_pos_btn").css({"display":"flex"});
            $(".page1 .js_car_day_btn").css({"display":"none"});
            $(".page1 .js_call_type_btn").css({"display":"flex"});
            $(".page1 .js_member").css({"display":"flex"});
            $(".page1 .js_time_spn").text($m.ncity_arr["l_time"]);
            $(".page1 .js_get_city").eq(0).text($m.ncity_arr["l_scity"]);
            $(".page1 .js_get_city").eq(1).text($m.ncity_arr["l_ecity"]);
            $(".page1 .js_get_address").eq(0).text($m.ncity_arr["l_sad"]);
            $(".page1 .js_get_address").eq(1).text($m.ncity_arr["l_ead"]);
            var type=$m.ncity_arr["ntype"];
            var txt1=$m.ncity_arr["l_scity"];
            var txt2=$m.ncity_arr["l_ecity"];  
            setPrice(txt1,txt2,type);
        }
        $m.return_arr["type"]=index+1;
        $m.ncity_arr["type"]=index+1;
        $(".page1 .js_detail_div").eq(index).show().siblings(".js_detail_div").hide();
        myScroll1.refresh();
    });
    // 时间插件
    var tt=new Date();
    var yy=tt.getFullYear();
    $('.js_date').date({theme:"datetime",beginyear:yy},function(obj,result){
        var ntype=$(".js_list>li>a.now_choice_a").attr("data-type")?$(".js_list>li>a.now_choice_a").attr("data-type"):1;
        if(ntype==1){
            $m.ncity_arr["l_time"]=result;
        }else{
            $m.ncity_arr["o_time"]=result;
        }
        $m.return_arr["goTime"]=result;
        obj.find(".js_time_spn").text(result);
    });
    // 有话说
    $(".js_get_words").on("tap",function(){
        $m.toNext($(".page3"),function(){
            $m.active_scroll=3;
            $m.refreshPage();
        });
    });
    // 选择图片
    $(".js_album_btn").on("tap",function(){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                $(".js_occupying_image").attr("src",localIds);
                
            }
        });
    });
    // 提交留言
    $(".js_message_btn").on("tap",function(){
        subMessage(function(){
            msg("恭喜，提交成功！",800);
            $m.toPrev($(".page3"),function(){
                $m.active_scroll=1;
            });
        });
    });
    // 选择附加条件
    $(".js_check_condition>a").on("tap",function(){
        if(!$(this).hasClass("now_choice_a")){
            $(this).addClass("now_choice_a");
        }else{
            $(this).removeClass("now_choice_a");
        }
    });
    // 预约天数数量控制
    $(".js_add_num").on("tap",function(){
        setNumFunc($(this),1);
    });
    $(".js_red_num").on("tap",function(){
        setNumFunc($(this),2);
    });
    $(".js_day_num").on("blur",function(){
        var num=$(this).val()?$(this).val():1;
        var max=$(this).attr("data-max")?$(this).attr("data-max"):100;
        var min=$(this).attr("data-min")?$(this).attr("data-min"):1;
        if(num<min){
            msg("至少约车天数为一天！",800);
            num=min;
        }else if(num>max){
            msg("约车天数达到极限"+max+"了！",800);
        }
        $(this).val(num);
        $m.return_arr["days"]=num;
    });
    // 数量限制
    $(".js_day_num").bind("input propertychange",function(){
        var txt=$(this).val();
        var regx=/\D/g;
        $(this).val(txt.replace(regx,''));
    });
    // 手机限制输入字母和汉字
    $(".js_mobile").bind("input propertychange",function(){
        var txt=$(this).val();
        var regx=/\D/g;
        $(this).val(txt.replace(regx,''));
    });
    // 乘车人数
    $(".js_member").on("tap",function(){
        // var num=$m.return_arr["personnumber"]?$m.return_arr["personnumber"]:1;
        // console.log(num)
        // $(".page4 .js_num").val(num);
        $m.toNext($(".page4"),function(){
            $m.active_scroll=4;
            $m.refreshPage();
        });
    });
    // 确认人数
    $(".js_sure_num_btn").on("tap",function(){
        $m.toPrev($(".page4"),function(){
            var num=$(".page4 .js_num").val()?$(".page4 .js_num").val():1;
            $m.return_arr["personNumber"]=num;
            $(".js_person_num").text(num);
            var nprice=$m.return_arr["bookprice"]?$m.return_arr["bookprice"]:0;
            $(".page1 .js_nprice").text(num*nprice);
            $m.active_scroll=1;
        });
    });

    // 取消返回
    $(".js_cancel").on("tap",function(){
        $m.toPrev($(".page4"),function(){
            $m.active_scroll=1;
        });
    });
    // 选择人数
    $(".js_num_list>li").on("tap",function(){
        var _index=$(".js_num_list>li").index($(this));
        $(this).addClass("now_choice").siblings("li").removeClass("now_choice");
        var txt=$(this).text()?$(this).text():1;
        $(".js_num").val(txt);
    });
    // 帮人约车
    $(".js_help_about").on("tap",function(){
        if(!$(this).hasClass("js_now")){
            $(this).addClass("js_now");
            $(this).find("img").attr("src",$m.img_url+"icon15.png");
            $(this).siblings(".contact_div").show();
            $(".js_btn_div").show();
        }else{
            $(this).removeClass("js_now");
            $(this).find("img").attr("src",$m.img_url+"icon32.png");
            $(this).siblings(".contact_div").hide();
            $(".js_btn_div").hide();
        }
    });
    // 提交帮人约车信息
    $(".js_sure_about_btn").on("tap",function(){
        var num=$(".page4 .js_num").val()?$(".page4 .js_num").val():1;
        if($(".page4 .js_help_about").hasClass("js_now")){
            aboutInfo(function(){
                $m.toPrev($(".page4"),function(){
                    $(".js_person_num").text(num);
                    $m.return_arr["personNumber"]=num;
                    $m.active_scroll=1;
                });
            });
        }else{
            $m.return_arr["isHelp"]=0;
            $m.toPrev($(".page4"),function(){
                
                $(".js_person_num").text(num);
                $m.return_arr["personNumber"]=num;
                $m.active_scroll=1;
            });
        }
        var nprice=$m.return_arr["bookprice"]?$m.return_arr["bookprice"]:0;
        $(".page1 .js_nprice").text(num*nprice);
        
    });
    // 选择预约线路的类型
    $(".js_call_type_box>p").on("tap",function(){
        // 开始请求
        var a=$(this);
        var type=a.attr("data-type")?a.attr("data-type"):1;
        var txt1=$m.ncity_arr["l_scity"];
        var txt2=$m.ncity_arr["l_ecity"];  
        a.children("img").attr("src",$m.img_url+"icon15.png");
        a.siblings("p").children("img").attr("src",$m.img_url+"icon32.png");
        setPrice(txt1,txt2,type);
    });
    // 立即叫车
    $(".js_call_btn").on("tap",function(){
        console.log($m.return_arr);
        var return_arr=$m.return_arr;
        var scity=$(".js_get_city").eq(0).text()?$(".js_get_city").eq(0).text():"";
        var ecity=$(".js_get_city").eq(1).text()?$(".js_get_city").eq(1).text():"";
        if(return_arr["type"]==1){
            // 线路预约
            if(return_arr["can_order"]===false){
                msg("您选择的线路，还没有开通。",800);
            }else if(return_arr["goTime"]==""){
                msg("请选择出发时间",800);
            }else if(scity==""){
                msg("请选择出发城市",800);
            }else if(return_arr["startName"]==""){
                msg("请选择出发地点",800);
            }else if(ecity==""){
                msg("请选择目的城市",800);
            }else if(return_arr["endName"]==""){
                msg("请选择目的地点",800);
            }else if(return_arr["personNumber"]==0){
                msg("请选择乘车人数",800);
            }else{
                $("#atten_box").fadeIn(100);
                $(".bg_div").fadeIn(200);
                $(".page6 .js_set_order_p").text("正在为您派单中,请耐心等待。").show();
                $(".page6 .js_order_ele").hide();
                $m.toNext($(".page6"),function(){
                    $m.active_scroll=6;
                    $m.refreshPage();
                });
                $(".page6 .js_end_li").show();
                $(".page6 .js_start_spn").text(scity+" "+return_arr["startName"]);
                $(".page6 .js_end_spn").text(ecity+" "+return_arr["endName"]);
                if(return_arr["isChildren"]==1){
                    $(".page6 .js_add_condition").eq(0).show();
                }
                if(return_arr["isBag"]==1){
                    $(".page6 .js_add_condition").eq(1).show();
                }
                $(".page6 .js_pers_num_spn").text(return_arr["personNumber"]);
                $(".page6 .js_call_info_box").eq(0).show().siblings(".js_call_info_box").hide();
                // 开始请求
                // var arr={"user_id":user_id};
                subAjax(return_arr,$m.ajax_link+"goLineBook",setOrderDom,function(){
                    $(".page6 .js_set_order_p").hide();
                    $(".page6 .js_order_ele").hide();
                });
            }
        }else if(return_arr["orderType"]==3){
            // 包天预约
            // 线路预约
            if(return_arr["goTime"]==""){
                msg("请选择出发时间",800);
            }else if(scity==""){
                msg("请选择出发城市",800);
            }else if(return_arr["startName"]==""){
                msg("请选择出发地点",800);
            }else if(return_arr["days"]==0){
                msg("请选择包车天数",800);
            }else{
                $("#atten_box").fadeIn(100);
                $(".bg_div").fadeIn(200);
                $(".page6 .js_set_order_p").text("正在为您派单中,请耐心等待。").show();
                $(".page6 .js_order_ele").hide();
                $m.toNext($(".page6"),function(){
                    $m.active_scroll=6;
                    $m.refreshPage();
                });
                
                $(".page6 .js_start_spn").text(scity+" "+return_arr["startName"]);
                $(".page6 .js_end_li").hide();
                if(return_arr["isChildren"]==1){
                    $(".page6 .js_add_condition").eq(0).show();
                }
                if(return_arr["isBag"]==1){
                    $(".page6 .js_add_condition").eq(1).show();
                }
                $(".page6 .js_day_num_spn").text(return_arr["days"]);
                $(".page6 .js_call_info_box").eq(1).show().siblings(".js_call_info_box").hide();
                // 开始请求
                // var arr={"user_id":user_id};
                subAjax(return_arr,$m.ajax_link+"goNerveReservation",setOrderDom,function(){
                    $(".page6 .js_set_order_p").hide();
                    $(".page6 .js_order_ele").hide();
                });
            }
        }
    });
    // 资费详情
    $(".js_get_detail").on("tap",function(){
        var num=$(".page1 .js_person_num").text()?$(".page1 .js_person_num").text():1;
        var nprice=$m.return_arr["bookprice"];
        $(".page5 .js_npay").text(nprice*num);
        $(".page5 .js_all_price").text(nprice*num);
        $(".page5 .js_order_price").text(nprice);
        $m.toNext($(".page5"),function(){
            $m.active_scroll=5;
            $m.refreshPage();
        });
    });
    // 填写取消订单框
    $(".js_del_order").on("tap",function(){
        $(".js_del_order_box").show().siblings(".bg_div").fadeIn(400);;
    });
    // 取消修改
    $(".js_cancel_btn").on("click",function(){
        $(this).parent().parent().fadeOut(200);
        $(".bg_div").fadeOut(400);
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
        if(a.length==0){
            msg("请先选择取消订单原因",800);
        }else{
            var type=a.attr("data-id")?a.attr("data-id"):1;
            var orderid=$m.order_arr["orderid"]?$m.order_arr["orderid"]:"";
            var arr={"orderId":orderid,"user_id":user_id,"type":type};
            subAjax(arr,$m.ajax_link+"goCancelOrder",function(){
                msg("取消订单成功",800);
                $(".js_del_order_box").fadeOut(200);
                $(".bg_div").fadeOut(400,function(){
                    $m.toPrev($(".page6"),function(){
                    });
                });

            });
        }
    });
    // 车辆详情
    $(".js_drver").on("tap",function(){
        $m.toNext($(".page7"),function(){
            $m.active_scroll=7;
            $m.refreshPage();
        });
    });
    // 确认并立即约车
    $(".js_called_btn").on("tap",function(){
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        $m.toNext($(".page8"),function(){
            $m.active_scroll=8;
            $m.refreshPage();
        });
        var arr=$m.order_arr?$m.order_arr:"";
        if(arr!=""){
            setPayDom(arr);
        }
    });
    // 去支付剩余
    $(".js_to_pay").on("tap",function(){
        $m.toNext($(".page20"),function(){
            $m.active_scroll=20;
            $m.refreshPage();
        });
    });
    // 去选择优惠券
    $(".js_to_get_coupon").on("tap",function(){
        $(".p9_btn_div").show();
        $(".coupon_list").addClass("js_coupon_list");
        $(".coupon_list>li").removeClass("now_choice_li");
        $m.toNext($(".page9"),function(){
            $m.active_scroll=9;
            $m.refreshPage();
        });
    });
    // 选择优惠券
    $(".page9").on("tap",".js_coupon_list>li",function(){
        if(!$(this).hasClass("now_choice_li")){
            $(this).addClass("now_choice_li");
        }else{
            $(this).removeClass("now_choice_li");
        }
    });
    // 确认选择优惠券
    $(".js_choice_btn").on("tap",function(){
        $m.toPrev($(".page9"),function(){
            $m.active_scroll=20;
            $m.refreshPage();
            $(".page9").css({"z-index":10});
        });
    });
    // 使用详情
    $(".js_rule").on("tap",function(){
        $m.toNext($(".page11"),function(){
            m.active_scroll=11;
            $m.refreshPage();
        });
    });
    // 添加优惠券
    $(".js_add_coupon").on("tap",function(){
        $m.toNext($(".page10"),function(){
            m.active_scroll=10;
            $m.refreshPage();
        });
    });
    // 确认添加优惠券
    $(".js_add_coupon_btn").on("tap",function(){
        var arr=[];
        $(".page10 .js_input_area").each(function(){
            var txt=$(this).val()?$(this).val():"";
            arr.push(txt);
        });
        if(arr[0]==""){
            msg("请输入编号",800);
        }else if(arr[1]==""){
            msg("请输入密码",800);
        }else{
            $m.toPrev($(".page10"),function(){
                $m.active_scroll=9;
                $m.refreshPage();
            });
            // var arr={"user_nicename":txt,"user_id":user_id};
            // subAjax(arr,"goModifiedSelfInfo",function(){
            //     $(".js_rename_txt").text(txt);
            // });
        }
    });
    
    // 选择支付方式
    $(".js_pay_list>li").on("tap",function(){
        $(this).addClass("js_now").siblings("li").removeClass("js_now");
        var a=$(this).children("a").children("span");
        a.addClass("now_choice_spn");
        $(this).siblings("li").children("a").children("span").removeClass("now_choice_spn");
    });
    // 确认支付按钮
    $(".js_pay_sure_btn").on("tap",function(){
        var type=$(".js_pay_list>li.js_now").attr("data-type")?$(".js_pay_list>li.js_now").attr("data-type"):2;
        var payType=1;
        if(type==2){
            payType=5;
            // 余额支付
            $m.toNext($(".page12"),function(){
                $m.active_scroll=12;
                $m.refreshPage();
            });
        }else{
            // 微信支付
            payType=3;
        }
        var orderId=$m.order_arr["orderid"]?$m.order_arr["orderid"]:"";
        var bonusId=0;
        var arr={"orderId":orderId,"bonusId":bonusId,"payType":payType,"paypwd":"","user_id":user_id};
        subAjax(arr,$m.ajax_link+"goPayOrder",function(re){
            $m.order_arr["paysn"]=re["data"]["paysn"]?re["data"]["paysn"]:"";
            $m.order_arr["payprice"]=re["data"]["payprice"]?re["data"]["payprice"]:0;
            $(".page12 .js_payprice_spn").text($m.order_arr["payprice"]);
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
        $m.toNext($(".page13"),function(){
            $m.active_scroll=13;
            $m.refreshPage();
        });
    });
    // 获取验证码
    $(".page13 .js_get_code").on("tap",function(){
        checkpost($(this),"page13 .js_mobile",3);
    });
    // 确认修改密码
    $(".js_sure_resetpass").on("tap",function(){
        toSubPass($(this),function(re){
            msg("修改成功！",800)
            $m.toPrev($(".page13"),function(){
                $m.active_scroll=14;
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
    // 余额支付
    $(".js_pay_balance_now").on("tap",function(){
        var a=$(this);
        var pass=$(".page12 .js_pass_area").val()?$(".page12 .js_pass_area").val():"";
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
                    $(".page").not(".page1,.page12").css({"left":"100%"});
                    $m.toPrev($(".page12"),function(){
                        $m.active_scroll=1;
                        $m.refreshPage();
                    });
                },true);
            });
        }
    });
    // 线下支付
    $(".js_offline_btn").on("tap",function(){
        // 开始提交
        // var arr={"user_nicename":txt,"user_id":user_id};
        // subAjax(arr,"goModifiedSelfInfo",function(){
        //     $(".js_rename_txt").text(txt);
        // });
        $("#atten_box").fadeIn(100);
        $(".bg_div").fadeIn(200);
        // 开始提交
        var payType=1;
        var orderId=$m.order_arr["orderid"]?$m.order_arr["orderid"]:"";
        var bonusId=$(".page8 .js_to_get_coupon").attr("data-bonusid")?$(".page8 .js_to_get_coupon").attr("data-bonusid"):"";
        var arr={"orderId":orderId,"bonusId":bonusId,"payType":payType,"paypwd":"","user_id":user_id};
        subAjax2(arr,$m.ajax_link+"goPayOrder",function(re){
            $("#atten_box").fadeOut(50);
            $(".bg_div").fadeOut(100);
            msg("提交成功！",800);
            $(".page").not(".page1").css({"left":"100%"});
            // $(".page14 .js_del_order").hide();
            // $(".page14 .js_can_star").addClass("js_star_list");
            // $m.toNext($(".page14"),function(){
            //     $m.active_scroll=14;
            //     $m.refreshPage();
            // });
        });

    });
    // 评星星数量
    $(".page").on("tap",".js_star_list>li",function(){
        var a=$(this),b=a.children("img"),c=a.parent();
        var leven=a.attr("data-star")?a.attr("data-star"):"3";
        c.children("li").each(function(i){
            if(i<leven){
                $(this).children("img").attr("src",$m.img_url+"icon17.png");
            }else{
                $(this).children("img").attr("src",$m.img_url+"icon16.png");
            }
        });
    });
    // 提交评价
    $(".js_sub_evaluate").on("tap",function(){
        msg("评论成功",800);
        $(this).hide();
        $(".js_can_star").removeClass("js_star_list");
        myScroll14.refresh();
        $(".page").not(".page1,.page14").css({"left":"100%"});
        $m.toPrev($(".page14"),function(){});
        // var arr={"user_nicename":txt,"user_id":user_id};
        // subAjax(arr,"goModifiedSelfInfo",function(){
        //     $(".js_rename_txt").text(txt);
        // });
    });
    $(window).on("resize",function(){$m.rs()});
});
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
            msg("请求失败，请稍后重试！","确定",function(){
                if(typeof errorFunc==="function" && errorFunc instanceof Function){
                    errorFunc();
                }
            });
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
function ms(){
    // 初始化
    this.init=function(){
        $(".js_city_search").val("");
        $(".js_search_city").html("").hide();
        $(".js_detail_list").html("").show();
        $(".js_detail_att").hide();
        if($(".js_city_list>li").length>0){
            $(".js_city_list").show().siblings(".n_list").hide();
        }else{
            $(".js_city_list").hide().siblings(".n_list").show();
        }
        myScroll2.refresh();
    }
    // 城市生成
    this.init_cs=function(arr,city){
        var is_city=false;
        if(arr.length>0){
            // 循环字母
            var az=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            var _html='';
            for(var n=0,a_len=az.length;n<a_len;n++){
                var _html1='';
                for(var i=0,len=arr.length;i<len;i++){
                    var name=pcformat(arr[i]["name"])?pcformat(arr[i]["name"]):"";
                    var py_t=Pinyin.GetJP(name)[0].toUpperCase();
                    if(py_t==az[n]){
                        // 有货
                        var id=arr[i]["id"]?arr[i]["id"]:"";
                        var level=arr[i]["level"]?arr[i]["level"]:"";
                        var keyword=arr[i]["keyword"]?arr[i]["keyword"]:"";
                        var code=arr[i]["code"]?arr[i]["code"]:"";
                        var servicedesc=arr[i]["servicedesc"]?arr[i]["servicedesc"]:"";
                        var addtime=arr[i]["addtime"]?arr[i]["addtime"]:"";
                        var listorder=arr[i]["listorder"]?arr[i]["listorder"]:"";
                        var upid=arr[i]["upid"]?arr[i]["upid"]:"";
                        var status=arr[i]["status"]?arr[i]["status"]:"";
                        if(!is_city && pcformat(city)==name){
                            // 当前定位的城市
                            is_city=true;
                            _html1+='<li class="opt" data-id="'+id+'"><span>'+name+'</span><div class="n_pos_div"><img src="'+$m.img_url+'icon29.png" alt="定位"><span>当前定位</span></div></li>';
                        }else{
                            _html1+='<li class="opt" data-id="'+id+'"><span>'+name+'</span></li>';
                        }
                    }
                }
                if(_html1==''){
                    _html+='<li class="tag hide jp_'+az[n]+'">'+az[n]+'</li>';
                }else{
                    _html+=('<li class="tag jp_'+az[n]+'">'+az[n]+'</li>'+_html1);
                }
            }
            if(_html!=''){
                $(".js_city_list").html(_html);
            }
        }else{
            // 没有城市
            $(".n_list").eq(0).show();
        }
        myScroll2.refresh();
    }

    this.init1=function(arr,txt,oEle){
        
    }


    this.init2=function(arr,txt,oEle){
        var _html1='<li class="tag jp_A">搜索结果</li>';
        var _html2='<li class="tag jp_A">搜索结果</li>';
        var _html3='<li class="tag jp_A">搜索结果</li>';
        var _html4='<li class="tag jp_A">搜索结果</li>';
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
                    // 匹配
                    _html1+='<li class="opt js_'+Pinyin.GetJP(arr[i]["name"])[0].toUpperCase()+'" data-id="'+arr[i]["id"]+'"><span>'+arr[i]["name"]+'</span></li>';
                    oEle.html("");
                    oEle.html(_html1);
                    
                    return false;
                }else if(a.jp==b.jp){
                    _html2+='<li class="opt js_'+Pinyin.GetJP(arr[i]["name"])[0].toUpperCase()+'" data-id="'+arr[i]["id"]+'"><span>'+arr[i]["name"]+'</span></li>';
                    oEle.html(_html2);
                    
                    return false;
                }
                else if(a.hp==b.hp){
                    _html3+='<li class="opt js_'+Pinyin.GetJP(arr[i]["name"])[0].toUpperCase()+'" data-id="'+arr[i]["id"]+'"><span>'+arr[i]["name"]+'</span></li>';
                    oEle.html(_html3);
                    
                    return false;
                }else{
                    _html4+='<li class="opt js_'+Pinyin.GetJP(arr[i]["name"])[0].toUpperCase()+'" data-id="'+arr[i]["id"]+'"><span>'+arr[i]["name"]+'</span></li>';
                    oEle.html(_html4);
                    
                }
            }
            
        }
        if(oEle.children("li").length<1){
            $(".js_city_list").siblings(".n_list").children(".at2").show().siblings().hide();
            $(".js_city_list").hide().siblings(".n_list").show();
        }else{
            oEle.show().siblings().hide();
        }
        myScroll2.refresh();
    }
}
// 高德地图检索周边地区
function getPoiList(map,city,txt){
    var autoOptions = {
        city: city,//城市，默认全国
    };
    autocomplete= new AMap.Autocomplete(autoOptions);
    autocomplete.search(txt, function(status, result){
        //TODO:开发者使用result自己进行下拉列表的显示与交互功能
        if(status=="no_data"){
            // 没有对象
            $(".js_detail_att").children(".at1").show().siblings().hide();
            $(".js_detail_att").show().siblings(".target_list").hide();
            myScroll15.refresh();
        }else if(status=="complete"){
            setPos(result);
        }
    });
}
// 生成搜索列表
function setPos(data){
    var arr=data["tips"]?data["tips"]:[];
    if(arr.length>0){
        // 循环字母
        var az=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        var _html='';
        for(var n=0,a_len=az.length;n<a_len;n++){
            var _html1='';
            for(var i=0,len=arr.length;i<len;i++){
                var name=pcformat(arr[i]["name"])?pcformat(arr[i]["name"]):"";
                var py_t=Pinyin.GetJP(name)[0].toUpperCase();
                if(py_t==az[n]){
                    // 有货
                    var id=arr[i]["id"]?arr[i]["id"]:"";
                    var adcode=arr[i]["adcode"]?arr[i]["adcode"]:"";
                    var district=arr[i]["district"]?arr[i]["district"]:"";
                    var lat="";
                    var lng="";
                    if(arr[i]["location"] && arr[i]["location"]!="undefined"){
                        lat=arr[i]["location"]["lat"]?arr[i]["location"]["lat"]:"";
                        lng=arr[i]["location"]["lng"]?arr[i]["location"]["lng"]:"";
                    }
                    _html1+='<li class="opt" data-id="'+id+'" data-district="'+district+'" data-lat="'+lat+'" data-lng="'+lng+'"><span>'+name+'</span></li>';
                }
            }
            if(_html1==''){
                _html+='<li class="tag hide jp_'+az[n]+'">'+az[n]+'</li>';
            }else{
                _html+=('<li class="tag jp_'+az[n]+'">'+az[n]+'</li>'+_html1);
            }
        }
        if(_html!=''){
            $(".page15 .js_detail_list").html(_html).siblings(".js_detail_att").hide();
        }
    }else{
        // 没有城市
        $(".page15 .js_detail_att").show().siblings(".js_detail_list").hide();
    }
    myScroll15.refresh();
}
// 获取城市详情
function setCityDetail(){
    map.getCity(function(re){
        var city=re.city;
        var province=re.province;
        var district=re.district;
        city=city==""?pcformat(province):pcformat(city);
        // $(".js_get_city").text(city);
        $m.search_arr["city"]=city;
        $m.search_arr["district"]=district;
        $m.search_arr["citycode"]=re.citycode;
        $m.now_city=city;
        // new_city.init_cs($m.s_arr2,city);
    });
}
//格式化省市自治区
function pcformat(txt){
    return txt.replace("省","").replace("市","").replace("维吾尔族自治区","").replace("特别行政区","").replace("自治区","");
}
// 提交留言
function subMessage(func){
    var input_txt=$(".page3 .js_txt_area").val();
    if(input_txt=="" || input_txt==null || input_txt=="undefined"){
        msg("请填写留言内容",800);
    }else{
        var ch_obj=$(".page3 .js_check_condition>a");
        var isbag=0,ischildren=0;
        if(ch_obj.eq(0).hasClass("now_choice_a")){
            isbag=1;
        }
        if(ch_obj.eq(1).hasClass("now_choice_a")){
            ischildren=1;
        }
        $m.return_arr["desc"]=input_txt;
        $m.return_arr["isBag"]=isbag;
        $m.return_arr["isChildren"]=ischildren;
        if(typeof func==="function" && func instanceof Function){
            func();
        }
    }
}
// 提交帮人约车信息
function aboutInfo(func){
    var input_txt=[];
    var regx=/1[1-9]+[0-9]{9}/;
    $(".page4 .js_input_area").each(function(){
        input_txt.push($(this).val());
        return input_txt;
    });
    if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]=="undefined"){
        msg("请填写乘车人姓名",800);
    }else if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]=="undefined"){
        msg("请填写手机号",800);
    }else if(input_txt[1].length<11 || !regx.test(input_txt[1])){
        msg("请填写正确手机号",800);
    }else{
        $m.return_arr["realname"]=input_txt[0];
        $m.return_arr["helpBookPhone"]=input_txt[1];
        $m.return_arr["isHelp"]=1;
        if(typeof func==="function" && func instanceof Function){
            func();
        }
    }
}
// 判断线路
function setPrice(txt1,txt2,type){
    var a=$(".js_call_type_box").children("p").eq(0);
    var arr={"startName":txt1,"endName":txt2,"type":type};
    subAjax(arr,$m.ajax_link+"getLineBookPrice",function(re){
        var lineid=re["data"]["lineid"]?re["data"]["lineid"]:0;
        var price=re["data"]["bookprice"]?re["data"]["bookprice"]:0.00;
        $m.return_arr["lineId"]=lineid;
        $m.return_arr["bookprice"]=price;
        if(lineid==0){
            // 包车
            $m.return_arr["orderType"]=3;
            $m.ncity_arr["ntype"]=2;
            a.children("img").attr("src",$m.img_url+"icon32.png");
            a.siblings("p").children("img").attr("src",$m.img_url+"icon15.png");
        }else{
            if(type==1){
                $m.ncity_arr["ntype"]=1;
                $m.return_arr["orderType"]=2;
                a.children("img").attr("src",$m.img_url+"icon15.png");
                a.siblings("p").children("img").attr("src",$m.img_url+"icon32.png");
            }else{
                $m.ncity_arr["ntype"]=2;
                $m.return_arr["orderType"]=3;
                a.children("img").attr("src",$m.img_url+"icon32.png");
                a.siblings("p").children("img").attr("src",$m.img_url+"icon15.png");
            }
            
        }
        var num=$(".page4 .js_num").val()?$(".page4 .js_num").val():1;
        $(".page1 .js_nprice").text(price*num);
        $m.return_arr["can_order"]=true;
    },function(){
        if(type==1){
            a.children("img").attr("src",$m.img_url+"icon32.png");
            a.siblings("p").children("img").attr("src",$m.img_url+"icon15.png");
        }
        $m.return_arr["orderType"]=3;
        $m.ncity_arr["ntype"]=2;
        $m.return_arr["can_order"]=false;
    });
}
// 生成订单详情
function setOrderDom(data){
    var orderId=data["data"];
    var arr={"orderId":orderId,"user_id":user_id};
    subAjax(arr,$m.ajax_link+"getOrderDetail",setMyTripDetail);
}
// 生成订单详情
function setMyTripDetail(arr){
    var arr=arr["data"];
    if(arr!=null && arr!="undefined"){
        $m.order_arr=arr;
    }
    var addtime=arr["addtime"]?arr["addtime"]:"";
    if(addtime!=""){
        var ntime=addtime.split(" ");
        $(".page6 .js_now_times").html(ntime[0]+"<br/>"+ntime[1]);
    }
    var driverid=arr["driverid"]?arr["driverid"]:0;
    if(driverid==0){
        // 暂时没有司机
        $(".page6 .js_set_order_p").html("附近暂无空闲车辆，<br/>请耐心等待客服为您指派司机...").show();
        $(".page6 .js_order_ele").hide();
        $(".page6 .js_order_ele").eq(2).show();
    }else{
        var carno=arr["carno"]?arr["carno"]:"";
        var driver=arr["driverinfo"]?arr["driverinfo"]:{};
        var pic_src=driver["img"]?driver["img"]:$m.img_url+$m.head_place;
        var tel=driver["tel"]?driver["tel"]:"";
        var drivername=driver["drivername"]?driver["drivername"]:"";
        var servicecounts=driver["servicecounts"]?driver["servicecounts"]:0;
        var avgstar=driver["avgstar"]?driver["avgstar"]:0;
        $(".page6 .js_driver_head_pic").attr("src",pic_src);
        $(".page6 .car_number").text(carno);
        $(".page6 .js_driver_name").text(drivername);
        $(".page6 .js_service_num").text(servicecounts);
        $(".page6 .js_driver_ranking").text(driverid);
        $(".page6 .js_driver_mobile").attr("href","tel:"+tel);
        var driver_star=parseInt(avgstar)?parseInt(avgstar):0;
        for(var i=0;i<driver_star;i++){
            $(".page6 .js_driver_star>li").eq(i).children("img").attr("src",$m.img_url+"icon11.png");
        }
        $(".page6 .js_set_order_p").hide();
        $(".page6 .js_order_ele").show();
    }
    
    
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
    var isdriverid=arr["driverid"]?arr["driverid"]:0;
    if(isdriverid!=0){
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
        $(".page8 .js_driver_head_pic").attr("src",pic_src);
        $(".page8 .car_number").text(carno);
        $(".page8 .js_driver_name").text(drivername);
        $(".page8 .js_service_num").text(servicecounts);
        $(".page8 .js_driver_ranking").text(driverid);
        $(".page8 .js_driver_mobile").attr("href","tel:"+tel);
        var driver_star=parseInt(avgstar)?parseInt(avgstar):0;
        for(var i=0;i<driver_star;i++){
            $(".page8 .js_driver_star>li").eq(i).children("img").attr("src",$m.img_url+"icon11.png");
        }
        $(".page8 .header_info").show();
    }else{
        $(".page8 .header_info").hide();
    }
    // 订单详情
    var addtime=arr["addtime"]?arr["addtime"]:"";
    var startname=arr["startname"]?arr["startname"]:"";
    var endname=arr["endname"]?arr["endname"]:"";
    var isbag=arr["isbag"]?arr["isbag"]:0;
    var ischildren=arr["ischildren"]?arr["ischildren"]:0;
    var bookprice=arr["bookprice"]?arr["bookprice"]:0;
    var days=$m.return_arr["days"]?$m.return_arr["days"]:1;
    var scity=$(".js_get_city").eq(0).text()?$(".js_get_city").eq(0).text():"";
    var ecity=$(".js_get_city").eq(1).text()?$(".js_get_city").eq(1).text():"";
    $(".page8 .js_order_time").text(addtime);
    $(".page8 .js_start_address").text(scity+" "+startname);
    if($m.return_arr["type"]==1){
        $(".page8 .js_end_address").text(ecity+" "+endname);
        $(".page8 .js_customer_div").eq(0).children("span").text(personnumber);
        $(".page8 .js_customer_div").eq(0).show().siblings(".js_customer_div").hide();
    }else{
        $(".page8 .js_end_li").hide();
        $(".page8 .js_customer_div").eq(1).children("span").text(days);
        $(".page8 .js_customer_div").eq(1).show().siblings(".js_customer_div").hide();
    }
    
    // 清空dom先
    $(".page8 .js_additional_list").html('');
    if(isbag==1){
        var _html='<li><img src="'+$m.img_url+'icon13.png" alt="icon"/><span>需要捎一件行李</span></li>';
        $(".page8 .js_additional_list").append(_html);
    }
    if(ischildren==1){
        var _html='<li><img src="'+$m.img_url+'icon13.png" alt="icon"/><span>有小孩</span></li>';
        $(".page8 .js_additional_list").append(_html);
    }
    $(".page8 .js_pay_price").text(bookprice);


    $("#atten_box").fadeOut(100);
    $(".bg_div").fadeOut(200);
    $m.refreshPage();
}
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
// 数组去重
Array.prototype.unique2 = function(){
	var n = {},r=[]; //n为hash表，r为临时数组
	for(var i = 0; i < this.length; i++) //遍历当前数组
	{
		if (!n[this[i]]) //如果hash表中没有当前项
		{
			n[this[i]] = true; //存入hash表
			r.push(this[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
}
// 数据去重
function save_search(arr,type){
	var return_arr=[];
	var arr1=[],arr2=[],arr3=[];
	for(var i=0,len=arr.length;i<len;i++){
		var tar_list=arr[i]["list"];
		for(var j=0,len1=tar_list.length;j<len1;j++){
			var a=tar_list[j].split("@@");
			arr1.push(a[0]);
			arr2.push(a[1]);
			if(type==1){
				arr3.push(a[2]);
			}
		}
	}
	// 去重
	arr1=arr1.unique2();
	arr2=arr2.unique2();
	if(type==1){
		arr3=arr3.unique2();
	}
	for(var m=0,len2=arr1.length;m<len2;m++){
		if(type==1){
			return_arr.push({
				"id":arr1[m],
				"name":arr2[m],
				"src":arr3[m]
			})
		}else{
			return_arr.push({
				"id":arr1[m],
				"name":arr2[m],
			})
		}
	}
	return return_arr;
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

// 约车天数增减
function setNumFunc(obj,type){
    var a=obj.siblings(".js_day_num");
    var num=a.val()?a.val():1;
    var max=a.attr("data-max")?a.attr("data-max"):100;
    var min=a.attr("data-min")?a.attr("data-min"):1;
    if(type==1){
        num++;
    }else if(type==2){
        num--;
    }
    if(num<min){
        msg("至少约车天数为一天！",800);
        num=min
    }else if(num>=max){
        msg("约车天数达到极限"+max+"了！",800);
        num=max;
    }
    a.val(num);
    $m.return_arr["days"]=num;
}
// 提交修改密码
function toSubPass(obj,func){    
    var _this=obj;
    var input_txt=[];
    var regx=/1[1-9]+[0-9]{9}/;
    var re_m = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    $(".page13 .js_input_area").each(function(){
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