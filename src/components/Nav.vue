<template>
  <div class="nav-main">
    <div class="left-side">
      <img src="static/images/favicon.png" alt="favicon"/>
      <router-link to="/index">影评网</router-link>
      <router-link v-for="(item, index) in links" active-class="actived" :key="index" :to="item.href">
        {{ item.name }}
      </router-link>
    </div>
    <div class="right-side">
      <ul>
        <span class="add-words" v-if="$route.path === '/words'" @click="addWords">添加台词</span>
        <router-link to="/write" active-class="actived" v-else>写影评</router-link>
        <div class="search">
          <i class="iconfont icon-search" @click="search"></i>
          <input type="text" :placeholder="placeholder" v-model="searchWord" @keydown="goSearch"/>
        </div>
        <div class="notice" @click="openNotice" v-click-outside="closeNotice">
          <i class="iconfont icon-notice"></i>
          <span class="num" v-if="noticeCount > 0">{{ noticeCount }}</span>
          <div class="notice-content" v-if="noticeCount > 0 && showNotice">
            <div class="arrow"></div>
            <div class="content" :class="!notice.checked ? 'actived' : ''" v-for="notice in noticeLike" :key="notice.id" @click="check(notice)">
              <span>{{ notice.user.name }} 赞同了你的影评 {{ notice.review.title }}</span>
            </div>
          </div>
        </div>
        <router-link class="avatar" to="/homepage">
          <img :src="user.avatar" alt="avatar"/>
          <span>{{ user.name }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Nav',
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
  },
  data () {
    return {
      links: [
        { name: '电影台词', href: '/words' },
        { name: '电影大全', href: '/rank' },
        { name: '电影推荐', href: '/recommend' }
      ],
      searchWord: '',
      user: null,
      noticeCount: 0,
      noticeLike: [],
      showNotice: false,
    }
  },
  created() {
    if (!!getUser()) {
      const { user } = getUser();
      this.user = user;
    }
    this.getNotice();
  },
  methods: {
    async getNotice() {
      const { count, noticeLike } = await request('GET', `/user/notice/${this.user.id}`);
      this.noticeCount = count;
      this.noticeLike = noticeLike;
    },
    async check(notice) {
      await request('POST', '/user/check', {}, { id: notice.id });
      this.getNotice();
    },
    openNotice() {
      this.showNotice = !this.showNotice;
    },
    closeNotice() {
      this.showNotice = false;
    },
    goSearch(e) {
      if (e.keyCode === 13) this.search();
    },
    search() {
      this.$emit('search', this.searchWord);
    },
    addWords() {
      this.$emit('addWords');
    },
  },
  mounted() {
    this.$root.$on('changeAvatar', () => {
      const { user } = getUser();
      this.user = user;
    })
  },
}
</script>

<style lang="less" scoped>
.nav-main {
  position: fixed;
  top: 0;
  display: flex;
  padding: 40px 0;/*px*/
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: .28rem;
  background: linear-gradient(to bottom right, #6ABD78, #426ab3);
  box-shadow: 0 1px 2px #F3F3F3;
  z-index: 3;
  // opacity: .9;
  a{
    margin-right: 30px;
    padding: 2px 6px;
    color: #FFF;
    letter-spacing: .4px;
    text-decoration: none;
    padding-bottom: 4px;
  }
  .avatar {
    padding: 0;
    height: 30px;
    display: flex;
    align-items: center;
    img {
      margin-right: 8px;
    }
  }
  .left-side {
    margin: auto 0;
    margin-left: 4%;
    display: flex;
    align-items: center;
    color: #FFF;
    letter-spacing: 0.1px;
    cursor: pointer;
    img {
      width: 40px;
    }
  }
  .right-side {
    padding-right: 40px;
    ul {
      margin: 0;
      display: flex;
      align-items: center;
      .add-words {
        margin-right: 30px;
        padding: 4px 8px;
        font-size: 14px;
        letter-spacing: .4px;
        color: #0077FF;
        background-color: #FAFBFB;
        border-radius: 4px;

        cursor: pointer;
      }
      .search {
        margin-right: 30px;
        padding: 6px;
        display: flex;
        align-items: center;
        border: 1px solid #BDBDBD;
        border-radius: 4px;
        background-color: #F6F6F6;
        i {
          margin: 0;
          padding: 0;
        }
        input {
          width: 2.2rem;
          padding-left: 4px;
          font-size: .26rem;
          border: none;
          outline: none;
          background-color: #F6F6F6;
          transition: width .6s;
          &:focus {
            width: 200px;
          }
        }
      }
      i {
        margin-top: 3.4px;
        padding-right: 30px;
        font-size: .4rem;
        color: #0077FF;
        line-height: 16px;
        cursor: pointer;
      }
      .notice {
        position: relative;
        margin: 0 24px; /*px*/
        display: flex;
        align-items: center;
        cursor: pointer;
        i {
          padding: 0;
          font-size: 48px; /*px*/
          color: #FFF;

          transition: all .4s;
          &:hover {
            color: #0077FF;
          }
        }
        .num {
          padding: 4px 16px; /*px*/
          color: #FFF;
          background-color: #0077FF;
          border-radius: 50%;
        }
        .notice-content {
          padding: 0 24px; /*px*/
          position: fixed;
          top: 140px; /*px*/
          right: 44px; /*px*/
          background-color: #FFF;
          border-radius: 8px; /*px*/
          box-shadow: 0 2px 6px rgba(26, 26, 26, .3); /*px*/
          .arrow {
            position: absolute;
            top: -40px; /*px*/
            left: 43%;
            width: 0;
            height: 0;
            border-left: 20px solid transparent; /*px*/
            border-right: 20px solid transparent; /*px*/
            border-bottom: 40px solid #FFF; /*px*/
          }
          .content {
            margin: 4px 0; /*px*/
            padding: 28px 0; /*px*/
            width: 460px; /*px*/
            border-bottom: 1px solid #EBEBEB;
            &:last-child {
              border: none;
            }
          }
          .actived {
            color: #0077FF;
            // background-color: #BDBDBD;
          }
        }
      }
      img {
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
      }
    }
  }
  .actived {
    padding-bottom: 2px;
    border-bottom: 2px solid #6ABD78;
  }
  @media screen and (max-device-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    height: 2rem;
    .left-side {
      margin: 0;
      margin-bottom: .2rem;
    }
    .right-side ul {
      img {
        width: .6rem;
        height: .6rem;
      }
      span {
        font-size: .38rem;
      }
    }
  }
}
</style>
