import http from "../../../http-common"

export default {
  name: 'architecture',
  components: {},
  props: [],
  data () {
    return {
      architectures:[],
      data:null,
    }
  },
  computed: {

  },
  mounted () {
    this.getArchitecture()
  },
  methods: {
    getArchitecture() {
      http.get("database/ressources/",{
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        params: {
            page:1
          }
        })
          .then(response => {
            console.log(response.data.results)
            for (var i = 0; i < response.data.results.length; i++)
            {
              this.data = response.data.results[i]
              console.log(this.data)
              if(this.data['field'] == 'Architecture')
              {
                this.architectures.push(this.data)
                console.log(this.architectures)
              }
            }
          })
    },

  }
}


