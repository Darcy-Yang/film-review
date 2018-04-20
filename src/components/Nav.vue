<template>
  <div class="nav-main">
    <div class="left-side">
      <img src="static/images/favicon.png" alt="favicon"/>
      <router-link to="/index">影评网</router-link>
    </div>
    <div class="right-side">
      <ul>
        <div class="search">
          <i class="iconfont icon-search" @click="search"></i>
          <input type="text" :placeholder="placeholder" v-model="searchWord" @keydown="goSearch"/>
        </div>
        <router-link v-for="(item, index) in links" active-class="actived" :key="index" :to="item.href">
          {{ item.name }}
        </router-link>
        <router-link class="avatar" to="/homepage">
          <img :src="user.avatar" alt="avatar"/>
          <span>{{ user.name }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
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
        { name: '发布影评', href: '/write' },
        { name: '电影台词', href: '/words' },
        { name: '电影大全', href: '/rank' },
        { name: '电影推荐', href: '/index' }
      ],
      searchWord: '',
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
    goSearch(e) {
      if (e.keyCode === 13) this.search();
    },
    search() {
      this.$emit('search', this.searchWord);
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
  width: 100%;
  justify-content: space-between;
  background-color: #FFF;
  box-shadow: 0 1px 2px #F3F3F3;
  z-index: 3;
  a{
    margin-right: 30px;
    padding: 2px 6px;
    color: #0077FF;
    letter-spacing: .4px;
    text-decoration: none;
    border-radius: 4px;
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
    margin-left: 12%;
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
      display: flex;
      align-items: center;
      .search {
        margin-right: 12px;
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
          width: 140px;
          font-size: 14px;
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
        font-size: 24px;
        color: #0077FF;
        line-height: 16px;
        cursor: pointer;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .actived {
      color: #FFF;
      background-color: #0077FF;
    }
  }
}
</style>
