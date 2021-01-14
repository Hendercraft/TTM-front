import axios from "axios"

export default {
  name: 'home-loged',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
    this.GetProfiles()
    

  },
  methods: {
    GetProfiles: function(){
      axios.get('http://127.0.0.1:8000/api/community/discipline/',
                {
                  headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
                },
                {"username":this.username, "password":this.password})
      .then(response => {
        console.log(response)

      })
      .catch(error => {
        console.log(error.response) 
        console.log(error.response.data) 
        this.errors = error.response.data.detail
      })
    }
  }
}