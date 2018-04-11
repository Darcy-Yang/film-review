<template>
  <div class="index-main">
    <Nav/>
    <div class="main">
      <div class="left">
        <div class="content" :class="review.isCollected ? 'collected' : ''" v-for="(review, index) in reviews" :key="index">
          <div class="top">
            <div class="left-content">
              <img :src="review.rank.img_src" alt="poster">
            </div>
            <div class="right-content">
              <div class="info">
                <div class="regular">
                  <avatar-and-name :name="review.user.name" :avatar="review.user.avatar"/>
                  <span>评分</span>
                  <span class="movie-name" @click="jumpToDetail(review)">《{{ review.rank.title }}》</span>
                  <span class="time">{{ review.updatedAt }}</span>
                </div>
                <h3 v-if="review.isCollected">已收藏</h3>
              </div>
              <span class="title">{{ review.title }}</span>
              <div class="preview">
                <span>{{ review.content }}</span>
              </div>
            </div>
          </div>
          <div class="feature">
            <div class="like btn" :class="review.isLiked ? 'actived' : ''" @click="like(review)">
              <i class="iconfont icon-like"></i>
              <span>{{ review.likeNum }}</span>
            </div>
            <div class="comment btn" @click="showCommentBox(review, index)">
              <i class="iconfont icon-comment"></i>
              <span>{{ review.commentNum }}</span>
            </div>
            <div class="collect btn" :class="review.isCollected ? 'collect-active' : ''" @click="collect(review)">
              <i class="iconfont icon-collect-b"></i>
              <span>{{ review.collectNum }}</span>
            </div>
          </div>
          <div class="comment-area" ref="commentBox">
            <div class="comment-creator">
              <div class="comment-input" contenteditable="true" ref="comment" @focus="eventListener" @blur="eventListener">
                {{ entered ? '' : '写下你的评论...' }}
              </div>
              <button @click="submit(review, index)">评论</button>
            </div>
            <div class="comment-list" v-for="(comment, index) in comments" :key="index">
              <div class="comment-content">
                <div>
                  <avatar-and-name :name="comment.user.name" :avatar="comment.user.avatar"/>
                  <span>:</span>
                  <span class="text">{{ comment.content }}</span>
                </div>
                <div>
                  <span class="time">{{ comment.updatedAt }}</span>
                </div>
              </div>
          </div>
          </div>
        </div>
        <pagination class="pagination" v-if="pageCount > 1" :pageCount="pageCount"/>
      </div>
      <div class="right">
        <div class="top">
          <div class="header">
            <span>影评类型</span>
          </div>
          <div class="content">
            <div class="type" :class="type.selected ? 'active' : ''" v-for="(type, index) in types" :key="index" @click="getReview(type)">
              <span>{{ type.name }}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="header">
            <span>电影推荐</span>
            <div class="switch">
              <i class="iconfont icon-icon--"></i>
              <span>换一换</span>
            </div>
          </div>
          <div class="recommend" v-for="i in 3" :key="i">
            <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2233971046.jpg" alt="poster">
            <div class="info">
              <span>无间道</span>
              <span>信息简介</span>
              <span>星标及评分</span>
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
import Pagination from '@/components/Pagination';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Index',
  components: {
    Nav,
    AvatarAndName,
    Pagination,
  },
  data() {
    return {
      name: '',
      types: [
        { name: '动作', selected: false },
        { name: '喜剧', selected: false },
        { name: '科幻', selected: false },
        { name: '爱情', selected: false },
        { name: '剧情', selected: false },
        { name: '动画', selected: false },
        { name: '历史', selected: false },
        { name: '悬疑', selected: false },
        { name: '纪录片', selected: false }
      ],
      reviewPage: 1,
      commentPage: 1,
      limit: 10,
      pageCount: 0,
      commentCount: 0,
      reviews: [],
      comments: [],
      currentUser: null,
      entered: false,
      showComment: false,
      lastIndex: -1,
      count: [],
      type: '',
    }
  },
  created() {
    const { user } = getUser();
    this.currentUser = user;
    this.getReview();
  },
  methods: {
    async getReview(item) {
      if (item && item.selected) {
        item = null;
        this.type = '';
        this.reviewPage = 1;
      };
      this.types.forEach(type => type.selected = false);
      if (item) {
        item.selected = !item.selected;
        this.type = item.selected ? item.name : '';
      }
      if (this.type) (this.types.filter(type => type.name === this.type))[0].selected = true;
      try {
        const { pageCount, reviews } = await request('GET', `/review/${this.currentUser.id}`, {
          page: this.reviewPage,
          limit: this.limit,
          type: this.type
        })
        this.pageCount = pageCount;
        this.reviews = reviews;
      } catch (err) {
        console.log(err);
      }
    },
    async like(review) {
      try {
        await request('POST', `/like/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.userId
        });
        this.getReview();
      } catch (err) {
        console.log(err);
      }
    },
    async collect(review) {
      try {
        await request('POST', `/collect/${review.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: review.user.id
        });
        this.getReview();
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
          senderId: this.currentUser.id,
          receiverId: review.userId,
          content: this.$refs.comment[index].innerText
        });
        this.$refs.comment[index].innerText = '';
        this.getReview();
        this.getComment(review);
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
    showCommentBox(review, index) {
      this.$refs.commentBox[index].style.display = 'flex';
      if (this.lastIndex !== index && this.lastIndex === -1) {
        this.lastIndex = index;
        this.$refs.commentBox[index].style.display = 'flex';
      } else if (this.lastIndex !== index && this.lastIndex !== -1) {
        this.count = [];
        this.$refs.commentBox[this.lastIndex].style.display = 'none';
        this.$refs.commentBox[index].style.display = 'flex';
      } else {
        this.count.push(index);
        this.$refs.commentBox[this.lastIndex].style.display = this.count.length % 2 ===0 ? 'flex' : 'none';
      }
      this.lastIndex = index;

      if (this.$refs.commentBox[index].style.display === 'flex') this.getComment(review);
    },
    eventListener() {
      this.entered = !this.entered;
    },
    jumpToDetail(review) {
      this.$router.push({ name: 'Review', params: { review } });
    },
  },
  mounted() {
    this.$root.$on('currentPage', (val) => {
      this.reviewPage = val;
      this.getReview();
    })
  },
}
</script>

