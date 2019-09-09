! function ($) {
    // 头部
    $('.header').load('../html/index.html  .header #home-top , .header #home-logo,.header #home-logo , .header #banner-top-nav');
    // 尾部
    $('#footer').load('../html/index.html #footer .part1,#footer .part2,#footer .part3');
    //cookies的增删改查
    let numarr=[];
    let sidarr=[];
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
        // 购物车幕布
    class shopPrompt {
        constructor() {
            this.$gocarBtn = $(".rightbox .car .gocar");
            this.$curtain = $('#curtain');
        }
        // 1.点击加入购物车出现幕布
        // 2.获取cookie，存在数量+1，不存在放入---sid与num都加1，然后在将cookies存储

        init() {
            let _this = this;
           
    
            this.$gocarBtn.on('click', function () {
                //幕布出现
                _this.curtainShow()
                // 获取cookies
               if(getcookie('numarr') && getcookie('sidarr')){
                let gnum=$('#count').html();
                let sidz=$('.leftbox img').attr('sid');
                    // cookies存在，对应的数量+1
                     numarr=getcookie('numarr').split(',');
                     sidarr=getcookie('sidarr').split(',');
                      //当前点击的元素在数组中不存在  
                     
                     if(sidarr.indexOf(sidz)===-1){
                        numarr.push(gnum);
                        sidarr.push(sidz);
                         //  将数组存入cookies
                    addcookie('numarr',numarr,30);
                    addcookie('sidarr',sidarr,30);

                     }else{
                    //获取对应位置的值加

                    numarr[sidarr.indexOf(sidz)]=parseInt(numarr[sidarr.indexOf(sidz)])+parseInt(gnum)
                       
                       addcookie('numarr',numarr,30);
                     }

               }else{
                    let gnum=$('#count').html();
                    let sidz=$('.leftbox img').attr('sid');
                   numarr.push(gnum);
                   sidarr.push(sidz);
              
                //  将数组存入cookies
                addcookie('numarr',numarr,30);
                addcookie('sidarr',sidarr,30);
               }
            })


        }

        // 幕布function
        curtainShow(){
            // 幕布出现，滚动条禁止滚动
            this.$curtain.css('display', 'block');
            // $('body').css({'overflow':'-Scroll','overflow-y':'hidden'})
            let m = $(document).scrollTop()
            $(document).on('scroll', function () {
                $('html').scrollTop(m);
            })
        }
    }
    new shopPrompt().init()
    // 幕布点击继续购物返回对用的商品详情页
  
    $('#curtain .goOn').on('click',function(){
      
   //     $(this).attr('href','http://10.31.157.68/js1907/MY/preproject/src/html/details.html?sid='+(parseInt($('.leftbox  img').attr('sid'))))
         $(this).attr('href','http://localhost/js1907/MY/preproject/src/html/details.html?sid='+(parseInt($('.leftbox  img').attr('sid'))))
})
    // 数量的加加减减
    class numchange {
        constructor() {
            this.$reduce = $(".goodsnum .reduce");
            this.$add = $(".goodsnum .add");
            this.$number = $('#count');


        }
        init() {
            let _this = this
            this.num = null;
            this.$reduce.on('click', function () {

                _this.reduceclick();
            })
            this.$add.on('click', function () {

                _this.addclick();

            })

        }
        //--
        reduceclick() {
            this.num = this.$number.html()
            this.num--;
            if (this.num < 0) {
                this.num = 0;
            }

            this.$number.html(this.num)
        }
        // ++
        addclick() {
            this.num = this.$number.html()
            this.num++;
            if (this.num > 12) {
                this.num = 12;
            }
            this.$number.html(this.num)

        }
    }
    new numchange().init()
}(jQuery)
// 详情页数据的渲染
// 传对应的sid给后端，后端返回对应的数据

