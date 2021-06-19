/* eslint-disable */
import axios from 'axios'
import http from '../http-common'
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

export function tokenIsValid()
{
  if(localStorage.getItem('token')!=null)
  {
    data.token = jwtDecrypt(localStorage.getItem('token'))
    if(tokenAlive(data.token.exp))
    {
      return true
    }
    else
    {
      return false
    }
  }
  else
  {
    return false
  }
}

export function idConnectedUser()
{
  if(localStorage.getItem('token'))
  {
    data.token = jwtDecrypt(localStorage.getItem('token'))
    return data.token.user_id
  }
  else
  {
    return null
  }
  
}

export default function jwtDecrypt (token) {
  if (token == null) {
    return null
  } else {
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
}

export function authHeader () {
  data.token = jwtDecrypt(localStorage.getItem('access'))
  data.refreshToken = jwtDecrypt(localStorage.getItem('refreshToken'))

  if (tokenAlive(data.token.exp)) {
    return { Authorization: 'Bearer ' + data.token.jti }
  } else if (tokenAlive(data.refreshToken.exp)) {
    return { Authorization: 'Bearer' + data.refreshToken.jti }
  } else {
    return null
  }
}

export function isTokenValid () 
{

  data.token = jwtDecrypt(localStorage.getItem('token'))
  refreshToken = localStorage.getItem('refreshToken')
  data.userId = data.token.user_id

  if(!tokenIsValid() && !refreshToken)
  {
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
  }

  else if (!tokenIsValid() && refreshToken) 
  {
    console.log(data.refreshToken)
    if (!tokenAlive(data.refreshToken.exp)) {
      data.token = null
      data.refreshToken = null
      return false
    }
  } 
  
  else 
  {
    return true
  }
}
