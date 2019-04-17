<template>
    <div>
         <!-- 搜索框 -->
    <div  class="search">
      <a href="/pages/search/main" class="search-input">
        <input class="_input" type="text">
        <div class="word">
          <icon type="search" size="20"></icon>
          <div class="text">搜索</div>
        </div>
      </a>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.search{
    padding: 20rpx 16rpx;
    background-color: #ff2d4a;
    .search-input{
        height: 60rpx;
        background-color: #fff;
        border-radius: 5px;
        position: relative;
        ._input{
           width: 100%;
           height: 100%;
        }
        .word{
            display: flex;
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);
            icon{
               margin-top: 8rpx;
            }
            .text{
            color:#bbb;
            margin-left: 16rpx; 
              font-size: 18px;
            }
        }
    }
}
</style>
