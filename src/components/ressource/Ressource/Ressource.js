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

      leftDisabled: true,
      rightDisabled: false,
    }
  },
  computed: {

  },
  mounted () {
    // this.filter()
    this.$forceUpdate()
  },
  created(){
    this.getRessource(this.id)
  },
  methods: {
    getRessource(id)
    {
      console.log("get ressource!")
      http.get(`/database/ressource/${id}/`)
          .then(response => {
            this.ressource = response.data
            this.getObjectChilds(this.ressource.objects_son)
            console.log(this.ressource)
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
          http.get(`/database/object/${element}/`)
              .then(response => {
                this.list_child_ressources.push({"id":response.data.id,"object":true,"date":0})
                http.get(`/database/date/${response.data.date}/`)
                .then(response => {
                  var d = response.data.day
                  var m = response.data.month
                  var y = response.data.year
                  this.list_child_ressources[this.index]["date"] = d + m*10 + y*10
                  this.index+=1
                  console.log(this.index)
                  if(this.index >= list_objs.length)
                  {
                    console.log("then")
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
        console.log("noice")
        //If ressource don't have any object relationship
        if(this.ressource.actors_son.length!=0)
        {
          this.getActorChilds(this.ressource.actors_son)
        }
      }
      
    },

    getActorChilds(list_actors)
    {
      if(list_actors.length > 0)
      {
        /*  Fetch all data from object table (Architecture and Production)  */
        list_actors.forEach(element => {
          http.get(`/database/actor/${element}/`)
              .then(response => {
                //Create an empty JSON in the list
                this.list_child_ressources.push({"id":response.data.id,"object":false,"date":0})
                //Fetch date data and fill the JSON
                http.get(`/database/date/${response.data.birth_date}/`)
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
      }
      else
      {
        console.log(this.list_child_ressources)

        /*  Sort by date  */
        this.list_child_ressources.sort(function(a,b){
          return a.date - b.date;
        })
        return (this.updateChildInfo())
      }
      
    },
    updateChildInfo()
    {
      console.log(this.list_child_ressources, "noiiiiiiiiice")
      console.log("updateChildInfo")
      if(this.list_child_ressources.length == 1)
      {
        this.leftDisabled = true
        this.rightDisabled = true
      }
      this.childInfo = this.list_child_ressources[this.index_child]
      this.fetch_finished = true
    },
    leftRessource()
    {
      this.$forceUpdate()
      if(this.index_child > 0)
      {
        this.index_child -= 1 
        this.rightDisabled = false
        // this.childInfo = this.list_child_ressources[this.index_child]
        this.$set(this.childInfo, 0 ,this.list_child_ressources[this.index_child])
        this.index_child -= 1 
        this.$forceUpdate()
      }
      else
      {
        this.rightDisabled = false
        this.leftDisabled = true
        this.$forceUpdate()
      }
    },
    rightRessource()
    {
      this.$forceUpdate()
      if(this.index_child < this.list_child_ressources.length-1)
      {
        this.index_child += 1
        this.leftDisabled = false
        this.childInfo = this.list_child_ressources[this.index_child]
        this.$set(this.childInfo, 0, this.list_child_ressources[this.index_child])
        this.$forceUpdate()
      }
      else
      {
        this.leftDisabled = false
        this.rightDisabled = true
        this.$forceUpdate()
      }
    },
    // filter()
    // {

    // }
  }
}


