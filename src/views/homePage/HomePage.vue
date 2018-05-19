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
          <div class="description">
            <i class="iconfont icon-like"></i>
            <span>影评获得喜欢{{ reviewLikeNum }}次</span>
          </div>
          <div class="description">
            <i class="iconfont icon-like"></i>
            <span>台词获得喜欢{{ wordsLikeNum }}次</span>
          </div>
          <div class="description">
            <i class="iconfont icon-liulan"></i>
            <span>影评被阅读{{ reviewNum }}次</span>
          </div>
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
      reviewLikeNum: 0,
      reviewNum: 0,
      wordsLikeNum: 0,
    }
  },
  created() {
    if (!!getUser()) {
      const { user } = getUser();
      this.user = user;
    }
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const { reviewLikeNum, reviewNum, wordsLikeNum } = await request('GET', `/user/${this.user.id}`);
      this.reviewLikeNum = reviewLikeNum;
      this.reviewNum = reviewNum;
      this.wordsLikeNum = wordsLikeNum;
    },
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
  // margin-top: 82px;
  margin-top: 2.24rem;
  min-height: 100vh;
  .whole-structure {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    font-size: .3rem;
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
      width: 68%;
      height: 4rem;
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
        top: 0;
        left: 0;
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
          padding: 0 0.3rem;
          font-size: .26rem;
          line-height: .6rem;
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
      width: 68%;
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
          margin-top: -1.3rem;
          position: relative;

          cursor: pointer;
          z-index: 2;
          img {
            width: 320px; /*px*/
            height: 320px; /*px*/
            border: 8px solid #FFF; /*px*/
            border-radius: 6px;
          }
          .hover-bg {
            display: none;
            position: absolute;
            top: 8px; /*px*/
            left: 8px; /*px*/
            width: 320px; /*px*/
            height: 320px; /*px*/
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
            font-size: .4rem;
            font-weight: 600;
          }
        }
      }
      .setting {
        button {
          // width: 120px;
          width: 100%;
          height: .6rem;
          padding: 0 0.3rem;
          font-size: .26rem;
          color: #0077FF;
          background-color: #FFF;
          border: 1px solid #0077FF;
          border-radius: .08rem;
          letter-spacing: 1px;
          outline: none;
          cursor: pointer;
        }
      }
    }
    .record {
      display: flex;
      margin: 18px 0 40px 0;
      width: 68%;
      justify-content: space-between;
      .history {
        margin-left: -22px;
        width: 68%;
        background-color: #FFF;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
      }
      .status {
        margin-right: -22px;
        display: flex;
        flex-direction: column;
        width: 32%;
        min-height: 5.21rem;
        height: 100%;
        background-color: #FFF;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
        h3 {
          padding: 0 12px 8px 12px;
          border-bottom: 1px solid #BDBDBD;
        }
        .description {
          padding: 0 12px;
          color: #646464;
          i {
            font-size: 48px; /*px*/
          }
        }
      }
    }
    @media screen and (max-device-width: 600px) {
      .BI-area, .user-info {
        width: 74%;
      }
      .record{
        width: 80%;
        .history {
          margin-left: 0;
          width: 100%;
        }
        .status {
          display: none;
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
