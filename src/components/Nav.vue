<template>
  <div class="nav-main">
    <div class="left-side" :style="leftStyle">
      <router-link to="/">影评网</router-link>
    </div>
    <div class="right-side">
      <ul>
        <router-link v-for="(item, index) in links" :key="index" :to="item.href">
          {{ item.name }}
        </router-link>
      <i class="iconfont icon-search"></i>
      <router-link class="avatar" to="/homepage">
        <img src="static/images/avatar.jpg" alt="avatar"/>
        <span>{{ name }}</span>
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
    leftStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      links: [
        { name: '发布影评', href: '/write' },
        { name: '我爱台词', href: '/words' },
        { name: '电影排行', href: '/rank' },
        { name: '电影推荐', href: '/' }
      ],
      name: '',
    }
  },
  created() {
    if (!!getUser()) this.name = getUser().name;
  },
}
</script>

<style lang="less" scoped>
.nav-main {
  display: flex;
  padding: 0 60px;
  justify-content: space-between;
  background-color: #FFF;
  box-shadow: 0 1px 2px #F3F3F3;
  a{
    padding-right: 30px;
    color: #0077FF;
    letter-spacing: 0.1px;
    text-decoration: none;
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
    margin-left: 158px;
    color: #FFF;
    letter-spacing: 0.1px;
    cursor: pointer;
  }
  .right-side {
    ul {
      display: flex;
      align-items: center;
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
  }
}
</style>
