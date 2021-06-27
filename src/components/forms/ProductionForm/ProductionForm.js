import http from '../../../http-common'
import SuccessModal from '../../modals/Modal_Success'

export default {
  name: 'production-form',
  components: {SuccessModal},
  props: [],
  data () {
    return {
      categorie:"Production",
      selected_menu:[],
      selected_brand:null,

      name:null,

      brandDescription:null,
      building_select:null,
      machine_select:null,
      periode_select:null,
      inscript_select:null,
      energy_select:null,
      material_select:null,
      state_select:null,

      addConstr:false,
      addSource: false,
      addBrand: false,


      date_d:null,
      date_m:null,
      date_y:null,

      brands:null,
      brandName:null,
      inscript_comp:null,
      state_comp:null,
      description:null,


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

      commentary:null,

      output:"",
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
  mounted () {
    this.getBrand()
  },
  methods: {
    getFormatGroup: function(event){

      // 1. Get the selected index
      const index = event.target.selectedIndex;
  
      // 2. Find the selected option
      const option = event.target.options[index];
  
      // 3. Select the parent element (optgroup) for the selected option
      const optgroup = option.parentElement;
  
      // 4. Finally, get the label (Country group)
      this.formatGroup = optgroup.getAttribute('label');
      
      this.output = '<p>Your Selected Group is <strong>' + this.formatGroup +'</strong></p>';
      console.log(this.formatGroup);
    },

  
    selectFile () {
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
        "energy": this.energy_select
      }, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
      })
      .then(response => {
        this.energy_select = response.data.id
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
                              "machine": this.machine_select,
                              "period":this.periode_select,
                              "date":this.selected_date,
                              "energy":this.energy_select,
                              "material": this.material_select,
                              "constructor_inscription":this.inscript_select,
                              "constructor_precision":this.inscript_comp,
                              "conservation_state":this.state_select,
                              "precision_conservation_state":this.state_comp,
                              "description": this.description,
                              "content":this.commentary,
                              "source": this.source,
                            }, {
                            headers: {
                              'Authorization': `Bearer ${localStorage.token}`
                            }
                          })
                            .then(response => {
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
    }
  }
}


