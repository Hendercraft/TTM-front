import axios from "axios"
import { jwtDecrypt } from "../../services/jwtService"
import UploadFiles from '../UploadFiles.vue'
import Bar from '@/components/Bar'

export default {
  name: 'homeLoged',
  components: { UploadFiles, Bar },
  props: [],
  data () {
    return {
      items: null,
      jsondata: null
    }
  },
  computed: {

  },
  mounted () {
    this.GetProfiles()
  },
  methods: {
    GetProfiles: function(){
      axios.get('http://127.0.0.1:8000/api/community/discipline/',
                {
                  headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                  }
                })
      .then(response => {
        console.log(response.data.results),
        this.items = response.data.results

      })
      .catch(error => {
        console.log(error.response) 
        // console.log(error.response.data)
        // this.errors = error.response.data.detail
      })
    },
    // GetJsonData(Json) {
    //   fetch(Json)
    //     .then(response => response.json())
    //     .then(data => (this.jsondata = data));
    // }
    Decrypt: function(){
      var Json = jwtDecrypt(localStorage.token)
      console.log(Json)
    }
  }
}