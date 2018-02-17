<template>
  <div class="words-main">
    <Nav/>
    <div class="list">
      <div class="content" v-for="(item, index) in words" :key="index">
        <div class="paper">
          <div class="words">
            <span class="film-words">如果你有梦想，就要守护它。当人们做不到一些事情的时候，他们就会对你说你也同样不可能。有了目标就要全力以赴。</span><br>
            <span class="film-name">——《当幸福来敲门》</span>
          </div>
          <div class="feature">
            <div class="unit">
              <i class="iconfont icon-xihuan"></i>
              <span>32</span>
            </div>
            <div class="unit">
              <i class="iconfont icon-pinglun"></i>
              <span>3</span>
            </div>
            <div class="unit">
              <i class="iconfont icon-share"></i>
            </div>
          </div>
          <div class="user-info">
            <img src="static/images/avatar.jpg" alt="avatar"/>
            <span>user_name</span>
          </div>
        </div>
        <div class="paper-shadow" style="background-image: url(static/images/paper-shadow.png);">
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
      words: []
    }
  },
  created () {
    this.words.length = 6
  }
}
</script>

<style lang="less" scoped>
.words-main {
  height: 100%;
  background-color: #F6F6F6;
  .list {
    margin: 48px 0;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .paper {
        padding: 32px;
        padding-bottom: 12px;
        width: 736px;
        background-color: #FFF;
        border: 1px solid #BDBDBD;
        .words {
          padding-bottom: 28px;
          border-bottom: 1px solid #BDBDBD;
          .film-words {
            font-size: 18px;
            font-weight: 600;
          }
          .film-name {
            float: right;
          }
        }
        .feature {
          margin-top: 10px;
          .unit {
            margin-top: 10px;
            margin-right: 16px;
            float: left;
            cursor: pointer;
          }
        }
        .user-info {
          display: flex;
          float: right;
          align-items: center;
          img {
            margin-right: 8px;
            width: 42px;
            height: 42px;
            border-radius: 50%;
          }
          img, span {
            cursor: pointer;
          }
        }
      }
      .paper-shadow {
        width: 800px;
        height: 32px;
      }
    }
  }
}
</style>
