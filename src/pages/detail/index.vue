<template>
  <div>
    <swiper class="lunbo" indicator-dots autoplay circular>
      <block v-for="(item,index) in detailObj.pics " :key="index">
        <swiper-item>
          <image :src="item.pics_big" class="slide-image" mode="aspcetFill"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="box">
      <div class="price">￥{{detailObj.goods_price}}</div>
      <div class="mess">
        <div class="word">{{detailObj.goods_name}}</div>
        <div class="shoucang">
          <span class="iconfont iconshoucang"></span>
          <button open-type="share">分享</button>
        </div>
      </div>
      <div class="pass">快递：免运费</div>
    </div>
    <!-- !-- 图文介绍 -->
    <div class="jieshao">
      <div class="title">图文介绍</div>
      <div class="msg" v-html="detailObj.goods_introduce"></div>
    </div>
    <!-- bottomtab -->
    <div class="bottom">
      <div class="callme">
        <span class="iconfont icontongyong-lianxikefutubiao"></span>
        <button open-type="contact">联系客服</button>
      </div>
      <div  class="cart">
        <span class="iconfont icongouwuche"></span>
        <span @click="toCart">购物车</span>
      </div>
      <div class="incart" @click="addcart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
// 导入request
import request from "../../utils/myrequest.js";
export default {
  data() {
    return {
      detailObj: {},
      goods_id: "",
      goodslist: {}
    };
  },
  async mounted() {
    this.goods_id = this.$root.$mp.query.id;
    // console.log(this.goods_id);

    var url = "https://itjustfun.cn/api/public/v1/goods/detail";
    var res = await request(url, "get", {
      goods_id: this.goods_id
    });
    console.log(res);
    this.detailObj = res.data.message;
    console.log(this.detailObj);
 
  },
  methods: {
    addcart(){
  
  //  购物车按钮选中状态
   this.detailObj.seleted=true;
   //购物车商品数量
   this.detailObj.num=1;
   
    this.goodslist[this.detailObj.goods_id] = this.detailObj;
    // 设置到setStorageSync本地存储里面
    try {
      wx.setStorageSync("goods", this.goodslist);
      wx.showToast({
        title: "添加购物车成功",
        icon: "success",
        duration: 2000
      });
    } catch (error) {
      console.log(error);
    }
    },
    toCart(){
      wx.switchTab({
        url:'/pages/cart/main'
      })
    }
  },
  onShareAppMessage(res) {
    // console.log(res);
    return {
      title: "点进去看看!",
      path: "/pages/detail/main?goods_id=" + this.goods_id,
      imageUrl:
        "https://img.alicdn.com/bao/uploaded/i4/TB1w3nOPFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_100x100q90.jpg_.webp"
    };
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
