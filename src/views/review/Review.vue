<template>
  <div class="review-main">
    <Nav/>
    <div class="content">
      <div class="left-content">
        <img v-if="currentReview.rank.img_src" :src="currentReview.rank.img_src" alt="poster"/>
        <div class="poster" v-else>
          <span>{{ currentReview.rank.title }}</span>
        </div>
        <span class="title">{{ currentReview.rank.title }}</span>
        <span>{{ currentReview.rank.info }}</span>
          <span>{{ currentReview.rank.type }}</span>
          <span>豆瓣评分: {{ currentReview.rank.star ? currentReview.rank.star : '暂无' }}</span>
          <span class="quote">{{ currentReview.rank.quote }}</span>
      </div>
      <div class="right-content">
        <h3>用户影评</h3>
        <div class="review-content">
          <div class="reviews" v-for="(review, index) in reviews" :key="review.id" ref="review">
            <div class="top">
              <avatar-and-name :avatar="review.user.avatar" :name="review.user.name" :avatarStyle="avatarStyle"/>
              <span class="time">{{ review.updatedAt }}</span>
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
            <transition name="fade">
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
            </transition>
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
        this.$message(er.message, 'error');
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
        await request('POST', '/user/favor', {}, {
          id: this.currentUser.id,
          type: this.currentReview.rank.type
        });
        this.getReview();
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
    async submit(review) {
      if (!this.comment) {
        this.$message('评论内容不能为空', 'warning');
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
        this.$message('评论成功');
      } catch (err) {
        this.$message(err, 'error');
      }
    },
    async addReview(title, content) {
      if (!title) {
        this.$message('标题不能为空', 'warning');
        return;
      } else if (!content) {
        this.$message('内容不能为空', 'warning');
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
        this.$message('添加影评成功');
      } catch (err) {
        this.$message(err, 'error');
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
  // margin-top: 82px;
  margin-top: 2rem;
  min-height: 100vh;
  .content {
    margin: 102px auto 0 auto;
    display: flex;
    width: 80%;
    .left-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      width: 4rem;
      height: 100%;
      padding: 0 .3rem .6rem .36rem;
      color: #FFF;
      // background-color: #F0D165;
      background: linear-gradient(to bottom right, #6ABD78, #426ab3);
      img {
        position: absolute;
        top: -0.4rem;
        width: 3.9rem;
        height: 6.4rem;
        box-shadow: 0 8px 12px rgba(26, 26, 26, .3);
      }
      .poster {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -20px;
        padding: 12px;
        width: 186px;
        height: 291px;
        letter-spacing: .4px;
        background-color: #426AB3;
        box-shadow: 0 8px 12px rgba(26, 26, 26, .3);
      }
      .title {
        margin-top: 6.6rem;
        font-size: .32rem;
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
        padding: 0.12rem 0 0.12rem 0.3rem;
        width: 2.1rem;
        color: #FFF;
        font-size: .4rem;
        letter-spacing: 1px;
        font-style: italic;
        border-radius: 4px;
        background: linear-gradient(to bottom right, #6ABD78, #426ab3);
        box-shadow: 0 1px 3px rgba(26, 26, 26, .3);
      }
      .review-content {
        display: flex;
        flex-wrap: wrap;
        .reviews {
          margin: 0 0 0.34rem 0.28rem;
          display: flex;
          flex-direction: column;
          min-width: 40%;
          height: 100%;
          padding: 10px 20px;
          word-break: break-all;
          color: #8A6516;
          background-color: #FFF;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(26, 26, 26, .3);
          // box-shadow: 0 1px 2px rgba(0,0,0,0.07);
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .time {
              margin-right: 8px;
              font-size: .26rem;
              color: #8590A6;
            }
          }
          .title {
            margin: 12px 0;
            font-size: .32rem;
            font-weight: 600;
            letter-spacing: 1.4px; /*px*/
          }
          .text {
            letter-spacing: 1.2px; /*px*/
            line-height: 48px; /*px*/
          }
          .feature {
            margin-top: 12px; /*px*/
            display: flex;
            justify-content: space-around;
            color: gray;
            .btn {
              cursor: pointer;
            }
            .icon-like {
              font-size: 38px; /*px*/
              font-weight: 600;
            }
            .icon-comment {
              font-size: 36px; /*px*/
              font-weight: 600;
            }
          }
          .comment-list {
            margin-top: 20px; /*px*/
            display: flex;
            flex-direction: column;
            .comment-input {
              margin-bottom: 24px; /*px*/
              display: flex;
              justify-content: space-between;
              textarea {
                padding-left: 16px; /*px*/
                height: 48px; /*px*/
                font-size: 28px; /*px*/
                line-height: 44px; /*px*/
                outline: none;
                resize: none;
                border: none;
                color: inherit;
                background-color: inherit;
                border-bottom: 2px solid #BDBDBD; /*px*/
              }
              button {
                padding: 6px 16px; /*px*/
                letter-spacing: 1.2px; /*px*/
                color: #F6F6F6;
                background-color: #0077FF;
                border-radius: 8px; /*px*/
                border: none;
                outline: none;
                cursor: pointer;
              }
            }
            .comments {
              margin: 12px 0; /*px*/
              padding-bottom: 20px; /*px*/
              display: flex;
              justify-content: space-between;
              align-items: center;
              .comment-content {
                display: flex;
                flex-direction: column;
                .text {
                  margin-left: 64px; /*px*/
                }
              }
              .time {
                margin: 8px 0 0 64px; /*px*/
                font-size: 28px; /*px*/
                color: #8590A6;
              }
            }
          }
          .fade-enter-active {
            transition: opacity 1s;
          }
          .fade-leave-active {
            transition: opacity .5s;
          }
          .fade-enter, .fade-leave-to {
            opacity: 0;
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
    @media screen and (max-device-width: 800px) {
      margin-top: 2.86rem;
      flex-direction: column;
      align-items: center;
      .left-content {
        width: 100%;
        height: 100%;
        .title {
          font-size: .48rem;
        }
      }
      .right-content {
        margin-left: 0;
        h3 {
          margin-left: 0;
          width: 2rem;
        }
        .review-content .reviews {
          margin-left: 0;
          width: 100%;
        }
        .add {
          width: 100%;
        }
      }
    }
  }
  .modal {
    position: fixed;
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
