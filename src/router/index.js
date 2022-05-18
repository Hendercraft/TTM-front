/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

/*  Ressource   */
import Ressource from '@/components/ressource/Ressource'

/* Side bar */
import Architecture from '@/components/Side-Bar/Architecture'
import Hommes from '@/components/Side-Bar/Hommes'
import Production from '@/components/Side-Bar/Production'
import Propos from '@/components/Side-Bar/Propos'
import Urbanisme from '@/components/Side-Bar/Urbanisme'
import NewRessource from '@/components/ressource/NewRessource'
import profile from '@/components/profile'
import testimony from '@/components/testimony'
import research from '@/components/research'

// import {isTokenValid} from '../services/jwtService'
import {tokenAlive} from '@/services/jwtService'

import VModal from 'vue-js-modal'

Vue.use(Router)
Vue.use(VModal)

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
      path: '/Architecture/:id',
      name: 'Architecture/:id',
      props:true,
      component: Ressource
    },
    {
      path: '/Production',
      name: 'Production',
      component: Production
    },
    {
      path: '/Production/:id',
      name: 'Production/:id',
      props:true,
      component: Ressource
    },
    {
      path: '/Hommes',
      name: 'Hommes',
      component: Hommes
    },
    {
      path: '/Hommes/:id',
      name: 'Hommes/:id',
      props:true,
      component: Ressource
    },
    {
      path: '/Temoignage',
      name: 'Temoignage',
      component: testimony
    },
    {
      path: '/Recherche',
      name: 'Recherche',
      component: research
    }
  ]
})

/*
router.beforeEach((to, from, next) => {
  console.log("yes")
  console.log(localStorage.token)
  if(!tokenAlive(localStorage.token)){
    console.log("true token")
    next()
  }
  else{
    if (to.name !== "Login" && to.name !== "Home" && to.name !="/") {
      entryUrl = to.fullPath;
    }
    console.log("enter here")
    next({ name: 'Login' })
  }
}) */

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
