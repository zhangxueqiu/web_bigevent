$(function(){
    getUserInfo()
    var layer = layui.layer
    $('#logOut').on('click',function(){
        layer.confirm('是否确认退出登录?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        data:{},
        // headers:{
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        //不论成功还是失败，都会执行 complete 回调函数
        // complete:function(res){
        //     // console.log(res)
        //     //可以使用 res.responseJSON 拿到服务器的响应数据
        //     if(res.responseJSON.status===1||res.responseJSON.message==='身份认证失败！'){
        //        localStorage.removeItem('token')
        //         location.href='/login.html'
        //     }
        // }
        
    })

}

function renderAvatar(user){
    //欢迎语处理
    var name = user.nickname||user.username
    $('.welcome').html(`欢迎&nbsp;&nbsp;`+name).show()
    //头像渲染
    if(user.user_pic!==null){
        //图片头像
        $('.layui-nav-img').attr('src',user.user_pic)
        $('text-avatra').hide()
    }else{
        //文本头像
        $('.text-avatra').html(name[0].toUpperCase())
        $('.layui-nav-img').hide()
    }
}