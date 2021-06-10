import http from "../../../http-common"

export default {
  name: 'architecture',
  components: {},
  props: [],
  data () {
    return {
      architectures:[],
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
            for (const data in response.data.results)
            {
              if(data.field == 'Architecture')
              {
                this.architectures.push(data)
                console.log(this.architectures)
              }
            }
          })
    },

  }
}


