<template>
  <div class="article-main">
    <Nav/>
    <div class="article">
      <img class="title-img" src="static/images/title_img.jpg" alt="images"/>
      <div class="info">
        <div class="title">
          <span>文章标题</span>
        </div>
        <div class="writer-info">
          <img src="static/images/avatar.jpg" alt="avatar"/>
          <span>作者名称</span>
          <span> • 发文距离现在时间</span>
        </div>
      </div>
      <div class="content">
         <span>文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－文章内容－</span>
      </div>
      <div class="labels">
        <span v-for="(label, index) in labels" :key="index">{{ label }}</span>
      </div>
      <div class="features">
        <div class="left-side">
          <button>
            <i class="iconfont icon-dianzan"></i>
            1,234
          </button>
        </div>
        <div class="right-side">
          <div class="collect">
            <i class="iconfont icon-shoucang"></i>
            <span>收藏</span>
          </div>
          <div class="share">
            <i class="iconfont icon-fenxiang"></i>
            <span>分享</span>
          </div>
        </div>
      </div>
      <Comment/>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Comment from '@/components/Comment'

export default {
  name: 'Article',
  components: {
    Nav,
    Comment
  },
  data () {
    return {
      labels: [ '标签一', '标签二', '标签三' ]
    }
  }
}
</script>

<style lang="less" scoped>
.article-main {
  color: rgb(51, 51, 51);
  background-color: #F6F6F6;
  .article {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-img {
      width: 100vw;
      height: calc(100vh - 9px);
    }
    .info {
      margin-top: -66px;
      padding: 20px;
      width: 42%;
      align-self: center;

      background-color: #FFF;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      box-shadow: 0 4px 4px;
      .title {
        font-size: 24px;
        text-align: center;
      }
      .writer-info {
        margin-top: 20px;
        font-size: 14px;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        span {
          position: relative;
          left: 10px;
          bottom: 16px;
        }
      }
    }
    .content {
      padding: 20px;
      width: 42%;
      height: 600px;

      background-color: #FFF;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      box-shadow: 0 4px 4px;
    }
    .labels {
      width: 42%;
      padding: 20px;
      span {
        margin-right: 20px;
        padding: 5px 15px;
        font-size: 14px;
        line-height: 30px;
        color: #666768;
        background-color: rgba(0,0,0,.1);
        border-radius: 15px;
      }
    }
    .features {
      display: flex;
      width: 42%;
      padding: 20px;
      justify-content: space-between;
      .left-side {
        button {
          height: 36px;
          padding: 0 16px;
          font-size: 14px;
          line-height: 32px;
          color: #50C87E;
          background-color: #F6F6F6;
          border: 1px solid #50C87E;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          i {
            font-size: 18px;
          }
        }
      }
      .right-side {
        font-size: 14px;
        color: gray;
        i {
          font-size: 24px;
        }
        .collect {
          margin-right: 8px;
          float: left;
          cursor: pointer;
          &:hover {
            color: #50C87E;
          }
        }
        .share {
          float: left;
          cursor: pointer;
          &:hover {
            color: #50C87E;
          }
        }
      }
    }
  }
}
</style>
