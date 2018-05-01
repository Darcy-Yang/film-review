<template>
  <div class="words-main">
    <div class="content">
      <h3>台词管理（ {{ count }} ）</h3>
      <List :descriptions="descriptions" :lists="words" :keys="keys"/>
    </div>
  </div>
</template>

<script>
import List from '@/components/List';

import request from '@/utils/request';

export default {
  name: 'ManageWords',
  components: {
    List,
  },
  data() {
    return {
      page: 0,
      pageCount: 0,
      count: 0,
      limit: 10,
      searchWords: '',
      words: [],
      descriptions: ['影名', '台词', '点赞数', '收藏数', '发布时间'],
    }
  },
  created() {
    this.getWords();
  },
  computed: {
    keys() {
      const keys = [
        'title', 'content', 'likeNum', 'collectNum', 'createdAt'
      ];
      return keys;
    },
  },
  methods: {
    async getWords() {
      const { count, words } = await request('GET', '/words/all', {
        page: this.page,
        limit: this.limit,
        searchWords: this.searchWords
      });
      this.count = count;
      this.pageCount = Math.ceil(count / this.limit);
      this.words = words;
    },
  },
}
</script>

<style lang="less" scoped>
.words-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin: 18px 0; /*px*/
    width: 88%;
    h3 {
      color: #7E8282;
      letter-spacing: .8px; /*px*/
    }
  }
}
</style>
