<template>
  <div id="app" class="text-secondary">
    <navigation />
    <div class="container-fluid mt-5 pt-5">
      <div class="row">
        <div class="col col-2 pl-5 pr-0">
          <sidebar :updateQuery="this.updateQuery" />
        </div>
        <div class="col col-10 pl-5 pr-5">
          <container :inventory="filteredInventory" :colors="colors" :categories="categories" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Container from './components/Container';
import { API_HOST } from './config.js';
import Promise from 'bluebird';

export default {
  name: 'app',
  components: {
    Navigation,
    Sidebar,
    Container
  },
  data: function () {
    return {
      query: '',
      inventory: [],
      colors: [],
      categories: [],
      isLoadingInventory: false
    }
  },
  created: function () {
    this.getColors();
    this.getCategories();
    this.getInventory();
  },
  computed: {
    filteredInventory: function () {
      return this.query.length
        ? _.filter(this.inventory, item => _.includes(item.game.name, this.query))
        : this.inventory
    }
  },
  methods: {
    getInventory: function () {
      this.isLoadingInventory = true;
      axios.get(`${API_HOST}/inventory`)
      .then(result => {
        console.log('result.data', result.data);
        this.isLoadingInventory = false;
        this.inventory = result.data;
      });
    },
    getColors: function () {
      axios.get(`${API_HOST}/colors`)
      .then(result => this.colors = result.data);
    },
    getCategories: function () {
      axios.get(`${API_HOST}/categories`)
      .then(result => this.categories = result.data);
    },
    updateQuery: function (query) {
      this.query = query;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:600,700,800,900&subset=latin-ext');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app * {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
}
</style>
