<template>
  <div class="bar-main">
    <div class="tabs">
      <router-link to="/homepage" active-class="active">
        <span>动态</span>
      </router-link>
      <router-link to="/homepage/review" active-class="active">
        <span>影评</span>
      </router-link>
      <router-link to="/homepage/words" active-class="active">
        <span>台词</span>
      </router-link>
      <router-link to="/homepage/like" active-class="active">
        <span>喜欢</span>
      </router-link>
      <router-link to="/homepage/share" active-class="active">
        <span>分享</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryBar'
}
</script>

<style lang="less" scoped>

</style>
