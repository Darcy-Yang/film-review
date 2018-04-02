<template>
  <div class="review-main">
    <Nav/>
    <div class="content">
      <div class="review-info">
        <div class="left">
          <img :src="currentReview.rank.img_src" alt="poster"/>
        </div>
        <div class="right">
          <h3>{{ currentReview.rank.title }}</h3>
          <span>{{ currentReview.rank.info }}</span>
          <span>{{ currentReview.rank.movie_type }}</span>
          <span>豆瓣评分: {{ currentReview.rank.star }}</span>
          <span>{{ currentReview.rank.votes }}</span>
          <span>{{ currentReview.rank.quote }}</span>
        </div>
      </div>
      <div class="comment">
        <div class="comment-creator">
          <div class="comment-input" contenteditable="true" ref="comment" @focus="eventListener" @blur="eventListener">
            {{ entered ? '' : '写下你的评论...' }}
          </div>
          <button @click="submit">评论</button>
        </div>
        <div class="comment-list" v-for="(comment, index) in comments" :key="index">
          <div class="comment-content">
            <avatar-and-name :name="comment.user.name" :avatar="comment.user.avatar"/>
            <span>:</span>
            <span class="text">{{ comment.content }}</span>
            <div>
              <span class="time">{{ comment.updatedAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import AvatarAndName from '@/components/AvatarAndName';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'review',
  components: {
    Nav,
    AvatarAndName
  },
  data () {
    return {
      entered: false,
      currentReview: null,
      currentUser: null,
      page: 1,
      limit: 10,
      count: 0,
      comments: [],
    }
  },
  created() {
    if (this.$route.params.review) {
      localStorage.setItem('CURRENT_REVIEW', JSON.stringify(this.$route.params.review));
    }
    if (getUser()) {
      const { user } = getUser();
      this.currentUser = user;
    }
    this.currentReview = JSON.parse(localStorage.getItem('CURRENT_REVIEW'));
    this.getComment();
  },
  methods: {
    eventListener() {
      this.entered = !this.entered;
      if (!this.$refs.comment.innerText) this.entered = false;
    },
    async getComment() {
      try {
        const { count, comments } = await request('GET', `/comment/${this.currentReview.id}`, {
          page: this.page,
          limit: this.limit
        });
        this.count = count;
        this.comments = comments;
      } catch (err) {
        console.log(err);
      }
    },
    async submit() {
      if (!this.$refs.comment.innerText) {
        alert('评论内容不能为空');
        return;
      }
      try {
        await request('POST', `/comment/${this.currentReview.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: this.currentReview.userId,
          content: this.$refs.comment.innerText
        });
        this.$refs.comment.innerText = '';
        this.getComment();
      } catch (err) {
        console.log(err);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.review-main {
  .content {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .review-info {
      display: flex;
      align-items: center;
      width: 40%;
      .left {
        img {
          width: 160px;
        }
      }
      .right {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
      }
    }
    .comment {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      width: 40%;
      .comment-creator {
        display: flex;
        width: 100%;
        .comment-input {
          padding: 6px 12px;
          width: 82%;
          height: 100%;

          font-size: 15px;
          line-height: 18px;
          letter-spacing: .2px;
          color: gray;

          outline: none;
          border: 1px solid rgba(26, 26, 26, .3);
          border-radius: 4px;
        }
        button {
          margin-left: 12px;
          align-self: flex-end;
          width: 8%;
          height: 30px;

          letter-spacing: .8px;
          color: #FFF;
          background-color: #0077FF;
          border: none;
          outline: none;
          border-radius: 4px;

          cursor: pointer;
        }
      }
      .comment-list {
        margin: 12px 0 6px 0;
        display: flex;
        flex-direction: column;
        .comment-content {
          display: flex;
          .text {
            margin-left: 12px;
          }
        }
      }
    }
  }
}
</style>
