
$("#user-login").click(function(e){
    e.preventDefault();
    $("#dialog-login").dialog("open");
})
$("#dialog-login").dialog({
    autoOpen:false,
    show:{effect:"blind",duration:1000},
    hide:{effect:"explode",duration:1000},
    modal:true,
    button:{
        "登录"(){
            alert("登录成功");
            $("#dialog-login").dialog("close");
        },
        "取消"(){
            $("#dialog-login").dialog("close");
        }
    }
});

$("#user-zc").click(function(e){
    e.preventDefault();
    $("#dialog-zc").dialog("open");
})
$("#dialog-zc").dialog({
    autoOpen:false,
    show:{effect:"blind",duration:1000},
    hide:{effect:"explode",duration:1000},
    modal:true,
    button:{
        "登录"(){
            alert("登录成功");
            $("#dialog-zc").dialog("close");
        },
        "取消"(){
            $("#dialog-zc").dialog("close");
        }
    }
});
$("#dialog-zc").parent().children(0).addClass("login-zc");
//注册界面
(()=>{
    //检验用户名
    $(".zc-form>.zc-input:eq(0)").blur(function (e) { 
        e.preventDefault();
        var uname=$(".zc-form>.zc-input:eq(0)").val().toString();
        $.ajax({
            type: "get",
            url: `product/zcUname`,
            data:{uname:uname},
            success: function (response) {
                if(response.code==-1){
                    $(".zc-form>.zc-input:eq(0)").focus();
                    $(".warning-name").show();
                }else{
                    $(".warning-name").hide();
                }
            }
        });
    });
    //注册验证
    $(".zc-form>.zc-input:eq(3)").click(function (e){
        e.preventDefault();
        var uname=$(".zc-form>.zc-input:eq(0)").val();
        var password=$(".zc-form>.zc-input:eq(1)").val();
        var password1=$(".zc-form>.zc-input:eq(2)").val();
        if(uname.length<9&&uname.length>0){
            var reg=/^[\w]{6,}$/
            if(reg.test(password)){
                if(password1==password){
                    if($(":checkbox").prop("checked")){
                        $.ajax({
                            type:"post",
                            url:"product/zc",
                            data:{uname:uname,password:password},
                            success: function (response) {
                                $("#dialog-zc").parent().children(0).find("button").click();
                                if(response.code!=1){
                                    alert("很抱歉，注册失败");
                                }else{
                                    alert("注册成功");
                                }
                            }
                        });
                    }
                    else{
                        alert("请同意本站使用条款");
                    }
                }else{
                    $(".zc-form>.zc-input:eq(2)").focus();
                    alert("两次密码不同")
                }
            }else{
                $(".zc-form>.zc-input:eq(1)").focus();
                alert("请输入不少于6位的密码")
            }
        }else{
            $(".zc-form>.zc-input:eq(0)").focus();
            alert("请输入1到8位任意字符的用户名");
        }
    })
})();
//登录
(()=>{
    //检验用户名
    $(".dl-form>.zc-input:eq(0)").blur(function (e) { 
        e.preventDefault();
        var uname=$(".dl-form>.zc-input:eq(0)").val().toString();
        $.ajax({
            type: "get",
            url: `product/zcUname`,
            data:{uname:uname},
            success: function (response) {
                if(response.code==1){
                    $(".dl-form>.zc-input:eq(0)").focus();
                    $(".warning-name").show();
                }else{
                    $(".warning-name").hide();
                }
            }
        });
    });
    $("#user-login").on("click",function(){
         $(".dl-form>.zc-input:eq(0)").blur();
    })
    //登录
    $(".dl-form>.zc-input:eq(2)").click(function (e){
        e.preventDefault();
        var uname=$(".dl-form>.zc-input:eq(0)").val();
        var password=$(".dl-form>.zc-input:eq(1)").val();
        $.ajax({
            type:"post",
            url:"product/dl",
            data:{uname:uname,password:password},
            success: function (response) {
                if(response.code!=1){ 
                    alert("密码错误");
                }else{
                    alert("登录成功")
                    $("#dialog-login").parent().children(0).find("button").click();
                    var html=`
                        欢迎：${uname}
                    `
                    $("#user-sdl").html(html);
                }
            }
        });
    })
})();
