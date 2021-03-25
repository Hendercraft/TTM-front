import axios from "axios"

export default {
  name: 'new-ressource',
  components: {},
  props: [],
  data () {
    return {
      errors: [],
      name: null,
      date: null,
      // event: null,
      // description: null,

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      if (this.name && this.date) {
        return true;
      }     

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.date) {
        this.errors.push('Date required.');
      }
      return false
      // e.preventDefault();
    },
    sendForm: function(){
      axios.post('http://127.0.0.1:8000/api/database/date/create/',
      {"name":this.name, "date":this.date},
      {
        headers: {
        'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response => {
        console.log(response.data.results),
        this.name = null;
        this.date = null;
      })
      .catch(error =>{
        console.log(error.response.data.detail)
        this.errors.push(error.response.data.detail)
      })
    },
    submitForm: function(){
      if(this.checkForm()){
        this.sendForm()
      }
    }

  }
}