import axios from "axios"
import FormHandler from '@/components/FormHandler'
import FormDate from '@/components/FormDate'
import UrbanismForm from '@/components/UrbanismForm'
import ArchitectureForm from '@/components/ArchitectureForm'
import ProductionForm from '@/components/ProductionForm'
import HumanForm from '@/components/HumanForm'


export default {
  name: 'new-ressource',
  components: {FormHandler, FormDate, UrbanismForm, ArchitectureForm, ProductionForm, HumanForm},
  props: [],
  data () {
    return {
      errors: [],
      name: null,
      date: null,
      category: undefined,
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
    

  }
}