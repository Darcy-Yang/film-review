<template>
  <div class="words-main">
    <div class="top">
      <div class="explain">
        <span>我的台词</span>
      </div>
      <div class="words-content" v-for="word in words" :key="word.id">
        <div class="info">
          <span>{{ word.title }}</span>
        </div>
        <div class="situation">
          <span>{{ word.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Words',
  data() {
    return {
      user: null,
      words: [],
    }
  },
  created() {
    const { user } =getUser();
    this.user = user;
    this.getWords(this.user.id)
  },
  methods: {
    async getWords(id) {
      try {
        const { words } = await request('GET', `/words/${id}/all`);
        this.words = words;
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>
<style lang="less" scoped>
.words-main {
  .top {
    padding: .3rem;
    padding-bottom: 0;
    min-height: 440px; /*px*/
    // overflow: scroll;
    .explain {
      padding-bottom: 12px;
      font-weight: 600;
    }
    .words-content {
      padding: 24px 0 16px 0; /*px*/
      border-top: 1px solid #BDBDBD;
      .info {
        font-size: .32rem;
        font-weight: 600;
        cursor: pointer;
        span:hover {
          color: #175199;
        }
      }
      .situation {
        font-size: .26rem;
        color: #8590A6;
      }
    }
  }
}
</style>
