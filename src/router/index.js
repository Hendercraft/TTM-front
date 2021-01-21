import Vue from 'vue'
// import axios from 'axios'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import HomeLoged from '@/components/HomeLoged'
import {isTokenValid} from '../services/jwtHelper'

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
      component: Register,
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
      path: '/home',
      name: 'HomeLoged',
      component: HomeLoged,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if ((localStorage.getItem('token') == null) || !isTokenValid()) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next({name: 'Home'})
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({name: 'Home'})
    }
  } else {
    next()
  }
})

// function isTokenValid () {
//   var jsonToken = jwtDecrypt(localStorage.getItem('token'))
//   var jsonRefreshToken = null
//   if (!tokenAlive(jsonToken.exp) && (localStorage.getItem('refreshToken') == null)) {
//     axios.post('http://127.0.0.1:8000/api/token/refresh/', {'refresh': localStorage.getItem('refresh')})
//       .then(response => {
//         localStorage.setItem('refreshToken', response.data.access)
//         jsonRefreshToken = jwtDecrypt(localStorage.getItem('refreshToken'))
//       })
//       .catch(error => {
//         console.log('Refresh token failed')
//         console.log(error)
//       })
//   } else if (!tokenAlive(jsonToken.exp) && !tokenAlive(jsonRefreshToken.exp)) {
//     return false
//   } else {
//     return true
//   }
// }

export default router
