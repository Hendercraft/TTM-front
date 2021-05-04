import UploadFiles from '../UploadFiles.vue'
import UploadService from '../../services/UploadFilesService'
import http from '../../http-common'

export default {
  name: 'human-form',
  components: {UploadFiles},
  props: [],
  data () {
    return {
      selected_menu:null,
      selected_type:[],

      building_select:null,
      lname:null,
      fname:null,
      birthdate:null,
      birth_d:null,
      birth_m:null,
      birth_y:null,

      arrivalDate:null,
      arrivalDate_d:null,
      arrivalDate_m:null,
      arrivalDate_y:null,
      departureDate:null,
      departureDate_d:null,
      departureDate_m:null,
      departureDate_y:null,

      gender:null,
      arrivalDate:null,
      departureDate:null,
      nationality:null,
      commentary:null,

      selected_brand:null,
      addBrand:false,
      brands:[],

      brandName:null,
      brandDescription:null,

      selected_profession:null,
      addProfession:false,
      professions:[],

      professionName:null,
      professionDescription:null,


      selected_place:null,
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

      source:null,
      sourceName:null,
      addSource:false,
      sourceDateId:null,
      date_d:null,
      date_m:null,
      date_y:null,
      date_comp:null,
      editor:null,
      droits:null,
      source_type:null,
      format:null,
      immatriculation:null,
      original_immatriculation:null,
      author:null,
      study:null,




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
    console.log(this.fileId)
    this.getPlaces()
    this.getProfession()
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
  upload () {
    this.progress = 0
    console.log('uploading...')
    this.currentFile = this.selectedFiles.item(0)
    UploadService.upload(this.currentFile, event => {
      this.progress = Math.round((100 * event.loaded) / event.total)
      }, this.formatGroup)
      .then(response => {
        console.log("Uploaded")
        this.message = response.data
        this.fileId = response.data.id
        http.post('database/ressource/create/', {
          "designation": this.designation,
          "repere_historique": this.repere_historique,
          "ressource_date": this.date,
          "localization": this.localization,
          "adress": this.adresse,
          "description": this.description,
          "mots_cles": this.mots_cles,
          "ressource_source": this.source,
          "editeur": this.editeur,
          "droits": this.droits,
          "ressource_type": this.ressource_type,
          "ressource_format": this.format,
          "immatriculation": this.immatriculation,
          "etude": this.etude,
          "auteur": this.auteur,
          "date_etude": this.date_etude,
          "ressource_file": this.fileId
        })
        .then(response =>{
          console.log(response.data)
        })
        // this.$emit(this.fileId)
        // console.log(this.fileId)
      })
      .then(files => {
        this.fileInfos = files.data.results
      })
      .catch(() => {
        this.progress = 0
        this.message = 'Could not upload the file!'
        this.currentFile = undefined
      })

    this.selectedFiles = undefined
    },
  getBrand(){
    http.get("database/abstractObject/",{
      headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }})
        .then(response => {
            this.brands = response.data.results
        })
  },
  getPlaces() {
    http.get("database/place/",{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }})
        .then(response => {
          this.places = response.data.results
        })
  },
  getProfession(){
    http.get("database/profession/",{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }})
        .then(response => {
            this.professions = response.data.results
        })
  },
  postActorForm(){
      if(this.addBrand && this.addPlace && this.addProfession){

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
            this.selected_place = response.data.id
          })
          .catch(error =>{
            console.log(error)
          })
        })
        .catch(error => {
          console.log(error)
        })
      }



      if(this.addBrand && this.addPlace && !this.addProfession){
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
          this.selected_place = response.data.id
          })
          .catch(error =>{
            console.log(error)
          })
        })
        .catch(error => {
          console.log(error)
        })
      }


      if(this.addBrand && !this.addPlace && this.addProfession){
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
      if(this.addBrand && !this.addPlace && !this.addProfession){
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
      if(!this.addBrand && this.addPlace && this.addProfession){
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
            this.selected_place = response.data.id
          })
          .catch(error =>{
            console.log(error)
          })
        })
        .catch(error => {
          console.log(error)
        })
      }


      if(!this.addBrand && this.addPlace && !this.addProfession){
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
            this.selected_place = response.data.id
          })
          .catch(error =>{
            console.log(error)
          })
        })
        .catch(error => {
          console.log(error)
        })
      }


      if(!this.addBrand && !this.addPlace && this.addProfession){
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
      if(!this.addBrand && !this.addPlace && !this.addProfession){
        console.log("yes")
      }


      // Main post part

      http.post("database/date/create/",
      {
        "":""
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        this.birthdate = response.data.id
      })

      http.post("database/date/create/",
      {
        "":""
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        this.arrivalDate = response.data.id
      })

      http.post("database/date/create/",
      {
        "":""
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        this.departureDate = response.data.id
      })

      http.post("database/date/create/",
      {
        "":""
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        this.sourceDateId = response.data.id
      })
    }
  },
}

