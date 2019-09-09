<?php
// 注册
// 连接数据库
require "conn.php";

 //检测用户名
if(isset($_POST['username'])){
    $checkname=$_POST['username'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from register where usename='$checkname'");
    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        //接收前端传入的用户信息的值，写入数据库
        $name=$_POST['username'];
        $pass=sha1($_POST['password']);//加密
        $tel=$_POST['tel'];
        //添加数据库
        $conn->query("insert register values(null,'$name','$pass','$tel',NOW())");
    
        //php的跳转
       // header('location:http://localhost/js1907/Day%2023/loginregister/src/login.html');
       echo false;//空隙
    }
 
}



