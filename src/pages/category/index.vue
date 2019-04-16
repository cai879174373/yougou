<template>
  <div>
    <!-- 头部 -->
    <div class="myhead">
       <tophead></tophead>
    </div>
   
    <div class="content">
      <div class="nav">
        <div class="nav-item" @click="setdata(index)" :class="{active:seletedindex==index}"  v-for="(item,index) in menulist" :key="index">{{item.cat_name}}</div>
      </div>
      <div class="goods">
        <image class="goods-img"  mode="aspectFill" src="https://img.alicdn.com/simba/img/TB1JAp1LCzqK1RjSZFHSuv3CpXa.jpg"></image>
        <div class="list" v-for="(item,index) in rightlist" :key="index">
          <div class="title">
          <span>/</span>{{item.cat_name}} <span>/</span>
          </div>
          <div class="good-list">
            <a :href="'/pages/searchlist/main?query='+subitem.cat_name" class="good-item" v-for="(subitem,subindex) in item.children" :key='subindex'>
              <image mode="aspectFill"  :src="'https://itjustfun.cn/'+subitem.cat_icon"></image>
              <p>{{subitem.cat_name}}</p>
            </a>
           
          </div>
        </div>

        
        
      </div>
    </div>
  </div>
</template>

<script>
// 导入头部组件
import tophead from '../../components/tophead.vue'
// 导入封装的请求
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      menulist:[],
      seletedindex:0,
      rightlist:[]
    }
  },
components:{
tophead
},
methods: {
  setdata(index){
    this.seletedindex=index;
    this.rightlist=this.menulist[index].children
  }
},
async mounted() {
  var url='https://itjustfun.cn/api/public/v1/categories'
  var res=await request(url)
  // console.log(res);
  this.menulist=res.data.data;
  this.rightlist=this.menulist[this.seletedindex].children;
  console.log(this.menulist);
  
},
}
</script>

<style lang="less">
 @import './index.less';
</style>
