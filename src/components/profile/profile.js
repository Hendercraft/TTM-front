import http from '../../http-common'
import { jwtDecrypt, tokenIsValid } from "../../services/jwtService"

export default {
  name: 'profile',
  components: {},
  props: [],
  data () {
    return {
      data:true,
      discipline:false,
      champs:false,
      etablissement:false,


      user:null,
    }
  },
  computed: {

  },
  mounted () {
    this.getUser()
  },
  methods: {
    changeToData(){
      this.data = true
      this.discipline = false
      this.champs = false
      this.etablissement = false
    },
    changeToDiscipline(){
      this.data = false
      this.discipline = true
      this.champs = false
      this.etablissement = false
    },
    changeToChamps(){
      this.data = false
      this.discipline = false
      this.champs = true
      this.etablissement = false
    },
    changeToEtablissement(){
      this.data = false
      this.discipline = false
      this.champs = false
      this.etablissement = true
    },


    getUser(){
      const authenticate = tokenIsValid()
      if(authenticate)
      {
        let user_inf = jwtDecrypt(localStorage.getItem('token'))
        http.get(`community/${user_inf.user_id}/`)
        .then(response => {
          this.user = response.data

          console.log(this.user)

          if(this.user.disciplineFK)
          {
            http.get(`community/discipline/${this.user.disciplineFK}/`)
            .then(response => {
              console.log(response.data)
              this.user.discipline = response.data.discipline
              this.user.commentsDiscipline = response.data.commentsDiscipline
            })
          }
          
          if(this.user.researchFieldFK)
          {
            http.get(`community/champRecherche/${this.user.researchFieldFK}/`)
            .then(response => {
              console.log(response.data)
              this.user.researchField = response.data.researchField
              this.user.commentsResearch = response.data.commentsResearch
            })
          }
          
          if(this.user.researchEstablishmentFK)
          {
            http.get(`community/etablisementRecherche/${this.user.researchEstablishmentFK}/`)
            .then(response => {
              console.log(response.data)
              this.user.laboratory = response.data.laboratory
              this.user.establishment = response.data.establishment
              this.user.commentsEstablishment = response.data.commentsEstablishment
            })
          }
          
        })
      }
      else
      {
        console.log("here")
        this.$router.replace(this.$route.query.redirect || '/login')
      }
    }

  }
}


