<template>
  <div>
   <!-- 搜索框 -->
<tophead></tophead>

    <!-- 轮播图区域 -->
    <div class="slider">
      <swiper indicator-dots autoplay circular>
        <block v-for="(item,index) in imglist" :key="index">
          <swiper-item>
            <image  :src="item.image_src"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 分类区域 -->
    <div class="cate">
      <ul>
        <li v-for="(item,index) in cateitem" :key="index">
          <a href="/pages/category/main">
            <image mode="aspectFit"  :src="item.image_src"></image>
          </a>
        </li>
      
      </ul>    
      </div>

    <!-- 主体区域 -->

    <div class="main" v-for="(item,index) in floorlist" :key="index">
      <div class="title">
      
        <image  mode="aspectFit" :src="item.floor_title.image_src" ></image>
      </div>
      <div class="list">
        <div class="left">
          <image mode="aspectFill" :src="item.product_list[0].image_src"  > </image>
        </div>
        <div class="right">
          <!-- <image v-if="subindex != 0"   v-for="(subitem,subindex) in item.product_list"  :src="subitem.image_src" :key="subindex"></image> -->
          <image  :src="item.product_list[1].image_src"></image>
          <image  :src="item.product_list[2].image_src"></image>
          <image  :src="item.product_list[3].image_src"></image>
          <image  :src="item.product_list[4].image_src"></image>
        </div>
      </div>
    </div>
    <!-- <div class="main">
      <div class="title">
      
        <image  mode="aspectFit" src="https://img.alicdn.com/simba/img/TB1uKsrLPDpK1RjSZFrSuu78VXa.jpg" />
      </div>
      <div class="list">
        <div class="left">
          <image src="https://img.alicdn.com/tps/i4/TB1TiGwKXXXXXXRXFXXqVMCNVXX-400-400.jpg_180x180q90.jpg_.webp"  > </image>
        </div>
        <div class="right">
          <image src="https://img.alicdn.com/bao/uploaded/i4/TB1w3nOPFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_100x100q90.jpg_.webp"></image>
          <image src="https://img.alicdn.com/bao/uploaded/i4/TB1w3nOPFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_100x100q90.jpg_.webp"></image>
          <image src="https://img.alicdn.com/bao/uploaded/i4/TB1w3nOPFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_100x100q90.jpg_.webp"></image>
          <image src="https://img.alicdn.com/bao/uploaded/i4/TB1w3nOPFXXXXXCaXXXXXXXXXXX_!!0-item_pic.jpg_100x100q90.jpg_.webp"></image>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
// 导入请求组件
import request from "../../utils/myrequest.js";
// 导入头部组件
import tophead from '../../components/tophead.vue'
export default {
  components:{
tophead
  },
  data() {
    return {
      imglist: [],
      floorlist:[],
      cateitem:[]
    };
  },
  async mounted() {
    var url = "https://itjustfun.cn/api/public/v1/home/swiperdata";
    let res = await request(url);
    // console.log(res);
    this.imglist = res.data.data;
    // console.log(this.imglist);
    // 获取楼层数据
    var urlfloor="https://itjustfun.cn/api/public/v1/home/floordata"
    let resfloor = await request(urlfloor);
    console.log(resfloor);
    this.floorlist=resfloor.data.data;
    console.log(this.floorlist);
    var urlcate="https://itjustfun.cn/api/public/v1/home/catitems"
    let rescate = await request(urlcate);
    // console.log(rescate);
    this.cateitem=rescate.data.data;
    // console.log(this.cateitem);
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>


