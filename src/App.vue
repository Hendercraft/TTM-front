<template>
  <div id="app">
    <div class="main">
      <nav id="upper-navbar">
        <ul>
          <li class="upper-nabar-elements" v-if="!logged"><router-link to="/login">Connexion</router-link></li>
          <li class="upper-nabar-elements" v-if="!logged"><router-link to="/register">Inscription</router-link></li>
          <li class="upper-nabar-elements" v-if="logged"><router-link to="/profile">Profil</router-link></li>
          <li class="upper-nabar-elements" v-if="logged"><button v-on:click="logout">Déconnexion</button></li>
        </ul>
      </nav>
      <bar class="sidenav"></bar>
      <link type="text/css" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
      <router-view/>
    </div>
    <div class="footer">
      <footer>
        <h1>Coordonnées</h1>
        <div id="container_footer">
          <div id="adress_footer">
            <div id="logo_adress_footer">
              <img src="../src/assets/position.png" width="30" height="40"/>
            </div>
            <div id="text_adress_footer">
              <p>
                <span>Adresse: </span>
                "Rue de Leupe, 90400 Sevenans"
              </p>
            </div>
          </div>

          <div id="phone_footer">
            <div id="logo_phone_footer">
              <img src="../src/assets/phone.png" width="30" height="30"/>
            </div>
            <div id="text_phone_footer">
              <p>
                <span>Téléphone: </span>
                <a href="tel://651907292">+336 51 90 72 92</a>
              </p>
            </div>
          </div>

          <div id="email_footer">
            <div id="logo_email_footer">
              <img src="../src/assets/email.png" width="40" height="30"/>
            </div>
            <div id="text_email_footer">
              <p>
                <span>Email: </span>
                <a href="mailto:gabriel.garcia@utbm.fr">contact@TTM.utbm.fr</a>
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Bar from '@/components/Bar'
import {jwtDecrypt, tokenAlive } from '@/services/jwtService'

export default {
  components: { Bar },
  name: 'App',
  data () {
    return {
      logged: false,
      token:null,
      user_json:null,
    }
  },
  mounted () {
    if (this.token == null || this.token == 'null'){
      this.token = localStorage.getItem('token')
    }
    // if (!tokenAlive(this.token)){
    //   
    // }
    console.log(tokenAlive(this.token))
    if (tokenAlive(this.token)){
      this.$forceUpdate()
      this.logged = true
      this.user_json = jwtDecrypt(this.token)
      console.log(this.user_json)
      this.$forceUpdate()
    }
    else{
      this.logged = false
    }
    
  },
  methods:{
    beforeCreate () {
      if (!this.logged) {
        this.$router.push({ name: 'login' })
      }
    },
    logout(){
      localStorage.removeItem('token')
      this.$forceUpdate()
      this.logged = false
    }
  }
}
</script>

<style>

/* Main part */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 10%; /* Same as the width of the sidebar */
  padding-bottom: 0em;
  margin-bottom: 0em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main{
  min-height: 93vh;
}

button{
  border: none;
  background-color: white;
}
button:hover{
  background-color: rgba(117, 117, 117, 0.623);
  color: white;
}


/* Navbar on the right */

.sidenav {
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 10%; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #111; /* Black */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
  }

/* On screens that are less than 700px wide, make the sidebar into a topbar */


/* Logged, unlogged part */
.upper-nabar-elements {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
ul{
  display: block;
  float: right;
}
li a {
  /* display: block; */
  width: 100px;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: rgba(117, 117, 117, 0.623);
  color: white;
}
.active {
  background-color: #4CAF50;
  color: white;
}


/* Footer part */

footer{
  /* padding:50px 0; */
  /* position: fixed; */
  bottom: 0px;
  left: 10%;
  right: 0px;
  color:#f0f9ff;
  background-color: #282d32;
  padding-bottom: 0em;

  height: 7.5vh;
}

#container_footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: 1em;
  padding-left: 5em;
  padding-right: 5em;
  padding-bottom: 0em;
  margin-bottom: 0em;
}
#adress_footer{
  display: flex;
  height: 1em;
  align-items: baseline;
  justify-content: space-between;
}

#phone_footer{
  display: flex;
  height: 1em;
  align-items: baseline;
  justify-content: space-between;
}

#email_footer{
  display: flex;
  height: 1em;
  align-items: baseline;
  justify-content: space-between;
}

footer h1 {
  font-size: 1.2em;
}

footer p {
  font-size: smaller;
}

@media screen and (max-width: 950px) {
  .sidenav {
    top: 0;
    /* left: 0; */
    /* right: 0; */
    width: 100%;
    height: auto;
  }
  /* .upper-navbar{
    position: relative;
  } */
  /* .sidenav a {float: left;}
  div.content {margin-left: 0;} */
}
</style>
