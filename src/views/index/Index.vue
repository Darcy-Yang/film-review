<template>
  <div class="index-main">
    <Nav/>
    <div class="around">
      <img class="pre" ref="pre" src="static/images/6.png" @click="replace(false)"/>
      <img class="next" ref="next" src="static/images/2.png" @click="replace(true)"/>
    </div>
    <div class="slider">
      <ul ref="list">
        <!-- 一开始写成:src={{ item.src }}，一直报错 -->
        <li v-for="(item, index) in slider" :key="index">
          <img :src="item.src"/>
        </li>
      </ul>
    </div>
    <div class="pointer">
      <li v-for="(item, index) in pointer" :key="index" ref="pointer" @click="replace(false, index + 1)"></li>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'Index',
  components: {
    Nav
  },
  data () {
    return {
      index: 0,
      slider: [
        { src: 'static/images/1.png' },
        { src: 'static/images/2.png' },
        { src: 'static/images/3.png' },
        { src: 'static/images/4.png' },
        { src: 'static/images/5.png' },
        { src: 'static/images/6.png' }
      ],
      pointer: []
    }
  },
  created () {
    this.pointer.length = 6
    setInterval(() => {
      this.replace(true)
    }, 3000)
  },
  methods: {
    replace (right, pointer) {
      this.$refs.pointer[this.index].style.color = 'gray'
      this.index = right ? this.index += 1 : this.index -= 1
      if (pointer) this.index = pointer - 1
      if (this.index > 5) {
        this.index = 0
      } else if (this.index < 0) {
        this.index = 5
      }
      if (this.index === 0) {
        this.$refs.pre.src = this.slider[5].src
        this.$refs.next.src = this.slider[this.index + 1].src
      } else if (this.index === 5) {
        this.$refs.pre.src = this.slider[this.index - 1].src
        this.$refs.next.src = this.slider[0].src
      } else {
        this.$refs.pre.src = this.slider[this.index - 1].src
        this.$refs.next.src = this.slider[this.index + 1].src
      }
      this.$refs.pointer[this.index].style.color = 'orange'
      this.$refs.list.style.left = -(this.index * 468) + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.index-main {
  .slider {
    position: relative;
    margin: 0 auto;
    width: 468px;
    height: 200px;
    overflow: hidden;
    ul {
      position: absolute;
      padding: 0;
      width: 2808px;
      li {
        float: left;
        list-style: none;
        z-index: 3;
        img {
          width: 468px;
          border-radius: 3px;
        }
      }
    }
  }
  .around {
    perspective: 200;
    -webkit-perspective: 200;
    cursor: pointer;
    .pre {
      position: absolute;
      height: 136px;
      top: 31px;
      left: 300px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      transform: rotateY(7deg);
    }
    .next {
      position: absolute;
      height: 136px;
      top: 31px;
      left: 766px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      transform: rotateY(-7deg);
    }
  }
  .pointer {
    display: flex;
    justify-content: center;
    font-size: 20px;
    line-height: 20px;
    color: gray;
    cursor: pointer;
    :first-child {
      color: orange;
    }
    li {
      margin-right: 2px;
    }
  }
}
</style>
