import axios from 'axios'

import { tokenAlive, jwtDecrypt } from '../services/jwtHelper'

export default {
  name: 'jwtService',
  data () {
    return {
      token: '',
      refreshToken: '',
      tokenExp: '',
      userId: '',
      userName: ''
    }
  },
  computed: {
    isTokenValid: function () {
      this.token = jwtDecrypt(localStorage.getItem('token'))
      this.userId = this.token.user
      this.refreshToken = null
      if (!tokenAlive(this.token.exp) && (localStorage.getItem('refreshToken') == null)) {
        axios.post('http://127.0.0.1:8000/api/token/refresh/', {'refresh': localStorage.getItem('refresh')})
          .then(response => {
            localStorage.setItem('refreshToken', response.data.access)
            this.refreshToken = jwtDecrypt(localStorage.getItem('refreshToken'))
          })
          .catch(error => {
            console.log('Refresh token failed')
            console.log(error)
          })
      } else if (!tokenAlive(this.token.exp) && !tokenAlive(this.refreshToken.exp)) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
  }
}
