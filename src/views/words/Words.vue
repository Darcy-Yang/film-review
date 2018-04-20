<template>
  <div class="words-main">
    <Nav :placeholder="placeholder" v-on:search="search"/>
    <div class="content">
      <div class="words" v-for="word in words" :key="word.id">
        <div class="top">
          <avatar-and-name :avatar='word.user.avatar' :name="word.user.name"/>
          <span class="time">{{ word.updatedAt }}</span>
        </div>
        <span class="content">{{ word.content }}</span>
        <span class="title">——《{{ word.title }}》</span>
        <div class="feature">
          <div class="like btn" :class="word.isLiked ? 'actived' : ''" @click="likeWords(word)">
            <i class="iconfont icon-like"></i>
            <span>{{ word.likeNum }}</span>
          </div>
          <div class="collect btn">
            <i class="iconfont icon-collect"></i>
            <span>{{ word.collectNum }}</span>
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
      placeholder: '台词／影名',
      searchWord: '',
      firstPlaceHolder: '台词',
      secondPlaceHolder: '电影名',
      showModal: false,
      currentUser: null,
      words: [],
    }
  },
  created() {
    const { user } = getUser();
    this.currentUser = user;
    this.getWords();
  },
  methods: {
    search(val) {
      this.searchWord = val;
      this.getWords();
    },
    async getWords() {
      try {
        const { pageCount, words } = await request('GET', `/words/${this.currentUser.id}`, {
          searchWord: this.searchWord
        });
        this.pageCount = pageCount;
        this.words = words;
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
    async addWords(title, content) {
      if (!title) {
        this.$message('电影名不能为空', 'warning');
        return;
      } else if (!content) {
        this.$message('台词不能为空', 'warning');
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
        this.$message('添加台词成功');
      } catch (err) {
        this.$message(err.message, 'error');
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
        this.$message(err.message, 'error');
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
  margin-top: 82px;
  position: relative;
  min-height: 100vh;
  .content {
    position: relative;
    margin: 20px auto 0 auto;
    display: flex;
    width: 84%;
    flex-wrap: wrap;
    justify-content: center;
    .words {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 12px;
      padding: 12px;
      width: 20%;
      height: 100%;
      word-break: break-all;
      background-color: #FFF;
      border-radius: 0 0 51px 0;
      &:before{
        content:'';
        width: 25px;
        height: 20px;
        position: absolute;
        bottom:0;
        right:0;
        -webkit-border-radius: 0 0 30px 0;
        -moz-border-radius: 0 0 30px 0;
        border-radius: 0 0 30px 0;
        -webkit-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3);
        box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3);
        -webkit-transform: rotate(-20deg) skew(-40deg,-3deg) translate(-13px,-13px);
        -moz-transform: rotate(-20deg) skew(-40deg,-3deg) translate(-13px,-13px);
        -o-transform: rotate(-20deg) skew(-40deg,-3deg) translate(-13px,-13px);
        transform: rotate(-20deg) skew(-40deg,-3deg) translate(-13px,-13px);
      }
      &:after{
        content: '';
        z-index: -1;
        width: 100px;
        height: 100px;
        position:absolute;
        bottom:0;
        right:0;
        background: rgba(0, 0, 0, 0.2);
        display: inline-block;
        -webkit-box-shadow: 20px 20px 8px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 20px 20px 18px rgba(0, 0, 0, 0.2);
        box-shadow: 20px 20px 8px rgba(0,0,0,0.2);
        -webkit-transform: rotate(0deg) translate(-45px,-20px) skew(20deg);
        -moz-transform: rotate(0deg) translate(-45px,-20px) skew(20deg);
        -o-transform: rotate(0deg) translate(-45px,-20px) skew(20deg);
        transform: rotate(0deg) translate(-45px,-20px) skew(20deg);
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          font-size: 14px;
          color: #8590A6;
        }
      }
      .content {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: .6px;
      }
      .title {
        margin: 6px 4px 0;
        align-self: flex-end;
        font-style: italic;
      }
      .feature {
        margin-top: 12px;
        display: flex;
        justify-content: space-around;
        .btn {
          cursor: pointer;
        }
      }
    }
    .actived {
      color: #0077FF;
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
    position: fixed;
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
