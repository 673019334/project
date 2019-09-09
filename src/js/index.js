// 搜素框
(function ($) {
  class sousuo {
    constructor() {
      this.sousuo = document.querySelector('#sousuo');
      this.urlz = 'http://10.31.157.68/js1907/MY/preproject/';
      this.sousuotxtp = document.querySelector('#sousuotxt');
      this.sousuotxt = document.querySelector('#sousuotxt ul');

    }
    //输入框文本改变获取数据传给后端，获取后端传来的接口
    inint() {
      let _this = this
      this.sousuo.oninput = function () {
        if(_this.sousuo.value!==''){  _this.sousuochange();}else{
          _this.sousuotxtp.style.display = 'none';
        }
      

      }

    }
    // 搜索框内容函数
    sousuochange() {
      let _this = this;
     
        $.ajax({
          type: "get",
          url: this.urlz + "php/data.php",
          data: {
            keyword: this.sousuo.value
          },
          dataType: "json",
          success: function (d) {
            // 获取后端传来的接口进行页面渲染
           
            let data = d.associateList;
           if(data.length!==0){
                  let str = '';
                  for (let i in data) {
                    str += `<li>${data[i].name}</li>`
                  }
                  // if(i>=6){
        
                  //   _this.sousuotxtp.style.display='block';
                  //   _this.ali=document.createElement('li');
                  //   _this.ali.innerHTML=data[i].name;
                  //   _this.sousuotxt.appendChild(_this.ali)
        
                  // }else{
                  //   _this.sousuotxtp.style.display='block';
                  //   _this.ali=document.createElement('li');
                  //   _this.ali.innerHTML=data[i].name;
                  //   _this.sousuotxt.appendChild(_this.ali)
                  // }
        
                  _this.sousuotxtp.style.display = 'block';
                  _this.sousuotxtp.innerHTML = str;
         
           }else{
            _this.sousuotxtp.style.display = 'none';
           }
          
          }

        });
      
    
    }


  }
  new sousuo().inint()
})(jQuery)
//轮播图
! function ($) {
  //轮播图
  class bannerswitch {
    constructor() {
      this.prev = $('#banner .prev'); //上一页
      this.next = $('#banner .next'); //下一页
      this.dot = $('#banner .dot li'); //小圆点
      this.piclist = $('#banner .piclist li'); //图片
      this.banner = $('#banner')
      this.num = null;
      this.timer = null;

    }
    inint() {
      this.dotchange();
      this.rightchange();
      this.leftchange();
      this.Carouselstop();
      // this.Carousel();
    }
    //小圆点点击更换对应的图片
    dotchange() {
      let _this = this;
      this.dot.on('mousemove', function () {
        this.num = $(this).index();
        // 显示对应的图片
        _this.piclist.eq($(this).index()).fadeIn().siblings().fadeOut()
        //点击的添加类
        $(this).addClass('active').siblings().removeClass('active');
      })
    }
    //右键添加点击事件
    rightchange() {
      let _this = this;
      this.next.on('click', function () {
        _this.rightswitch()
      })
    }
    rightswitch() {
      this.num++;
      if (this.num > this.piclist.size() - 1) {
        this.num = 0;
      }
      this.piclist.eq(this.num).fadeIn().siblings().fadeOut()
      //点击的添加类
      this.dot.eq(this.num).addClass('active').siblings().removeClass('active');
    }
    //左键添加点击事件
    leftchange() {
      let _this = this;
      this.prev.on('click', function () {

        _this.num--;

        if (_this.num < 0) {
          _this.num = _this.piclist.size() - 1

        }
        _this.piclist.eq(_this.num).fadeIn().siblings().fadeOut()
        //点击的添加类
        _this.dot.eq(_this.num).addClass('active').siblings().removeClass('active');
      })
    }
    // 自动轮播
    Carousel() {
      let _this = this;
      this.timer = setInterval(function () {
        _this.rightswitch()
      }, 2000)
    }
    //鼠标移到banner图上面停止自动播放，移开开始自动播放
    Carouselstop() {
      let _this = this;
      this.banner.hover(
        function () {
          clearInterval(this.timer)
        },
        function () {
          this.timer = setInterval(function () {
            _this.rightswitch()
          }, 2000);
        })
    }

  }
  new bannerswitch().inint()
}(jQuery)
// 楼梯效果
! function ($) {
  class flooreffect {
    constructor() {
      this.$floornavlist = $('.main .floor-nav div'); //楼梯导航子元素
      this.$floornav = $('.main .floor-nav');
      this.$floor = $('.main>.louceng>div'); //楼层
      this.$hotsaletitle = $('#hotsale .title-nav')

    }
    inint() {
      this.floornavshow();
      this.floornavclick();
    }
    // 楼梯显示隐藏
    floornavshow() {
      let _this = this;

      $(window).on('scroll', function () {
        _this.$top = $('html').scrollTop();
        if (_this.$top >= 400) {
          _this.$floornav.show();
        } else {
          _this.$floornav.hide();
        }
        //当滚轮滚动到免税热卖的位置后，免税热卖的标题栏固定定位
        if (_this.$top >= 3595) {
          _this.$hotsaletitle.css({
            position: 'fixed',
            top: 0,
            zIndex: 100,
            background: 'white'
          })
        } else {
          _this.$hotsaletitle.css({
            position: 'inherit'
          })
        }
        //滚轮移动，楼层跟随移动到对应的位置
        _this.$floor.each(function (index, element) {
          _this.loucengytop = $(element).offset().top
          if (_this.$top < _this.loucengytop) {
            $(_this.$floornavlist).eq(index).addClass('active').siblings().removeClass('active');
            return false;
          }
        })
      })

    }
    //点击楼梯对应位置，跳转至楼梯对应位置
    floornavclick() {
      let _this = this;
      this.$floornavlist.not('#backtop').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        _this.$top = _this.$floor.eq($(this).index()).offset().top;
        $('html').animate({
          scrollTop: _this.$top - 5
        });
      })

      //点击回到顶部，回到顶部位置
      $('#backtop').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('html').animate({
          scrollTop: 0
        })
      })
    }

  }
  new flooreffect().inint()
}(jQuery)
// tab切换
! function ($) {
  class tabswitch {
    constructor() {
      this.$titlelist = $('#hotsale .title-nav li');
      this.$goodlist = $('.goods-list>div');
    }
    init() {
      //点击时切换到不同的模块
      let _this = this
      this.$titlelist.on('click', function () {
        _this.$goodlist.eq($(this).index()).show().siblings().hide()
        $(this).addClass('active').siblings().removeClass('active')
      })
    }
  }


  new tabswitch().init()
}(jQuery)

