<template>
  <div id="app">
    <b-navbar variant="light">
      <b-nav-form>
        <b-form-input type="text" placeholder="Search"></b-form-input>
      </b-nav-form>
      <b-button v-on:click="pingBGG">
        Ping BGG
      </b-button>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  methods: {
    pingBGG: function (event) {
      axios.get('http://localhost:3000/bgg')
      .then(result => console.log(result))
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700');
#app {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
