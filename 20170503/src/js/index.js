/*
	#author		lut000
	#date 		2017/04/21
*/
$(function(){
    var def={
        loading_ele:$(".js-atten-box"),
        is_get_data:false,
        sty_arr:['"background-color":"#f59";color:#fff','"background-color":"#f59";']
    };
    // 查询
    $(".js-search-btn").on("click",function(){
        if(def.is_get_data==false){
            def.is_get_data=true;
            def.loading_ele.fadeIn(200);
            var select_ele=$(".js-select");
            var opt={};
            select_ele.each(function(){
                var key_name=$(this).attr("data-key") || "";
                opt[key_name]=$(this).val() || "";
            });
            getInfo();
            getList(opt);
        }
    });


    // 请求参数
    getInfo();
    // select
    $.ajax({
        url:"http://120.26.112.74:8080/GetSelectOption.ashx",
        type:"get",
        success:setSelectorDom
    });

    $.ajax({
        url:"http://m.pop136.com/api/apply/wxconfig/",
        type:"POST",
        success:function(data){
            console.log(data);
        }
    });
    
    // 生成select
    function  setSelectorDom(data){
        if(data){
            var ndata=JSON.parse(data) || {};
            if(ndata["Code"]!=0){
                msg.msg({"txt":ndata["Msg"]},1200);
                return;
            }
            var arr=JSON.parse(ndata["Data"]) || [];
            var tar=$(".js-select-div"),_html="",key_name="",val_arr=[],txt="",id="",get_opt={};
            for(var i=0,len=arr.length;i<len;i++){
                key_name=arr[i]["Key"] || "";       //键值
                val_arr=arr[i]["Value"] || [];       //值
                _html+='<select class="js-select" data-key="'+key_name+'">';
                for(var j=0,len2=val_arr.length;j<len2;j++){
                    txt=val_arr[j]["Name"] || "";
                    id=val_arr[j]["Value"] || "";
                    _html+='<option data-id="'+id+'" value="'+id+'">'+txt+'</option>';
                    if(j==0){
                        get_opt[key_name]=id;
                    }
                }
                _html+='</select>';
            }
            tar.prepend(_html);
            getList(get_opt);
        }
    };
    // 生成表格
    function setTabDom(data){
        if(data){
            var ndata=JSON.parse(data);
            if(ndata["Code"]!=0){
                msg.msg({"txt":ndata["Msg"]},1200);
                return;
            }
            var arr=JSON.parse(ndata["Data"]) || [];
            var tar=$(".js-table"),_html="",data_obj={},kind_option=[],int_flag=[],txt="",nindex=0,sty_str="";
            for(var i=0,len=arr.length;i<len;i++){
                if(i==0){
                    _html+='<table class="table js-table">';
                    _html+='<thead>';
                }else if(i==1){
                    _html+='<tbody>';
                }

                _html+='<tr>';

                nindex=0;
                data_obj=arr[i];
                kind_option=data_obj["KindOption"] || [];
                int_flag=data_obj["intFlag"] || [];
                for(var key in data_obj){
                    if(key=="KindOption" || key=="intFlag"){
                        continue;
                    }
                    sty_str="";
                    txt=data_obj[key] || "";
                    if(kind_option[nindex]==null && i!=0){
                        if(int_flag[nindex]==1){
                            sty_str=def.sty_arr[0];
                        }else if(int_flag[nindex]==2){
                            sty_str=def.sty_arr[0];
                        }
                    }
                    _html+='<td style="'+sty_str+'">'+txt+'</td>';
                    nindex++;
                };


                _html+='</tr>';
                if(i==0){
                    _html+='</thead>';
                }else if(i==len-1){
                    _html+='</tbody>';
                    _html+='</table>';
                }
            };
            if(_html!=""){
                tar.html(_html);
            }else{
                $(".js-no-list").show();
            }
        }
        def.loading_ele.fadeOut(200);
        def.is_get_data=false;
    }
    // 请求列表
    function getList(opt){
        $.ajax({
            url:"http://120.26.112.74:8080/GetCrossTableInfo.ashx?SelectList="+JSON.stringify(opt),
            type:"get",
            // data:{SelectList:opt},
            success:setTabDom,
            error:function(){
                def.is_get_data=false;
                msg.msg({
                    txt:"网络出现了问题，请稍后再试！"
                });
            }
        });
    };
    // 属性参数
    function getInfo(){
        $.ajax({
            url:"http://120.26.112.74:8080/GetOptionMainInfo.ashx",
            type:"get",
            success:function(data){
                if(data){
                    var ndata=JSON.parse(data);
                    var arr=JSON.parse(ndata["Data"]) || [];
                    var tar=$(".js-info-list"),_html="",user_name="",num=0;
                    var command_id=ndata["CommandID"] || "";
                    var sned_time=ndata["SendDateTime"] || "";
                    var call_back_time=ndata["CallBackDateTime"] || "";
                    var re=/T|\.\d+/g;

                    sned_time=sned_time.replace(re," ");
                    call_back_time=call_back_time.replace(re," ");
                    _html+='<li><label>查询主键：</label><span>'+command_id+'</span></li>';
                    _html+='<li><label>请求时间：</label><span>'+sned_time+'</span></li>';
                    _html+='<li><label>响应时间：</label><span>'+call_back_time+'</span></li>';
                    for(var i=0,len=arr.length;i<len;i++){
                        user_name=arr[i]["PositionName"] || "";       //名称
                        num=arr[i]["NakedPosition"] || "";       //值
                        num=num.toFixed(2) || "";
                        _html+='<li><label>'+user_name+'裸头寸：</label><span>'+num+'</span></li>';
                    }
                    tar.html(_html);
                }
            }
        });
    };
});