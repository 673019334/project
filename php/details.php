<?php
require 'conn.php';
if(isset($_POST['sid'])){
    $sid=$_POST['sid'];
    $result=$conn->query("select * from goodsinfo where sid='$sid'");
    echo json_encode($result->fetch_assoc());
    
}




