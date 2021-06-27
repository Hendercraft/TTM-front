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

      errors:null,
    }
  },
  computed: {

  },
  mounted () {
    this.getAllChildRessources()
  },
  methods: {
    getAllChildRessources()
    {
      http.get('/database/objects/')
      .then(response => {
        if(response.data.results.length > 0)
        {
          response.data.results.forEach(element => {
            if(element.categorie == "Architecture")
            {
              this.architectures.push(element)
            }
            if(element.categorie == "Production")
            {
              this.productions.push(element)
            }
          })
        }
      })
      
      http.get('/database/actors/')
      .then(response => {
        if(response.data.results.length > 0)
        {
          response.data.results.forEach(element => {
            if(element.categorie == "Hommes")
            {
              this.hommes.push(element)
            }
          })
        }
      })
    },
    postForm()
    {
      //Concatenate architecture and production id (both of them are objects)
      this.objects = this.object_architecture
      this.objects = this.objects.concat(this.object_production)


      console.log(this.objects, "object")
      console.log(this.actor)
      http.post("database/ressource/create/",{
        "name":this.name, 
        "description":this.description, 
        "field":this.field, 
        "objects_son":this.objects, 
        "actors_son":this.actor
        },
        {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }})
          .then(response => {
            console.log(response.data.results)
          })
          .catch(error => {
            this.errors = error.message
          })
    }
  }
}


