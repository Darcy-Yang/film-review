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

import { getUser, getToken } from '@/utils/user';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requireAuth: true }
    },
    {
      path: '/review',
      name: 'Review',
      component: FilmReview,
      meta: { requireAuth: true }
    },
    {
      path: '/words',
      name: 'Words',
      component: Words,
      meta: { requireAuth: true }
    },
    {
      path: '/write',
      name: 'Write',
      component: Write,
      meta: { requireAuth: true }
    },
    {
      path: '/homepage',
      component: HomePage,
      meta: { requireAuth: true },
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
      component: Rank,
      meta: { requireAuth: true }
    },
    {
      path: '/admin',
      component: AdminIndex,
      meta: { requireAuth: true },
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
      path: '/index',
      name: 'Index',
      component: Index,
      meta: { requireAuth: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(path => path.meta.requireAuth)) {
    const user = getUser();
    const token = getToken();
    if (!!user && !!Object.keys(user).length && token) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
