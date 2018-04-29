<template>
  <transition name="fade">
    <div class="confirm" v-show="showConfirm">
      <div class="confirm-main">
        <div class="tip">
          <span>提示</span>
        </div>
        <span class="content">{{ message }}</span>
        <div class="buttons">
          <button @click="buttons[0].action">取消</button>
          <button @click="buttons[1].action">确认</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Confirm',
  data() {
    return {
      message: '消息提示',
      showConfirm: false,
      buttons: [],
    }
  },
  methods: {
    showTime() {
      this.showConfirm = true;
    },
    close() {
      this.closeConfirm();
    },
  },
  mounted() {
    this.showTime();
  },
}
</script>

<style lang="less" scoped>
.confirm {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .6);

  z-index: 5;
  .confirm-main {
    display: flex;
    flex-direction: column;
    width: 600px; /*px*/
    background-color: #FFF;
    border-radius: 8px; /*px*/
    box-shadow: 0 2px 6px rgba(26, 26, 26, .3); /*px*/
    .tip {
      padding-left: 40px; /*px*/
      height: 100px; /*px*/
      line-height: 100px; /*px*/
      border-bottom: 2px solid #BDBDBD; /*px*/
    }
    .content {
      padding: 30px 40px; /*px*/
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      padding: 40px; /*px*/
      button {
        width: 45%;
        padding: 0 40px; /*px*/
        height: 80px; /*px*/
        color: gray;
        border: 2px solid #BDBDBD; /*px*/
        border-radius: 8px; /*px*/
        outline: none;

        cursor: pointer;
        &:last-child {
          color: #FFF;
          background-color: #0077FF;
          border: none;
        }
      }
    }
  }
}
.fade-enter-active {
  animation: bounce-in .5s;
}
.fade-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
