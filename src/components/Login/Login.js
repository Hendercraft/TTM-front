/* eslint-disable */
import http from '../../http-common'

export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {
      username: null,
      password: null,
      errors: null,

    }
  },
  computed: {
    
  },
  mounted () {
  },
  methods: {
    externLogin(username, password)
    {
      http.post('token/',{"username":username, "password":password})
      .then(response => {
        localStorage.setItem('token', response.data.access)
        localStorage.setItem('refresh', req.data.refresh)
        localStorage.setItem('refreshToken', null)
        this.$router.replace(this.$route.query.redirect || '/')
      })
      .catch(error => {
        console.log(error)
      })
    },
    Login: function(){
      http.post('token/',{"username":this.username, "password":this.password})
      .then(response => {
        this.loginSuccessful(response)
        this.username = null;
        this.password = null;
        
      })
      .catch(error =>{
        console.log(error.response.data.detail)
        // this.errors = error.response.data.detail
        this.loginFailed()

      })
    },
    loginSuccessful (req) {
      console.log("success")
      if (!req.data.access) {
        this.loginFailed()
        return
      }
      
      localStorage.setItem('token', req.data.access)
      console.log(req)
      console.log(req.data.access)
      localStorage.setItem('refresh', req.data.refresh)
      localStorage.setItem('refreshToken', null)
      this.$router.replace(this.$route.query.redirect || '/')
    },
    
    loginFailed () {
      console.log("Login failed!")
      // this.error = 'Login failed!'
      delete localStorage.token
    },
    
  }
} 