import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index/Index'

import Article from '@/views/article/Article'

import Words from '@/views/words/Words'

import Write from '@/views/write/Write'

import HomePage from '@/views/homePage/HomePage'
import History from '@/views/homePage/History'
import Review from '@/views/homePage/Review'
import HistoryWords from '@/views/homePage/Words'
import Like from '@/views/homePage/Like'
import Share from '@/views/homePage/Share'

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
    },
    {
      path: '/words',
      name: 'Words',
      component: Words
    },
    {
      path: '/write',
      name: 'Write',
      component: Write
    },
    {
      path: '/homepage',
      component: HomePage,
      children: [
        {
          path: '/',
          component: History
        },
        {
          path: 'review',
          component: Review
        },
        {
          path: 'words',
          component: HistoryWords
        },
        {
          path: 'like',
          component: Like
        },
        {
          path: 'share',
          component: Share
        }
      ]
    }
  ]
})
