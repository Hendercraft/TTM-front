<template>
  <modal name="modal-delete-ressource" transition="pop-out" :width="modalWidth" :focus-trap="true" :height="300">
    <div class="box">
      <div class="partition-title">
        Supression de ressource
      </div>

      <div class="body">
        <p>Voulez vous vraiment supprimer cette ressource ?</p>
        <button @click="deleteRessource">Supprimer</button>
        <button @click="closeModal">Retour</button>         
      </div>
      <div>
          {{error}}
      </div>

    </div>
  </modal>
</template>
<script>
/* eslint-disable */
import http from '../../http-common'
const MODAL_WIDTH = 656
export default {
  name: 'DeleteRessourceModal',
  props:['id'],
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      error:null,
    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
  },
  methods: {
    deleteRessource() {
        http.delete(`database/ressource/delete/${this.id}/`,{
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }})
        .then(response => {
            console.log(response)
            this.$emit('deleted',{id:this.id})
            this.$modal.hide('modal-delete-ressource')
        })
        .catch(error => {
            console.log(error)
            this.error = "Status : " + error.response.status + "        Raison : " + error.response.data.detail 
        })
    },
    closeModal(){
        this.$modal.hide('modal-delete-ressource')
    }
  }
}
</script>
<style lang="css">

.partition-title{
  font-size: 30px;
}

.box{
  margin: 1em;
  height: 250px;
}

.body{
    margin-top: 3em;
}
</style>