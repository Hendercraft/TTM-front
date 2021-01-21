// import { data } from 'autoprefixer'
import axios from 'axios'

var data = {
  token: null,
  refreshToken: null,
  userId: null

}
data.token = jwtDecrypt(localStorage.getItem('token'))

export function tokenAlive (exp) {
  if (Date.now() >= exp * 1000) {
    return false
  }
  return true
}

export function jwtDecrypt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

export function authHeader () {
  data.token = jwtDecrypt(localStorage.getItem('access'))
  data.refreshToken = jwtDecrypt(localStorage.getItem('refreshToken'))

  if (tokenAlive(data.token.exp)) {
    return { Authorization: 'Bearer ' + data.token.jti }
  } else {
    return {}
  }
}

export function isTokenValid () {
  data.token = jwtDecrypt(localStorage.getItem('token'))
  console.log(data.token)
  console.log('test')
  console.log(localStorage.getItem('refreshToken'))
  data.userId = data.token.user_id
  if (!tokenAlive(data.token.exp) && (localStorage.getItem('refreshToken') == null)) {
    console.log('refreshing token..')
    axios.post('http://127.0.0.1:8000/api/token/refresh/', {'refresh': localStorage.getItem('refresh')})
      .then(response => {
        localStorage.setItem('refreshToken', response.data.access)
        data.refreshToken = jwtDecrypt(localStorage.getItem('refreshToken'))
      })
      .catch(error => {
        console.log('Refresh token failed')
        console.log(error)
      })
  } else if (!tokenAlive(data.token.exp) && (localStorage.getItem('refreshToken') != null)) {
    console.log('it')
    console.log(data.refreshToken)
    if (!tokenAlive(data.refreshToken.exp)) {
      data.token = null
      data.refreshToken = null
      return false
    }
  } else {
    return true
  }
}
