import http from '../../../http-common'

export default {
  name: 'ressource-child',
  components: {},
  props: ['childInfo'],
  data () {
    return {
      ressource:[]
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
              http.get(`/database/abstractObject/${this.ressource.abstractObject}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.abstractObject = response.data.name
              })

              http.get(`/database/typeObject/${this.ressource.type_object}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.type_object = response.data.typeObject
              })

              http.get(`/database/typeObject/${this.ressource.type_object}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.type_object = response.data.typeObject
              })

              http.get(`/database/date/${this.ressource.date}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.date_day = response.data.day
                this.ressource.date_month = response.data.month
                this.ressource.date_year = response.data.year
              })

              http.get(`/database/typology/${this.ressource.fk_typologie}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.plan = response.data.plan
                this.ressource.wall = response.data.wall
                this.ressource.roof = response.data.roof
                this.ressource.floor = response.data.floor
                this.ressource.surface = response.data.surface
                this.ressource.light = response.data.light
                this.ressource.materials = response.data.materials
              })

              http.get(`/database/energy/${this.ressource.energy}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.energy = response.data.energy
              })

              http.get(`/database/place/${this.ressource.place}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.place_name = response.data.name
                this.ressource.place_location = response.data.place_location
                this.ressource.place_description = response.data.description
                
                http.get(`/database/placeLocation/${this.ressource.place_location}/`,{
                  headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                }})
                .then(response =>{
                  this.ressource.street_number = response.data.street_number
                  this.ressource.street_type = response.data.street_type
                  this.ressource.street_name = response.data.street_name
                  this.ressource.borough = response.data.borough
                  this.ressource.post_code = response.data.post_code
                  this.ressource.city = response.data.city
                  this.ressource.country = response.data.country
                  this.ressource.place_said = response.data.place_said
                })
              })

              http.get(`/database/source/${this.ressource.source}/`,{
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
              }})
              .then(response =>{
                this.ressource.source_name = response.data.name
                this.ressource.source_date = response.data.date_source
                this.ressource.conservation_place = response.data.conservation_place
                this.ressource.cote = response.data.cote
                this.ressource.rights = response.data.rights
                this.ressource.file_source = response.data.url
                this.ressource.registration = response.data.registration
                this.ressource.original_registration = response.data.original_registration
                this.ressource.viability = response.data.viability
                this.ressource.state = response.data.state
                this.ressource.study = response.data.study

                this.ressource.author = response.data.author
                this.ressource.editor = response.data.editor                
                

                
                http.get(`/database/date/${this.ressource.source_date}/`,{
                  headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                }})
                .then(response =>{
                  this.ressource.source_date_day = response.data.day
                  this.ressource.source_date_month = response.data.month
                  this.ressource.source_date_year = response.data.year
                  this.ressource.source_date_complement = response.data.complement
                })

                http.get(`/database/author/${this.ressource.author}/`,{
                  headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                }})
                .then(response =>{
                  this.ressource.author_name = response.data.name
                  this.ressource.author_lastname = response.data.lastName
                  this.ressource.author_status = response.data.status
                })

                http.get(`/database/editor/${this.ressource.editor}/`,{
                  headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                }})
                .then(response =>{
                  this.ressource.editor_name = response.data.name
                  this.ressource.editor_lastname = response.data.lastName
                  this.ressource.editor_status = response.data.status                  
                })

                http.get(`/database/file/${this.ressource.file_source}/`,{
                  headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                }})
                .then(response =>{
                  this.ressource.file_type = response.data.file_type
                  this.ressource.file_extension = response.data.file_extension
                  this.ressource.url = response.data.url                  
                })

              })
              
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


