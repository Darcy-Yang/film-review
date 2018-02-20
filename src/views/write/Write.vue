<template>
  <div class="write-main">
    <Nav/>
    <div class="area">
      <div class="upload-area">
        <i class="iconfont icon-xiangji"></i>
        <span class="description">添加背景图</span>
        <input type="file"/>
      </div>
      <div class="title-area">
        <textarea placeholder="请输入标题"></textarea>
      </div>
      <div class="separator">
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
  },
  data () {
    return {
      contents: ''
    }
  },
  methods: {
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
        line-height: 1.4;
        font-weight: 600;
        letter-spacing: 1px;
      }
      // 设置提示字符串颜色；(chrome)
      textarea::-webkit-input-placeholder {
        color: #A4A4A4;
      }
    }
    .separator {
      width: 100%;
      color: gray;
      text-align: left;
      border-bottom: 1px solid #A4A4A4;
    }
    .content-area{
      margin-top: 20px;
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
