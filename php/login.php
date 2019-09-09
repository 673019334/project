<?php
// 登录-----
// 连接数据库
require "conn.php";
// 接收前端传来的值在数据库比对用户名和密码是否一致
if(isset($_POST['username']) && isset($_POST['password'])){
    $user=$_POST['username'];
    $pass=sha1($_POST['password']);

    $result=$conn->query("select * from register where usename='$user' and password='$pass' ");

    if($result->fetch_assoc()){//匹配成功
        echo true;
    }else{
        echo false;
    }

}