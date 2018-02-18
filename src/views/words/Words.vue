<template>
  <div class="words-main" ref="body">
    <Nav :leftStyle="leftStyle"/>
    <div class="whole-content">
      <div class="list">
        <div class="content" v-for="(item, index) in words" :key="index">
          <div class="paper">
            <div class="words">
              <span class="film-words">如果你有梦想，就要守护它。当人们做不到一些事情的时候，他们就会对你说你也同样不可能。有了目标就要全力以赴。</span><br>
              <span class="film-name">——《当幸福来敲门》</span>
            </div>
            <div class="feature">
              <div class="unit">
                <i class="iconfont icon-xihuan"></i>
                <span>32</span>
              </div>
              <div class="unit">
                <i class="iconfont icon-pinglun"></i>
                <span>3</span>
              </div>
              <div class="unit">
                <i class="iconfont icon-share"></i>
              </div>
            </div>
            <div class="user-info">
              <img src="static/images/avatar.jpg" alt="avatar"/>
              <span>user_name</span>
            </div>
          </div>
          <div class="paper-shadow" style="background-image: url(static/images/paper-shadow.png);">
          </div>
        </div>
      </div>
      <div class="right-content" v-if="!showContainer">
        <button @click="addWords">写台词</button>
      </div>
      <div class="container" v-else>
        <textarea class="words-area" placeholder="请输入台词"></textarea>
        <textarea class="name-area" placeholder="请输入电影名"></textarea>
        <div class="buttons">
          <button class="cancel" @click="cancel">取消</button>
          <button class="sure">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Words',
  components: {
    Nav
  },
  data () {
    return {
      leftStyle: 'margin-left: 260px;',
      words: [],
      showContainer: false
    }
  },
  created () {
    this.words.length = 6
  },
  methods: {
    addWords () {
      this.showContainer = true
      this.leftStyle = 'margin-left: 34px;'
      setTimeout(scrollTo(0, 0), 100)
    },
    cancel () {
      this.showContainer = false
      this.leftStyle = 'margin-left: 260px;'
    }
  }
}
</script>

<style lang="less" scoped>
.words-main {
  height: 100%;
  background-color: #F6F6F6;
  .whole-content {
    display: flex;
    justify-content: center;
    .list {
      margin: 48px 0;
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        .paper {
          padding: 32px;
          padding-bottom: 12px;
          width: 736px;
          background-color: #FFF;
          border: 1px solid #BDBDBD;
          .words {
            padding-bottom: 28px;
            border-bottom: 1px solid #BDBDBD;
            .film-words {
              font-size: 18px;
              font-weight: 600;
            }
            .film-name {
              float: right;
            }
          }
          .feature {
            margin-top: 10px;
            .unit {
              margin-top: 10px;
              margin-right: 16px;
              float: left;
              cursor: pointer;
            }
          }
          .user-info {
            display: flex;
            float: right;
            align-items: center;
            img {
              margin-right: 8px;
              width: 42px;
              height: 42px;
              border-radius: 50%;
            }
            img, span {
              cursor: pointer;
            }
          }
        }
        .paper-shadow {
          width: 800px;
          height: 32px;
        }
      }
    }
    .right-content {
      position: fixed;
      top: 180px;
      right: 200px;
      button {
        width: 80px;
        height: 32px;

        color: #0077FF;
        background-color: #FFF;

        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;

        border: 1px solid #BDBDBD;
        border-radius: 3px;
        outline: none;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 2px;
        }
      }
    }
    .container {
      display: flex;
      margin: 48px;
      padding: 20px;
      height: 100%;
      flex-direction: column;
      background-color: #FFF;
      border: 1px solid #BDBDBD;
      border-radius: 3px;
      .words-area {
        width: 300px;
        height: 210px;
        font-size: 18px;
        line-height: 24px;
      }
      .name-area {
        margin: 20px 0;
        height: 20px;
        font-size: 14px;
      }
      textarea {
        padding: 8px;
        border: 1px solid #BDBDBD;
        border-radius: 3px;
        resize: none;
        outline: none;
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        .cancel {
          color: gray;
        }
        .sure {
          color: #FFF;
          background-color: #0077FF;
          border: none;
        }
        button {
          width: 120px;
          height: 30px;
          font-size: 14px;
          letter-spacing: 1px;
          border: 1px solid #BDBDBD;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
