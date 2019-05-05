<template>
  <div class="page">
    <!-- 收货地址 -->
    <div class="address">
      <!-- 没有选择地址的状态 -->
      <div v-if="address == null ? true : false" class="no-address" @click="chooseAddress">
        <div class="word">请选择收货地址</div>
        <div class="iright">
          <span class="iconfont iconright"></span>
        </div>
      </div>
      <!-- 选择地址后的状态 -->
      <div v-else class="yes-address">
        <div class="uname">
          <div class="name">
             收件人： {{ address.userName }}
          </div>
          <div class="phone">
             {{ address.telNumber }}<span class="iconfont iconright"></span>
          </div>
        </div>
        <div class="uadress">
         {{detailress}}
        </div>
      </div>
      <img class="img" src="../../../static/images/cart_border@2x(1).png" alt="">
    </div>

     <!-- goodsList -->
    <div class="goodsList">
      <div class="title">
        <span class="iconfont iconGroup-"></span>优购生活馆</div>
      <div class="item" v-for="(value, key) in goodsList" :key="key">
        <div class="check">
          <icon type="success" @click="isSeleted(value) " size="20" :color="value.seleted?'red':'gray'"></icon>
        </div>
        <div class="goods">
          <div class="left">
            <image mode="aspectFill" :src="value.goods_small_logo"></image>
          </div>
          <div class="right">
            <div class="mess">
              {{value.goods_name}}
            </div>
            <div class="pricenum">
              <div class="price">￥{{value.goods_price}}</div>
              <div class="num">
                <span @click="sub(value)">-</span>
                <span class="index">{{value.num}}</span>
                <span @click="add(value)">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="check">
        <icon type="success" size="20" :color="seletedAll?'red':'gray'" @click="seleAll"></icon>
      </div>
      <div class="word">全选</div>
      <div class="totalp">
        <div class="top">
          合计：<span>￥{{totalPrice}}</span>
        </div>
        <div class="mes">
          包含运费
        </div>
      </div>
      <div class="pay">
        <button @click="jiesuan">结算({{totalCount}})</button>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      address: null,
      goodsList:{}
    }
  },
  methods: {
    chooseAddress(){
      wx.chooseAddress({
        success:res=>{
          this.address={
            ...res
          }
          // console.log( this.address);
          // 把收货地址存到setStorge中
          try {
            wx.setStorageSync('address',this.address)
          } catch (error) {
            console.log(error);
          }
        }
      })
    },

    // 选中按钮
    isSeleted(value){
      value.seleted=! value.seleted;
      try {
         wx.setStorageSync('goods',this.goodsList);
      } catch (error) {
        console.log(error);
      }
     
    },
    //减少商品数量
    sub(value){
      value.num--;
      if( value.num==0){
        wx.showModal({
        title: '警告!!!',
        content: '是否删除商品',
        success:res=> {
        if (res.confirm) {
        delete this.goodsList[value.goods_id];
        wx.setStorageSync('goods',this.goodsList);
        this.goodsList={...this.goodsList}
        } else if (res.cancel) {
          value.num=1;
          wx.setStorageSync('goods',this.goodsList)
    }
  }
})
      }
    },

    // 添加商品数量
    add(value){
       value.num++;
       try {
          wx.setStorageSync('goods',this.goodsList);
       } catch (error) {
         console.log(error);
       }
    },
    // 全选按钮
    seleAll(){
      var selet=!this.seletedAll;
       Object.keys(this.goodsList).forEach(v=>{
      this.goodsList[v].seleted=selet
      })

    },
    setobj(){
        var orderObj = {
      }
      // 设置订单对象的总价
      orderObj.order_price = this.totalPrice
      // 设置订单对象的地址
      orderObj.consignee_addr = this.detailAddree
      // 设置订单对象的详情
      var orderList = []
      // 设置订单对象的 goods属性
      var goods = []
      Object.keys(this.goodsList).forEach(v => {
        var obj = this.goodsList[v]
        // 判断是否选中
        if (obj.selected) {
          // 创建 order_detail
          var orderItem = {}
          orderItem.goods_id = obj.goods_id
          orderItem.goods_name = obj.goods_name
          orderItem.goods_price = obj.goods_price
          orderItem.goods_small_logo = obj.goods_small_logo
          orderItem.counts = obj.num
          orderItem.selectStatus = obj.selected
          orderList.push(orderItem)
          // 创建 goods
          var goodsObj = {}
          goodsObj.goods_id = obj.goods_id
          goodsObj.goods_number = obj.goods_number
          goodsObj.goods_price = obj.goods_price
          goods.push(goodsObj)
        }
      })
      orderObj.order_detail = JSON.stringify(orderList)
      orderObj.goods = goods
      // console.log(orderObj)
    },
    // 结算按钮
   async jiesuan(){
     var url = 'https://itjustfun.cn/api/public/v1/my/orders/create'
      var orderObj = this.setobj()
      // 验证用户是否登录：登录的令牌会放到 straoge 中
      var token = wx.getStorageSync('token')
      // 判断
      if (!token) {
        wx.showToast({
          title: '您还没有登录，马上进入登录页面',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function() {
          // 跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }, 1000)
        return
      }
      // 将参数提交到服务器
      var res = await request.auth(url, orderObj, {
        Authorization: wx.getStorageSync('token')
      })
      // 将订单编号保存起来
      var number = res.data.data.order_number
      // 保存到 storage 中
      wx.setStorageSync('number', number)
      // 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/main'
      })
   }
  },
  computed: {
    // 详细地址信息
    detailress:function () {
      if(this.address){
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo;
      }else{
        return ''
      }
    },
    // 总金额
    totalPrice:function(){
  // 定义一个和
      var sum = 0
      // 遍历一个对象
      Object.keys(this.goodsList).forEach(v=> {
        //判断选中状态的总金额
        if( this.goodsList[v].seleted){
          sum += this.goodsList[v].goods_price*this.goodsList[v].num
        }
       
      })
      return sum
    
    },
    seletedAll:function(){
      var bool=true;
      Object.keys(this.goodsList).forEach(v=>{
        if(!this.goodsList[v].seleted){
          bool=false;
          return;
        }
      })
      return bool;
    },
    totalCount: function() {
      var index = 0;
      Object.keys(this.goodsList).forEach(v => {
        if (this.goodsList[v].seleted) {
          index++
        }
      })
      return index
    },
  },
  onShow() {
    // 动态获取收货地址/
    try {
       this.address=wx.getStorageSync('address')||null;
       this.goodsList=wx.getStorageSync('goods')||{};
       console.log( this.goodsList);
    } catch (error) {
      console.log(error);
    }
   
  },
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
