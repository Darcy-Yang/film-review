<template>
  <div class="write-main">
    <Nav/>
    <div class="area">
      <div class="upload-area">
        <i class="iconfont icon-xiangji"></i>
        <span class="description">添加题图</span>
        <input type="file"/>
      </div>
      <div class="title-area">
        <textarea placeholder="请输入标题..."></textarea>
      </div>
      <div class="editor-area">
        <span>富文本编辑器</span>
      </div>
      <div class="content-area">
        <textarea placeholder="请输入正文"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Write',
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
.write-main {
  .area {
    display: flex;
    margin: 0 auto;
    margin-top: 40px;
    width: 42%;
    flex-direction: column;
    align-items: center;
    textarea {
      width: 100%;
      outline: none;
      border: none;
      resize: none;
    }
    .upload-area {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      // width: 42%;
      width: 100%;
      height: 192px;

      color: gray;
      background-color: #F7F8F9;
      border-radius: 3px;
      i {
        font-size: 32px;
      }
      .description {
        display: none;
      }
      &:hover {
        .description {
          display: block;
          position: absolute;
          top: 120px;
        }
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;

        opacity: 0;
        cursor: pointer;
      }
    }
    .title-area {
      margin: 16px 0;
      padding: 0;
      width: 100%;
      textarea {
        padding: 0;
        height: 44px;
        font-size: 32px;
        font-weight: 600;
        line-height: 1.4;
      }
      textarea::-webkit-input-placeholder {
        color: #A4A4A4;
      }
    }
    .editor-area {
      padding: 20px;
      width: 100%;
      color: gray;
      text-align: left;
    }
    .content-area{
      width: 100%;
      textarea {
        min-height: 300px;
        font-size: 16px;
      }
      textarea::-webkit-input-placeholder {
        color: #B3B3B3;
      }
    }
  }
}
</style>