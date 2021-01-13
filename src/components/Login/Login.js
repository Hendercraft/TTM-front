import axios from "axios"

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
    Login: function(){
      axios.post('http://127.0.0.1:8000/api/token/',{"username":this.username, "password":this.password})
      .then(response => {
        this.loginSuccessful(response)
        this.username = null;
        this.password = null;
      })
      .catch(error =>{
        console.log(error.response.data.detail)
        this.errors = error.response.data.detail
        this.loginFailed()

      })
    },
    loginSuccessful (req) {
      console.log("test")
      console.log(req.data.access)
      if (!req.data.access) {
        this.loginFailed()
        return
      }
      
      localStorage.token = req.data.access
      console.log(localStorage.token)
    
      this.$router.replace(this.$route.query.redirect || '/home')
    },
    
    loginFailed () {
      console.log("Login failed!")
      this.error = 'Login failed!'
      delete localStorage.token
    }
  }
} 