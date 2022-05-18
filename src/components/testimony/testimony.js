import http from '../../http-common'

export default {
  name: 'testimony',
  components: {},
  props: [],
  data () {
    return {
      logged:true,
      testimony:null,

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    postTestimony(){
      http.post("community/testimony/create/", {"testimony":this.testimony}, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        console.log(response)
        this.testimony = null
      })
      .catch(error => {
        console.log(error)
      })
    }
    
  }
}


