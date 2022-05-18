import http from '../../../http-common'

export default {
  name: 'propos',
  components: {},
  props: [],
  data () {
    return {
      project:true,
      team: false,
      contact:false,

      name:null,
      last_name:null,
      email:null,
      phone:null,
      subject:null,
      message:null,
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    changeToProject(){
      this.project = true
      this.team = false
      this.contact = false
      let button_project = document.getElementById("button-project")
      let button_team = document.getElementById("button-team")
      let button_contact = document.getElementById("button-contact")
      button_project.style.fontWeight = "bold"
      button_team.style.fontWeight = "lighter"
      button_contact.style.fontWeight = "lighter"
    },
    changeToTeam(){
      this.project = false
      this.team = true
      this.contact = false
      let button_project = document.getElementById("button-project")
      let button_team = document.getElementById("button-team")
      let button_contact = document.getElementById("button-contact")
      button_project.style.fontWeight = "lighter"
      button_team.style.fontWeight = "bold"
      button_contact.style.fontWeight = "lighter"
    },
    changeToContact(){
      this.project = false
      this.team = false
      this.contact = true
      let button_project = document.getElementById("button-project")
      let button_team = document.getElementById("button-team")
      let button_contact = document.getElementById("button-contact")
      button_project.style.fontWeight = "lighter"
      button_team.style.fontWeight = "lighter"
      button_contact.style.fontWeight = "bold"
    },

    sendContactForm(){
      http.post("community/contact/create/", {"name":this.name, "last_name":this.last_name, "email":this.email, "phone":this.phone, "subject":this.subject, "message":this.message}, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(response =>{
        console.log(response)
        this.name = null
        this.last_name = null
        this.email = null
        this.phone = null
        this.subject = null
        this.message = null
      })
      .catch(error => {
        console.log(error)
      })
    },

  }
}


