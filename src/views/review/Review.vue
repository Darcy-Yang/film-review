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
          <div class="btn-like">
            <i class="iconfont icon-xihuan"></i>
            <span>喜欢</span>
          </div>
          <div class="like-num">
            <span>123</span>
          </div>
        </div>
        <div class="share">
          <i class="iconfont icon-share"></i>
          <span>分享</span>
        </div>
      </div>
      <div class="comment">
        <div class="input-area">
          <img src="static/images/avatar.jpg" alt="avatar"/>
          <textarea placeholder="快输入你精彩的评论吧"></textarea>
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
      margin: 20px 0;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      .like {
        display: flex;
        padding: 13px 15px;
        font-size: 19px;
        color: #EA6F5A;
        border: 1px solid #EA6F5A;
        border-radius: 40px;
        cursor: pointer;
        i {
          font-size: 20px;
        }
        .btn-like {
          padding-right: 13px;
        }
        .like-num {
          padding-left: 15px;
          border-left: 1px solid #EA6F5A;
        }
      }
      .share {
        padding: 8px 12px;
        height: 100%;
        color: #50C87E;
        font-size: 18px;
        border: 1px solid #50C87E;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    .comment {
      width: 100%;
      .input-area {
        img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        textarea {
          margin-left: 8px;
          padding: 10px;
          padding-bottom: 0;
          width: 87.4%;
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
