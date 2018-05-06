<template>
  <div class="write-main">
    <Nav/>
    <div class="area">
      <div class="info-area">
        <div class="select-area">
          <input type="text" placeholder="电影名称" v-model="searchWord"/>
          <ul v-show="showSelect">
            <li class="added" v-show="!ranks.length || searchWord !== ranks[0].title" @click="addMovie">
              没找到 ? 添加《{{ searchWord }}》相关信息
            </li>
            <li v-for="(movie, index) in ranks" :key="index" @click="choose(movie)">
              {{ movie.title }}
            </li>
          </ul>
        </div>
        <transition name="fade">
          <div class="movie-info" v-if="movie">
            <div class="poster">
              <img class="poster" :src="movie.poster" alt="poster"/>
              <span>{{ movie.quote }}</span>
            </div>
            <div class="info">
              <span>{{ movie.title }}</span>
              <span>{{ movie.info }}</span>
              <span>{{ movie.movie_type }}</span>
            </div>
          </div>
          <div class="movie-info add-movie" v-else-if="showAddArea">
            <div class="preview">
              <span>{{ searchWord }}</span>
            </div>
            <div class="add-info">
              <input type="text" placeholder="导演" v-model="director"/>
              <input type="text" placeholder="主演" v-model="player"/>
              <input type="text" placeholder="类型" v-model="type"/>
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
        <button :class="movie || (director && player && type) && title && content ? 'finish' : 'disabled'" @click="submit">完成</button>
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
      director: '',
      player: '',
      type: '',
      ranks: [],
      movie: null,
      showSelect: false,
      closeItem: false,
      showAddArea: false,
    }
  },
  methods: {
    async submit() {
      let movieId = 0;
      let movieType = '';
      const { user } = getUser();

      if (!this.movie && !this.showAddArea) {
        this.$message('请选择电影', 'warning');
        return;
      } else if (!this.title) {
        this.$message('请填写标题', 'warning');
        return;
      } else if (!this.content) {
        this.$message('请填写内容', 'warning');
        return;
      }

      try {
        if (this.showAddArea) {
          if (!this.director) {
            this.$message('导演选项不能为空', 'warning');
            return;
          } else if (!this.player) {
            this.$message('主演选项不能为空', 'warning');
            return;
          } else if (!this.type) {
            this.$message('类型选项不能为空', 'warning');
            return;
          }
          const { id, type } = await request('POST', '/rank/add', {}, {
            title: this.searchWord,
            director: this.director,
            player: this.player,
            type: this.type
          });
          movieId = id;
          movieType = type;
        }
        await request('POST', '/review', {}, {
          userId: user.id,
          movieId: movieId || this.movie.id,
          title: this.title,
          content: this.content
        })
        await request('POST', '/user/favor', {}, {
          id: user.id,
          type: movieType || this.movie.type,
          movieId: movieId || this.movie.id
        });
        this.$router.push('/index');
        this.$message('影评发布成功');
      } catch (err) {
        this.$message(err.message, 'error');
      }
    },
    choose(movie) {
      if (this.searchWord === movie.title) {
        this.showSelect = false;
      } else {
        this.chooseItem = true;
        this.searchWord = movie.title;
      }
      this.movie = movie;
    },
    addMovie() {
      this.showSelect = false;
      this.showAddArea = true;
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
          const { ranks } = await request('GET', '/rank', { searchWord: this.searchWord });
          this.ranks = ranks;
        } catch (err) {
          this.$message(err.message, 'error');
        }
      } else {
        this.showAddArea = false;
        this.director = '';
        this.player = '';
        this.type = '';
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
  margin-top: 2rem;
  background-color: #FAFBFB;
  height: 100vh;
  .area {
    display: flex;
    margin: 0 auto;
    padding-top: 52px;
    width: 42%;
    flex-direction: column;
    align-items: center;
    @media screen and (max-device-width: 800px) {
      width: 80%;
      .content-area textarea {
        height: 8rem;
      }
    }
    textarea {
      width: 100%;
      outline: none;
      border: none;
      resize: none;
      background-color: #FAFBFB;
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
          font-size: 36px; /*px*/
          letter-spacing: 1.2px; /*px*/
          outline: none;
          border: none;
          border-bottom: 1px solid #BDBDBD;
          background-color: #FAFBFB;
        }
        input::-webkit-input-placeholder {
          color: #A4A4A4;
        }
        .added {
          color: #0077FF;
          word-break: break-all;
        }
        ul {
          position: absolute;
          margin-top: 12px;
          padding: 6px 12px 6px 0;
          width: 80%;

          background-color: #FAFBFB;
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
              font-size: 36px; /*px*/
            }
          }
        }
        .preview {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px;
          width: 112px;
          min-height: 176px;
          color: #FAFBFB;
          letter-spacing: .4px;
          word-break: break-all;
          background-color: #426AB3;
          border-radius: 4px;
        }
        .add-info {
          margin-left: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          input {
            margin: 8px;
            padding: 0 0 6px 4px;
            font-size: 36px; /*px*/
            letter-spacing: 1.2px; /*px*/
            outline: none;
            border: none;
            border-bottom: 1px solid #BDBDBD;
            background-color: #FAFBFB;
          }
        }
      }
      .add-movie {
        flex: 0;
        max-width: 100%;
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
        height: .86rem;
        line-height: 1.4;

        font-size: 64px; /*px*/
        font-weight: 600;
        letter-spacing: 2px; /*px*/
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
        font-size: 32px; /*px*/
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
        font-size: 32px; /*px*/
        letter-spacing: 1px;
        outline: none;
        border: none;
        border-radius: 4px;

        cursor: pointer;
      }
      .disabled {
        color: #FDFCF9;
        background-color: #B3B3B3;
      }
      .finish {
        color: #FAFBFB;
        background-color: #0077FF;
      }
    }
  }
}
</style>
