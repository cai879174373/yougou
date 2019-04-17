<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-input">
        <!-- 小程序里面enter事件  用confirm -->
        <input type="text"  @input="inputThink" @confirm="saveinfo" v-model="query" placeholder="请输入要搜索的内容">
        <icon @click="saveinfo" type="search" size="16"></icon>
         <div v-show="query != ''" class="think">
          <div class="item" @click="dorpsearch(item.goods_name)" v-for="(item, index) in thinkList" :key="index">{{item.goods_name}}</div>
        </div>
      </div>
      <div v-if="query.length == 0 ? false: true" @click="ccancle" class="mybtn">取消</div>
    </div>
    <!-- 历史搜索 -->
    <div class="history">
      <div class="titile">
        <div class="left">历史搜索</div>
        <icon class="clear" type="clear" @click="clearinfo" size="16"></icon>
      </div>
      <div class="his-item">
        <div
          class="item"
          v-for="(item,index) in searchlist"
          @click="searchtag(item)"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/myrequest.js'
export default {
  data() {
    return {
      query: "",
      searchlist: [],
      thinkList:[]
    };
  },
  methods: {
    ccancle() {
      this.query = "";
    },
    saveinfo() {
       if(this.query==''){
        return false;
      }
      // 跳转到搜索
      wx.navigateTo({
        url: "/pages/searchlist/main?query=" + this.query
      });
     
      // 保存数据数组
      this.searchlist.unshift(this.query);
      //  保存数据到本地
      // 数组去重/
      this.searchlist = [...new Set(this.searchlist)];
      wx.setStorageSync("history", this.searchlist);
      // 获取数据
      this.query = "";
    },
    searchtag(item) {
      this.query = item;
      this.saveinfo();
    },
    clearinfo() {
     

      // 模态提示框
      wx.showModal({
        title: "警告",
        content: "是否确定删除?",
        success:res=> {
          if (res.confirm) {
             this.searchlist = [];
            try {
               wx.removeStorageSync('history')
            } catch (error) {
              console.log(error.message);
            }
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
     // 当在输入框中输入内容时，会触发
    inputThink(e) {
      // 得到输入的内容：
      var value = e.target.value
      // 如果在两秒之内有新的输入内容，之前的定时器需要清除掉
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        // 发送请求到服务器进行联想
        var res = await request('https://itjustfun.cn/api/public/v1/goods/qsearch?query=' + value)
        this.thinkList = res.data.data
      }, 2000)
    },
    // 点击联想内容时，触发
    dorpsearch(name) {
      var query = name.split(' ')[0]
      this.query = query
      this.saveinfo()
    }
  },
  mounted() {
    this.searchlist = wx.getStorageSync("history") || [];
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
