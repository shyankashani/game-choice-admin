<template>
  <div id="app" class="text-secondary">
    <navigation />
    <div class="container-fluid mt-5 pt-5 px-5">
      <div class="row">
        <sidebar
          :updateQuery="this.updateQuery"
          :toggleColorId="this.toggleColorId"
          :toggleCategoryId="this.toggleCategoryId"
          :colorIds="colorIds"
          :categoryIds="categoryIds"
          :colors="colors"
          :categories="categories"
        />
        <container
          :inventory="filteredInventory"
          :colors="colors"
          :categories="categories"
        />
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
      colorIds: [],
      categoryIds: [],
      isLoadingInventory: false
    }
  },
  created: function () {
    this.getColors();
    this.getCategories();
    this.getInventory()
  },
  computed: {
    filteredInventory: function () {
      let inventory = this.inventory;

      if (this.query) {
        inventory = _.filter(
          inventory,
          item => _.includes(
            _.lowerCase(item.game.name),
            _.lowerCase(this.query)
          )
        );
      }

      if (this.colorIds.length) {
        inventory = _.filter(
          inventory,
          item => _.includes(this.colorIds, item.color.id));
      }

      if (this.categoryIds.length) {
        inventory = _.filter(
          inventory,
          item => _.includes(this.categoryIds, item.category.id));
      }

      return inventory;
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
    },
    toggleColorId: function (colorId) {
      if (_.includes(this.colorIds, colorId)) {
        this.colorIds = _.filter(this.colorIds, id => id !== colorId);
      } else {
        this.colorIds.push(colorId);
      }
    },
    toggleCategoryId: function (categoryId) {
      if (_.includes(this.categoryIds, categoryId)) {
        this.categoryIds = _.filter(this.categoryIds, id => id !== categoryId);
      } else {
        this.categoryIds.push(categoryId);
      }
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
.font-size-normal {
  font-size: 14px;
}
</style>
