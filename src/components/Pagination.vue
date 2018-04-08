<template>
  <div class="pagination">
    <div class="pagination-main" v-if="pageCount < 7">
      <div class="item" v-for="i in pageCount" :class="inited && i === 1 ? 'actived' : ''" :key="i" @click="turning(i)" ref="pagination">
        <span>{{ i }}</span>
      </div>
    </div>
    <div class="pagination-main" v-else>
      <div class="item" :class="item.selected ? 'actived' : ''" v-for="item in topHalf" :key="item.index + 3" @click="turning(item.index, item)">
        <span>{{ item.index }}</span>
      </div>
      <div class="item">
        <span>...</span>
      </div>
      <div class="item" :class="item.selected ? 'actived' : ''" v-for="item in lastHalf" :key="item.index" @click="turning(pageCount - item.index, item)">
        <span>{{ pageCount - item.index }}</span>
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
      topHalf: [
        { index: 1, selected: false },
        { index: 2, selected: false },
        { index: 3, selected: false }
      ],
      lastHalf: [
        { index: 2, selected: false },
        { index: 1, selected: false },
        { index: 0, selected: false }
      ],
      inited: false,
    }
  },
  created() {
    if (this.pageCount > 6) {
      this.topHalf[0].selected = true;
    } else {
      this.inited = true;
    }
  },
  methods: {
    turning(i, item) {
      if (this.inited) this.inited = false;
      if (this.pageCount > 6) {
        this.topHalf.forEach(item => item.selected = false);
        this.lastHalf.forEach(item => item.selected = false);
        if (item) item.selected = true;
      } else {
        this.$refs.pagination.forEach(item => item.className = 'item');
        this.$refs.pagination[i - 1].className = 'item actived';
      }
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
  .actived {
    color: #0077FF;
    border-color: #0077FF;
  }
}
</style>
