<template>
  <div class="pagination">
    <div class="item" v-for="i in pageCount" :key="i" @click="turning(i)">
      <span>{{ i }}</span>
    </div>
  </div>
</template>

<script>
import event from '@/utils/event';

export default {
  name: 'Pagination',
  props: {
    pageCount: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      page: 0,
    }
  },
  methods: {
    turning(i) {
      this.$root.$emit('currentPage', i);
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  margin: 8px 0 20px 0;
  .item {
    float: left;
    margin-right: 12px;
    padding: 3px 13px;
    font-size: 14px;
    font-weight: 600;
    background-color: #FFF;
    border: 1px solid #D9D6CF;
    border-radius: 4px;

    cursor: pointer;

    &:hover {
      color: #0077FF;
      border-color: #0077FF;
    }
  }
}
</style>
