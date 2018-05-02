<template>
  <div class="share-main">
    <div class="top">
      <div class="explain">
        <span>我的收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Share'
}
</script>
<style lang="less" scoped>
.share-main {
  .top {
    padding: .3rem;
    padding-bottom: 0;
    min-height: 440px; /*px*/
    // overflow: scroll;
    .explain {
      padding-bottom: 12px;
      font-weight: 600;
      border-bottom: 1px solid #BDBDBD;
    }
  }
}
</style>
