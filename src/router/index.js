import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index/Index'

import Article from '@/views/article/Article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    }
  ]
})
