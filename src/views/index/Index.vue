<template>
  <div class="index-main">
    <Nav/>
    <div class="main">
      <div class="left">
        <div class="content" v-for="(review, index) in reviews" :key="index">
          <div class="top">
            <img :src="review.rank.img_src" alt="poster">
            <div class="right-content">
              <div class="info">
                <img src="static/images/avatar.jpg" alt="avatar">
                <span>{{ review.user.name }}</span>
                <span>评分</span>
                <span>{{ review.updatedAt }}</span>
              </div>
              <span>{{ review.title }}</span>
              <div class="preview">
                <span>{{ review.content }}</span>
              </div>
            </div>
          </div>
          <div class="feature">
            <li v-for="i in 3" :key="i">功能{{ i }}</li>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="header">
            <span>影评类型</span>
          </div>
          <div class="content">
            <div class="type" v-for="(item, index) in types" :key="index">
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="header">
            <span>电影推荐</span>
            <div class="switch">
              <i class="iconfont icon-icon--"></i>
              <span>换一换</span>
            </div>
          </div>
          <div class="recommend" v-for="i in 3" :key="i">
            <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2233971046.jpg" alt="poster">
            <div class="info">
              <span>无间道</span>
              <span>信息简介</span>
              <span>星标及评分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

import request from '@/utils/request';

export default {
  name: 'Index',
  components: {
    Nav,
  },
  data() {
    return {
      name: '',
      types: ['动作', '喜剧', '科幻', '爱情', '剧情', '动画', '历史', '悬疑', '纪录片'],
      page: 1,
      limit: 10,
      pageCount: 0,
      reviews: [],
    }
  },
  created() {
    this.getReview();
  },
  methods: {
    async getReview() {
      try {
        const { count, pageCount, reviews } = await request('GET', '/review', { page: this.page, limit: this.limit })
        this.pageCount = pageCount;
        this.reviews = reviews;
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.index-main {
  background-color: #F6F6F6;
  .main {
    display: flex;
    margin-top: 20px;
    justify-content: center;
    img {
      align-self: center;
      width: 75px;
      height: 108px;
      border-radius: 4px;
      box-shadow: 0 2px 3px #BDBDBD;
    }
    .left {
      display: flex;
      width: 50%;
      flex-direction: column;
      .content {
        display: flex;
        margin-bottom: 20px;
        padding: 12px;
        flex-direction: column;
        background-color: #FFF;
        border-radius: 3px;
        .top {
          display: flex;
          .right-content {
            margin-left: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              box-shadow: none;
            }
            .info {
              display: flex;
              align-items: center;
              span {
                margin-left: 8px;
              }
            }
            .preview {
              display: -webkit-box;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }
        .feature {
          margin-top: 12px;
          li {
            margin-right: 12px;
            float: left;
            list-style: none;
          }
        }
      }
    }
    .right {
      margin: 0 0 20px 20px;
      width: 20%;
      .top {
        .header {
          margin-bottom: 12px;
          padding-left: 4px;
        }
        .content {
          display: flex;
          flex-wrap: wrap;
          .type {
            margin: 0 12px 12px 0;
            width: 25%;
            padding: 10px 0;
            flex-grow: 1;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
            text-align: center;
            letter-spacing: 1px;
            transition: .15s;

            cursor: pointer;
            &:hover {
              color: white;
              background-color: #0077FF;
            }
          }
        }
      }
      .bottom {
        margin-top: 20px;
        .header {
          display: flex;
          justify-content: space-between;
          .switch {
            font-size: 14px;
            color: #175199;
            cursor: pointer;
            i {
              font-weight: 600;
            }
          }
        }
        .recommend {
          display: flex;
          margin-top: 12px;
          .info {
            display: flex;
            flex-direction: column;
            margin-left: 12px;
          }
        }
      }
      .top, .bottom {
        padding: 12px;
        background-color: #FFF;
        border-radius: 3px;
      }
    }
  }
}
</style>
