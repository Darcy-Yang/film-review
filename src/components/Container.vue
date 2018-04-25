<template>
  <div class="container">
    <textarea class="name-area" :placeholder="secondPlaceHolder" v-model="title"></textarea>
    <textarea class="words-area" :placeholder="firstPlaceHolder" v-model="content"></textarea>
    <div class="buttons">
      <button class="cancel" @click="cancel">取消</button>
      <button class="sure" @click="submit">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    firstPlaceHolder: {
      type: String,
      default: '',
    },
    secondPlaceHolder: {
      type: String,
      default: '',
    },
    cancel: { type: Function },
  },
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    submit() {
      this.$emit('container', this.title, this.content);
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  margin: 48px;
  padding: 20px 12px;
  flex-direction: column;

  width: 25%;
  height: 100%;
  background-color: #FFF;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, .3);
  @media screen and (max-device-width: 800px) {
    width: 7rem;
  }
  .words-area {
    margin: 4px 0 20px 0;
    height: 210px;
    font-size: 16px;
    line-height: 24px;
  }
  .name-area {
    height: 20px;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    border-bottom: 1px solid #D9D6CF;
  }
  textarea {
    padding: 8px;
    border: none;
    resize: none;
    outline: none;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    .cancel {
      color: gray;
      border: 1px solid #D9D6CF;
    }
    .sure {
      font-weight: 600;
      color: #0077FF;
      border: 1px solid #D9D6CF;
    }
    button {
      width: 108px;
      height: 30px;
      font-size: 14px;
      letter-spacing: 1px;
      border: 1px solid #BDBDBD;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>
