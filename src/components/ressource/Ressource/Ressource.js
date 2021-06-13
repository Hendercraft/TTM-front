import http from '../../../http-common'
import RessourceChild from '../RessourceChild'

export default {
  name: 'ressource',
  components: {RessourceChild},
  props: ['id','table'],
  data () {
    return {
      ressource:[],
      list_child_ressources:[],
      index:0,
      childInfo:[],
    }
  },
  computed: {

  },
  mounted () {
    this.getRessource(this.id)
  },
  methods: {
    getRessource(id)
    {
      http.get(`/database/ressource/${id}/`,{
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }})
          .then(response => {
            this.ressource = response.data
            console.log(this.ressource, "heh")
            this.getObjectChilds(this.ressource.objects_son)
          })
          .catch(err => {
            console.log(err)
          })
    },
    getObjectChilds(list_objs)
    {
      /*  Fetch all data from object table (Architecture and Production)  */
      if(list_objs.length != 0)
      {
        list_objs.forEach(element => {
          http.get(`/database/objet/${obj_id}/`,{
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }})
              .then(response => {
                this.list_child_ressources.push({"id":response.data.id,"object":true,"date":0})
                http.get(`/database/date/${response.data.date[0]}`,{
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                  }})
                .then(response => {
                  var d = response.data.day
                  var m = response.data.month
                  var y = response.data.year
                  this.list_child_ressources[this.index]["date"] = d + m*10 + y*10
                  this.index+=1
                  if(this.index == list_objs.length && this.ressource.actors_son.length!=0)
                  {
                    this.getActorChilds(this.ressource.actors_son)
                  }
                })
              })
              .catch(error => {
                console.log(error)
              })
        })
      }
      else
      {
        if(this.ressource.actors_son.length!=0)
        {
          this.getActorChilds(this.ressource.actors_son)
        }
      }
      
    },

    getActorChilds(list_actors)
    {    
      /*  Fetch all data from object table (Architecture and Production)  */
      list_actors.forEach(element => {
        console.log("hello from actor child")
        http.get(`/database/actor/${element}/`,{
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
          }})
            .then(response => {
              this.list_child_ressources.push({"id":response.data.id,"object":false,"date":0})
              http.get(`/database/date/${response.data.birth_date}/`,{
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.token}`
                }})
              .then(response => {
                var d = response.data.day
                var m = response.data.month
                var y = response.data.year
                this.list_child_ressources[this.index].date = d + m*10 + y*10
                this.index+=1
                if(this.index == list_actors.length)
                {
                  console.log(this.list_child_ressources)


                  /*  Sort by date  */
                  this.list_child_ressources.sort(function(a,b){
                    return a.date - b.date;
                  })

                  console.log(this.list_child_ressources, "noice")
                  this.updateChildInfo()
                }
              })
            })
            .catch(error => {
              console.log(error)
            })
        
      })
    },
    updateChildInfo()
    {
      console.log(this.list_child_ressources[this.index])
      this.childInfo = this.list_child_ressources[this.index]
      console.log(this.childInfo, "coucou")
      this.index += 1 
    }
  }
}


