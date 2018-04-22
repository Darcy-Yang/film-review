<template>
  <div class="homepage-main">
    <Nav/>
    <div class="whole-structure">
      <div class="BI-area" v-if="!user.cover">
        <i class="iconfont icon-xiangji"></i>
        <span>请上传封面图片</span>
        <input type="file" @change="uploadCover"/>
      </div>
      <div class="BI-area" v-else>
        <img :src="user.cover" alt="cover"/>
        <div class="upload-area">
          <button>更改封面图片</button>
          <input type="file" @change="uploadCover"/>
        </div>
      </div>
      <div class="user-info">
        <div class="content">
          <div class="avatar">
            <img :src="user.avatar" alt="avatar"/>
            <div class="hover-bg">
              <input type="file" @change="uploadAvatar"/>
              <span>更换头像</span>
            </div>
          </div>
          <div class="profile">
            <span class="user-name">{{ user.name }}</span>
            <span>other info</span>
          </div>
        </div>
        <div class="setting">
          <button>编辑个人资料</button>
        </div>
      </div>
      <div class="record">
        <div class="history">
          <TabBar/>
          <transition name="fade">
            <router-view class="content"></router-view>
          </transition>
        </div>
        <div class="status">
          <h3>个人状态 👤</h3>
          <span>暂时还没想好...🤔</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import TabBar from '@/components/TabBar';

import { getUser, setUser, getToken } from '@/utils/user';
import request from '@/utils/request';
import fetch from 'isomorphic-fetch';
import { HOST } from '@/utils/config';

export default {

  name: 'HomePage',
  components: {
    Nav,
    TabBar
  },
  data () {
    return {
      user: null,
    }
  },
  created() {
    if (!!getUser()) {
      const { user } = getUser();
      this.user = user;
    }
  },
  methods: {
    async uploadCover(e) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      (async () => {
        try {
          const res = await fetch(`${HOST}/user/${this.user.id}/cover`, {
            method: 'POST',
            headers: { Authorization: getToken() },
            body: data
          });
          const { user } = await res.json();
          this.user = user.user;
          setUser(user);
          this.$message('上传封面成功');
        } catch (err) {
          this.$message(err.message, 'error');
        }
      })();
    },
    async uploadAvatar(e) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      (async () => {
        try {
          const res = await fetch(`${HOST}/user/${this.user.id}/avatar`, {
            method: 'POST',
            headers: { Authorization: getToken() },
            body: data
          });
          const { user } = await res.json();
          setUser(user);
          this.resetUser();
          this.$message('更改头像成功');
        } catch (err) {
          this.$message(err.message, 'error');
        }
      })();
    },
    resetUser() {
      const { user } = getUser();
      this.user = user;
      this.$root.$emit('changeAvatar');
    },
  },
}
</script>

<style lang="less" scoped>
.homepage-main {
  margin-top: 82px;
  min-height: 100vh;
  .whole-structure {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      outline: none;
      opacity: 0;
      cursor: pointer;
    }
    .BI-area {
      display: flex;
      position: relative;
      padding: 22px;
      width: 57%;
      height: 240px;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      color: #FFF;
      background-color: #D9D6CF;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      i {
        font-size: 32px;
      }
      span {
        margin-top: 8px;
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      .upload-area {
        position: absolute;
        top: 24px;
        right: 24px;
        button {
          padding: 0 16px;
          font-size: 14px;
          line-height: 32px;
          border-radius: 3px;
          color: hsla(0,0%,100%,.7);
          border-color: hsla(0,0%,100%,.24);
          background: none;
        }
        &:hover {
          background-color: hsla(0, 0%, 100%, .15);
        }
      }
    }
    .user-info {
      display: flex;
      width: 57%;
      padding: 22px;
      padding-bottom: 16px;
      justify-content: space-between;

      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      background-color: #FFF;
      box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
      .content {
        display: flex;
        .avatar {
          margin-top: -80px;
          position: relative;

          cursor: pointer;
          z-index: 2;
          img {
            width: 160px;
            height: 160px;
            border: 3px solid #FFF;
            border-radius: 6px;
          }
          .hover-bg {
            display: none;
            position: absolute;
            top: 3px;
            left: 3px;
            width: 160px;
            height: 160px;
            border-radius: 6px;
            background: rgba(26, 26, 26, 0.4);
            span {
              position: absolute;
              top: 40%;
              left: 30%;
              color: white;
              letter-spacing: 1px;
            }
          }
          &:hover {
            .hover-bg {
              display: block;
            }
          }
        }
        .profile {
          display: flex;
          margin-left: 20px;
          flex-direction: column;
          .user-name {
            font-size: 24px;
            font-weight: 600;
          }
        }
      }
      .setting {
        button {
          width: 120px;
          height: 35px;
          font-size: 13px;
          color: #0077FF;
          background-color: #FFF;
          border: 1px solid #0077FF;
          border-radius: 3px;
          letter-spacing: 1px;
          outline: none;
          cursor: pointer;
        }
      }
    }
    .record {
      display: flex;
      margin: 18px 0 40px 0;
      width: 60%;
      justify-content: space-between;
      .history {
        width: 68%;
        background-color: #FFF;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
      }
      .status {
        // padding: 0 12px;
        width: 26%;
        // height: 100%;
        min-height: 300px;
        background-color: #FFF;
        // background: linear-gradient(to bottom right, #6ABD78, #426ab3);
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
        h3 {
          padding: 0 12px 8px 12px;
          border-bottom: 1px solid #BDBDBD;
        }
        span {
          padding: 0 12px;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
