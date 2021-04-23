import axios from "axios"

export default {
  name: 'Register',
  components: {},
  props: [],
  data () {
    return {
      username : null,
      first_name : null,
      last_name : null,
      email : null,
      password : null,
      password_bis : null,
      errors : null,

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    Registered: function(){
      axios.post('http://127.0.0.1:8000/api/community/create/',{"username":this.username, "password":this.password, "first_name":this.first_name, "last_name":this.last_name, "email":this.email})
      .then(response => {
        this.username = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.password = null;
        this.password_bis = null;
        this.$router.replace(this.$route.query.redirect || '/login');

      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data.detail
        this.errors = error.response.data.email[0]
      })
    }
    
  }
}