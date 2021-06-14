import http from '../../../http-common'

export default {
  name: 'ressource-child',
  components: {},
  props: ['childInfo'],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
    this.getRessourceChild(this.childInfo)
  },
  methods: {
    getRessourceChild(childInfo)
    {
      console.log(childInfo, "starfoula")
      
      /*  If the table targeted is for Architecture or Production */
      if (childInfo.object)
      {
        http.get(`/database/object/${childInfo.id}/`,{
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
          }})
            .then(response => {
              this.ressource = response.data
              console.log(this.ressource)
            })
            .catch(error => {
              console.log(error)
            })
      }

      /*  If the table targeted is Homme  */
      else
      {
        http.get(`/database/actor/${childInfo.id}/`,{
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
          }})
            .then(response => {
              this.ressource = response.data
              console.log(this.ressource)
            })
            .catch(error => {
              console.log(error)
            })
      }
      
    }

  }
}


