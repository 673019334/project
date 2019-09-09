! function ($) {
    class loginyz {
        constructor() {

            this.ainput = document.querySelectorAll('input');
            this.btn = document.querySelector('.form .btn');
            this.tip = document.querySelector('.form #tips');
            this.urlz = 'http://10.31.157.68/js1907/MY/preproject/';
           
        }
        inint() {
            let _this = this;
            // 获取用户写的用户名以及密码传给后端
            this.btn.onclick = function () {
                _this.btnclick();
            }

        }
        btnclick() {
         
            let _this = this;
            $.ajax({
                type: "post",
                url: this.urlz + "php/login.php",
                data: {
                    username: _this.ainput[0].value,
                    password: _this.ainput[1].value,
                },
                success: function (d) {
                    if(!d){
                        alert('用户名和密码错误');
                    }else{
                        location.href= _this.urlz+'src/html';
                        //判断免登录状态是否选中，选中添加数据至cookies
                        if(_this.ainput[2].checked){
                            _this.addcookie('customname', _this.ainput[0].value, 30)
                        }
                       
                      
                    }
                }
            })
        }
        // 添加cookie
      addcookie(key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        }
     
        
    }
        new loginyz().inint()
    }(jQuery)