// 自定义方法
var $m={
    // 分享链接
    share_href: window.location.href,
    // 图片地址前缀
    img_url:"images/",
    // 重新布局
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
    },
    loading_img:[
        "1.png",
        "2.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
        "6-1.png",
        "7.png",
        "8.png",
        "9.png",
        "10.png",
        "10-1.png",
        "11.png",
        "12.png",
        "13.png",
        "14.png",
        "15.png",
        "16.png",
        "17.png",
        "18.png",
        "19.png",
        "20.png",
        "21.png",
        "22.png",
        "23.png",
        "24.png",
        "25.png",
        "26.png",
        "27.png",
        "28.png",
        "29.png",
        "30.png",
        "31.png",
        "32.png",
        "33.png",
        "34.png",
        "35.png",
        "36.png",
        "37.png",
        "bg1.jpg",
        "bg2.jpg",
        "bg3.jpg",
        "bg4.jpg",
        "bg5.jpg",
        "bg5-1.png",
        "bg6.jpg",
        "bg7.jpg",
        "bg8.jpg",
        "icon1.png",
        "icon2.png",
        "icon3.png",
        "icon4.png",
        "icon5.png",
        "icon6.png",
        "icon7.png",
        "icon8.png",
        "icon9.png",
        "icon10.png",
    ]
}
// 切换产品
var mySwiper=new Swiper(".swiper-container",{
    direction :'vertical',
    loop: false,
    noSwiping:true,
    spaceBetween: 0,
    preventClicksPropagation:false,
    nextButton:'.js_next',
    onSlideChangeEnd: function(swiper){
        tab();
    }
}); 
function tab(){
    var j = parseInt(mySwiper.activeIndex);
    moveFunc(j);
    //这里可判断当前滑动到哪个产品
    var total=6;
    if(j==6){
        $(".next_div").hide();
    }else{
        $(".next_div").show();
    }
    
}
$(function(){
    $m.rs();
    // loading();
    $(".loading").fadeOut(200);
    $(".swiper-container").fadeIn(400,function(){
        mySwiper.update();
        $(".next_div").show();
        mySwiper.slideTo(2);
    });
    $(window).on("resize",function(){$m.rs()});
});
function loading(){
    var src=$m.img_url;
    var arr=$m.loading_img;
    var num=0;
    var obj=$(".js_loading");
    var tar=$("#bar");
    var len=arr.length;
    forFunc()
    function forFunc(){
        var oImg=new Image;
        oImg.src=src+arr[num];
        oImg.onload=oImg.onerror=function(){
            var x=parseInt((num+1)/len*100);
            if (x > 100) {
                x = 100
            }
            console.log(x)
            if(x<20){
                tar.css({"background-color":"#C1C53C"});
            }else if(x<40){
                tar.css({"background-color":"#64C53C"});
            }
            else if(x<60){
                tar.css({"background-color":"#3CC0C5"});
            }
            else if(x<80){
                tar.css({"background-color":"#3C6CC5"});
            }
            else{
                tar.css({"background-color":"#9424CB"});
            }
            if(num>=len-1){
                clearTimeout(timer1);
                obj.text("100%");
                tar.width("100%");
                setTimeout(function(){
                    $(".loading").fadeOut(200);
                    $(".swiper-container").fadeIn(400,function(){
                        mySwiper.update();
                        $(".next_div").show();
                        //第一页动画
                        $(".js_p1_ele1").stop(true).animate({"opacity":1},1000,function(){
                            $(".js_p1_ele2").stop(true).animate({"opacity":1},1000,function(){
                                $(".js_p1_ele3").addClass("animate2");
                                $(".js_p1_ele3").stop(true).animate({"opacity":1},1000,function(){
                                    $(".js_p1_ele5").stop(true).animate({"opacity":1},500,function(){
                                        $(".js_p1_ele4").stop(true).animate({"opacity":1},1000,function(){
                                            $(".js_p1_ele4").addClass("animate3");
                                        });
                                    });
                                });
                            });
                        });
                    });
                },500);
            }else{
                obj.text(x+"%");
                tar.width(x+"%");
                num++;
                timer1=setTimeout(function(){
                    clearTimeout(timer1);
                    forFunc();
                },30);   
            }
        }
    }
}
function moveFunc(index){
    if(index==0){
        //第一页动画
        $(".js_p1_ele1").stop(true).animate({"opacity":1},1000,function(){
            $(".js_p1_ele2").stop(true).animate({"opacity":1},1000,function(){
                $(".js_p1_ele3").addClass("animate2");
                $(".js_p1_ele3").stop(true).animate({"opacity":1},1000,function(){
                    $(".js_p1_ele5").addClass("animate4");
                    $(".js_p1_ele5").stop(true).animate({"opacity":1},500,function(){
                        $(".js_p1_ele4").stop(true).animate({"opacity":1},1000,function(){
                            $(".js_p1_ele4").addClass("animate3");
                            $(".js_p1_ele6").stop(true).animate({"opacity":1},500,function(){
                                $(".js_p1_ele6").addClass("animate5");
                            });
                        });
                    });
                });
            });
        });
        // 下页归零
        $(".page2").find(".opac").stop(true)
        $(".page2").find(".opac").css({"opacity":0});
        $(".js_p2_ele4").removeClass("animate6");
        $(".js_p2_ele8").removeClass("animate7");
    }else if(index==1){
        //第2页动画
        $(".js_p2_ele2").stop(true).animate({"opacity":1},1000,function(){
            $(".js_p2_ele1").stop(true).animate({"opacity":1},1000,function(){
                // 美女已经出现，看过去
                $(".js_p2_ele4").addClass("animate6");
                $(".js_p2_ele5").stop(true).animate({"opacity":1},1000,function(){
                    $(".js_p2_ele6").stop(true).animate({"opacity":1},500,function(){
                        $(".js_p2_ele7").stop(true).animate({"opacity":1},500,function(){
                            $(".js_p2_ele8").addClass("animate7");
                            $(".js_p2_ele8").stop(true).animate({"opacity":1},500,function(){

                            });
                        });
                    });
                });
            });
        });
        // 上页归零
        $(".page1").find(".opac").stop(true)
        $(".page1").find(".opac").css({"opacity":0});
        $(".js_p1_ele3").removeClass("animate2");
        $(".js_p1_ele4").removeClass("animate3");
        $(".js_p1_ele5").removeClass("animate4");
        $(".js_p1_ele6").removeClass("animate5");
    }else if(index==2){
        //第3页动画
        $(".js_p3_ele3").addClass("animate8");
        $(".js_p3_ele4").addClass("animate9");
        $(".js_p3_ele1").stop(true).animate({"opacity":1},1000,function(){
                $(".js_p3_ele5").stop(true).animate({"opacity":1},500,function(){
                    $(".js_p3_ele7").addClass("animate10");
                    setTimeout(function(){
                        $(".js_p3_ele8").addClass("animate11");
                    },2000)
                    $(".js_p3_ele9").stop(true).animate({"opacity":1},1000,function(){
                        $(".js_p3_ele10").stop(true).animate({"opacity":1},500,function(){
                            $(".js_p3_ele11").stop(true).animate({"opacity":1},500,function(){
                                $(".js_p3_ele12").stop(true).animate({"opacity":1},500,function(){
                             
                                });
                            });  
                        });
                    });
                });
        });
        // 上页归零
        $(".page2").find(".opac").stop(true)
        $(".page2").find(".opac").css({"opacity":0});
        $(".js_p2_ele4").removeClass("animate6");
        $(".js_p2_ele8").removeClass("animate7");
    }
}