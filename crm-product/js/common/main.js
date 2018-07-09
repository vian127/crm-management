/*
	#author		lut000
	#date 		2018/01/06
    #porpuse    共用入口
*/
require.config({
  baseUrl: "file:///E:/project/works/crm-product/js",
  urlArgs: "r=" + (new Date()).getTime(),
  // urlArgs:"t="+static_change_time,
  paths: {
    "jquery": ["lib/jquery/jquery-1.11.3.min"],
    "jquery.metisMenu": ["lib/jquery/jquery.metisMenu"],
    "nicescroll": ["lib/jquery/jquery.nicescroll"],
    "common": ["common/common"],
    "bootstrap": ["lib/bootstrap/bootstrap.min"],
    "bootstrappaginator": ["lib/bootstrap/bootstrap-paginator"],
    "layui":["lib/layui/layui"],

    "vue": ["lib/vue/vue.min"],
    "general": ["common/general-1.0"],
    "msg": ["common/pop-msg-1.0"],
  },
  map: {
    '*': {
      "css": "lib/require/css-min"
    }

  },
  waitSeconds: 0,
  shim: {
    "general": {
      deps: ["jquery"],
      exports: "general"
    },
    "msg": {
      deps: ["jquery"],
      exports: "msg"
    },

    "bootstrap": {
      deps: ["jquery"]
    },
    "jquery.metisMenu": {
      deps: ["jquery"]
    },
    "nicescroll": {
      deps: ["jquery"],
    },
    "common": {
      deps: ["jquery", 'jquery.metisMenu', 'nicescroll']
    },
    'bootstrappaginator': {
      deps: ["jquery", "bootstrap"]
    }

  }
});






require(["jquery", "general", "bootstrap", 'common','layui'], function (jquery, general) {
  $(function () {
    var ids = [];
    $('tbody').on('change', '.checked-single', function () {
      var id = $(this).parent().data('id');
      var index = ids.indexOf(id);
      if ($(this).prop('checked')) {
        if (index == -1) {
          ids.push(id)
        }
      } else {
        ids.splice(index, 1)
      }
      ids.length > 0 ? $('.btn-batch').show() : $('.btn-batch').hide();
      var strid = ids.join();
      $('.btn-batch').attr('data-id', strid); //缓存id
      if (ids.length == $('.checked-single').length) {
        $('.checked-all').prop('checked', true);
      } else {
        $('.checked-all').prop('checked', false);
      }
    })
    $('.checked-all').on('click', function () {
      $('.checked-single').prop('checked', $(this).prop('checked')).trigger('change')
    })
  })
});