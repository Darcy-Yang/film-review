<template>
  <div class="write-main">
    <Nav/>
    <div class="area">
      <div class="info-area">
        <div class="select-area">
          <input type="text" placeholder="电影名称" v-model="searchWord"/>
          <ul v-show="showSelect">
            <li v-for="(movie, index) in ranks" :key="index" @click="choose(movie)">
              {{ movie.title }}
            </li>
          </ul>
        </div>
        <transition name="fade">
          <div class="movie-info" v-if="movie">
            <div class="poster">
              <img class="poster" :src="movie.img_src" alt="poster"/>
              <span>{{ movie.quote }}</span>
            </div>
            <div class="info">
              <span>{{ movie.title }}</span>
              <span>{{ movie.info }}</span>
              <span>{{ movie.movie_type }}</span>
            </div>
          </div>
        </transition>
      </div>
      <div class="title-area">
        <textarea placeholder="标题" v-model="title"></textarea>
      </div>
      <div class="separator">
      </div>
      <div class="content-area">
        <textarea placeholder="正文" v-model="content"></textarea>
      </div>
      <div class="submit-area">
        <button :class="movie && title && content ? 'finish' : 'disabled'" @click="submit">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

import request from '@/utils/request';
import { getUser } from '@/utils/user';

export default {
  name: 'Write',
  components: {
    Nav
  },
  data () {
    return {
      searchWord: '',
      title: '',
      content: '',
      ranks: [],
      movie: null,
      showSelect: false,
      closeItem: false,
    }
  },
  methods: {
    choose(movie) {
      if (this.searchWord === movie.title) {
        this.showSelect = false;
      } else {
        this.chooseItem = true;
        this.searchWord = movie.title;
      }
      this.movie = movie;
    },
    async submit() {
      const { user } = getUser();

      if (!this.movie) {
        alert('请选择电影');
        return;
      } else if (!this.title) {
        alert('请填写标题');
        return;
      } else if (!this.content) {
        alert('请填写内容');
        return;
      }

      try {
        await request('POST', '/review', {}, {
          userId: user.id,
          movieId: this.movie.id,
          title: this.title,
          content: this.content
        })
        alert('影评发布成功');
        this.$router.push('/index');
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    async searchWord(val) {
      if (val) {
        if (this.chooseItem) {
          this.showSelect = false;
          this.chooseItem = false;
          return;
        }
        this.showSelect = true;
        try {
          const { ranks } = await request('POST', '/rank', { searchWord: this.searchWord });
          this.ranks = ranks;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.showSelect = false;
        this.ranks = [];
        this.movie = null;
      }
    }
  },
}
</script>

<style lang="less" scoped>
.write-main {
  .area {
    display: flex;
    margin: 0 auto;
    margin-top: 52px;
    width: 42%;
    flex-direction: column;
    align-items: center;
    textarea {
      width: 100%;
      outline: none;
      border: none;
      resize: none;
    }
    .info-area {
      display: flex;
      width: 100%;
      min-height: 200px;
      .select-area {
        position: relative;
        flex-grow: 1;
        input {
          width: 80%;
          padding: 0 0 4px 12px;
          font-size: 18px;
          letter-spacing: .6px;
          outline: none;
          border: none;
          border-bottom: 1px solid #BDBDBD;
        }
        input::-webkit-input-placeholder {
          color: #A4A4A4;
        }
        ul {
          position: absolute;
          margin-top: 12px;
          padding: 6px 12px 6px 0;
          width: 80%;

          background-color: #FFF;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(26, 26, 26, .3);
          z-index: 1;
          li {
            width: 100%;
            margin: 4px 0;
            padding: 4px 0 4px 12px;
            list-style: none;

            transition: .15s;
            cursor: pointer;
            &:hover {
              color: #0077FF;
              background-color: rgba(26, 26, 26, .1);
            }
          }
        }
      }
      .movie-info {
        flex-grow: 1;
        display: flex;
        max-width: 50%;

        transition: .6s;
        .poster {
          margin-right: 20px;
          border-radius: 4px;
          img {
            width: 136px;
            height: 190px;
            box-shadow: 0 1px 2px rgba(26, 26, 26, .3);
          }
          span {
            padding-left: 6px;
            font-style: italic;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          span {
            margin-bottom: 8px;
            &:first-child {
              font-size: 18px;
            }
          }
        }
      }
      .fade-enter-active, .fade-leave-activate {
        transition: opacity .6s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
    }
    .title-area {
      margin: 16px 0;
      padding-left: 12px;
      width: 100%;
      textarea {
        padding: 0;
        height: 44px;
        line-height: 1.4;

        font-size: 32px;
        font-weight: 600;
        letter-spacing: 1px;
      }
      // 设置提示字符串颜色；(chrome)
      textarea::-webkit-input-placeholder {
        color: #A4A4A4;
      }
    }
    .separator {
      width: 100%;
      color: gray;
      text-align: left;
      border-bottom: 1px solid #A4A4A4;
    }
    .content-area{
      margin-top: 20px;
      padding-left: 12px;
      width: 100%;
      textarea {
        min-height: 300px;
        font-size: 16px;
      }
      textarea::-webkit-input-placeholder {
        color: #B3B3B3;
      }
    }
    .submit-area {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      button {
        margin-bottom: 20px;
        padding: 6px 16px;
        font-size: 16px;
        letter-spacing: 1px;
        outline: none;
        border: none;
        border-radius: 4px;

        cursor: pointer;
      }
      .disabled {
        color: gray;
        background-color: #BDBDBD;
      }
      .finish {
        color: #FFF;
        background-color: #0077FF;
      }
    }
  }
}
</style>
