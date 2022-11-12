// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options.url)
    options.url='http://www.liulongbin.top:3007'+options.url
    console.log(options.url)
    //统一为有权限的接口设置 headers请求头
    if(options.url.indexOf('/my/')!== -1){
        options.headers={ Authorization: localStorage.getItem("token") || ''} 
    }

    options.complete=function(res){
        //不论成功还是失败，都会执行 complete 回调函数
    
        // console.log(res)
        //可以使用 res.responseJSON 拿到服务器的响应数据
        if(res.responseJSON.status===1||res.responseJSON.message==='身份认证失败！'){
        localStorage.removeItem('token')
            location.href='/login.html'
        }
}
})
