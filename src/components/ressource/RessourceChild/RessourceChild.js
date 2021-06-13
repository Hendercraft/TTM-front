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
    // this.getRessourceChild(this.childInfo)
  },
  methods: {
    getRessourceChild(childInfo)
    {
      console.log(childInfo)
      /*  If the table targeted is for Architecture or Production */
      if (table != 'Homme')
      {
        http.get(`/database/object/${id}/`,{
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
        http.get(`/database/actor/${id}/`,{
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


