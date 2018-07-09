/*
	#author		lut000
	#date 		2017/04/21
*/
require.config({
    baseUrl:"src/js",
    urlArgs: "r="+(new Date()).getTime(),
    paths:{
        "jquery":["lib/jquery-2.1.4.min"],
        "msg":["common/pop-msg-mt-1.0"],
    },
    shim:{
        "msg":{
            deps:["jquery"]
        }
    }
});
require(["jquery"],function(jquery){
    $(function(){
        // 设置字体大小
        general.fn.setRootSize();
        $(window).on("resize",function(){
            general.fn.setRootSize();
        });
    });
});