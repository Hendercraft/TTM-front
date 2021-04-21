import http from '../../http-common'

export default {
  name: 'architecture-form',
  components: {},
  props: [],
  data () {
    return {
      selected_menu:null,
      selected_type:null,

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
    }
  }
}


