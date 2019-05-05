var request= function (url,method='get',data={},header={}) {
    return new Promise((resolve,reject)=>{
         // 打开加载动画
        wx.showLoading({
            title: "加载中"
          });
        wx.request({
            url:url,
            method:method,
            data:data,
            header:header,
            success:function(res){
                // 关闭加载动画
                wx.hideLoading();
                resolve(res)
            },
            fail:function(res){
                reject(res)
            }
        })
    })
   
}
// 扩展一个 post 方法
request.post = function(url, data) {
    return request(url, "post", data, {})
}

// 扩展一个方法：用来添加请求头
request.auth = function(url, data, header) {
    return request(url, 'post', data, header)
}

export default request