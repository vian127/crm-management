require.config({
    paths: {
     
    },

    shim: {

    }
  });
  
  require(['vue'], function (Vue) {
    $(function () {
        var vm = new Vue({
            el: '#app',
            data:{
                list:[
                      {id: 1,name:'张天一',role: '决策者,领导者',position: '总经理',status: '在职',mobile: '138883228323',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'},
                      {id: 2,name:'张天一',role: '决策者',position: '总经理',status: '在职',mobile: '1233312',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'},
                      {id: 3,name:'张天一',role: '决策者',position: '总经理',status: '在职',mobile: '1233312',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'},
                      {id: 4,name:'张天一',role: '决策者',position: '总经理',status: '在职',mobile: '1233312',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'},
                      {id: 5,name:'张天一',role: '决策者',position: '总经理',status: '在职',mobile: '1233312',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'},
                      {id: 6,name:'张天一',role: '决策者',position: '总经理',status: '在职',mobile: '1233312',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'},
                      {id: 7,name:'张天一',role: '决策者',position: '总经理',status: '在职',mobile: '1233312',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'},
                      {id: 8,name:'张天一',role: '决策者',position: '总经理',status: '在职',mobile: '1233312',telephone:'021-344545345',wx:'232545545',judge:'是',ext:'111',qq:'4546546456',email:'22222@qq.com',source:'注册'}
                    ],name:'张天一',
                }
             })
        })  
    })

       