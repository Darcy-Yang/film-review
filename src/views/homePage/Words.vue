<template>
  <div class="words-main">
    <div class="top">
      <div class="explain">
        <span>我发过的台词</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Words'
}
</script>
<style lang="less" scoped>
.words-main {
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
