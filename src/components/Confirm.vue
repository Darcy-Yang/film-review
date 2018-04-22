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
    width: 300px;
    background-color: #FFF;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .3);
    .tip {
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #BDBDBD;
    }
    .content {
      padding: 15px 20px;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      button {
        width: 45%;
        padding: 0 20px;
        height: 40px;
        color: gray;
        border: 1px solid #BDBDBD;
        border-radius: 4px;
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
