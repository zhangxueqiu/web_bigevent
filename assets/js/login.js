$(function(){
    $('#reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd:function(value){
           var pwd= $('#reg-form [name=password]').val()
           console.log(pwd)
           console.log(value)
           if(value != pwd){
            return '两次密码输入不一致！'
           }
        }
    })
    //提交注册表单
    $('#reg-form').on('submit',function(e){
        e.preventDefault()
        var data = {username:$('#reg-form [name=username]').val(),password:$('#reg-form [name=password]').val()}
        $.post('/api/reguser'
        ,data
        ,function(res){
            if(res.status!=0){
                return  layer.msg(res.message);
            }
            console.log('注册成功！') 
            layer.msg('注册成功！');

            $('#login').click()
        })
    })
    //提交登录
    $('#login-form').submit('click',function(e){
        e.preventDefault()
        $.ajax({
            url:"/api/login",
            type:"post",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href="/index.html"
            }
        })
      
    })
})