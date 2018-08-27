<template>
  <div>
    <gamecard
      :item="item"
      :key="`gamecard${item.id}`"
      :selectedCategoryImage="this.selectedCategoryImage"
      :colors="colors"
      :categories="categories"
    />

    <div class="row border-bottom py-0 d-flex align-items-center">

      <div class="col col-2 p-0 pl-4" v-b-modal="">
        <div class="rounded border image-wrapper-small">
          <img class="image-small" :src="item.game.image"/>
        </div>
      </div>

      <div class="col col-2 py-5" v-b-modal="`modal-id${item.id}`">
        {{ item.game.name }}
      </div>

      <div class="col col-2 py-5" v-b-modal="`modal-id${item.id}`">
        <location :item="item" />
      </div>

      <div class="col col-2 py-5" v-b-modal="`modal-id${item.id}`">
        <color :item="item" />
      </div>

      <div class="col col-2 py-5" v-b-modal="`modal-id${item.id}`">
        <category :item="item" />
      </div>

      <div class="col col-2 py-5 text-right">



      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';
  import { API_HOST } from '../config';
  import fa from '@fortawesome/vue-fontawesome';
  import { faEdit, faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

  import Gamecard from './Gamecard';
  import Location from './Location';
  import Category from './Category';
  import Color from './Color';

  export default {
    name: 'Item',
    props: [
      'item',
      'colors',
      'categories'
    ],
    components: {
      Gamecard,
      Location,
      Category,
      Color,
      fa
    },
    data: function () {
      return {
        isManagingInventory: false,
        isUpdatingInventory: false,
        isUpdateSuccessful: true,
        isModalAvailable: true
      }
    },
    computed: {
      faEdit: () => faEdit,
      faMapMarkerAlt: () => faMapMarkerAlt,
      selectedColor: function () {
        return this.item.color_id
          ? _.find(this.colors, { id: this.item.color_id})
          : { hex: '#111111' };
      },
      selectedCategory: function () {
        return this.item.category_id
          ? _.find(this.categories, { id: this.item.category_id })
          : {};
      },
      selectedCategoryImage: function () {
        const categoryName = this.item.category.name;
        const imageName = _.chain(categoryName).lowerCase().split(' ').join('');
        return _.size(this.item.category)
          ? require(`../assets/${imageName}.png`)
          : require('../assets/default.png');
      },
      status: function () {
        return this.isUpdatingInventory
          ? { symbol: '&#9678;', color: '#f0ad4e' }
          : this.isUpdateSuccessful
          ? { symbol: '&#9673;', color: '#5cb85c' }
          : { symbol: '&#10060;', color: '#d9534f' };
      }
    },
    methods: {
      manageInventory: function () {
        this.isManagingInventory = true;
      },
      stopManagingInventory: function () {
        this.isManagingInventory = false;
      }
    }
  }
</script>

<style scoped>
  .image-wrapper-small {
    display: flex;
    height: 80px;
    width: 80px;
    justify-content: left;
    align-items: start;
    overflow: hidden;
  }

  .image-wrapper-tiny {
    display: flex;
    height: 30px;
    width: 30px;
    justify-content: left;
    align-items: start;
    overflow: hidden;
  }

  .image-wrapper-teensy {
    height: 14px;
    width: 14px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .image-teensy {
    flex-shrink: 0;
    max-width: 130%;
    max-height: 130%;
  }

  .image-small {
    flex-shrink: 0;
    max-width: 180%;
    max-height: 180%;
  }

  .row:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
</style>
