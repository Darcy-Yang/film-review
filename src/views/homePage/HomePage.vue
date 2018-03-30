<template>
  <div class="homepage-main">
    <Nav :leftStyle="leftStyle"/>
    <div class="whole-structure">
      <div class="BI-area">
        <i class="iconfont icon-xiangji"></i>
        <span>请上传封面图片</span>
        <input type="file"/>
      </div>
      <div class="user-info">
        <div class="content">
          <img src="static/images/avatar.jpg" alt="avatar"/>
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
          <!-- <transition name="fade"> -->
          <router-view class="content"></router-view>
          <!-- </transition> -->
        </div>
        <div class="status">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import TabBar from '@/components/TabBar';

import { getUser } from '@/utils/user';

export default {
  name: 'HomePage',
  components: {
    Nav,
    TabBar
  },
  data () {
    return {
      leftStyle: 'margin-left: 226px;',
      user: null,
    }
  },
  created() {
    if (!!getUser()) {
      const { user } = getUser();
      this.user = user;
    }
  },
}
</script>

<style lang="less" scoped>
.homepage-main {
  background-color: #F6F6F6;
  .whole-structure {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    .BI-area {
      display: flex;
      position: relative;
      width: 60%;
      height: 240px;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      color: gray;
      background-color: rgba(128, 128, 128, .3);
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      i {
        font-size: 32px;
      }
      span {
        margin-top: 8px;
      }
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
        img {
          margin-top: -80px;
          width: 160px;
          height: 160px;
          border: 3px solid #FFF;
          border-radius: 6px;
          z-index: 2;
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
          cursor: pointer;
        }
      }
    }
    .record {
      display: flex;
      margin: 18px 0 40px 0;
      width: 60%;
      height: 300px;
      justify-content: space-between;
      .history {
        width: 68%;
        background-color: #FFF;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
      }
      .status {
        width: 30%;
        background-color: #FFF;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
      }
    }
  }
}
</style>
