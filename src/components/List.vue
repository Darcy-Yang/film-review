<template>
  <div class="content">
      <div class="header list">
        <div class="hole"></div>
        <span v-for="(item, index) in descriptions" :key="index * -1">
          {{ item }}
        </span>
        <span class="operation"></span>
      </div>
      <div class="list" v-for="(item, index) in lists" :class="index % 2 === 0 ? 'odd' : ''" :key="index">
        <div class="hole" :class="item.selected ? 'active' : ''" @click="item.selected = !item.selected"></div>
        <avatar-and-name v-if="!!item.avatar" :avatarStyle="avatarStyle" :avatar="item.avatar" :name="item.name"/>
        <span v-for="(key, index) in keys" :class="key === 'createdAt' || key === 'updatedAt' ? 'time' : ''" :key="index">
          {{ item[key] }}
        </span>
        <div class="operation">
          <i class="iconfont icon-browse"></i>
          <i class="iconfont icon-delete" @click="deleteUser(user)"></i>
        </div>
      </div>
    </div>
</template>

<script>
import AvatarAndName from '@/components/AvatarAndName';

export default {
  name: 'List',
  components: {
    AvatarAndName,
  },
  props: {
    descriptions: {
      type: Array,
      default: []
    },
    lists: {
      type: Array,
      default: []
    },
    keys: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      avatarStyle: 'height: 36px; width: 36px;',
    }
  },
}
</script>

<style lang="less" scoped>
.content {
  // margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  background-color: #FBFBFB;
  border: 2px solid #BDBDBD; /*px*/
  border-radius: 8px; /*px*/
  .list {
    display: flex;
    align-items: center;
    padding: 28px; /*px*/
    padding-right: 0;
    text-align: center;
    border-bottom: 2px solid #BDBDBD; /*px*/
    &:hover {
      .operation i {
        display: block;
      }
    }
    &:last-child {
      border-bottom: none;
      border-bottom-left-radius: 8px; /*px*/
      border-bottom-right-radius: 8px; /*px*/
    }
    .hole {
      margin-right: 36px;
      padding: 0;
      flex: 0;
      width: 36px; /*px*/
      height: 36px; /*px*/
      border: 2px solid #BDBDBD; /*px*/
      border-radius: 50%;

      cursor: pointer;
    }
    .active {
      background-color: #2E84fA;
    }
    .time {
      font-size: 28px; /*px*/
      color: #8590A6;
    }
    .operation {
      display: flex;
      justify-content: space-around;
      flex: 0.5;
      height: 44px; /*px*/
      i {
        display: none;
        font-size: 36px; /*px*/
        cursor: pointer;
        &:first-child {
          margin-left: 12px; /*px*/
        }
        &:last-child {
          margin-right: 12px; /*px*/
        }
        &:hover {
          color: #0077FF;
        }
      }
    }
    div, span {
      flex: 1;
      padding-left: 32px; /*px*/
    }
  }
  .odd {
    background-color: #FFF;
  }
  .header {
    padding: 28px 0 28px 28px; /*px*/
    background-color: #FBFBFB;
    border-top-left-radius: 8px; /*px*/
    border-top-right-radius: 8px; /*px*/
    span {
      border-left: 2px solid #BDBDBD; /*px*/
    }
  }
}
</style>
