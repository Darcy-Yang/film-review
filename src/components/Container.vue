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
  padding: 40px 24px; /*px*/
  flex-direction: column;

  width: 25%;
  height: 100%;
  background-color: #FFF;
  border-radius: 8px; /*px*/
  box-shadow: 0 1px 3px rgba(26, 26, 26, .3);
  .words-area {
    margin: 8px 0 40px 0; /*px*/
    height: 420px; /*px*/
    font-size: 32px; /*px*/
    line-height: 48px; /*px*/
  }
  .name-area {
    height: 40px; /*px*/
    font-size: 36px; /*px*/
    font-weight: 600;
    line-height: 48px; /*px*/
    border-bottom: 1px solid #D9D6CF;
  }
  textarea {
    padding: 16px; /*px*/
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
      width: 216px; /*px*/
      height: 60px; /*px*/
      font-size: 28px; /*px*/
      letter-spacing: 2px; /*px*/
      border: 1px solid #BDBDBD;
      border-radius: 6px; /*px*/
      outline: none;
      cursor: pointer;
    }
  }
  @media screen and (max-device-width: 800px) {
    padding: .3rem .4rem;
    width: 7rem;
    .name-area {
      padding-bottom: .2rem;
      font-size: .36rem;
      border-bottom-width: .048rem;
    }
    .words-area {
      padding-top: .2rem;
      font-size: .338rem;
    }
    .buttons button {
      width: 2.5rem;
      height: .7rem;
      font-size: .3rem;
      border-radius: .08rem;
    }
  }
}
</style>
