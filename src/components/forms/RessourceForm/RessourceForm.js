import http from "../../../http-common"

export default {
  name: 'ressource-form',
  components: {},
  props: [],
  data () {
    return {
      name:null,
      description:null,
      field:null,
      object_architecture:[],
      object_production:[],
      actor:[],

      objects:[],
      architectures:[],
      productions:[],
      hommes:[],
    }
  },
  computed: {

  },
  mounted () {
    this.getRessources()
  },
  methods: {
    getRessources()
    {
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
              if(data.field == 'Production')
              {
                this.productions.push(data)
                console.log(this.productions)
              }
              if(data.field == 'Homme')
              {
                this.hommes.push(data)
                console.log(this.hommes)
              }
            }
          })
    },
    postForm()
    {
      //Concatenate architecture and production id (both of them are objects)
      this.objects = this.architectures
      this.objects = this.objects.concat(this.productions)


      http.post("database/ressource/create/",{
        "name":this.name, 
        "description":this.description, 
        "field":this.field, 
        "objects_son":this.objects, 
        "actors_son":this.hommes
        },
        {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }})
          .then(response => {
            console.log(response.data.results)
          })
    }
  }
}