<style lang="less" scoped>
.index-main {
  background-color: #F6F6F6;
  .main {
    display: flex;
    margin-top: 34px;
    justify-content: center;
    img {
      align-self: center;
      width: 75px;
      height: 108px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
    }
    .left {
      display: flex;
      width: 50%;
      flex-direction: column;
      .content {
        position: relative;
        margin-bottom: 33px;
        padding: 12px;
        display: flex;
        flex-direction: column;

        background-color: #FFF;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
        .top {
          display: flex;
          .left-content {
            position: absolute;
            top: -20px;
            left: -20px;
            // display: flex;
            // flex-direction: column;
          }
          .right-content {
            margin-left: 60px;
            width: 100%;
            word-break: break-all;
            .detail {
              display: none;
            }
            .title {
              font-size: 18px;
              line-height: 1.6;
              font-weight: 600;
            }
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              box-shadow: none;
              &:hover {
                .detail {
                  display: block;
                }
              }
            }
            .info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              .regular {
                display: flex;
                align-items: center;
              }
              h3 {
                margin: 0;
                margin-right: 12px;
                color: #0077FF;
              }
              span {
                margin-left: 8px;
              }
              .user-info {
                display: flex;
                align-items: center;
              }
              .movie-name:hover {
                color: #0077FF;
              }
              .image, .user-name, .movie-name {
                cursor: pointer;
              }
            }
            .preview {
              display: -webkit-box;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;

              font-size: 15px;
              line-height: 1.5;
              letter-spacing: .4px;
              color: #1A1A1A;
            }
          }
        }
        .feature {
          margin-top: 12px;
          display: flex;
          align-items: center;
          color: #8590A6;
          .btn {
            cursor: pointer;
          }
          .like {
            // border: 1px solid #0077FF;
            border: 1px solid rgba(0, 132, 255, .6);
            padding: 1px 8px;
            color: #0077FF;
            border-radius: 4px;
            i {
              font-size: 17px;
              font-weight: 600;
            }
            &:hover {
              border-color: #0077FF;
            }
          }
          .comment {
            margin: 0 12px;
            i {
              font-size: 18px;
              font-weight: 600;
            }
          }
          .actived {
            color: #FFF;
            background-color: #0077FF;
          }
          .collect-active {
            color: #0077FF;
          }
        }
        .comment-area {
          display: none;
          margin: 4px 0;
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
          .comment-list {
            display: flex;
            width: 100%;
            .comment-content {
              margin: 6px 0;
              display: flex;
              width: 100%;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              div {
                display: flex;
                align-items: center;
              }
              img {
                margin-right: 8px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                box-shadow: none;
              }
              .text {
                margin-left: 8px;
              }
            }
          }
        }
        .time {
          // font-size: 14px;
          color: #8590A6;
        }
      }
      .collected {
        background-color: #FCD200;
      }
      .pagination {
        display: flex;
        justify-content: center;
      }
    }
    .right {
      margin: 0 0 20px 20px;
      width: 20%;
      .top {
        .header {
          margin-bottom: 12px;
          padding-left: 4px;
        }
        .content {
          display: flex;
          flex-wrap: wrap;
          .type {
            margin: 0 12px 12px 0;
            padding: 10px 0;
            width: 25%;
            flex-grow: 1;

            text-align: center;
            letter-spacing: 1px;
            border: 1px solid #FFF;
            border-bottom: 1px solid rgba(26, 26, 26, 0.3);

            transition: .15s;

            cursor: pointer;
            &:hover {
              border-radius: 4px;
              border: 1px solid rgba(26, 26, 26, 0.3);
            }
          }
          .active {
            color: #FFF;
            background-color: #0077FF;
            border-radius: 4px;
          }
        }
      }
      .bottom {
        margin-top: 20px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.3);
        .header {
          display: flex;
          justify-content: space-between;
          .switch {
            font-size: 14px;
            color: #175199;
            cursor: pointer;
            i {
              font-weight: 600;
            }
          }
        }
        .recommend {
          display: flex;
          margin-top: 12px;
          .info {
            display: flex;
            flex-direction: column;
            margin-left: 12px;
          }
        }
      }
      .top, .bottom {
        padding: 12px;
        background-color: #FFF;
        border-radius: 3px;
      }
    }
  }
}
</style>
