$(document).ready(function () {
    // 头部
    $('.header').load('../html/index.html  .header #home-top , .header #home-logo,.header #home-logo, .header #banner-top-nav');
    // 尾部
    $('#footer').load('../html/index.html #footer .part1,#footer .part2,#footer .part3');

    // 渲染购物车页面
    // cookies的增删改
    function addcookie(key, value, day) {
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
    }

    function getcookie(key) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    }

    function delcookie(key) {
        addcookie(key, '', -1);
    }
    // 获取cookies渲染接口
    let numarr = [];
    let sidarr = [];
    let urlz = 'http://10.31.157.68/js1907/MY/preproject/'
    let finallhe=0;
   

    // 渲染购物车函数
    // id为商品唯一值，num为对应的商品数量
    function carRendering(id, num) {
        //获取所有值的接口的值
        $.ajax({
            type: "post",
            url: "http://10.31.157.68/js1907/MY/preproject/php/shopcar.php",
            dataType: "json",
            success: function (d) {
               
                //遍历数组，获取对应的值渲染页面
                $.each(d, function (i, v) {

                    if (v.sid == id) {
                        // clone盒子
                        let $clonebox = $('.goodtable .table:hidden').clone(true, true);
                        $clonebox.css({
                            display: 'block'
                        });

                        $clonebox.find('.gooddes').find('.pic').attr({
                            src: v.url,
                            sid: v.sid
                        });
                        $clonebox.find('.gooddes').find('.title').html(v.title);
                        $clonebox.find('.gooddes').find('.des').html(v.des);
                        $clonebox.find('.prices').find('span').html(v.prices);
                        $clonebox.find('.prices').find('em').html(v.prices * num);
                        finallhe+=parseInt($clonebox.find('.prices').find('em').html());
                        // 利用for循环不循环结束不会出结果的特点
                        $('.total .total-price .span2').html(finallhe)
                        $('.goodslist .xtotal .right span').html(finallhe)
                        $clonebox.find('.shuliang').find('em').html(num);
                        // 将clone好的盒子追加 
                        $(".goodtable").append($clonebox);
                       
                    }
                   
                });
              
            }
            
        });
       
    }
  

    if (getcookie('numarr') && getcookie('sidarr')) {
        numarr = getcookie('numarr').split(',');
        sidarr = getcookie('sidarr').split(',');
        $.each(sidarr, function (i, v) {
            carRendering(sidarr[i], numarr[i])
        })
    }
    // 加加减减添加点击事件
    $('.goodtable').on('click', '.jiajia', function () {
        //获取当前的值---+1赋值
        let zhi = parseInt($(this).parents('.shuliang').find('em').html())
        if (zhi <= 11) {
            zhi++
            $(this).parents('.shuliang').find('em').html(zhi);
            let mianshuiprice = $(this).parents('.table').find('.prices').find('span').html()
            $(this).parents('.table').find('.prices').find('em').html(zhi * mianshuiprice);
            // 将当前值存储至cookies
            numarr = getcookie('numarr').split(',');
            sidarr = getcookie('sidarr').split(',');
            // 当前点击元素对应的sid----获取在数组中对应的位置
            let weizhi = sidarr.indexOf($(this).parents('table').find('img').attr('sid'))

            //改变此位置nunarr对应的数量并将此值存入cookies
            numarr[weizhi] = zhi;
            addcookie('numarr', numarr, 30);
            addcookie('sidarr', sidarr, 30);

            // 获取cookies,求总的商品数量--
            numarr = getcookie('numarr').split(',');

            let $tnumbox = $(this).parents('.container').find('.total').find('.right').find('.total-num').find('em')
            let numhe = 0
            $.each(numarr, function (i, v) {

                numhe += parseInt(v)

            })
            $tnumbox.html(numhe);

            // 根据数量的变化,计算总的钱的数量
            // 单个变化的总价
            $(this).parents('table').find('.prices').find('em').html();
            
        } else {
            alert("限购12件哦~")
        }


    })
    // --添加点击事件
    $('.goodtable').on('click', '.jianjian', function () {
        let zhi = parseInt($(this).parents('.shuliang').find('em').html())

        if (zhi >= 2) {
            //获取当前的值---+1赋值
            zhi--;
            let mianshuiprice = $(this).parents('.table').find('.prices').find('span').html()
            // 单个商品的总价
            $(this).parents('.table').find('.prices').find('em').html(zhi * mianshuiprice);
            // --后商品的数量
            $(this).parents('.shuliang').find('em').html(zhi);

            // 将当前值存储至cookies
            numarr = getcookie('numarr').split(',');
            sidarr = getcookie('sidarr').split(',');
            // 当前点击元素对应的sid----获取在数组中对应的位置
            let weizhi = sidarr.indexOf($(this).parents('table').find('img').attr('sid'))
            //改变此位置nunarr对应的数量并将此值存入cookies
            numarr[weizhi] = zhi;
            addcookie('numarr', numarr, 30);
            addcookie('sidarr', sidarr, 30);

            // 获取cookies,求总的商品数量--
            numarr = getcookie('numarr').split(',');

            let $tnumbox = $(this).parents('.container').find('.total').find('.right').find('.total-num').find('em')
            let numhe = 0
            $.each(numarr, function (i, v) {

                numhe += parseInt(v)

            })

            $tnumbox.html(numhe)

        } else {
            alert("不能减少啦~")
        }


    })
    // 全选与单选的对应
    // 1.全选选中，单选全部选中 全选取消选中对应的单选也要取消选中
    $('.total .all-choose input').on("click", function () {

        if ($(this).prop('checked')) {
            $('.goodtable .table input:visible').prop('checked', 'checked');

        } else {
            $('.goodtable .table input:visible').prop('checked', false);

        }

    })


    //  2.单选取消选中,多选也要取消选中
    //需要---事件委托！！！
    // $('.goodtable .table input').on('click',function(){

    //     if('.goodtable .table input:visible'){
    //         if( $('.goodtable .table input:visible').prop('checked','checked').size()<$('.goodtable .table input:visible').size()){
    //             $('.total .all-choose input').prop('checked',false) 
    //             console.log(1)
    //         }else{

    //             $('.total .all-choose input').prop('checked',true)


    //         }
    //     }

    // })

    // 求初始化的总价和总数量
    // 获取ccokies---总数量

    if (getcookie('numarr') && getcookie('sidarr')) {
        numarr = getcookie('numarr').split(',');
        let numhe = 0
        $.each(numarr, function (i, v) {

            numhe += parseInt(v)

        })
        $('.total .total-num em').html(numhe)
    }


    $('.goodtable').click(function (ev) {


        if (ev.target.nodeName === 'INPUT') {
            //判断单选框的状态，取消选中减去价格，选中加上价格
            console.log()
            // $('.goodtable .table:visible input')。.prop('checked','checked')
            // 相当于设置了checked状态，会导致所有的都会选中
            if ($('.goodtable .table:visible input:checked').length === $('.goodtable .table:visible input').length) {
                // 全选框全部选中
                $('.total .all-choose input').prop('checked', true);


            } else {
                
                $('.total .all-choose input').prop('checked', false)


            }
        }
    })

    // $('.goodtable').on('click','input',function(){



    //     if ($('.goodtable').find('.table:visible').find('input').length == $('.goodtable').find('.table:visible').find('input:checked').length) {
    //         $('.all-choose input').prop('checked', true)
    //     } else {
    //         $('.all-choose input').prop('checked', false)
    //     }


    // })



    // 点击删除商品按钮删除对用的商品以及cookies
    function delgoods() {
        $('.goodtable').on('click', '.dels', function () {

            if (confirm('您确认要删除吗？')) {
                // 获取cookies
                numarr = getcookie('numarr').split(',');
                sidarr = getcookie('sidarr').split(',');
                // 求出此项在数组中的位置
                let weizhi = sidarr.indexOf($(this).parents('.goodtable').find('.gooddes').find('img').attr('sid'))
                numarr.splice(weizhi, 1);
                sidarr.splice(weizhi, 1);
                addcookie('numarr', numarr, 30);
                addcookie('sidarr', sidarr, 30);
                // 2.页面中移除
                $(this).parents('.table').hide();
                // 获取cookies,求总的商品数量
                numarr = getcookie('numarr').split(',');

                let $tnumbox = $(this).parents('.container').find('.total').find('.right').find('.total-num').find('em')
                let numhe = 0
                $.each(numarr, function (i, v) {

                    numhe += parseInt(v)

                })
                // NaN不是数字  NaN==NaN false
                //  if(numhe==NaN){
                //     $tnumbox.html('0')
                //  }else
                //  {
                //     $tnumbox.html(numhe)
                //  }

                if (numhe == !NaN) {
                    $tnumbox.html(numhe)
                } else {
                    $tnumbox.html('0')
                }

            }


        })
    }
    delgoods()
});