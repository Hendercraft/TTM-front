import http from '../../http-common'

export default {
  name: 'form-date',
  components: {},
  props: [],
  data () {
    return {
      name:null,
      date:null,
      duration:null,
      sources:[],
      selected_source: null
    }
  },
  computed: {

  },
  mounted () {
    this.getSources()

  },
  methods: {
    getSources: function(){
      http.get('database/source/')
      .then(response => {
        console.log("Successfull retrieving of Source data")
        console.log(response.data.results)
        this.sources = response.data
      })
      .catch(()=>{
        console.log("Error while catching source data")
      })
    },

    sendForm: function(){
      if(this.sources.length = 0 || this.selected_source == null){
        http.post('/database/date/create/',
          {"name":this.name, "date":this.date},
          {
            headers: {
            'Authorization': `Bearer ${localStorage.token}`
            }
          })
          .then(response => {
            console.log(response.data),
            this.name = null;
            this.date = null;
          })
          .catch(error =>{
            console.log(error.response.data.detail)
            this.errors.push(error.response.data.detail)
          })
      }
      else{
        http.post('/database/date/create/',
          {"name":this.name, "date":this.date, "source_date":this.selected_source.id},
          {
            headers: {
            'Authorization': `Bearer ${localStorage.token}`
            }
          })
          .then(response => {
            console.log(response.data.results),
            this.name = null;
            this.date = null;
            this.selected_source=null;
          })
          .catch(error =>{
            console.log(error.response.data.detail)
            this.errors.push(error.response.data.detail)
          })
      }
    }
  }
}


