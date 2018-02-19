<template>
  <div class="like-main">
    <div class="top">
      <div class="explain">
        <span>我喜欢的</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Like'
}
</script>
<style lang="less" scoped>
.like-main {
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
