<template>
  <div class="nav-main">
    <div class="left-side">
      <span>电影点评</span>
    </div>
    <div class="right-side">
      <ul>
        <router-link v-for="(item, index) in links" :key="index" :to="item.href">
          {{ item.name }}
        </router-link>
        <i class="iconfont icon-search"></i>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      links: [
        { name: '发布影评', href: '/' },
        { name: '精彩影评', href: '/' },
        { name: '电影排行', href: '/' },
        { name: '电影推荐', href: '/' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.nav-main {
  display: flex;
  padding: 10px 60px;
  justify-content: space-between;
  background-color: #0077FF;
  .left-side {
    margin: auto 0;
    color: #FFF;
    letter-spacing: 0.1px;
    cursor: pointer;
  }
  .right-side {
    ul {
      display: flex;
      a{
        padding-right: 30px;
        color: #FFF;
        letter-spacing: 0.1px;
        text-decoration: none;
      }
      i {
        margin-top: 3.4px;
        padding-right: 30px;
        font-size: 24px;
        color: #FFF;
        line-height: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>
