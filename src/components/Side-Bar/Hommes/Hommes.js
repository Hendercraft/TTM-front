import http from "../../../http-common"
import LoginModal from '../../modals/Modal_Login'
import DeleteRessourceModal from '../../modals/Modal_Delete_Ressource'
import { tokenIsValid } from "../../../services/jwtService"

export default {
  name: 'hommes',
  components: {LoginModal, DeleteRessourceModal},
  props: [],
  data () {
    return {
      hommes:[],
      deleteID:null,
      playload:null,
      data:null,
    }
  },
  computed: {

  },
  mounted () {
    this.getHommes()
  },
  methods: {
    getHommes() {
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
              if(this.data['field'] == 'Hommes')
              {
                this.hommes.push(this.data)
              }
            }
            console.log(this.data)
          })
    },

    //Used to display delete-ressource modal and pass deleteID in arg
    deleteRessource(id)
    {
      const result = tokenIsValid()
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
        this.hommes.forEach(element => {
          if(element.id==this.playload.id)
          {
            const index = this.hommes.indexOf(element)
            if(index>-1)
            {
              this.hommes.splice(index,1)
            }
          }
        })
      }
    }
  }
}


