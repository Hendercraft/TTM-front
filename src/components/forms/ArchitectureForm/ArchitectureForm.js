import http from '../../../http-common'
import SuccessModal from '../../modals/Modal_Success'

export default {
  name: 'architecture-form',
  components: {SuccessModal},
  props: [],
  data() {
    return {
      categorie:"Architecture",
      selected_menu: [],

      name:null,

      typo_select: null,
      typologies:[],
      addTypo: false,
      typo_name:null,
      typo_plan_select: null,
      typo_wall_select: null,
      typo_roof_select: null,
      typo_floor_select: null,
      typo_couverture_select: null,
      typo_light_select: null,


      domaine: null,
      building_select: null,
      typo_periode_select: null,

      selected_energy:null,
      typo_energie_select: null,

      commentary: null,

      selected_brand: null,
      addBrand: false,
      brands: [],

      brandName: null,
      brandDescription: null,

      selected_date: null,
      date_d: null,
      date_m: null,
      date_y: null,


      selected_place: null,
      addPlace: false,
      places: [],

      placeName: null,
      street_number: null,
      street_type: null,
      street_name: null,
      post_code: null,
      city: null,
      country: null,
      place_said: null,
      placeDescription: null,

      source: [],
      sourceName: null,
      addSource: false,
      selected_source_date: null,
      source_date_d: null,
      source_date_m: null,
      source_date_y: null,
      date_comp: null,
      selected_editor: null,
      editor: null,
      droits: null,
      source_type: null,
      format: null,
      registration: null,
      original_registration: null,
      selected_author: null,
      author: null,
      study: null,
      cote: null,
      conservation: null,

      ObjectId:null,
      errors:null,


      output: "",
      ressource_file: "",

      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileId: null,
      fileInfos: [],
    }
  },
  computed: {

  },
  mounted() {
    this.getPlaces()
    this.getTypologie()
    this.getBrand()

  },
  methods: {
    getFormatGroup: function (event) {

      // 1. Get the selected index
      const index = event.target.selectedIndex;

      // 2. Find the selected option
      const option = event.target.options[index];

      // 3. Select the parent element (optgroup) for the selected option
      const optgroup = option.parentElement;

      // 4. Finally, get the label (Country group)
      this.formatGroup = optgroup.getAttribute('label');

      this.output = '<p>Your Selected Group is <strong>' + this.formatGroup + '</strong></p>';
      console.log(this.formatGroup);
    },


    selectFile() {
      this.selectedFiles = this.$refs.file.files
    },
    getBrand() {
      http.get("database/abstractObjects/", {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then(response => {
          this.brands = response.data.results
        })
    },
    getPlaces() {
      http.get("database/places/", {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then(response => {
          this.places = response.data.results
        })
    },
    getTypologie() {
      http.get("database/typologies/", {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then(response => {
          this.typologies = response.data.results
        })
    },
    postForm() {
      if (this.addBrand) {
        // Brand post part
        http.post("database/abstractObject/create/", {
          "name": this.brandName, "definition": this.brandDescription
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
          .then(response => {
            console.log(response)
            this.selected_brand = response.data.id
          })
          .catch(error => {
            console.log(error)
          })
      }


      if (this.addTypo) {
        // Typologie post part
        http.post("database/typology/create/", {
          "name":this.typo_name, "plan": this.typo_plan_select, "wall": this.typo_wall_select, "roof": this.typo_roof_select, "floor": this.typo_floor_select, "cover": this.typo_couverture_select, "light": this.typo_light_select
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
          .then(response => {
            console.log(response)
            this.typo_select = response.data.id
          })
          .catch(error => {
            console.log(error)
          })
      }


      if (this.addPlace) {
        // Place post part
        http.post("database/placeLocation/create/", {
          "street_number": this.street_number, "street_type": this.street_type, "street_name": this.street_name, "post_code": this.post_code, "city": this.city, "country": this.country, "place_said": this.place_said
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
          .then(response => {
            console.log(response)
            this.selected_placeLocation = response.data.id
            http.post("database/place/create/", {
              "name": this.placeName, "description": this.placeDescription, "place_location": this.selected_placeLocation
            }, {
              headers: {
                'Authorization': `Bearer ${localStorage.token}`
              }
            })
              .then(response => {
                console.log(response)
                this.selected_place = response.data.id
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch(error => {
            console.log(error)
          })
      }
      // Other classes creation


      /*  Object date*/
      http.post("database/date/create/",
      {
        "name": "Architecture date", "day": this.date_d, "month": this.date_m, "year": this.date_y
      }, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
      })
      .then(response => {
      this.selected_date = response.data.id
      
      /*  Energy */
      http.post("database/energy/create/",
      {
        "energy": this.typo_energie_select
      }, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
      })
      .then(response => {
        this.selected_energy = response.data.id
      })
      /*  Source date */
      http.post("database/date/create/",
        {
          "name": "Source date", "day": this.source_date_d, "month": this.source_date_m, "year": this.source_date_y
        }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then(response => {
          this.selected_source_date = response.data.id

          /*  Source author */
          http.post("database/author/create/",
            {
              "name": this.author,
            }, {
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            }
          })
            .then(response => {
              this.selected_editor = response.data.id

              /*  Source editor */
              http.post("database/author/create/",
                {
                  "name": this.editor,
                }, {
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                .then(response => {
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
                      }
                    })
                    .then(response => {
                      this.fileId = response.data.id

                      /*  Source  */
                      http.post("database/source/create/",
                        {
                          "name": this.sourceName,
                          "date_source": this.selected_source_date,
                          "conservationPlace": this.conservationPlace,
                          "author": this.author,
                          "editor": this.editor,
                          "rights": this.rights,
                          "url": this.fileId,

                          "viability": this.viability,
                          "registration": this.registration,
                          "original_registration": this.original_registration,
                          "study": this.study,

                        }, {
                        headers: {
                          'Authorization': `Bearer ${localStorage.token}`
                        }
                      })
                        .then(response => {
                          this.source.push(response.data.id)
                          let lower_menu = ""
                          this.selected_menu.forEach(element => {
                            lower_menu = element + " ; "
                          });
                          /*Object class*/
                          http.post("database/object/create/",
                            {
                              "categorie": this.categorie,
                              "domain": lower_menu,
                              "name":this.name,
                              "abstract_object":this.selected_brand,
                              "building": this.building_select,
                              "period":this.typo_periode_select,
                              "date":this.selected_date,
                              "fk_typologie":this.typo_select,
                              "energy":this.selected_energy,
                              "place":this.selected_place,
                              "description": this.commentary,
                              "source": this.source,
                            }, {
                            headers: {
                              'Authorization': `Bearer ${localStorage.token}`
                            }
                          })
                            .then(response => {
                              this.ObjectId = response.data.id
                              this.selected_menu= []
                              this.name=null
                              this.typo_select= null
                              this.typologies=[]
                              this.addTypo= false
                              this.typo_name=null
                              this.typo_plan_select= null
                              this.typo_wall_select= null
                              this.typo_roof_select= null
                              this.typo_floor_select= null
                              this.typo_couverture_select= null
                              this.typo_light_select= null
                              this.domaine= null
                              this.building_select= null
                              this.typo_periode_select=null
                              this.selected_energy=null
                              this.typo_energie_select= null
                              this.commentary= null
                              this.selected_brand= null
                              this.addBrand= false
                              this.brands= []
                              this.brandName= null
                              this.brandDescription= null
                              this.selected_date= null
                              this.date_d= null
                              this.date_m= null
                              this.date_y= null
                              this.selected_place= null
                              this.addPlace= false
                              this.places= []
                              this.placeName= null
                              this.street_number= null
                              this.street_type= null
                              this.street_name= null
                              this.post_code= null
                              this.city= null
                              this.country= null
                              this.place_said= null
                              this.placeDescription= null
                              this.source= []
                              this.sourceName= null
                              this.addSource= false
                              this.selected_source_date= null
                              this.source_date_d= null
                              this.source_date_m= null
                              this.source_date_y= null
                              this.date_comp= null
                              this.selected_editor= null
                              this.editor= null
                              this.droits= null
                              this.source_type= null
                              this.format= null
                              this.registration= null
                              this.original_registration= null
                              this.selected_author= null
                              this.author= null
                              this.study= null
                              this.cote= null
                              this.conservation= null
                              this.$forceUpdate()
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
    }
  }
}