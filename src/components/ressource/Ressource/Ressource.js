import http from '../../../http-common'
import RessourceChild from '../RessourceChild'

export default {
  name: 'ressource',
  components: {RessourceChild},
  props: ['id'],
  data () {
    return {
      ressource:[],
      list_child_ressources:[],
      index:0,
      index_child:0,
      childInfo:[],
      fetch_finished:false,
    }
  },
  computed: {

  },
  mounted () {
    // this.filter()
  },
  created(){
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
          http.get(`/database/object/${element}/`,{
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            }})
              .then(response => {
                this.list_child_ressources.push({"id":response.data.id,"object":true,"date":0})
                http.get(`/database/date/${response.data.date[0]}/`,{
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
                  if(this.index >= list_objs.length && this.ressource.actors_son.length!=0)
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
        //If ressource don't have any object relationship
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
        http.get(`/database/actor/${element}/`,{
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
          }})
            .then(response => {
              //Create an empty JSON in the list
              this.list_child_ressources.push({"id":response.data.id,"object":false,"date":0})
              //Fetch date data and fill the JSON
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

                //If the for loop is finished, sort the list_child_ressource by date and return updateChildfInfo func
                if(this.index >= list_actors.length)
                {
                  console.log(this.list_child_ressources)


                  /*  Sort by date  */
                  this.list_child_ressources.sort(function(a,b){
                    return a.date - b.date;
                  })

                  return (this.updateChildInfo())
                  
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
      this.childInfo = this.list_child_ressources[this.index_child]
      this.fetch_finished = true
      this.index_child += 1 
    },
    // filter()
    // {

    // }
  }
}


