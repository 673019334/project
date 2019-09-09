<?php
header('content-type:text/html;charset=utf-8');//设置字符编码
header('Access-Control-Allow-Origin:*');//允许任意域名进行跨域(*)
header('Access-Control-Allow-Method:POST,GET');//允许跨域请求的方式

//判断前端是否有传值进来
if(isset($_GET['keyword'])){
    $keyword=$_GET['keyword'];
    $inputdata=file_get_contents("http://searchinterface.mianshui365.com/search/goods/associate?shopId=1000&platformId=0&keyword='$keyword'&available=1");
    echo $inputdata;
}



