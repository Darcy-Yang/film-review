<template>
  <div class="login-main">
    <div class="content">
      <h2>欢迎登录|影评网</h2>
      <div class="input-area">
        <input type="text" placeholder="请输入账号" v-model="user.name"/>
        <span v-show="nullAccount">账号不能为空</span>
      </div>
      <div class="input-area">
        <input type="password" placeholder="请输入密码" v-model="user.password"/>
        <span v-show="nullPassword">密码不能为空</span>
      </div>
      <button type="submit">登录</button>
    </div>
    <ul class="bg-bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: { name: '', password: '' },
      nullAccount: false,
      nullPassword: false
    }
  }
}
</script>

<style lang="less" scoped>
.login-main {
  display: flex;
  height: 100vh;
  justify-content: center;
  background: linear-gradient(to bottom right, #50A3A2, #53E3A6);
  .content {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    h2 {
      font-size: 24px;
      color: #FFF;
      letter-spacing: 1px;
    }
    .input-area {
      position: relative;
      input {
        margin-bottom: 10px;
        padding: 10px 15px;
        width: 250px;
        font-size: 18px;
        font-weight: 300;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 3px;
        background-color: rgba(255, 255, 255, 0.4);
        outline: none;
        transition-duration: .25s;
        &::-webkit-input-placeholder {
          font-size: 15px;
          color: #FFF;
        }
        &:focus {
          width: 300px;
          color: #53E3A6;
          background-color: #FFF;
        }
      }
      span {
        position: absolute;
        top: 10px;
        right: -120px;
        color: red;
        font-size: 16px;
      }
    }
    button {
      padding: 10px 15px;
      width: 280px;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #53E3A6;
      background-color: #FFF;
      border: none;
      border-radius: 3px;
      outline: none;
      transition-duration: .25s;
      cursor: pointer;
    }
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      bottom: -160px;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.15);
      list-style: none;
      animation: square 15s infinite;
      transition-timing-function: linear;
      &:nth-child(1) {
        left: 10%;
      }
      &:nth-child(2) {
        left: 20%;
        width: 90px;
        height: 90px;
        animation-delay: 2s;
        animation-duration: 7s;
      }
      &:nth-child(3) {
        left: 25%;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-duration: 8s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(5) {
        left: 70%;
      }
      &:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:nth-child(7) {
        left: 32%;
        width: 160px;
        height: 160px;
        animation-delay: 2s;
      }
      &:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
        animation-duration: 15s;
      }
      &:nth-child(9) {
        left: 25%;
        width: 10px;
        height: 10px;
        animation-delay: 2s;
        animation-duration: 12s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(10) {
        left: 85%;
        width: 160px;
        height: 160px;
        animation-delay: 5s;
      }
    }
    @keyframes square {
      0% {
        opacity: 0.5;
        transform: translateY(0px) rotate(45deg);
      }
      25% {
        opacity: 0.75;
        transform: translateY(-400px) rotate(90deg)
      }
      50% {
        opacity: 1;
        transform: translateY(-600px) rotate(135deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-1000px) rotate(180deg);
      }
    }
  }
}
</style>
