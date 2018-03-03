<template>
  <div class="index-main">
    <Nav :leftStyle="leftStyle"/>
    <div class="slider">
      <div class="control">
        <i class="iconfont icon-iconfontzhizuobiaozhun023126" @click="replace(index - 1)"></i>
        <i class="iconfont right icon-iconfontzhizuobiaozhun023127" @click="replace(index + 1)"></i>
      </div>
      <div class="list" ref="list">
        <img src="static/images/fox.jpg" alt="image"/>
        <img src="static/images/orgx.jpg" alt="image"/>
        <img src="static/images/tiger.jpg" alt="image"/>
      </div>
    </div>
    <div class="pointer">
      <li v-for="i in 3" :key="i" ref="pointer" @click="replace(index)"></li>
      <!-- <span style="color: red;">轮播图上加说明文字</span> -->
    </div>
    <div class="content">
      <div class="left-content">
        <div class="review" v-for="i in 6" :key="i" @click="jump">
          <img src="static/images/bg.jpg" alt="image"/>
          <div class="title">
            <span class="deck"></span>
            <span>标题标题标题标题标题</span>
          </div>
        </div>
      </div>
      <div class="right-content">
        <!-- 设计一个样式，冠军、亚军、季军 -->
        <div class="tip">
          <span>电影排行榜</span>
          <router-link to="/rank">查看更多</router-link>
        </div>
        <div class="classic" v-for="i in 3" :key="i">
          <div class="top">
            <span>{{ i }}.</span>
            <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1312700628.jpg" alt="image"/>
            <div class="film-info">
              <span>当幸福来敲门</span>
              <span>信息简介</span>
            </div>
          </div>
          <!-- 加上双引号背景 -->
          <div class="bottom">
            <span>一句短评</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Index',
  components: {
    Nav
  },
  data () {
    return {
      leftStyle: 'margin-left: -8px;',
      index: 0
    }
  },
  methods: {
    replace (index) {
      this.$refs.pointer[this.index].style.color = 'gray'
      this.index = index
      if (index > 2) {
        this.index = 0
      } else if (index < 0) {
        this.index = 2
      }
      this.$refs.pointer[this.index].style.color = 'orange'
      this.$refs.list.style.left = -(this.index * 100) + 'vw'
    },
    jump () {
      this.$router.push('/review')
    }
  }
}
</script>

<style lang="less" scoped>
.index-main {
  background-color: #F6F6F6;
  .slider {
    position: relative;
    width: 100vw;
    height: 50vh;
    overflow: hidden;
    .control {
      display: none;
      position: absolute;
      top: 173px;
      left: 60px;
      z-index: 2;
      i {
        color: white;
        font-size: 36px;
        cursor: pointer;
        &:hover {
          color: orange;
        }
      }
      .right {
        margin-left: 86vw;
      }
    }
    &:hover {
      .control {
        display: block;
      }
    }
    .list {
      display: flex;
      position: absolute;
      width: 300vw;
      height: 60vh;
      cursor: pointer;
      img {
        width: 100vw;
        height: 50vh;
      }
    }
  }
  .pointer {
    display: flex;
    margin: 26px 0 10px 0;
    justify-content: center;

    color: gray;
    font-size: 20px;
    line-height: 20px;
    li {
      margin-right: 4px;
      cursor: pointer;
      &:first-child {
        color: orange;
      }
    }
  }
  .content {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    .left-content {
      display: flex;
      flex-wrap: wrap;
      margin: 16px 0;
      width: 75%;
      .review {
        margin-right: 20px;
        img {
          width: 340px;
          height: 220px;
          border-radius: 3px;
          box-shadow: 0 1px 3px rgba(26, 26, 26, .6);
          cursor: pointer;
        }
        .title {
          position: relative;
          bottom: 50px;
          width: 100%;
          height: 45px;
          line-height: 45px;

          text-align: left;
          letter-spacing: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          color: #FFF;
          background-color: rgba(128, 128, 128, .66);
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          cursor: pointer;
          .deck {
            position: relative;
            margin-right: 8px;
            width: 10px;
            height: 16px;
            border-left: 4px solid #8692A6;
          }
        }
      }
    }
    .right-content {
      margin: 16px 0 0 8px;
      padding: 10px;
      height: 100%;
      background-color: #FFF;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(26, 26, 26, .6);
      .tip {
        display: flex;
        justify-content: space-between;
        span {
          font-weight: 600;
        }
        a {
          color: #175199;
          font-size: 13px;
          text-decoration: none;
        }
      }
      .classic {
        margin-top: 10px;
        .top {
          display: flex;
          img {
            margin-left: 3px;
            width: 100px;
            height: 120px;
          }
          .film-info {
            display: flex;
            padding: 8px;
            padding-top: 0;
            width: 100%;
            flex-direction: column;
            align-items: center;
          }
        }
        .bottom {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
