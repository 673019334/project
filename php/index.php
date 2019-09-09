<?php
header('content-type:text/html;charset=utf-8');//设置字符编码
require "conn.php";

$result=$conn->query("select * from goodsinfo");//获取的记录集。

// echo $result->num_rows;//2  记录集的条数 
// print_r($result->fetch_assoc());  //$result->fetch_assoc():获取记录集里面的数据。返回值是数组，每次执行都会按照顺序获取一条记录。
// print_r($result->fetch_assoc());  
// print_r($result->fetch_assoc());  

$arrdata=array();
for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();//将数组给$arrdata的每一项
}

echo json_encode($arrdata);//以json形式输出二维数组