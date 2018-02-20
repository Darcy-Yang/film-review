<template>
  <div class="review-main">
    <Nav/>
    <div class="whole-page">
      <div class="content">
        <img src="static/images/bg.jpg" alt="image"/>
        <div class="title">
          <span>标题标题标题标题标题</span>
        </div>
        <div class="review-content">
          <span>影评内容～影评内容～影评内容～影评内容～影评内容～影评内容～影评内容</span>
        </div>
      </div>
      <div class="feature">
        <div class="like">
          <div class="like-btn">
            <i class="iconfont icon-xihuan"></i>
          </div>
          <span>123</span>
        </div>
        <div class="right-side">
          <i class="iconfont icon-shoucang"></i>
          <i class="iconfont icon-pinglun"></i>
          <i class="iconfont icon-share"></i>
        </div>
      </div>
      <div class="comment">
        <div class="input-area">
          <img src="static/images/avatar.jpg" alt="avatar"/>
          <textarea placeholder="写下你精彩的评论"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'review',
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
.review-main {
  .whole-page {
    display: flex;
    margin: 0 auto;
    width: 42%;
    flex-direction: column;
    align-items: center;
    .content {
      display: flex;
      padding: 20px;
      margin-top: 40px;
      width: 100%;
      flex-direction: column;

      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(26, 26, 26, .6);
      img {
        width: 605px;
        height: 192px;
        border-radius: 3px;
      }
      .title {
        margin: 16px 0;
        padding-bottom: 8px;
        font-size: 32px;
        line-height: 1.4;
        font-weight: 600;
        letter-spacing: 1px;
        border-bottom: 1px dashed #BDBDBD;
      }
      .review-content {
        letter-spacing: 0.8px;
      }
    }
    .feature {
      display: flex;
      margin-top: 20px;
      width: 100%;
      justify-content: space-between;
      .like {
        display: flex;
        color: #37C700;
      }
      .right-side {
        .iconfont {
          margin-left: 20px;
          color: #333;
        }
      }
      .iconfont {
        font-size: 22px;
      }
    }
    .comment {
      display: flex;
      margin: 20px 0;
      width: 100%;
      flex-direction: column;
      .input-area {
        display: flex;
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        textarea {
          margin-left: 8px;
          padding: 6px;

          width: 100%;
          font-size: 14px;

          border: 1px solid #BDBDBD;
          border-radius: 3px;
          outline: none;
          resize: none;
        }
      }
    }
  }
}
</style>
