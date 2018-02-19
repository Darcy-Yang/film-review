<template>
  <div class="review-main">
    <div class="top">
      <div class="explain">
        <span>我的影评</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review'
}
</script>
<style lang="less" scoped>
.review-main {
  .top {
    padding: 20px;
    padding-bottom: 0;
    .explain {
      padding-bottom: 12px;
      font-weight: 600;
      border-bottom: 1px solid #BDBDBD;
    }
  }
}
</style>
