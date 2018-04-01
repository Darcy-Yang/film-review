<template>
  <div class="like-main">
    <div class="top">
      <div class="explain">
        <span>我喜欢的</span>
      </div>
      <div v-for="(like, index) in likes" :key="index">
        <div class="info">
          <span>{{ like.review.title }}</span>
        </div>
        <div class="situation">
          <span>{{ like.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Like',
  data() {
    return {
      likes: [],
    }
  },
  created() {
    const { user } = getUser();
    this.getLikes(user.id);
  },
  methods: {
    async getLikes(id) {
      try {
        const { likes } = await request('GET', `/like/${id}/all`);
        this.likes = likes;
      } catch (err) {
        console.log(err);
      }
    },
  },
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
