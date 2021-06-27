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

      <div class="buttons">
        <button @click="signIn">Se connecter</button><br>
        <div class="error" v-if="errorMessage">{{errorMessage}}</div>
        <div class="register">
          <p>Toujours pas de compte ?</p>
          <button><router-link class="link" to="/register" tag="a">S'inscrire</router-link></button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
/* eslint-disable */
import login from '../Login/Login'
import {tokenIsValid} from '../../services/jwtService'
const MODAL_WIDTH = 656
export default {
  name: 'LoginModal',
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      username:null,
      password:null,

      error:null,
      errorMessage:null,
    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
  },
  methods: {
    signIn() {
      login.methods.externLogin(this.username, this.password)
      console.log("cocuou")
      this.error = tokenIsValid()
      if(this.error)
      {
        console.log(this.error)
        this.$modal.hide('modal-login')
      }
      else
      {
        console.log(this.error)
        this.errorMessage = "Veuillez recommencer (parfois il faut appuyer deux fois sur 'se connecter')"
        this.$forceUpdate()        
      }
    }
  }
}
</script>
<style lang="css">
.partition-title{
  font-size: 30px;
  text-align: center;
}

.error{
  color: red;
  margin-bottom: 0em;
  margin-top: 1em;
}

.box{
  margin: 1em;
  height: 250px;
}

form{
  margin: 2em;
  margin-left: 8em;
  margin-bottom: 1em;
}

.buttons{
  text-align: center;
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