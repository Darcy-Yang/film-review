<template>
  <div class="index-main">
    <Nav/>
    <div class="test">
      <img class="pre" ref="pre"/>
      <img class="next" ref="next"/>
    </div>
    <div class="slider">
      <ul ref="list">
        <!-- 一开始写成:src={{ item.src }}，一直报错 -->
        <li v-for="(item, index) in slider" :key="index">
          <img :src="item.src"  @click="test(index)"/>
        </li>
      </ul>
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
      index: -1,
      slider: [
        { src: 'static/images/1.png' },
        { src: 'static/images/2.png' },
        { src: 'static/images/3.png' },
        { src: 'static/images/4.png' },
        { src: 'static/images/5.png' },
        { src: 'static/images/6.png' }
      ]
    }
  },
  created () {
    setInterval(() => {
      this.test()
      this.index += 1
      if (this.index === 5) this.index = -1
    }, 1000)
  },
  methods: {
    test () {
      if (this.index < 5) {
        if (this.index === -1) {
          this.$refs.pre.src = this.slider[5].src
        } else {
          this.$refs.pre.src = this.slider[this.index].src
        }
        this.$refs.list.style.left = -((this.index + 1) * 468) + 'px'
        if (this.index === 4) {
          this.$refs.next.src = this.slider[0].src
          return
        }
        this.$refs.next.src = this.slider[this.index + 2].src
      } else {
        this.test(-1)
      }
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
      // left: -468px;
      li {
        float: left;
        list-style: none;
        z-index: 3;
        img {
          width: 468px;
        }
      }
    }
  }
  .test {
    perspective: 200;
    -webkit-perspective: 200;
    .pre {
      position: absolute;
      height: 136px;
      top: 31px;
      left: 300px;
      transform: rotateY(6deg);
    }
    .next {
      position: absolute;
      height: 136px;
      top: 31px;
      left: 766px;
      transform: rotateY(-6deg);
    }
  }
}
</style>
