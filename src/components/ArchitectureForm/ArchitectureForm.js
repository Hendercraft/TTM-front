import { error } from 'shelljs'
import http from '../../http-common'

export default {
  name: 'architecture-form',
  components: {},
  props: [],
  data () {
    return {
      selected_menu:[],
      selected_type:[],

      typo_select:null,
      addTypo:false,

      domaine:null,
      building:null,
      lname:null,
      fname:null,
      birthdate:null,
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
      addSource:false,
      editor:null,
      droits:null,
      source_type:null,
      format:null,
      immatriculation:null,
      original_immatriculation:null,
      author:null,
      study:null,
      
      
    }
  },
  computed: {
    
  },
  mounted () {
    this.getPlaces()
    this.getProfession()
    this.getBrand()
    
  },
  methods: {
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
      http.get("database/socialActivity/",{
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
          this.selected_place = response.data.id

          http.post("database/actor/create/", {
            
          },{
            headers: {
              'Authorization': `Bearer ${localStorage.token}` 
              }
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
        })
        .catch(error => {
          console.log(error)
        })
      }
      if(!this.addBrand && !this.addPlace && !this.addProfession){
        console.log("yes")
      }
    }
  }
}