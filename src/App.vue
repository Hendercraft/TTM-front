<template>
  <div id="app">
    <nav id="upper-navbar">
      <ul>
        <li class="upper-nabar-elements" v-if="!logged"><router-link to="/login">Connexion</router-link></li>
        <li class="upper-nabar-elements" v-if="!logged"><router-link to="/register">Inscription</router-link></li>
        <li class="upper-nabar-elements" v-if="logged"><router-link to="/profile">Profile</router-link></li>
        <li class="upper-nabar-elements" v-if="logged"><button v-on:click="logout">Déconnexion</button></li>
      </ul>
    </nav>
    <bar class="sidenav"></bar>
    <link type="text/css" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
    <router-view/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 10%; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

button{
  border: none;
  background-color: white;
}
button:hover{
  background-color: rgba(117, 117, 117, 0.623);
  color: white;
}
/* The sidebar menu */
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
</style>
