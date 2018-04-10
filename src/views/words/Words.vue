<template>
  <div class="words-main">
    <Nav/>
    <div class="content">
      <div class="words" v-for="i in 12" :key="i">
        <div class="words-content">
          <span>如果你有梦想，就要守护它。当人们做不到一些事情的时候，他们就会对你说你也同样不能。如果你有了目标就要全力以赴。</span>
          <div class="source">
            <span>——</span>
            <span>《当幸福来敲门》</span>
          </div>
          <div class="info">
            <avatar-and-name :name="name" :avatar="avatar"/>
            <span class="time">1996-11-25</span>
          </div>
        </div>
        <div class="hover-show">
          <div class="hover-blur"></div>
          <div class="icons">
            <div class="feature">
              <i class="iconfont icon-love"></i>
              <span>3</span>
            </div>
            <div class="feature">
              <i class="iconfont icon-collect-b"></i>
              <span>1</span>
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

export default {
  name: 'Words',
  components: {
    Nav,
    AvatarAndName,
    Container,
  },
  data() {
    return {
      name: 'Daniel_Yang',
      avatar: 'static/images/avatar.jpg',
      firstPlaceHolder: '台词',
      secondPlaceHolder: '电影名',
      showModal: false,
    }
  },
  methods: {
    addWords(title, content) {
      alert(`${title}-${content}`);
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
        color: #FFF;
        .source {
          align-self: flex-end;
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
    top: 88px;
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
