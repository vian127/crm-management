require(['vue'], function (Vue) {
    $(function () {
        var vm = new Vue({
            el: '#app',
            data() {
                return list = [{
                        id: 1,
                        check: '查看',
                        name: 'ls',
                        Company: '上海织纺上海织纺上海织纺',
                        visited: '2018-6-6',
                        login: '2018-5-1',
                        expire: '2018-7-1',
                        receive: 'lm',
                        shoe: '2018-5-1',
                        package: '2018-8-6',
                        jewelry: '2012-8-1',
                        home: '2015-5-1',
                        accept: '2015-6-8 12:30',
                        appo: '2018-7-2 14:00',
                        task: '否'
                    },
                    {
                        id: 2,
                        check: '查看',
                        name: 'ww',
                        Company: '上海织纺',
                        visited: '2018-6-6',
                        login: '2018-5-1',
                        expire: '2018-7-1',
                        receive: 'lm',
                        shoe: '2018-5-1',
                        package: '2018-8-6',
                        jewelry: '2012-8-1',
                        home: '2015-5-1',
                        accept: '2015-6-8 12:30',
                        appo: '2018-7-2 14:00',
                        task: '否'
                    },
                    {
                        id: 3,
                        check: '查看',
                        name: 'ml',
                        Company: '上海织纺',
                        visited: '2018-6-6',
                        login: '2018-5-1',
                        expire: '2018-7-1',
                        receive: 'lm',
                        shoe: '2018-5-1',
                        package: '2018-8-6',
                        jewelry: '2012-8-1',
                        home: '2015-5-1',
                        accept: '2015-6-8 12:30',
                        appo: '2018-7-2 14:00',
                        task: '否'
                    },
                    {
                        id: 4,
                        check: '查看',
                        name: 'ls',
                        Company: '上海织纺',
                        visited: '2018-6-6',
                        login: '2018-5-1',
                        expire: '2018-7-1',
                        receive: 'lm',
                        shoe: '2018-5-1',
                        package: '2018-8-6',
                        jewelry: '2012-8-1',
                        home: '2015-5-1',
                        accept: '2015-6-8 12:30',
                        appo: '2018-7-2 14:00',
                        task: '否'
                    },
                    {
                        id: 5,
                        check: '查看',
                        name: 'ls',
                        Company: '上海织纺',
                        visited: '2018-6-6',
                        login: '2018-5-1',
                        expire: '2018-7-1',
                        receive: 'lm',
                        shoe: '2018-5-1',
                        package: '2018-8-6',
                        jewelry: '2012-8-1',
                        home: '2015-5-1',
                        accept: '2015-6-8 12:30',
                        appo: '2018-7-2 14:00',
                        task: '否'
                    },
                    {
                        id: 6,
                        check: '查看',
                        name: 'ls',
                        Company: '上海织纺',
                        visited: '2018-6-6',
                        login: '2018-5-1',
                        expire: '2018-7-1',
                        receive: 'lm',
                        shoe: '2018-5-1',
                        package: '2018-8-6',
                        jewelry: '2012-8-1',
                        home: '2015-5-1',
                        accept: '2015-6-8 12:30',
                        appo: '2018-7-2 14:00',
                        task: '否'
                    },
                    {
                        id: 7,
                        check: '查看',
                        name: 'ls',
                        Company: '上海织纺',
                        visited: '2018-6-6',
                        login: '2018-5-1',
                        expire: '2018-7-1',
                        receive: 'lm',
                        shoe: '2018-5-1',
                        package: '2018-8-6',
                        jewelry: '2012-8-1',
                        home: '2015-5-1',
                        accept: '2015-6-8 12:30',
                        appo: '2018-7-2 14:00',
                        task: '否'
                    },
                ]
            }
        });
        // 高级筛选
        $('.btn-advanced').on('click', function () {
            $('.chioce').hide();
            $('.mask').show();
            $('.dialog').show();
        })

        $('.btn-cancel').on('click', function () {
            $('.mask').hide();
            $('.dialog').hide();
        })
        // 条件筛选
        $('.btn-show').on('click', function () {
            $('.chioce').toggle();
        })
        $('.btn-pass').on('click', function () {
            $('.chioce').hide();
        })

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
        })


    })
})