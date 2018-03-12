<template>
  <div class="index-main">
    <Nav/>
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
      <div class="sidebar">
        <div class="type" v-for="i in 9" :key="i">
          <span>类型</span>
        </div>
      </div>
      <div class="rank">
        <div class="header">
          <span>电影排行</span>
          <div class="random">
            <i class="iconfont icon-icon--"></i>
            <span>换一换</span>
          </div>
        </div>
        <div class="recommend" v-for="i in 3" :key="i">
          <span>{{ i }}.</span>
          <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="poster">
          <div class="info">
            <span>当幸福来敲门</span>
            <span>信息简介</span>
            <span>评分及星标</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
  name: 'Index',
  components: {
    Nav,
  },
}
</script>

<style lang="less" scoped>
.index-main {
  background-color: #F6F6F6;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    .content {
      display: flex;
      margin-top: 20px;
      padding: 12px;
      width: 60%;
      flex-direction: column;
      background-color: #FFF;
      box-shadow: 0 1px 3px #BDBDBD;
      border-radius: 3px;
      .top {
        display: flex;
        img {
          align-self: center;
          width: 75px;
          height: 108px;
          border-radius: 3px;
        }
        .right-content {
          margin-left: 14px;
          img {
            width: 32px;
            height: 32px;
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
    position: fixed;
    top: 82px;
    right: 10%;
    .sidebar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 280px;
      // height: 360px;
      background-color: #FFF;
      box-shadow: 0 1px 3px #BDBDBD;
      border-radius: 3px;
      .type {
        display: flex;
        margin: 12px 0 0 12px;
        width: 68px;
        height: 68px;
        justify-content: center;
        align-items: center;
        color: gray;
        letter-spacing: 1px;
        box-shadow: 0 1px 3px #BDBDBD;
        border-radius: 3px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 12px;
        }
      }
    }
    .rank {
      margin-top: 20px;
      height: 100%;
      width: 100%;
      background-color: #FFF;
      box-shadow: 0 1px 3px #BDBDBD;
      border-radius: 3px;
      .header {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        padding-bottom: 0;
        .random {
          font-size: 13px;
          color: #175199;
          cursor: pointer;
          i {
            font-weight: 600;
          }
        }
      }
      .recommend {
        display: flex;
        padding: 12px;
        img {
          margin: 0 12px 0 8px;
          width: 75px;
          height: 108px;
          border-radius: 3px;
        }
        .info {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
