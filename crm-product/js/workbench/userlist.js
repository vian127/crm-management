require(['vue'], function (Vue) {
    $(function () {
        var vm = new Vue({
            el: '#app',
            data:{
                list:[{id: 1,check: '编辑',name: '12112',Company: '上海织纺',visited: '2018-6-6',login: '2018-5-1',receive:'ml',time:'2018-12-12 12:12'},
                      {id: 2,check: '编辑',name: '32343',Company: '上海织纺',visited: '2018-6-6',login: '2018-5-1',receive:'ml',time:'2018-12-12 12:12'},
                      {id: 3,check: '编辑',name: '54647',Company: '上海织纺',visited: '2018-6-6',login: '2018-5-1',receive:'ml',time:'2018-12-12 12:12'},
                      {id: 4,check: '编辑',name: '32423',Company: '上海织纺',visited: '2018-6-6',login: '2018-5-1',receive:'ml',time:'2018-12-12 12:12'},
                      {id: 5,check: '编辑',name: '86545',Company: '上海织纺',visited: '2018-6-6',login: '2018-5-1',receive:'ml',time:'2018-12-12 12:12'},
                      {id: 6,check: '编辑',name: '97655',Company: '上海织纺',visited: '2018-6-6',login: '2018-5-1',receive:'ml',time:'2018-12-12 12:12'},
                      {id: 7,check: '编辑',name: '88888',Company: '上海织纺',visited: '2018-6-6',login: '2018-5-1',receive:'ml',time:'2018-12-12 12:12'},
                    ],
                thead:[{name:'主账号',id:1,is_show:true},
                       {name:'公司名称',id:2,is_show:true},
                       {name:'未回访天数',id:3,is_show:true},
                       {name:'未登录时间',id:4,is_show:true},
                       {name:'领用人',id:5,is_show:true},
                       {name:'领用时间',id:6,is_show:true}],
                collect:{
                    account:'',
                    company:'',
                    tel:'',
                    stage:'1',
                    user:'',
                    userid:'',
                    qq:'',
                    source:'1',
                    category:'1',
                },
                isshow:true, 
            },
            methods:{
                changeCol:function(event,id){
                    console.log(event)
                    var tag=event.target;
                    var is_check=tag.checked;
                    for(var i=0,len=this.thead.length;i<len;i++){
                        if(this.thead[i].id==id){
                            this.thead[i].is_show=is_check;
                            console.log(i)
                            break;
                        }
                    }
                    console.log(is_check);
                },
                changeAll:function(e){
                    console.log(e)
                    var tag = e.target;
                    var all_check = tag.checked;
                    this.thead.forEach(function(v){
                        v.is_show = all_check
                    })
                }
            }
        });
      
        //隐藏筛选字段
        $('.user-show').on('click', function () {
            $('.chioce').toggle();
        });
        $('.btn-pass').on('click', function () {
            $('.chioce').hide();
        });

        $('.user-sure').on('click',function(){
        //  获取筛选的数据
            var result = vm.collect;
            console.log(result);
        });

        



        // 列表全选
        var ids = [];
        $('tbody').on('change', '.info-single', function () {
            var id = $(this).parent().data('id');
            var hasId = ids.indexOf(id);

            if ($(this).prop('checked')) {
                if (hasId == -1) {
                    ids.push(id);
                }
            } else {
                ids.splice(hasId, 1);
            }
            var strid = ids.join()
            console.log(strid)
            if (ids.length == $('.info-single').length) {
                $('.info-all').prop('checked', true)
            } else {
                $('.info-all').prop('checked', false)
            }
        })
        $('.info-all').on('click', function () {
            $('.info-single').prop('checked', $(this).prop('checked')).trigger('change')
        });

        // 分页
        function page(){
            layui.use('laypage', function(){
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                    elem: 'test1'
                    ,count: 50
                    ,layout: [ 'prev', 'page', 'next','limit','count', 'skip']
                    ,jump: function(obj){
                      console.log(obj)
                      var curr = obj.curr;

                    }
                });
            });
        }
       page();


    })
})