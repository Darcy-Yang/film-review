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
    <List/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import List from '@/components/List'

export default {
  name: 'Index',
  components: {
    Nav,
    List
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
    // 初始化小圆点的个数；
    this.pointer.length = 6
    // 设置定时器；
    // setInterval(() => {
    //   this.replace(true)
    // }, 3000)
  },
  methods: {
    replace (right, pointer) {
      // 每次调用 replace 方法时，将之前橙色的小圆点 color 改成灰色；
      this.$refs.pointer[this.index].style.color = 'gray'
      // 通过传进来的第一个参数判断是向左还是向右切换；
      this.index = right ? this.index += 1 : this.index -= 1
      /**  如果有传第二个参数，即点击了小圆点，更改当前 index
           因为点击第一个小圆点时传进来的 pointer 为 0，会被判为 false，
           所以在点击圆点传参数时增加了 1，之后在赋值给 index 时需减去； **/
      if (pointer) this.index = pointer - 1
      // 实现主轮播图的 “无限循环”；
      if (this.index > 5) {
        this.index = 0
      } else if (this.index < 0) {
        this.index = 5
      }
      // 实现左右两侧图片的循环；
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
      // 当前图片对应的小圆点 “上色”；
      this.$refs.pointer[this.index].style.color = 'orange'
      // 移动 list 的位置，即更换当前显示图片；
      this.$refs.list.style.left = -(this.index * 468) + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.index-main {
  height: 100%;
  background-color: #F6F6F6;
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