$(document).ready(function () {
    class detailsrendering {
        constructor() {
            this.sid = parseInt(location.search.substring(5));
            this.urlz = 'http://10.31.157.68/js1907/MY/preproject/';
            this.leftboximg = $('.leftbox  img');
            this.minmiboxul = $('.goodinfo .minibox');
            this.$bfimg = $('.bf img');
        }
        inint() {
            let _this = this;
            $.ajax({
                type: "post",
                url: this.urlz + "php/details.php",
                data: {
                    sid: this.sid
                },
                dataType: 'json',
                success: function (d) {
                  
                    _this.leftboximg.attr({'src':d.url});
                    _this.leftboximg.attr({'sid':d.sid});
                    _this.$bfimg .attr('src', d.url);
                    
                    // 渲染底部商品方位图
                    let urlarr = d.urls.split(',');
                    let strminibox = '';
                    $.each(urlarr, function (i, v) {
                        strminibox += `<li>
                             <img src=${v} sid=${d.sid} alt=''>
                          </li>`
                    });
                    _this.minmiboxul.html(strminibox);
                    $('.rightbox .title a').html(d.title);
                    $('.rightbox .title span').html(d.des);
                    $('.rightbox .price span').html(d.prices);
                }
            });
        }
    }
    new detailsrendering().inint()
    // 1.放大镜效果
    //   1.1当鼠标移动到图片上方显示小放和放，移开小放和大放消失
    let $leftbox = $('.goodinfo .leftbox');

    let $sf = $('.leftbox .sf');
    let $bf = $('.goodinfo .bf');
    let $bfimg = $('.bf img');
    let $sfimg = $('.leftbox img');



    $leftbox.hover(function () {
        $sf.show();
        $bf.show();
        // 1.2小放跟随鼠标移动
        $leftbox.on('mousemove', function (ev) {
            // 1.3求小放大镜的尺寸
            $sf.css({
                width: $bf.width() / $bfimg.width() * $sfimg.width(),
                height: $bf.height() / $bfimg.height() * $sfimg.height()
            })
            let t = ev.pageY - $leftbox.offset().top - $sf.height() / 2;
            let l = ev.pageX - $leftbox.offset().left - $sf.width() / 2;
            // 1.4求比例
            let bili = $bfimg.width() / $sfimg.width()
            if (l < 0) {
                l = 0
            } else if (l >= $leftbox.width() - $sf.width()) {
                l = $leftbox.width() - $sf.width()
            }
            if (t < 0) {
                t = 0
            } else if (t >= $leftbox.height() - $sf.height()) {
                t = $leftbox.height() - $sf.height()
            }
            // 小放移动的距离 
            $sf.css({
                left: l,
                top: t
            });
            //    大放移动的距离
            $bfimg.css({
                left: -l * bili,
                top: -t * bili
            })
        })
    }, function () {
        $sf.hide();
        $bf.hide();
    })

    // 2.点击对应的方位图方位图显示小放大镜的位置
    let $minmiboxul = $('.goodinfo .minibox');
    let $leftboximg = $('.leftbox img');
    $minmiboxul.on('click', 'li', function (ev) {
        let $minibox = $(this).find('img').attr('src');
        
        $leftboximg.attr('src', $minibox);
        // 同时将地址给大放
        $bfimg.attr('src', $minibox)
    })

    // 3.点击左右侧按钮移动图片，每次一个li的宽度
    let $prev = $(".goodinfo  .prev");
    let $next = $('.goodinfo .next');
    let num = 4;
    $prev.on("click", function () {
       
        if ( num>4) {
            num--;
            let $liwidth = $minmiboxul.find('li').outerWidth(true);
            $minmiboxul.animate({
                left: -$liwidth * (num-4)
            })
        }

    })
    $next.on("click", function () {
        if($minmiboxul.find('li').size()>num){
            num++;
          
            let $liwidth = $minmiboxul.find('li').outerWidth(true);
            console.log($liwidth)
            $minmiboxul.animate({
                left: -$liwidth *(num-4)
            })
        }
       
    })



});

