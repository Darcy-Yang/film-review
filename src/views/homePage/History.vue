<template>
  <div class="history-main">
    <div class="top">
      <div class="explain">
        <span>我的动态</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History'
}
</script>
<style lang="less" scoped>
.history-main {
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
