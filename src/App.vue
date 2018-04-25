<template>
  <div id="app" class="mx-5 px-5">
    <b-navbar class="py-5">
      <b-nav-form>
        <b-form-input
          placeholder="Search"
          size="sm"
          v-model="searchQuery"
          v-on:change="searchGames"
        ></b-form-input>
        <b-button
          type="submit"
          variant="secondary"
          size="sm"
          class="ml-3"
        >Submit</b-button>
      </b-nav-form>
    </b-navbar>
    <wrapper
      v-bind:searchResults="searchResults"
      v-bind:colors="colors"
      v-bind:categories="categories"
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
  data: function () {
    return {
      searchQuery: '',
      searchResults: [],
      colors: [],
      categories: []
    }
  },
  created: function () {
    this.getColors();
    this.getCategories();
  },
  methods: {
    searchGames: function () {
      axios.get(`http://localhost:3000/games?name=${this.searchQuery}`)
      .then(result => this.searchResults = result.data);
    },
    getColors: function () {
      axios.get(`http://localhost:3000/colors`)
      .then(result => this.colors = result.data);
    },
    getCategories: function () {
      axios.get(`http://localhost:3000/categories`)
      .then(result => this.categories = result.data);
    }
  },
  watch: {
    searchQuery: function () {
      this.searchGames();
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
#app * {
  font-size: 12px;
}
</style>
