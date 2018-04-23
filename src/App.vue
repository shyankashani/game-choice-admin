<template>
  <div id="app" class="mx-5 px-5">
    <b-navbar class="py-5">
      <b-nav-form>
        <b-form-input
          placeholder="Search"
          size="sm"
          v-model="searchQuery"
        ></b-form-input>
        <b-button
          type="submit"
          variant="secondary"
          size="sm"
          class="ml-3"
          v-on:click="searchGames"
        >Submit</b-button>
      </b-nav-form>
    </b-navbar>
    <wrapper
      v-bind:searchGamesResults="searchGamesResults"
    ></wrapper>
  </div>
</template>

<script>
import axios from 'axios'
import Wrapper from './components/Wrapper';

export default {
  name: 'app',
  components: {
    Wrapper
  },
  data: function() {
    return {
      searchQuery: '',
      searchGamesResults: []
    }
  },
  methods: {
    pingBGG: function (event) {
      axios.get('http://localhost:3000/bgg')
      .then(result => console.log(result));
    },
    searchGames: function () {
      axios.get(`http://localhost:3000/games?name=${this.searchQuery}`)
      .then(result => this.searchGamesResults = result.data)
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
