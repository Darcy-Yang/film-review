<template>
  <div class="pagination">
    <div class="pagination-main" v-if="pageCount < 7">
      <div class="item" v-for="i in pageCount" :key="i" @click="turning(i)">
        <span>{{ i }}</span>
      </div>
    </div>
    <div class="pagination-main" v-else>
      <div class="item" v-for="i in 3" :key="i + 3" @click="turning(i)">
        <span>{{ i }}</span>
      </div>
      <div class="item">
        <span>...</span>
      </div>
      <div class="item" v-for="i in [2, 1, 0]" :key="i" @click="turning(pageCount - i)">
        <span>{{ pageCount - i }}</span>
      </div>
      <div class="jump">
        <span>前往</span>
        <input type="text" v-model="jumpPage" @change="turning(jumpPage)"/>
        <span>页</span>
      </div>
    </div>
  </div>
</template>

<script>
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
      jumpPage: '',
    }
  },
  methods: {
    turning(i) {
      if (i < 0 || !i) {
        i = 1;
      } else if (i > this.pageCount) {
        i = this.pageCount;
      }
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
  .jump {
    float: left;
    font-size: 13px;
    color: #606266;
    input {
      margin: 0 1px;
      padding: 0 3px;
      width: 42px;
      height: 25px;

      font-size: 14px;
      text-align: center;
      color: #606266;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      outline: none;
    }
  }
}
</style>
