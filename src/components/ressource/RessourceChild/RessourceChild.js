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
    
  },
  created(){
    this.getRessourceChild(this.childInfo)
  },
  methods: {
    getRessourceChild(childInfo)
    {
      console.log(childInfo, "here")
      /*  If the table targeted is for Architecture or Production */
      if (childInfo.object)
      {
        http.get(`/database/object/${childInfo.id}/`)
            .then(response => {
              this.ressource = response.data
              console.log(this.ressource, "la ressource fille objet")
              if(this.ressource.abstract_object)
              {
                http.get(`/database/abstractObject/${this.ressource.abstract_object}/`)
                .then(response =>{
                  this.ressource.abstract_object = response.data.name
                  this.$forceUpdate()
                })
              }

              if(this.ressource.type_object)
              {
                http.get(`/database/typeObject/${this.ressource.type_object}/`)
                .then(response =>{
                  this.ressource.type_object = response.data.typeObject
                  this.$forceUpdate()
                })
              }
              

              
              if(this.ressource.date)
              {
                http.get(`/database/date/${this.ressource.date}/`)
                .then(response =>{
                  this.ressource.date_day = response.data.day
                  this.ressource.date_month = response.data.month
                  this.ressource.date_year = response.data.year
                  this.$forceUpdate()
                })
              }

              
              if(this.ressource.fk_typologie)
              {
                http.get(`/database/typology/${this.ressource.fk_typologie}/`)
                .then(response =>{
                  this.ressource.plan = response.data.plan
                  this.ressource.wall = response.data.wall
                  this.ressource.roof = response.data.roof
                  this.ressource.floor = response.data.floor
                  this.ressource.surface = response.data.surface
                  this.ressource.light = response.data.light
                  this.ressource.materials = response.data.materials
                  this.$forceUpdate()
                })
              }
              
              if(this.ressource.energy)
              {
                http.get(`/database/energy/${this.ressource.energy}/`)
                .then(response =>{
                  this.ressource.energy = response.data.energy
                  this.$forceUpdate()
                })
              }
              
              if(this.ressource.place)
              {
                http.get(`/database/place/${this.ressource.place}/`)
                .then(response =>{
                  this.ressource.place_name = response.data.name
                  this.ressource.place_location = response.data.place_location
                  this.ressource.place_description = response.data.description
                  
                  if(this.ressource.place_location)
                  {
                    http.get(`/database/placeLocation/${this.ressource.place_location}/`)
                    .then(response =>{
                      this.ressource.street_number = response.data.street_number
                      this.ressource.street_type = response.data.street_type
                      this.ressource.street_name = response.data.street_name
                      this.ressource.borough = response.data.borough
                      this.ressource.post_code = response.data.post_code
                      this.ressource.city = response.data.city
                      this.ressource.country = response.data.country
                      this.ressource.place_said = response.data.place_said
                      this.$forceUpdate()
                    })
                  }
                })
              }
              
              if(this.ressource.source[0])
              {
                http.get(`/database/source/${this.ressource.source[0]}/`)
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
                  
  
                  
                  http.get(`/database/date/${this.ressource.source_date}/`)
                  .then(response =>{
                    this.ressource.source_date_day = response.data.day
                    this.ressource.source_date_month = response.data.month
                    this.ressource.source_date_year = response.data.year
                    this.ressource.source_date_complement = response.data.complement
                    this.$forceUpdate()
                  })
  
                  http.get(`/database/file/${this.ressource.file_source}/`)
                  .then(response =>{
                    this.ressource.file_type = response.data.file_type
                    this.ressource.file_extension = response.data.file_extension
                    this.ressource.url = response.data.url  
                    this.$forceUpdate()                   
                  })
                })
              }
              
              
            })
            .catch(error => {
              console.log(error)
            })
      }

      /*  If the table targeted is Homme  */
      else
      {
        http.get(`/database/actor/${childInfo.id}/`)
            .then(response => {
              this.ressource = response.data
              console.log(this.ressource, "la ressource fille acteur")

              if(this.ressource.abstract_object)
              {
                http.get(`/database/abstractObject/${this.ressource.abstract_object}/`)
                .then(response =>{
                  this.ressource.abstract_object = response.data.name
                  this.$forceUpdate()
                })
              }

              if(this.ressource.profession)
              {
                http.get(`/database/abstractObject/${this.ressource.profession}/`)
                .then(response =>{
                  this.ressource.profession_name = response.data.name
                  this.ressource.profession_definition = response.data.definition
                  this.$forceUpdate()
                })
              }

              http.get(`/database/date/${this.ressource.birth_date}/`)
                  .then(response =>{
                    this.ressource.birth_date_day = response.data.day
                    this.ressource.birth_date_month = response.data.month
                    this.ressource.birth_date_year = response.data.year
                    this.ressource.birth_date_complement = response.data.complement
                    this.$forceUpdate() 
                  })
              
              http.get(`/database/date/${this.ressource.arrival_date}/`)
                  .then(response =>{
                    this.ressource.arrival_date_day = response.data.day
                    this.ressource.arrival_date_month = response.data.month
                    this.ressource.arrival_date_year = response.data.year
                    this.ressource.arrival_date_complement = response.data.complement
                    this.$forceUpdate() 
                  })
              
              http.get(`/database/date/${this.ressource.departure_date}/`)
                  .then(response =>{
                    this.ressource.departure_date_day = response.data.day
                    this.ressource.departure_date_month = response.data.month
                    this.ressource.departure_date_year = response.data.year
                    this.ressource.departure_date_complement = response.data.complement
                    this.$forceUpdate() 
                  })

              http.get(`/database/date/${this.ressource.wedding_date}/`)
                  .then(response =>{
                    this.ressource.wedding_date_day = response.data.day
                    this.ressource.wedding_date_month = response.data.month
                    this.ressource.wedding_date_year = response.data.year
                    this.ressource.wedding_date_complement = response.data.complement
                    this.$forceUpdate() 
                  })
              
              http.get(`/database/date/${this.ressource.death_date}/`)
                  .then(response =>{
                    this.ressource.death_date_day = response.data.day
                    this.ressource.death_date_month = response.data.month
                    this.ressource.death_date_year = response.data.year
                    this.ressource.death_date_complement = response.data.complement
                    this.$forceUpdate() 
                  })



              if(this.ressource.living_place)
              {
                http.get(`/database/place/${this.ressource.living_place}/`)
                .then(response =>{
                  this.ressource.place_name = response.data.name
                  this.ressource.place_location = response.data.place_location
                  this.ressource.place_description = response.data.description
                  
                  if(this.ressource.place_location)
                  {
                    http.get(`/database/placeLocation/${this.ressource.place_location}/`)
                    .then(response =>{
                      this.ressource.street_number = response.data.street_number
                      this.ressource.street_type = response.data.street_type
                      this.ressource.street_name = response.data.street_name
                      this.ressource.borough = response.data.borough
                      this.ressource.post_code = response.data.post_code
                      this.ressource.city = response.data.city
                      this.ressource.country = response.data.country
                      this.ressource.place_said = response.data.place_said
                      this.$forceUpdate()
                    })
                  }
                })
              }

              if(this.ressource.source[0])
              {
                http.get(`/database/source/${this.ressource.source[0]}/`)
                .then(response =>{
                  console.log(response.data)
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
                  
                  http.get(`/database/date/${this.ressource.source_date}/`)
                  .then(response =>{
                    this.ressource.source_date_day = response.data.day
                    this.ressource.source_date_month = response.data.month
                    this.ressource.source_date_year = response.data.year
                    this.ressource.source_date_complement = response.data.complement
                    this.$forceUpdate()   
                  })

  
                  http.get(`/database/file/${this.ressource.file_source}/`)
                  .then(response =>{
                    console.log(response.data, "here 2")
                    this.ressource.file_type = response.data.file_type
                    this.ressource.file_extension = response.data.file_extension
                    this.ressource.url = response.data.url
                    this.$forceUpdate()                
                  })
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
      }
      
    }

  }
}


