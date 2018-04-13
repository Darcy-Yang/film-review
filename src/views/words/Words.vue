<template>
  <div class="words-main">
    <Nav/>
    <div class="content">
      <div class="words" v-for="word in words" :key="word.id">
        <div class="words-content">
          <span>{{ word.content }}</span>
          <div class="source">
            <span>——</span>
            <span>《{{ word.title }}》</span>
          </div>
          <div class="info">
            <avatar-and-name :name="word.user.name" :avatar="word.user.avatar"/>
            <span class="time">{{ word.updatedAt }}</span>
          </div>
        </div>
        <div class="hover-show">
          <div class="hover-blur"></div>
          <div class="icons">
            <div class="feature" @click="likeWords(word)">
              <i class="iconfont icon-love"></i>
              <span :class="word.isLiked ? 'actived' : ''">{{ word.likeNum }}</span>
            </div>
            <div class="feature">
              <i class="iconfont icon-collect-b"></i>
              <span>{{ word.collectNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-btn" @click="openModal">
      <i class="iconfont icon-add"></i>
    </div>
    <div class="modal" v-if="showModal">
      <container class="container" v-click-outside="closeModal" v-on:container="addWords"
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
  name: 'Words',
  components: {
    Nav,
    AvatarAndName,
    Container,
  },
  data() {
    return {
      firstPlaceHolder: '台词',
      secondPlaceHolder: '电影名',
      showModal: false,
      currentUser: null,
      words: null,
    }
  },
  created() {
    const { user } = getUser();
    this.currentUser = user;
    this.getWords();
  },
  methods: {
    async getWords() {
      try {
        const { pageCount, words } = await request('GET', `/words/${this.currentUser.id}`);
        this.pageCount = pageCount;
        this.words = words;
      } catch (err) {
        console.log(err);
      }
    },
    async addWords(title, content) {
      if (!title) {
        alert('电影名不能为空');
        return;
      } else if (!content) {
        alert('台词不能为空');
        return;
      }
      try {
        await request('POST', '/words', {}, {
          userId: this.currentUser.id,
          title,
          content
        });
        this.closeModal();
        this.getWords();
      } catch (err) {
        console.log(err);
      }
    },
    async likeWords(word) {
      try {
        await request('POST', `/like/words/${word.id}`, {}, {
          senderId: this.currentUser.id,
          receiverId: word.user.id
        });
        this.getWords();
      } catch (err) {
        console.log(err);
      }
    },
    openModal() {
      this.showModal = true;
      setTimeout(scrollTo(0, 0), 100);
    },
    closeModal() {
      this.showModal = false;
    },
  },
}
</script>

<style lang="less" scoped>
.words-main {
  position: relative;
  .content {
    position: relative;
    margin: 20px auto;
    display: flex;
    // width: 80%;
    flex-wrap: wrap;
    justify-content: center;
    .words {
      position: relative;
      margin: 6px 8px;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      width: 24%;

      word-break: break-all;
      background-color: pink;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(26, 26, 26, .3);

      cursor: pointer;

      &:hover {
        .hover-show {
          display: flex;
        }
      }
      .words-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        color: #FFF;
        .source {
          align-self: flex-end;
        }
        .info {
          margin-top: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .time {
            font-size: 14px;
            color: #8590A6;
          }
        }
      }
      .hover-show {
        position: absolute;
        // display: flex;
        // color: #FAFBFB;
        display: none;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        .hover-blur {
          position: absolute;
          top: 0;
          left: -18px;
          width: 100%;
          height: 100%;
          filter: blur(2px);
          background-color: rgba(26, 26, 26, .25);
        }
        .icons {
          display: flex;
          width: 60%;
          justify-content: space-evenly;

          z-index: 2;
          .iconfont {
            font-size: 36px;
            opacity: .9;
            &:hover {
              opacity: 1;
            }
          }
          .feature {
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              font-size: 18px;
              font-weight: 600;
              color: #FFF;
              // 水红色
              // color: #DE3163;
            }
            .actived {
              color: #DE3163;
            }
          }
          .icon-love {
            color: red;
          }
          .icon-collect-b {
            color: orange;
          }
        }
      }
    }
  }
  .add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 89px;
    right: 1rem;

    width: 3rem;
    height: 3rem;
    color: #FFF;
    background-color: #0077FF;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .4);

    cursor: pointer;
  }
  .modal {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;
    color: #0077FF;
    background-color: rgba(26, 26, 26, .6);
    .container {
      height: auto;
    }
  }
}
</style>
