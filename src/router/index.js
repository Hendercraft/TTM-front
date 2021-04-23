/* eslint-disable */
import Vue from 'vue'
// import axios from 'axios'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Register from '@/components/Register'
import Login from '@/components/Login'
import HomeLoged from '@/components/HomeLoged'

/* Side bar */
import Architecture from '@/components/Side-Bar/Architecture'
import Hommes from '@/components/Side-Bar/Hommes'
import Production from '@/components/Side-Bar/Production'
import Propos from '@/components/Side-Bar/Propos'
import Urbanisme from '@/components/Side-Bar/Urbanisme'
import NewRessource from '@/components/NewRessource'
import profile from '@/components/profile'

// import {isTokenValid} from '../services/jwtService'

Vue.use(Router)

const router = new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "Register" */ '@/components/Register/index.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: profile,
      meta: {
        guest: true
      }
    },
    {
      path: '/home',
      name: 'HomeLoged',
      component: HomeLoged,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/NewRessource',
      name: 'NewRessource',
      component: NewRessource
    },
    {
      path: '/A-Propos',
      name: 'A_Propos',
      component: Propos
    },
    {
      path: '/Urbanisme',
      name: 'Urbanisme',
      component: Urbanisme
    },
    {
      path: '/Architecture',
      name: 'Architecture',
      component: Architecture
    },
    {
      path: '/Production',
      name: 'Production',
      component: Production
    },
    {
      path: '/Hommes',
      name: 'Hommes',
      component: Hommes
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if ((localStorage.getItem('token') == null) || !isTokenValid()) {
//       next({
//         path: '/login',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       let user = JSON.parse(localStorage.getItem('user'))
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (user.is_admin === 1) {
//           next()
//         } else {
//           next({name: 'Home'})
//         }
//       } else {
//         next()
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem('token') == null) {
//       next()
//     } else {
//       next({name: 'Home'})
//     }
//   } else {
//     next()
//   }
// })

export default router