// 获取cookies渲染登录/注册
! function ($) {
  class welcome {
    constructor() {
      this.welcome = document.querySelector('#welcome');
      this.exit = document.querySelector('#eixt');
      // 渲染出的元素找不到
      // this.exitBtn = document.querySelector('#welcome a');
      // console.log(this.exitBtn)

    }
    inint() {
      let _this = this
      let cookie = this.getcookie('customname')
      //如果存在cookie取出来进行渲染；
      if (cookie) {
        this.welcome.style.display = 'block';
        this.welcome.innerHTML = cookie + '&nbsp;&nbsp;欢迎登录，<a href="#">退出！</a>';
        this.exit.style.display = 'none';
      }
      // 当点击退出按钮返回至初始状态
      this.welcome.onclick = function (ev) {
        var ev = ev || window.event
        _this.exitBtnclick(ev)
        _this.delcookie('customname')
      }
    }
    // 获取cookie
    getcookie(key) {
      let arr = decodeURIComponent(document.cookie).split('; ');
      for (let value of arr) {
        let newarr = value.split('=');
        if (key === newarr[0]) {
          return newarr[1];
        }
      }
    }
    // 退出按钮的子函数
    exitBtnclick(ev) {
      let element = ev.targnt || ev.srcElement
      if (element.nodeName === 'A') {
        this.welcome.style.display = 'none';
        this.exit.style.display = 'block';
      }
    }
    // 添加cookie
    addcookie(key, value, day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
    }

    // 删除cookies

    delcookie(key) {
      this.addcookie(key, '', -1);
    
    }
  }
  new welcome().inint()

}(jQuery)

$(document).ready(function () {
  // 请求数据---页面渲染
  class goodsRendering {
    constructor() {
      this.urlz = 'http://10.31.157.68/js1907/MY/preproject/';
      this.goodsUl=$(".goods-list .p-hufu ul");
    }

    inint() {
      let _this = this
      let strhtml = ''
      
      $.ajax({
        type: "post",
        url: this.urlz + "php/index.php",
        dataType: 'json',
        success: function (d) {
         
          $.each(d, function (i, v) {
           
            strhtml += `
            <li>
            <a href="http://10.31.157.68/js1907/MY/preproject/src/html/details.html?sid=${v.sid}" target='blank'>
                <div> 
                <img src=${v.url} alt=""></div>
            </a>
            <p>${v.title}</p>
            <span>${v.des}</span>
            <em>￥${v.prices}</em>
        </li>`
            $(_this.goodsUl).html(strhtml)
          })

        }
      });
    }

  }
  new goodsRendering().inint()

});