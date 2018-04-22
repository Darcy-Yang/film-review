<template>
  <div class="login-main">
    <div class="content">
      <div class="top">
        <h2> {{ isRegister ? '欢迎注册' : '欢迎登录' }}|影评网</h2>
        <img class="favicon" src="static/images/favicon.png" alt="favicon"/>
      </div>
      <div class="input-area">
        <input type="text" placeholder="请输入昵称" v-model="user.name" @keydown="goSubmit"/>
      </div>
      <div class="input-area">
        <input type="password" placeholder="请输入密码" v-model="user.password" @keydown="goSubmit"/>
      </div>
      <transition name="fade">
        <div class="input-area" v-if="isRegister">
          <input type="password" placeholder="再输入一次密码" v-model="confirmPassword" @keydown="goSubmit"/>
        </div>
      </transition>
      <button type="submit" @click="submit">{{ isRegister ? '注册' : '登录' }}</button>
      <div class="register" v-if="!isRegister">
        <span>没有账号 ？</span>
        <span @click="register">赶紧注册 ~</span>
      </div>
    </div>
    <ul class="bg-bubbles">
      <li v-for="(movie, index) in ranks" :key="index" :style="movie.style"></li>
    </ul>
  </div>
</template>

<script>
import request from '@/utils/request';
import { setUser } from '@/utils/user';

export default {
  name: 'Login',
  data () {
    return {
      isRegister: false,
      user: { name: '', password: '' },
      confirmPassword: '',
      ranks: [],
    }
  },
  created() {
    this.getRank();
  },
  methods: {
    async getRank() {
      try {
        const { ranks } = await request('GET', '/rank', {
          limit: 250,
          type: '全部',
          area: '全部',
          time: '全部'
        });
        for (let i = 0; i < 10; i += 1) {
          const num = Math.floor(Math.random() * 250);
          ranks[num].style = `background: url(${ranks[num].img_src}); background-size: cover;`;
          this.ranks.push(ranks[num]);
        }
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
    async submit() {
      if (!this.user.name) {
        this.$message('用户名不能为空', 'warning');
        return;
      } else if (!this.user.password) {
        this.$message('密码不能为空', 'warning');
        return;
      } else if (this.isRegister && this.confirmPassword !== this.user.password) {
        this.$message('密码不一致', 'warning');
        this.confirmPassword = '';
        return;
      }

      const path = this.isRegister ? '/user/register' : '/user/login';

      try {
        const user = await request('POST', `${path}`, {}, {
          name: this.user.name,
          password: this.user.password
        })
        if (this.isRegister) {
          this.isRegister = false;
          this.$message('注册成功');
        } else {
          setUser(user);
          this.$router.push('/index');
        }
      } catch (err) {
        this.user.password = '';
        this.confirmPassword = '';
        this.$message(err.message, 'warning');
      }
    },
    register() {
      this.isRegister = true;
    },
    goSubmit(e) {
      if (e.keyCode === 13) this.submit();
    },
  },
}
</script>

<style lang="less" scoped>
.login-main {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  font-family: 'OpenSans';
  // background: linear-gradient(to bottom right, #00799E, #FAFBFB);
  background: linear-gradient(to bottom right, #6ABD78, #426ab3);
  // background-color: #FAFBFB;
  .content {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    .top {
      display: flex;
      align-items: center;
      h2 {
        font-size: 24px;
        // color: #53E3A6;
        color: #FFF;
        letter-spacing: 1px;
      }
      .favicon {
        width: 40px;
      }
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
        color: #6ABD78;
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
          color: #6ABD78;
          background-color: #FFF;
        }
      }
    }
    button {
      padding: 10px 15px;
      width: 280px;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
      // color: #53E3A6;
      color: #FFF;
      background-color: #1E90FF;
      border: none;
      border-radius: 3px;
      outline: none;
      transition-duration: .25s;
      cursor: pointer;
    }
    .register {
      margin: 12px 0 0 12px;
      display: flex;
      justify-content: space-between;
      color: #FFF;
      :last-child {
        margin-left: 10px;
        // color: #53E3A6;
        color: #6ABD78;
        letter-spacing: 0.8px;
        cursor: pointer;
      }
    }
  }
  .bg-bubbles {
    position: absolute;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      bottom: -300px;
      width: 180px;
      height: 240px;

      list-style: none;
      border: 1px solid #0077FF;
      animation: square 15s infinite;
      transition-timing-function: linear;
      &:nth-child(1) {
        left: 5%;
      }
      &:nth-child(2) {
        left: 10%;
        animation-delay: 2s;
        animation-duration: 7s;
      }
      &:nth-child(3) {
        left: 20%;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 30%;
        animation-duration: 8s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(5) {
        left: 40%;
      }
      &:nth-child(6) {
        left: 50%;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:nth-child(7) {
        left: 60%;
        animation-delay: 2s;
      }
      &:nth-child(8) {
        left: 70%;
        animation-delay: 4s;
        animation-duration: 15s;
      }
      &:nth-child(9) {
        left: 80%;
        animation-delay: 2s;
        animation-duration: 12s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(10) {
        left: 88%;
        animation-delay: 5s;
      }
    }
    @keyframes square {
      0% {
        opacity: .8;
        transform: translateY(0px) rotate(0deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-1200px) rotate(18deg);
      }
    }
  }
}
</style>
