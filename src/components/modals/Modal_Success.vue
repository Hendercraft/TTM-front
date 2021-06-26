<template>
  <modal name="modal-success" transition="pop-out" :width="modalWidth" :focus-trap="true" :height="300">
    <div class="box">
      <div class="partition-title">
        Vous avez bien ajouter la ressource !
      </div>
    </div>
  </modal>
</template>
<script>
/* eslint-disable */
const MODAL_WIDTH = 656
export default {
  name: 'SuccessModal',
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      username:null,
      password:null
    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
  },
  methods: {
  }
}
</script>
<style lang="css">
.partition-title{
  font-size: 30px;
  text-align: center;
}

.box{
  margin: 1em;
  height: 250px;
}
</style>