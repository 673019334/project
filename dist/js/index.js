"use strict";var _createClass=function(){function n(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,i,e){return i&&n(t.prototype,i),e&&n(t,e),t}}();function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}!function(t){function i(){_classCallCheck(this,i),this.sousuo=document.querySelector("#sousuo"),this.urlz="http://10.31.157.68/js1907/MY/preproject/",this.sousuotxtp=document.querySelector("#sousuotxt"),this.sousuotxt=document.querySelector("#sousuotxt ul")}(new(_createClass(i,[{key:"inint",value:function(){var t=this;this.sousuo.oninput=function(){""!==t.sousuo.value?t.sousuochange():t.sousuotxtp.style.display="none"}}},{key:"sousuochange",value:function(){var s=this;t.ajax({type:"get",url:this.urlz+"php/data.php",data:{keyword:this.sousuo.value},dataType:"json",success:function(t){var i=t.associateList;if(0!==i.length){var e="";for(var n in i)e+="<li>"+i[n].name+"</li>";s.sousuotxtp.style.display="block",s.sousuotxtp.innerHTML=e}else s.sousuotxtp.style.display="none"}})}}]),i)).inint()}(jQuery),function(i){function t(){_classCallCheck(this,t),this.prev=i("#banner .prev"),this.next=i("#banner .next"),this.dot=i("#banner .dot li"),this.piclist=i("#banner .piclist li"),this.banner=i("#banner"),this.num=null,this.timer=null}(new(_createClass(t,[{key:"inint",value:function(){this.dotchange(),this.rightchange(),this.leftchange(),this.Carouselstop()}},{key:"dotchange",value:function(){var t=this;this.dot.on("mousemove",function(){this.num=i(this).index(),t.piclist.eq(i(this).index()).fadeIn().siblings().fadeOut(),i(this).addClass("active").siblings().removeClass("active")})}},{key:"rightchange",value:function(){var t=this;this.next.on("click",function(){t.rightswitch()})}},{key:"rightswitch",value:function(){this.num++,this.num>this.piclist.size()-1&&(this.num=0),this.piclist.eq(this.num).fadeIn().siblings().fadeOut(),this.dot.eq(this.num).addClass("active").siblings().removeClass("active")}},{key:"leftchange",value:function(){var t=this;this.prev.on("click",function(){t.num--,t.num<0&&(t.num=t.piclist.size()-1),t.piclist.eq(t.num).fadeIn().siblings().fadeOut(),t.dot.eq(t.num).addClass("active").siblings().removeClass("active")})}},{key:"Carousel",value:function(){var t=this;this.timer=setInterval(function(){t.rightswitch()},2e3)}},{key:"Carouselstop",value:function(){var t=this;this.banner.hover(function(){clearInterval(this.timer)},function(){this.timer=setInterval(function(){t.rightswitch()},2e3)})}}]),t)).inint()}(jQuery),function(n){function t(){_classCallCheck(this,t),this.$floornavlist=n(".main .floor-nav div"),this.$floornav=n(".main .floor-nav"),this.$floor=n(".main>.louceng>div"),this.$hotsaletitle=n("#hotsale .title-nav")}(new(_createClass(t,[{key:"inint",value:function(){this.floornavshow(),this.floornavclick()}},{key:"floornavshow",value:function(){var e=this;n(window).on("scroll",function(){e.$top=n("html").scrollTop(),400<=e.$top?e.$floornav.show():e.$floornav.hide(),3595<=e.$top?e.$hotsaletitle.css({position:"fixed",top:0,zIndex:100,background:"white"}):e.$hotsaletitle.css({position:"inherit"}),e.$floor.each(function(t,i){if(e.loucengytop=n(i).offset().top,e.$top<e.loucengytop)return n(e.$floornavlist).eq(t).addClass("active").siblings().removeClass("active"),!1})})}},{key:"floornavclick",value:function(){var t=this;this.$floornavlist.not("#backtop").on("click",function(){n(this).addClass("active").siblings().removeClass("active"),t.$top=t.$floor.eq(n(this).index()).offset().top,n("html").animate({scrollTop:t.$top-5})}),n("#backtop").on("click",function(){n(this).addClass("active").siblings().removeClass("active"),n("html").animate({scrollTop:0})})}}]),t)).inint()}(jQuery),function(i){function t(){_classCallCheck(this,t),this.$titlelist=i("#hotsale .title-nav li"),this.$goodlist=i(".goods-list>div")}(new(_createClass(t,[{key:"init",value:function(){var t=this;this.$titlelist.on("click",function(){t.$goodlist.eq(i(this).index()).show().siblings().hide(),i(this).addClass("active").siblings().removeClass("active")})}}]),t)).init()}(jQuery),function(){function t(){_classCallCheck(this,t),this.welcome=document.querySelector("#welcome"),this.exit=document.querySelector("#eixt")}(new(_createClass(t,[{key:"inint",value:function(){var i=this,t=this.getcookie("customname");t&&(this.welcome.style.display="block",this.welcome.innerHTML=t+'&nbsp;&nbsp;欢迎登录，<a href="#">退出！</a>',this.exit.style.display="none"),this.welcome.onclick=function(t){t=t||window.event,i.exitBtnclick(t),i.delcookie("customname")}}},{key:"getcookie",value:function(t){var i=decodeURIComponent(document.cookie).split("; "),e=!0,n=!1,s=void 0;try{for(var o,l=i[Symbol.iterator]();!(e=(o=l.next()).done);e=!0){var a=o.value.split("=");if(t===a[0])return a[1]}}catch(t){n=!0,s=t}finally{try{!e&&l.return&&l.return()}finally{if(n)throw s}}}},{key:"exitBtnclick",value:function(t){"A"===(t.targnt||t.srcElement).nodeName&&(this.welcome.style.display="none",this.exit.style.display="block")}},{key:"addcookie",value:function(t,i,e){var n=new Date;n.setDate(n.getDate()+e),document.cookie=t+"="+encodeURIComponent(i)+";expires="+n}},{key:"delcookie",value:function(t){this.addcookie(t,"",-1)}}]),t)).inint()}(jQuery),$(document).ready(function(){function t(){_classCallCheck(this,t),this.urlz="http://10.31.157.68/js1907/MY/preproject/",this.goodsUl=$(".goods-list .p-hufu ul")}(new(_createClass(t,[{key:"inint",value:function(){var e=this,n="";$.ajax({type:"post",url:this.urlz+"php/index.php",dataType:"json",success:function(t){$.each(t,function(t,i){n+='\n            <li>\n            <a href="http://10.31.157.68/js1907/MY/preproject/src/html/details.html?sid='+i.sid+"\" target='blank'>\n                <div> \n                <img src="+i.url+' alt=""></div>\n            </a>\n            <p>'+i.title+"</p>\n            <span>"+i.des+"</span>\n            <em>￥"+i.prices+"</em>\n        </li>",$(e.goodsUl).html(n)})}})}}]),t)).inint()});