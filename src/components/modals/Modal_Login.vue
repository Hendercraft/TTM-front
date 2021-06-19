<template>
  <modal name="modal-login" transition="pop-out" :width="modalWidth" :focus-trap="true" :height="300">
    <div class="box">
      <div class="partition-title">
        Connexion
      </div>
      <form>
        <input type="text" v-model="username" placeholder="Nom d'utilisateur">
        <input type="password" v-model="password" placeholder="Mot de passe">
      </form>

      <div>
        <button @click="signIn">Se connecter</button><br>
        <div class="register">
          <p>Toujours pas de compte ?</p>
          <button><router-link class="link" to="/register" tag="a">S'inscrire</router-link></button>
        </div>
        
      </div>
    </div>
  </modal>
</template>
<script>
import login from '../Login/Login'
const MODAL_WIDTH = 656
export default {
  name: 'LoginModal',
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
    signIn() {
      console.log("works here")
      login.methods.externLogin(this.username, this.password)
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

form{
  margin: 3em;
  margin-bottom: 1em;
}

.link:hover {
  text-decoration: none;
  color: black;
}
.link{
  color: black;
}
.register{
  margin-top: 2em;
}


</style>