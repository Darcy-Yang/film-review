<template>
  <div class="tag">
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.tag {
  padding: 20px 20px 0 0;
  span {
    padding: 2px 22px;
    color: gray;
    border-bottom: 1px solid #BDBDBD;
  }
}
</style>
