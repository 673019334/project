"use strict";var _createClass=function(){function n(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,i,e){return i&&n(t.prototype,i),e&&n(t,e),t}}();function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}!function(r){r(".header").load("../html/index.html  .header #home-top , .header #home-logo,.header #home-logo , .header #right-aside , .header #banner-top-nav"),r("#footer").load("../html/index.html #footer .part1,#footer .part2,#footer .part3");var a=[],s=[];function h(t,i,e){var n=new Date;n.setDate(n.getDate()+e),document.cookie=t+"="+encodeURIComponent(i)+";expires="+n}function c(t){var i=decodeURIComponent(document.cookie).split("; "),e=!0,n=!1,o=void 0;try{for(var r,a=i[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var s=r.value.split("=");if(t===s[0])return s[1]}}catch(t){n=!0,o=t}finally{try{!e&&a.return&&a.return()}finally{if(n)throw o}}}function t(){_classCallCheck(this,t),this.$gocarBtn=r(".rightbox .car .gocar"),this.$curtain=r("#curtain")}function i(){_classCallCheck(this,i),this.$reduce=r(".goodsnum .reduce"),this.$add=r(".goodsnum .add"),this.$number=r("#count")}(new(_createClass(t,[{key:"init",value:function(){var o=this;this.$gocarBtn.on("click",function(){if(o.curtainShow(),c("numarr")&&c("sidarr")){var t=r("#count").html(),i=r(".leftbox img").attr("sid");a=c("numarr").split(","),-1===(s=c("sidarr").split(",")).indexOf(i)?(a.push(t),s.push(i),h("numarr",a,30),h("sidarr",s,30)):(a[s.indexOf(i)]=parseInt(a[s.indexOf(i)])+parseInt(t),h("numarr",a,30))}else{var e=r("#count").html(),n=r(".leftbox img").attr("sid");a.push(e),s.push(n),h("numarr",a,30),h("sidarr",s,30)}})}},{key:"curtainShow",value:function(){this.$curtain.css("display","block");var t=r(document).scrollTop();r(document).on("scroll",function(){r("html").scrollTop(t)})}}]),t)).init(),r("#curtain .goOn").on("click",function(){r(this).attr("href","http://localhost/js1907/MY/preproject/src/html/details.html?sid="+parseInt(r(".leftbox  img").attr("sid")))}),(new(_createClass(i,[{key:"init",value:function(){var t=this;this.num=null,this.$reduce.on("click",function(){t.reduceclick()}),this.$add.on("click",function(){t.addclick()})}},{key:"reduceclick",value:function(){this.num=this.$number.html(),this.num--,this.num<0&&(this.num=0),this.$number.html(this.num)}},{key:"addclick",value:function(){this.num=this.$number.html(),this.num++,12<this.num&&(this.num=12),this.$number.html(this.num)}}]),i)).init()}(jQuery),$(document).ready(function(){function t(){_classCallCheck(this,t),this.sid=parseInt(location.search.substring(5)),this.urlz="http://10.31.157.68/js1907/MY/preproject/",this.leftboximg=$(".leftbox  img"),this.minmiboxul=$(".goodinfo .minibox"),this.$bfimg=$(".bf img")}(new(_createClass(t,[{key:"inint",value:function(){var i=this;$.ajax({type:"post",url:this.urlz+"php/details.php",data:{sid:this.sid},dataType:"json",success:function(e){i.leftboximg.attr({src:e.url}),i.leftboximg.attr({sid:e.sid}),i.$bfimg.attr("src",e.url);var t=e.urls.split(","),n="";$.each(t,function(t,i){n+="<li>\n                             <img src="+i+" sid="+e.sid+" alt=''>\n                          </li>"}),i.minmiboxul.html(n),$(".rightbox .title a").html(e.title),$(".rightbox .title span").html(e.des),$(".rightbox .price span").html(e.prices)}})}}]),t)).inint();var o=$(".goodinfo .leftbox"),r=$(".leftbox .sf"),a=$(".goodinfo .bf"),s=$(".bf img"),h=$(".leftbox img");o.hover(function(){r.show(),a.show(),o.on("mousemove",function(t){r.css({width:a.width()/s.width()*h.width(),height:a.height()/s.height()*h.height()});var i=t.pageY-o.offset().top-r.height()/2,e=t.pageX-o.offset().left-r.width()/2,n=s.width()/h.width();e<0?e=0:e>=o.width()-r.width()&&(e=o.width()-r.width()),i<0?i=0:i>=o.height()-r.height()&&(i=o.height()-r.height()),r.css({left:e,top:i}),s.css({left:-e*n,top:-i*n})})},function(){r.hide(),a.hide()});var i=$(".goodinfo .minibox"),e=$(".leftbox img");i.on("click","li",function(t){var i=$(this).find("img").attr("src");e.attr("src",i),s.attr("src",i)});var n=$(".goodinfo  .prev"),c=$(".goodinfo .next"),l=4;n.on("click",function(){if(4<l){l--;var t=i.find("li").outerWidth(!0);i.animate({left:-t*(l-4)})}}),c.on("click",function(){if(i.find("li").size()>l){l++;var t=i.find("li").outerWidth(!0);console.log(t),i.animate({left:-t*(l-4)})}})});