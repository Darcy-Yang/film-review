<template>
  <div class="message">
    <div class="message-main" v-show="showMessage">
      <i class="iconfont icon-info"></i>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      message: '消息提示',
      showMessage: false,
      timer: null,
    }
  },
  methods: {
    startTime() {
      this.showMessage = true;
      if (this.timer) {
        clearTimeout(this.timer);
      } else {
        this.timer = setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      }
    },
  },
  mounted() {
    this.startTime();
  },
}
</script>

<style lang="less" scoped>
.message {
  position: fixed;
  top: 32px;
  display: flex;
  justify-content: center;
  width: 100%;
  .message-main {
    padding: 12px;
    min-width: 200px;
    border-radius: 4px;
    color: #FFF;
    background-color: #25C6FC;
    letter-spacing: .6px;
    span {
      margin-left: 4px;
    }
  }
}
.warning {
  .message-main {
    background-color: #F5AB00;
  }
}
.error {
  .message-main {
    background-color: red;
  }
}
</style>
