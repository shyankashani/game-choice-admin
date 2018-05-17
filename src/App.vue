<template>
  <div id="app" class="mx-5 px-5">
    <b-navbar class="py-5">
      <b-nav-form>
        <input type="text"
          class="form-control form-control-sm"
          placeholder="Search for games"
          v-model="query"
          v-on:change="filterInventory"
        />
      </b-nav-form>
    </b-navbar>
    <container
      v-bind:inventory="inventory || filteredInventory"
      v-bind:colors="colors"
      v-bind:categories="categories"
    />
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash';
import Container from './components/Container';
import { API_HOST } from './config.js';

export default {
  name: 'app',
  components: {
    Container
  },
  data: function () {
    return {
      query: '',
      inventory: [],
      colors: [],
      categories: [],
      filteredInventory: []
    }
  },
  created: function () {
    this.getColors();
    this.getCategories();
    this.getInventory();
  },
  methods: {
    filterInventory: function () {
      this.query ?
      this.filteredInventory = _.filter(this.inventory, { 'name': this.query }) :
      this.filteredInventory = this.inventory
    },
    getInventory: function () {
      axios.get(`${API_HOST}/inventory`)
      .then(result => {
        this.inventory = result.data
      });
    },
    searchInventory: _.debounce(function () {
      axios.get(`${API_HOST}/inventory?name=${this.query}`)
      .then(result => {
        this.inventory = result.data
      });
    }),
    getColors: function () {
      axios.get(`${API_HOST}/colors`)
      .then(result => this.colors = result.data);
    },
    getCategories: function () {
      axios.get(`${API_HOST}/categories`)
      .then(result => this.categories = result.data);
    }
  },
  watch: {
    query: function () {
      this.searchInventory();
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app * {
  font-size: 12px;
}
</style>
