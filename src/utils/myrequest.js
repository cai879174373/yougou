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

export default request