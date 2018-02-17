<template>
  <div class="index-main">
    <Nav/>
    <div class="slider">
      <div class="control">
        <i class="iconfont icon-iconfontzhizuobiaozhun023126" @click="replace(index - 1)"></i>
        <i class="iconfont right icon-iconfontzhizuobiaozhun023127" @click="replace(index + 1)"></i>
      </div>
      <div class="list" ref="list">
        <img src="static/images/orgx.jpg" alt="image"/>
        <img src="static/images/tiger.jpg" alt="image"/>
        <img src="static/images/fox.jpg" alt="image"/>
      </div>
    </div>
    <div class="pointer">
      <li v-for="(item, index) in images" :key="index" ref="pointer" @click="replace(index)"></li>
    </div>
    <div class="content">
      <div class="left-content">
        <div class="reviews" v-for="(item, index) in images" :key="index">
          <div class="top">
            <div class="review">
              <span class="title">记一次XXX影评</span><br>
              <span>这部电影很不错～这部电影很不错～这部电影很不错～这部电影很不错～这部电影很不错～</span>
              <div class="timeline">
                <span>1,17 17:30</span>
              </div>
            </div>
            <div class="user-info">
              <img src="static/images/avatar.jpg" alt="avatar"/>
              <span>user_name</span>
            </div>
          </div>
          <div class="bottom">
            <div class="unit">
              <i class="iconfont icon-like"></i>
              <span>146</span>
            </div>
            <div class="unit">
              <i class="iconfont icon-dislike"></i>
              <span>23</span>
            </div>
            <div class="unit">
              <i class="iconfont icon-pinglun"></i>
              <span>2</span>
            </div>
            <div class="unit">
              <i class="iconfont icon-share"></i>
              <span>分享</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="tip">
          <span>电影排行榜</span>
          <router-link to="/">查看更多</router-link>
        </div>
        <div class="classic" v-for="index in recommend" :key="index">
          <div class="top">
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
      index: 0,
      images: [],
      recommend: []
    }
  },
  created () {
    this.images.length = 3
    this.recommend.length = 3
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
    height: 60vh;
    overflow: hidden;
    .control {
      display: none;
      position: absolute;
      top: 200px;
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
        height: 60vh;
      }
    }
  }
  .pointer {
    display: flex;
    margin: 8px 0;
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
    width: 70%;
    justify-content: center;
    .left-content {
      padding: 20px;
      padding-top: 10px;
      width: 70%;
      .reviews {
        margin-top: 20px;
        padding: 10px 20px;
        .top {
          display: flex;
          justify-content: space-between;
          .review {
            padding: 10px;
            width: 78%;
            span {
              line-height: 24px;
            }
            .title {
              font-size: 18px;
              font-weight: 600;
            }
            .timeline {
              text-align: right;
            }
          }
          .user-info {
            display: flex;
            width: 20%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            word-break: break-word;
            img {
              width: 42px;
              height: 42px;
              border-radius: 50%;
              cursor: pointer;
            }
            span {
              cursor: pointer;
              &:hover {
                color: orange;
              }
            }
          }
        }
        .bottom {
          margin: 8px 0 0 10px;
          height: 20px;
          .unit {
            float: left;
            margin-right: 12px;
            cursor: pointer;
            &:hover {
              color: blue;
            }
          }
        }
      }
    }
    .right-content {
      margin: 30px 0 0 20px;
      padding: 10px;
      width: 30%;
      height: 100%;
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
    .reviews, .right-content {
      background-color: #FFF;
      box-shadow: 0 1px 3px rgba(26, 26, 26, .3);
      border-radius: 3px;
    }
  }
}
</style>
