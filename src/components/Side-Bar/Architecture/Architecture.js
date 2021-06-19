import http from "../../../http-common"
import LoginModal from '../../modals/Modal_Login'
import DeleteRessourceModal from '../../modals/Modal_Delete_Ressource'
import { tokenIsValid } from "../../../services/jwtService"

export default {
  name: 'architecture',
  components: {LoginModal, DeleteRessourceModal},
  props: [],
  data () {
    return {
      architectures:[],
      deleteID:null,
      playload:null,
      data:null,
    }
  },
  computed: {

  },
  mounted () {
    this.getArchitecture()
  },
  methods: {
    getArchitecture() {
      http.get("database/ressources/",{
        headers: {
          'Content-type': 'application/json',
        },
        params: {
            page:1
          }
        })
          .then(response => {
            for (var i = 0; i < response.data.results.length; i++)
            {
              this.data = response.data.results[i]
              if(this.data['field'] == 'Architecture')
              {
                this.architectures.push(this.data)
              }
            }
            console.log(this.data)
          })
    },

    //Used to display delete-ressource modal and pass deleteID in arg
    deleteRessource(id)
    {
      const result = tokenIsValid()
      console.log(result)
      if(result==true)
      {
        this.deleteID = id
        this.$modal.show('modal-delete-ressource')
      }
      if(result==false)
      {
        this.$modal.show('modal-login')
      }
      
      
    },

    //Used to remove the supressed ressource from the displayed list
    deletedConfirmation(playload)
    {
      if(this.deleteID != playload.id)
      {
        return "error"
      }
      else
      {
        this.playload = playload
        this.architectures.forEach(element => {
          if(element.id==this.playload.id)
          {
            const index = this.architectures.indexOf(element)
            if(index>-1)
            {
              this.architectures.splice(index,1)
            }
          }
        })
      }
    }

  }
}


