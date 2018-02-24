import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login'

import Index from '@/views/index/Index'

import FilmReview from '@/views/review/Review'

import Words from '@/views/words/Words'

import Write from '@/views/write/Write'

import HomePage from '@/views/homePage/HomePage'
import History from '@/views/homePage/History'
import Review from '@/views/homePage/Review'
import HistoryWords from '@/views/homePage/Words'
import Like from '@/views/homePage/Like'
import Share from '@/views/homePage/Share'

import Rank from '@/views/rank/Rank'

import AdminIndex from '@/admin/Index'
import ManageUser from '@/admin/ManageUser'
import ManageReview from '@/admin/ManageReview'
import ManageWords from '@/admin/ManageWords'
import ManageRank from '@/admin/ManageRank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/review',
      name: 'Review',
      component: FilmReview
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
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/admin',
      component: AdminIndex,
      children: [
        {
          path: '/',
          component: ManageUser
        },
        {
          path: 'review',
          component: ManageReview
        },
        {
          path: 'words',
          component: ManageWords
        },
        {
          path: 'rank',
          component: ManageRank
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
