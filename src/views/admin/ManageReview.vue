<template>
  <div class="review-main">
    <div class="content">
      <h3>影评管理（ {{ count }} ）</h3>
      <List :descriptions="descriptions" :lists="reviews" :keys="keys"/>
    </div>
  </div>
</template>

<script>
import List from '@/components/List';

import request from '@/utils/request';

export default {
  name: 'ManageReview',
  components: {
    List,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      count: 0,
      limit: 10,
      searchWord: '',
      reviews: [],
      descriptions: ['标题', '内容', '点赞数', '评论数', '收藏数', '发布时间'],
    }
  },
  created() {
    this.getReview();
  },
  computed: {
    keys() {
      const keys = [
        'title', 'content', 'likeNum', 'commentNum', 'collectNum', 'createdAt'
      ];
      return keys;
    },
  },
  methods: {
    async getReview() {
      const { count, reviews } = await request('GET', '/review/all', {
        page: this.page,
        limit: this.limit,
        searchWord: this.searchWord
      });
      this.count = count;
      this.pageCount = Math.ceil(count / this.limit);
      this.reviews = reviews;
    },
  },
}
</script>

<style lang="less" scoped>
.review-main {
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
