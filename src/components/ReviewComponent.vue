<template>
  <div class="review-component">
    <div class="main">
      <div class="content" v-if="reviews.length" v-for="(review, index) in reviews" :key="index">
        <div class="top">
          <avatar-and-name :name="review.user.name" :avatar="review.user.avatar"/>
          <div class="review-content">
            <span>{{ review.title }}</span>
            <span>{{ review.content }}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="feature">
            <div class="like btn" :class="review.isLiked ? 'actived' : ''" @click="like(review)">
              <i class="iconfont icon-like"></i>
              <span>{{ review.likeNum }}</span>
            </div>
            <div class="comment btn" @click="openComment(review)">
              <i class="iconfont icon-comment"></i>
              <span>{{ review.commentNum }}</span>
            </div>
            <div class="collect btn">
              <i class="iconfont icon-collect"></i>
              <span>{{ review.collectNum }}</span>
            </div>
          </div>
          <span class="time">{{ review.updatedAt }}</span>
        </div>
        <div class="comment-list" v-show="review.showComment">
          <div class="comment-creator">
            <div class="comment-input" contenteditable="true" ref="comment" @focus="eventListener" @blur="eventListener">
              {{ entered ? '' : '写下你的评论...' }}
            </div>
            <button @click="submit(review, index)">评论</button>
          </div>
          <div class="comment" v-for="comment in comments" :key="comment.id">
            <div class="comment-content">
              <avatar-and-name :name="comment.user.name" :avatar="comment.user.avatar"/>
              <span class="separate">:</span>
              <span>{{ comment.content }}</span>
            </div>
            <span class="time">{{ comment.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarAndName from '@/components/AvatarAndName';

import request from '@/utils/request';

export default {
  name: 'ReviewComponent',
  components: {
    AvatarAndName,
  },
  props: {
    reviews: {
      type: Array,
      default: [],
    },
    userId: {
      type: Number,
      default: 0,
    },
    getReview: {
      type: Function
    },
  },
  data() {
    return {
      name: 'name',
      avatar: 'static/images/avatar.jpg',
      showComment: false,
      comments: [],
      commentPage: 1,
      limit: 10,
      entered: false,
    }
  },
  methods: {
    async like(review) {
      try {
        await request('POST', `/like/${review.id}`, {}, {
          senderId: this.userId,
          receiverId: review.userId
        });
        this.getReview();
      } catch (err) {
        console.log(err);
      }
    },
    async getComment(review) {
      try {
        const { count, comments } = await request('GET', `/comment/${review.id}`, {
          page: this.commentPage,
          limit: this.limit,
        });
        // this.commentCount = count;
        this.comments = comments;
      } catch (err) {
        console.log(err);
      }
    },
    async submit(review, index) {
      if (!this.$refs.comment[index].innerText) {
        alert('评论内容不能为空');
        return;
      }
      try {
        await request('POST', `/comment/${review.id}`, {}, {
          senderId: this.userId,
          receiverId: review.userId,
          content: this.$refs.comment[index].innerText
        });
        this.$refs.comment[index].innerText = '';
        this.getComment(review);
        review.commentNum += 1;
      } catch (err) {
        console.log(err);
      }
    },
    openComment(review) {
      if (review.showComment) {
        review.showComment = false;
        return;
      }
      this.reviews.forEach(review => review.showComment = false);
      review.showComment = true;
      this.getComment(review);
    },
    eventListener() {
      this.entered = !this.entered;
    },
  },
}
</script>

<style lang="less" scoped>
.review-component {
  .main {
    display: flex;
    flex-direction: column;
    .content {
      margin: 8px 0;
      padding: 12px;
      display: flex;
      flex-direction: column;

      width: 100%;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(26, 26, 26, .2);
      .top {
        display: flex;
        flex-direction: row;
        .review-content {
          width: 80%;
          margin-left: 12px;
          padding: 4px 8px;
          display: flex;
          flex-direction: column;

          word-break: break-all;
          border-radius: 3px;
          background-color: #D9D6CF;
        }
      }
      .bottom {
        margin-top: 12px;
        padding-right: 8px;
        display: flex;
        justify-content: space-between;
        .feature {
          display: flex;
          .btn {
            margin: 0 8px;
            cursor: pointer;
          }
          .actived {
            color: #0077FF;
          }
          .like {
            i {
              font-size: 18px;
            }
          }
          .comment {
            i {
              font-weight: 600;
            }
          }
        }
      }
      .comment-list {
        margin-top: 4px;
        display: flex;
        flex-direction: column;
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
            border: 1px solid rgba(26, 26, 26, 0.3);
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
        .comment {
          margin: 4px 0;
          padding-right: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .comment-content {
            display: flex;
            align-items: center;
            .separate {
              margin: 0 4px;
            }
          }
        }
      }
      .time {
        font-size: 14px;
        color: #8590A6;
      }
    }
  }
}
</style>
