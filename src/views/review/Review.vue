<template>
  <div class="review-main">
    <Nav/>
    <div class="content">
      <div class="left-content">
        <img :src="currentReview.rank.img_src" alt="poster"/>
        <span class="title">{{ currentReview.rank.title }}</span>
        <span>{{ currentReview.rank.info }}</span>
          <span>{{ currentReview.rank.type }}</span>
          <span>豆瓣评分: {{ currentReview.rank.star }}</span>
          <span class="quote">{{ currentReview.rank.quote }}</span>
      </div>
      <div class="right-content">
        <h3>用户影评</h3>
        <div class="review-content">
          <div class="reviews" v-for="(review, index) in reviews" :key="review.id" ref="review">
            <div class="top">
              <avatar-and-name :avatar="review.user.avatar" :name="review.user.name" :avatarStyle="avatarStyle"/>
              <span>{{ review.updatedAt }}</span>
            </div>
            <span class="title">{{ review.title }}</span>
            <span class="text">{{ review.content }}</span>
            <div class="feature">
              <div class="like btn" :class="review.isLiked ? 'actived' : ''" @click="operate(review, true)">
                <i class="iconfont icon-like"></i>
                <span>{{ review.likeNum }}</span>
              </div>
              <div class="comment btn" @click="openComment(review, index)">
                <i class="iconfont icon-comment"></i>
                <span>{{ review.commentNum }}</span>
              </div>
              <div class="collect btn" :class="review.isCollected ? 'actived' : ''" @click="operate(review, false)">
                <i class="iconfont icon-collect-b"></i>
                <span>{{ review.collectNum }}</span>
              </div>
            </div>
            <div class="comment-list" v-show="review.showComment" :style="commentStyle">
              <div class="comment-input">
                <textarea type="text" placeholder="写下你的评论" :style="inputStyle" v-model="comment"/>
                <button @click="submit(review)">评论</button>
              </div>
              <div class="comments" v-for="comment in comments" :key="comment.id">
                <div class="comment-content">
                  <avatar-and-name :name="comment.user.name" :avatar="comment.user.avatar"/>
                  <span class="text">{{ comment.content }}</span>
                  <span class="time">{{ comment.updatedAt }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="reviews add" @click="openModal">
            <i class="iconfont icon-add-b"></i>
            <span>添加影评</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showModal">
      <container class="container" v-click-outside="closeModal" v-on:container="addReview"
      :firstPlaceHolder="firstPlaceHolder" :secondPlaceHolder="secondPlaceHolder" :cancel="closeModal"/>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
import AvatarAndName from '@/components/AvatarAndName';
import Container from '@/components/Container';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'review',
  components: {
    Nav,
    AvatarAndName,
    Container,
  },
  data () {
    return {
      avatarStyle: 'width: 30px; height: 30px;',
      entered: false,
      currentReview: null,
      currentUser: null,
      page: 1,
      commentPage: 1,
      limit: 10,
      count: 0,
      commentCount: 0,
      reviews: [],
      comments: [],
      comment: '',
      commentStyle: '',
      inputStyle: '',
      showModal: false,
      showComment: false,
      firstPlaceHolder: '影评内容',
      secondPlaceHolder: '标题',
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
    this.currentReview = this.$route.params.review ? this.$route.params.review : JSON.parse(localStorage.getItem('CURRENT_REVIEW'));
    this.getReview();
  },
  methods: {
    async getReview() {
      try {
        const { count, reviews } = await request('GET', `/review/${this.currentUser.id}/movie/${this.currentReview.movieId}`, {
          page: this.page,
          limit: this.limit
        });
        this.count = count;
        this.reviews = reviews;
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
        this.commentCount = count;
        this.comments = comments;
      } catch (err) {
        console.log(err);
      }
    },
    async operate(review, isLike) {
      const path = isLike ? `/like/${review.id}` : `/collect/${review.id}`;
      try {
        await request('POST', path, {}, {
          senderId: this.currentUser.id,
          receiverId: review.userId
        });
        this.getReview();
      } catch (err) {
        console.log(err);
      }
    },
    async submit(review) {
      if (!this.comment) {
        alert('评论内容不能为空');
        return;
      }
      try {
        await request('POST', `/comment/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.userId,
          content: this.comment
        });
        this.comment = '';
        review.commentNum += 1;
        this.getComment(review);
      } catch (err) {
        console.log(err);
      }
    },
    async addReview(title, content) {
      if (!title) {
        alert('标题不能为空');
        return;
      } else if (!content) {
        alert('内容不能为空');
        return;
      }
      try {
        await request('POST', '/review', {}, {
          userId: this.currentUser.id,
          movieId: this.currentReview.movieId,
          title,
          content
        });
        this.closeModal();
        this.getReview();
      } catch (err) {
        console.log(err);
      }
    },
    openModal() {
      this.showModal = true;
      setTimeout(scrollTo(0, 0), 100);
      this.reviews.forEach(review => review.showComment = false);
    },
    closeModal() {
      this.showModal = false;
    },
    openComment(review, index) {
      const width = Math.floor(this.$refs.review[index].getBoundingClientRect().width);
      this.comment = '';
      this.comments = [];
      if (review.showComment) {
        review.showComment = false;
        return;
      }
      this.reviews.forEach(review => review.showComment = false);
      review.showComment = true;
      this.commentStyle = `width: ${width - 40}px;`;
      this.inputStyle = `width: ${width - 100}px`;
      this.getComment(review);
    },
  },
}
</script>

<style lang="less" scoped>
.review-main {
  background-color: #3D5363;
  min-height: 100vh;
  .content {
    margin: 40px auto 0 auto;
    display: flex;
    width: 80%;
    .left-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      width: 210px;
      height: 100%;
      padding: 0 20px 30px 20px;
      color: #FFF;
      background-color: #F0D165;
      img {
        position: absolute;
        top: -20px;
        width: 210px;
        height: 315px;
        box-shadow: 0 8px 12px rgba(26, 26, 26, .3);
      }
      .title {
        margin-top: 325px;
        font-size: 18px;
        font-weight: 600;
      }
      .quote {
        font-style: italic;
      }
    }
    .right-content {
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      flex: 1;
      h3 {
        margin-left: 20px;
        padding-left: 20px;
        width: 15%;
        color: #FFF;
        font-size: 24px;
        letter-spacing: 1px;
        font-style: italic;
        border-bottom: 2px solid #F0D165;
      }
      .review-content {
        display: flex;
        flex-wrap: wrap;
        .reviews {
          margin: 0 0 15px 20px;
          display: flex;
          flex-direction: column;
          min-width: 40%;
          height: 100%;
          padding: 10px 20px;
          word-break: break-all;
          color: #8A6516;
          border: 1px solid #BDBDBD;
          border-radius: 4px;
          box-shadow: 0 2px 3px rgba(26, 26, 26, .3);
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .title {
            margin: 12px 0;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: .7px;
          }
          .text {
            letter-spacing: .6px;
            line-height: 24px;
          }
          .feature {
            margin-top: 6px;
            display: flex;
            justify-content: space-around;
            color: gray;
            .btn {
              cursor: pointer;
            }
          }
          .comment-list {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            .comment-input {
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              textarea {
                padding-left: 8px;
                height: 24px;
                font-size: 14px;
                line-height: 22px;
                outline: none;
                resize: none;
                border: none;
                color: inherit;
                background-color: inherit;
                border-bottom: 1px solid #BDBDBD;
              }
              button {
                padding: 3px 8px;
                letter-spacing: .6px;
                color: #F6F6F6;
                background-color: #0077FF;
                border-radius: 4px;
                border: none;
                outline: none;
                cursor: pointer;
              }
            }
            .comments {
              margin: 6px 0;
              padding-bottom: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .comment-content {
                display: flex;
                flex-direction: column;
                .text {
                  margin-left: 32px;
                }
              }
              .time {
                margin: 4px 0 0 32px;
                font-size: 14px;
                color: #8590A6;
              }
            }
          }
          .actived {
            color: #0077FF;
          }
        }
        .add {
          justify-content: center;
          align-items: center;
          height: 132px;
          cursor: pointer;
          .iconfont {
            margin-bottom: 2px;
            font-size: 18px;
            font-weight: 600;
          }
          &:hover {
            color: #0077FF;
          }
        }
      }
    }
  }
  .modal {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #0077FF;
    background-color: rgba(26, 26, 26, .6);
    .container {
      height: auto;
    }
  }
}
</style>
