<template>
  <div class="index-main">
    <Nav/>
    <div class="main">
      <div class="left">
        <div class="content" v-for="i in 10" :key="i">
          <div class="top">
            <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg" alt="poster">
            <div class="right-content">
              <div class="info">
                <img src="static/images/avatar.jpg" alt="avatar">
                <span>用户昵称</span>
                <span>评分</span>
                <span>2018-03-12 14:00</span>
              </div>
              <span>标题</span>
              <div class="preview">
                <span>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
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
          <div class="type" v-for="item in types" :key="item">
            <span>{{ item }}</span>
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
      types: ['动作1', '喜剧1', '科幻1', '喜剧2', '科幻2', '动作2', '科幻3', '动作3', '喜剧3'],
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const { allUser } = await request('GET', '/user');
        this.name = allUser[0].name;
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
      border-radius: 3px;
    }
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
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
      margin-left: 20px;
      width: 20%;
      .top {
        display: flex;
        flex-wrap: wrap;
        .type {
          margin-right: 12px;
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
