<template>
  <div>
    <div class="mytop" :style="{position:isscroll}">
      <!-- 头部搜索 -->
      <div class="search">
      <div class="search-input">
        <input v-model="query" class="_input" type="text">
        <div class="word">
          <icon type="search" size="20"></icon>
        </div>
      </div>
    </div>
    <div class="tab">
      <div class="tab-item" @click="seletedindex=index" :class="{active:seletedindex==index}" v-for="(item,index) in tablist" :key="index" >{{item}}</div>
    </div>
    </div>
    
    <div class="goods-list" :style="{marginTop: margintop}">
      <div class="item" v-for="(item,index) in datalist" :key='index'>
        <div class="box">
          <div class="left">
            <image :src="item.goods_small_logo"></image>
          </div>
          <div class="right">
            <div class="word">
            {{item.goods_name}}
            </div>
            <div class="price">
              ¥<span>{{item.goods_price}}</span>.00
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/myrequest.js';
export default {
  data() {
    return {
      seletedindex:0,
      tablist:['综合','销量','价格'],
      datalist:[],

      pagenum:1,
      pagesize:10,
      query:'',
      isEnd:false,
      isscroll:'static',
      margintop:'0rpx'
    }
  },
  methods: {
    async getdatalist(){
       wx.showNavigationBarLoading();
        if (this.isEnd) {
        // 提示用户数据已经全部加载
        // wx.showToast({
        //   title: '数据已经加载完毕',
        //   icon: 'none',
        //   duration: 2000
        // })
        return
      }
        // 打开加载动画
      wx.showLoading({
        title: "加载中"
      });
      this.query=this.$root.$mp.query.query;


      var url='https://itjustfun.cn/api/public/v1/goods/search';
      var res=await request(url,'GET',{
        query:this.query,
        pagenum:this.pagenum,
        pagesize:this.pagesize
      })
      console.log(res);
       if (res.data.data.goods.length == 0) {
          // 关闭导航中的加载框
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: "数据加载完毕!",
          duration: 2000
        });
        this.isend = true;
        return;
      }
      if(this.datalist.length==0){
        this.datalist=res.data.data.goods;
      }else{
        this.datalist=this.datalist.concat(res.data.data.goods)
      }

      // 关闭加载动画
      wx.hideLoading()
       // 关闭下拉框
      wx.stopPullDownRefresh();
      // 关闭导航中的加载框
      wx.hideNavigationBarLoading();
     
    }
  },
  mounted() {
    // this.pagenum=1;
    // this.datalist=[];
    // 获取数据
    this.getdatalist()
  },
  // 上拉刷新
  onReachBottom(){
    this.pagenum=this.pagenum+1;
    // 获取数据
    this.getdatalist()

  },
  // 下拉刷新
  onPullDownRefresh(){
    this.pagenum=1;
    this.isEnd=false;
    this.datalist=[];
    // 获取数据
    this.getdatalist()
  },
  onUnload(){
     this.datalist=[];
  },
   onPageScroll(scroll){
    //  console.log(scroll);
     if(scroll.scrollTop==0){
   this.isscroll='static'
     this.margintop='0rpx'
     }else{
        this.isscroll='fixed'
         this.margintop='200rpx'
     }
   }

}
</script>

<style scoped lang="less">
@import './index.less';
</style>
