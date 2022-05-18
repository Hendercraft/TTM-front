import http from '../../../http-common'
import SuccessModal from '../../modals/Modal_Success'

export default {
  name: 'human-form',
  components: {SuccessModal},
  props: [],
  data () {
    return {
      categorie:"Hommes",
      selected_menu:[],

      selected_brand:null,
      addBrand:false,
      brands:[],

      brandName:null,
      brandDescription:null,

      building_select:null,
      name:null,
      last_name:null,

      selected_profession:[],
      addProfession:false,
      professions:[],

      professionName:null,
      professionDescription:null,

      instruction_level:null,

      selected_birthdate:null,
      birth_d:null,
      birth_m:null,
      birth_y:null,

      selected_birth_place:null,

      gender:null,
      selected_arrival_date:null,
      arrivalDate:null,
      arrivalDate_d:null,
      arrivalDate_m:null,
      arrivalDate_y:null,

      selected_departure_date:null,
      departureDate:null,
      departureDate_d:null,
      departureDate_m:null,
      departureDate_y:null,

      nationality:null,
      
      selected_place:[],
      selected_placeLocation:null,
      addPlace:false,
      places:[],



      placeName:null,
      street_number:null,
      street_type:null,
      street_name:null,
      post_code:null,
      city:null,
      country:null,
      place_said:null,
      placeDescription:null,


      addCivilState:null,
      home_status:null,
      home_size:null,
      selected_wedding_date:null,
      wedding_date_d:null,
      wedding_date_m:null,
      wedding_date_y:null,

      wedding_place:null,

      wedding_name:null,
      wedding_lastName:null,

      selected_death_date:null,
      death_date_d:null,
      death_date_m:null,
      death_date_y:null,

      death_place:null,

      commentary:null,


      source:[],
      sourceName:null,
      addSource:false,
      selected_source_date:null,
      source_date_d:null,
      source_date_m:null,
      source_date_y:null,
      date_comp:null,
      selected_editor:null,
      editor:null,
      droits:null,
      source_type:null,
      format:null,
      registration:null,
      original_registration:null,
      selected_author:null,
      author:null,
      study:null,
      cote:null,
      conservation:null,




      output:"",
      ressource_file: "",

      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileId: null,
      formatGroup:null,
      type:null,
      fileInfos: [],



      RessouceSuccessfullyAdded:false,
      errors:null,
    }
  },
  computed: {

  },
  mounted () {
    console.log(this.fileId)
    this.getPlaces()
    this.getProfession()
    this.getBrand()
    this.$modal.show('modal-success')
  },
  methods: {
    getFormatGroup: function(event){

      // 1. Get the selected index
      const index = event.target.selectedIndex;
  
      // 2. Find the selected option
      const option = event.target.options[index];
  
      // 3. Select the parent element (optgroup) for the selected option
      const optgroup = option.parentElement;
  
      // 4. Finally, get the label (Format group)
      this.formatGroup = optgroup.getAttribute('label');
      
      this.output = '<p>Your Selected Group is <strong>' + this.formatGroup +'</strong></p>';
      console.log(this.formatGroup);
    },

  
  selectFile () {
    this.selectedFiles = this.$refs.file.files
  },
  getBrand(){
    http.get("database/abstractObjects/",{
      headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }})
        .then(response => {
            this.brands = response.data.results
        })
  },
  getPlaces() {
    http.get("database/places/",{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }})
        .then(response => {
          this.places = response.data.results
        })
  },
  getProfession(){
    http.get("database/professions/",{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }})
        .then(response => {
            this.professions = response.data.results
        })
  },

  postForm()
  {
    if(this.addBrand)
    {
      // Brand post part
      http.post("database/abstractObject/create/", {
        "name":this.brandName, "definition":this.brandDescription
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        console.log(response)
        this.selected_brand = response.data.id 
      })
      .catch(error => {
        console.log(error)
      })
    }


    if(this.addProfession)
    {
      // Profession post part
      http.post("database/profession/create/", {
        "name":this.professionName, "definition":this.professionDescription
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        console.log(response)
        this.selected_profession = response.data.id 
      })
      .catch(error => {
        console.log(error)
      })
    }


    if(this.addPlace)
    {
      // Place post part
      http.post("database/placeLocation/create/", {
        "street_number":this.street_number, "street_type":this.street_type, "street_name":this.street_name, "post_code":this.post_code, "city":this.city, "country":this.country, "place_said":this.place_said
      }, {
        headers: {
        'Authorization': `Bearer ${localStorage.token}` 
        }
      })
      .then(response =>{
        console.log(response)
        this.selected_placeLocation = response.data.id
        http.post("database/place/create/", {
          "name":this.placeName, "description":this.placeDescription, "place_location":this.selected_placeLocation
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        .then(response=> {
          console.log(response)
          this.selected_place=response.data.id 
        })
        .catch(error =>{
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
    // Other classes creation

    /*  Birth date */
    http.post("database/date/create/",  
    {
      "name":"Birthdate", "day": this.birth_d, "month": this.birth_m,"year":this.birth_y
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(response =>{
      this.selected_birthdate = response.data.id

      /*  Arrival date */
      http.post("database/date/create/",
      {
        "name":"Arrival date", "day": this.arrivalDate_d, "month": this.arrivalDate_m,"year":this.arrivalDate_y
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        this.selected_arrival_date = response.data.id


        /*  Departure date */
        http.post("database/date/create/",
        {
          "name":"Departure date", "day": this.departureDate_d, "month": this.departureDate_m,"year":this.departureDate_y
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        .then(response =>{
          this.selected_departure_date = response.data.id

          /*  Wedding date */
          http.post("database/date/create/",
          {
            "name":"Wedding date", "day": this.wedding_date_d, "month": this.wedding_date_m,"year":this.wedding_date_y
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            }
          })
          .then(response =>{
            this.selected_wedding_date = response.data.id
            /*  Death date */
            http.post("database/date/create/",
            {
              "name":"Death date", "day": this.death_date_d, "month": this.death_date_m,"year":this.death_date_y
            }, {
              headers: {
                'Authorization': `Bearer ${localStorage.token}`
              }
            })
            .then(response =>{
              this.selected_death_date = response.data.id

              /*  Source date */
              http.post("database/date/create/",
              {
                "name":"Source date", "day": this.source_date_d, "month": this.source_date_m,"year":this.source_date_y
              }, {
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
              .then(response =>{
                this.selected_source_date = response.data.id

                /*  Source author */
                http.post("database/author/create/",
                {
                  "name":this.author,
                }, {
                  headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                  }
                })
                .then(response =>{
                  this.selected_editor = response.data.id

                  /*  Source editor */
                  http.post("database/author/create/",
                  {
                    "name":this.editor,
                  }, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.token}`
                    }
                  })
                  .then(response =>{
                    this.selected_editor = response.data.id


                    let formData = new FormData()
                    this.currentFile = this.selectedFiles.item(0)

                    formData.append('url', this.currentFile)
                    formData.append('file_type', this.formatGroup)
                    formData.append('file_extension', this.format)
                    http.post('database/file/create/', formData, 
                    {
                      headers: 
                      {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.token}`
                    } })
                    .then(response => 
                      {
                        this.fileId=response.data.id
                      
                        /*  Source  */
                        http.post("database/source/create/",
                        {
                          "name":this.sourceName,
                          "date_source":this.selected_source_date, 
                          "conservationPlace": this.conservationPlace,
                          "author": this.author,
                          "editor": this.editor,
                          "rights": this.rights,
                          "url": this.fileId,

                          "viability": this.viability,
                          "registration": this.registration,
                          "original_registration":this.original_registration,
                          "study":this.study,

                        }, {
                          headers: {
                            'Authorization': `Bearer ${localStorage.token}`
                          }
                        })
                        .then(response =>{
                          this.source.push(response.data.id)
                          let lower_menu = ""
                          this.selected_menu.forEach(element => {
                            lower_menu = element + " ; "
                          });
                          /*Actor class*/
                          http.post("database/actor/create/",
                          {
                            "categorie":this.categorie,
                            "abstract_object":this.selected_brand,
                            "domain":lower_menu,
                            "building":this.building_select,
                            "name":this.name,
                            "last_name":this.last_name,
                            "profession":this.selected_profession,
                            "instruction_level":this.instruction_level,
                            "birth_date":this.selected_birthdate,
                            "birth_place":this.selected_birth_place,
                            "gender":this.gender,
                            "arrival_date":this.selected_arrival_date,
                            "departure_date":this.selected_departure_date,
                            "nationality":this.nationality,
                            "living_place":this.selected_place,
                            "home_status":this.home_status,
                            "home_size":this.home_size,
                            "wedding_date":this.selected_wedding_date,
                            "wedding_place":this.wedding_place,
                            "wedding_name":this.wedding_name,
                            "wedding_lastName":this.wedding_lastName,
                            "death_date":this.selected_death_date,
                            "death_place":this.death_place,
                            "commentary":this.commentary,
                            "source":this.source,
                          }, {
                            headers: {
                              'Authorization': `Bearer ${localStorage.token}`
                            }
                          })
                          .then(response =>{
                            this.ObjectId = response.data.id
                            this.$modal.show('modal-success')
                          })
                          .catch(error => {
                            console.log(error)
                            this.errors = error.message
                          })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  
}}


