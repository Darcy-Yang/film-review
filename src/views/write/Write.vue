<template>
  <div class="write-main">
    <Nav/>
    <div class="area">
      <div class="info-area">
        <div class="select-area">
          <input type="text" v-model="searchWord"/>
          <ul v-show="showSelect">
            <li v-for="(movie, index) in ranks" :key="index" @click="choose(movie)">
              {{ movie.title }}
            </li>
          </ul>
        </div>
        <div class="movie-info" v-if="!movie">
          <h2>电影信息</h2>
        </div>
        <div class="movie-info" v-else>
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
      </div>
      <div class="title-area">
        <textarea placeholder="请输入标题"></textarea>
      </div>
      <div class="separator">
      </div>
      <div class="content-area">
        <textarea placeholder="请输入正文"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

import request from '@/utils/request';

export default {
  name: 'Write',
  components: {
    Nav
  },
  data () {
    return {
      contents: '',
      searchWord: '',
      ranks: [],
      movie: null,
      showSelect: false,
      closeSelect: false,
    }
  },
  methods: {
    choose(movie) {
      this.searchWord = movie.title;
      this.movie = movie;
      this.closeSelect = true;
    },
  },
  watch: {
    async searchWord(val) {
      if (this.closeSelect) {
        this.showSelect = false;
        this.closeSelect = false;
        return;
      }
      this.showSelect = !!val;
      if (val) {
        try {
          const { ranks } = await request('POST', '/rank', { searchWord: this.searchWord });
          this.ranks = ranks;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.ranks = null;
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
    margin-top: 40px;
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
          font-size: 16px;
          outline: none;
          border: none;
          border-bottom: 1px solid #BDBDBD;
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
        .poster {
          margin-right: 20px;
          width: 136px;
          height: 190px;

          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(26, 26, 26, .3);
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
    }
    .title-area {
      margin: 16px 0;
      padding: 0;
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
      width: 100%;
      textarea {
        min-height: 300px;
        font-size: 16px;
      }
      textarea::-webkit-input-placeholder {
        color: #B3B3B3;
      }
    }
  }
}
</style>
