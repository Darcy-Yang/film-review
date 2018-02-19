<template>
  <div class="bar-main">
    <div class="tabs">
      <!-- 添加 exact 后，下链接只在地址为／时激活，exact：全包含匹配； -->
      <router-link to="/homepage" exact active-class="active">
        <span>动态</span>
      </router-link>
      <router-link to="/homepage/review" active-class="active">
        <span>影评</span>
        <span>0</span>
      </router-link>
      <router-link to="/homepage/words" active-class="active">
        <span>台词</span>
        <span>0</span>
      </router-link>
      <router-link to="/homepage/like" active-class="active">
        <span>喜欢</span>
        <span>0</span>
      </router-link>
      <router-link to="/homepage/share" active-class="active">
        <span>分享</span>
        <span>0</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="less" scoped>
.bar-main {
  padding: 20px;
  padding-bottom: 0;
  border-bottom: 1px solid #BDBDBD;
  .tabs {
    display: flex;
    a {
      margin-right: 40px;
      padding-bottom: 12px;
      color: #000;
      text-decoration: none;
      &.active {
        border-bottom: 2px solid red;
        font-weight: 600;
      }
    }
  }
}
</style>
