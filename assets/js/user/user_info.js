var form = layui.form
var layer = layui.layer
$(function(){

    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度1~6个字符'
            }
        }
    })

    initUserInfo()

    //重置
    $('#btnRest').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    //更新数据 监听表单
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('用户信息更新失败！')
                }

                layer.msg('用户信息更新成功！')

                window.parent.getUserInfo()


            }
        })
    })

})
//初始化用户基本信息
function initUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !== 0){
                return layer.msg('获取用户信息失败')
            }
            console.log(res)
            form.val('fromUserInfo',res.data) 
        }

    })


}
