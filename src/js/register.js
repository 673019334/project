! function ($) {
    //前面引入到的位置，后面要引入内容的地址 要引入的标签
    $('.top').load('../html/login.html  .top');
    $('.bottom').load('../html/login.html  .bottom')

    // 登录注册的表单验证
    class FormValidation {
        constructor() {

            this.ainput = document.querySelectorAll('input');
            this.tips = document.querySelector('#tips');
            this.regBtn = document.querySelector('.form .btn');
            this.usernameflag = true;
            this.passwordflag = true;
            this.repasswordflag = true;
            this.telflag = true;
            this.UserProtocolflag = true;
            this.urlz = 'http://10.31.157.68/js1907/MY/preproject/'
        }
        //点击提交按钮时进行判断，内容为空，有误组织提交，进行报错
        inint() {
            let _this = this
            //用户名验证
            this.ainput[0].onblur = function () {
                _this.username();
            }
            //密码验证
            this.ainput[1].onblur = function () {
                _this.password();
            }
            // 密码重复验证
            this.ainput[2].onblur = function () {
                _this.repassword();
            }
            // 手机号码验证
            this.ainput[3].onblur = function () {
                _this.tel();
            }
            this.regBtn.onclick = function () {
                _this.btnclick();
            }

            // this.UserProtocol()
        }
        // 用户协议验证
        // UserProtocol() {
        //    console.log( this.ainput[5].checked)
        // }

        //用户名正则验证
        username() {
            if (this.ainput[0].value !== '') {
                let usernamereg = /[\w|\u4e00-\u9fa5]{4,20}/g;
                if (usernamereg.test(this.ainput[0].value) === false) {

                    this.tips.innerHTML = '！请输入4-20位用户名';
                    this.tips.style.display = 'block'
                    this.usernameflag = false;
                } else {
                    this.tips.style.display = 'none';
                    this.usernameflag = true;
                }
            } else {
                this.tips.innerHTML = '！用户名不能为空';
                this.tips.style.display = 'block';
                this.usernameflag = false;
            }
        }
        //密码验证---包含密码强度验证
        password() {
            if (this.ainput[1].value !== '') {
                let passwordreg = /[a-z|A-Z|\W\_]{6,16}/g
                let num = 0;
                let numreg = /\d+/;
                let uppercase = /[A-Z]+/;
                let lowercase = /[a-z]+/;
                let othercase = /[\W\_]+/;
                if (numreg.test(this.ainput[1].value)) {
                    num++;
                }
                if (uppercase.test(this.ainput[1].value)) {
                    num++;
                }
                if (lowercase.test(this.ainput[1].value)) {
                    num++;
                }
                if (othercase.test(this.ainput[1].value)) {
                    num++;
                }
                if (this.ainput[1].value.length >= 6 && this.ainput[1].value.length <= 16) {
                    if (num > 1) {
                        this.tips.style.display = 'none';
                        this.ainput[2].value = '';
                        this.passwordflge = true;
                    } else {
                        this.tips.innerHTML = '！密码等级不够，请重新输入';
                        this.tips.style.display = 'block';
                        this.passwordflge = false;
                    }
                } else {
                    this.tips.innerHTML = '！密码长度不够，请重新输入';
                    this.tips.style.display = 'block';
                    this.passwordflge = false;
                }
            } else {
                this.tips.innerHTML = '！密码不可为空';
                this.tips.style.display = 'block';
                this.passwordflge = false;
            }
        }
        //密码重复验证---不为空与密码进行比对
        repassword() {
            if (this.ainput[2].value !== '') {
                if (this.ainput[2].value === this.ainput[1].value) {
                    this.tips.style.display = 'none';
                    this.repasswordflag = true;
                } else {
                    this.tips.innerHTML = '！两次密码输入不一致，请重新输入';
                    this.tips.style.display = 'block';
                    this.repasswordflag = false;
                }
            } else {
                this.tips.innerHTML = '！密码重复不能为空';
                this.tips.style.display = 'block';
                this.repasswordflag = false;
            }
        }
        //手机号码验证
        tel() {
            if (this.ainput[3].value !== '') {
                let telreg = /^1\d{10}$/;
                if (telreg.test(this.ainput[3].value)) {
                    this.tips.style.display = 'none';
                    this.telflag = true;
                } else {
                    this.tips.innerHTML = '！手机号码有误，请重新输入';
                    this.tips.style.display = 'block';
                    this.telflag = false;
                }
            } else {
                this.tips.innerHTML = '！手机号码不能为空';
                this.tips.style.display = 'block';
                this.telflag = false;
            }
        }


        //1.点击注册进行验证是否有空，有空的时候不允许提交,报错
        //2.当点击按钮的时候提交数据给后端
        btnclick() {
            if (this.ainput[0].value === '') {
                this.tips.innerHTML = '！用户名不能为空';
                this.tips.style.display = 'block';
                this.usernameflag = false;
            } else if (this.ainput[1].value === '') {
                this.tips.innerHTML = '！密码不能为空';
                this.tips.style.display = 'block';
                this.passwordflag = false;
            } else if (this.ainput[2].value === '') {
                this.tips.innerHTML = '！密码重复不能为空';
                this.tips.style.display = 'block';
                this.repasswordflag = false;
            } else if (this.ainput[3].value === '') {
                this.tips.innerHTML = '！手机号码不能为空';
                this.tips.style.display = 'block';
                this.telflag = false;
            }
            if (!this.usernameflag || !this.passwordflag || !this.repasswordflag || !this.telflag) {
                return false
            }
            let _this = this
            $.ajax({
                type: "post",
                url: this.urlz + 'php/register.php',
                data: {
                    username: this.ainput[0].value,
                    password: this.ainput[1].value,
                    tel: this.ainput[3].value
                },

                success: function (d) {
                    // d的结果为1则说明该用户已经存在，提示用户用户名已存在
                    if (!d) {
                        _this.tips.style.display = 'none';
                        alert('注册成功，请登录')

                    } else {
                        _this.tips.innerHTML = '！用户名已经存在';
                        _this.tips.style.display = 'block';
                        _this.usernameflag = false;
                    }

                }
            });
        }


    }
    new FormValidation().inint()

}(jQuery)