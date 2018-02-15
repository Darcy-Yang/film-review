<template>
  <div class="words-main">
    <Nav/>
    <div class="list">
      <div class="content" v-for="(item, index) in contents" :key="index">
        <div class="words">
          <span>精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词-精彩台词</span>
          <div class="features">
            <div class="unit">
              <i class="iconfont icon-xihuan"></i>
              <span>喜欢</span>
            </div>
            <div class="unit">
              <i class="iconfont icon-pinglun"></i>
              <span>评论</span>
            </div>
            <div class="unit">
              <i class="iconfont icon-shoucang"></i>
              <span>收藏</span>
            </div>
            <span class="source">——《XXXXXX》</span>
          </div>
        </div>
        <div class="user">
          <img src="static/images/avatar.jpg" alt="avatar"/>
          <span>user_name</span>
          <!-- <span>user_name_user_name_user_name</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Words',
  components: {
    Nav
  },
  data () {
    return {
      contents: []
    }
  },
  created () {
    this.contents.length = 10
  }
}
</script>

<style lang="less" scoped>
.words-main {
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  .list {
    margin: 40px auto;
    padding: 20px;
    width: 52%;

    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 10px;
    .content {
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;
      .words {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 20px 5px 20px;
        width: 80%;
        background-color: #F6F6F6;
        border-radius: 4px;
        .features {
          margin-top: 12px;
          font-size: 14px;
          .unit {
            float: left;
            margin-right: 20px;
            cursor: pointer;
          }
          .source {
            float: right;
          }
        }
      }
      .user {
        display: flex;
        padding-left: 12px;
        width: 14%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        word-break: break-all;
        img {
          margin: 0 auto;
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
