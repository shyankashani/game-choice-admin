<template>
  <div>
    <gamecard :item="item" :key="`gamecard${item.id}`"
      :selectedCategoryImage="this.selectedCategoryImage"
    />
    <div
      class="row"
      v-b-modal="`id${item.id}`"
    >
      <div class="col col-2 bg-light pt-3 pb-3 border-bottom border-left pl-3">
        <div class="rounded border image-wrapper-small">
          <img class="image" :src="item.game.image"/>
        </div>
      </div>

      <span class="col col-2 bg-light pt-3 pb-3 border-bottom d-flex align-items-center">
        {{ item.game.name }}
      </span>

      <div class="col col-2 bg-light pt-3 pb-3 border-bottom d-flex align-items-center">
        <input type="text"
          class="form-control form-control-sm"
          placeholder="Location"
          v-model="item.location"
          v-if="isManagingInventory"
        />
        {{ item.location }}
      </div>

      <div class="col col-2 bg-light pt-3 pb-3 border-bottom d-flex align-items-center">
        <select
          class="form-control form-control-sm h-100"
          v-model="item.color.id"
          v-if="isManagingInventory"
          :style="{
            border: `1px solid ${item.color.hex}`,
            color: item.color.hex
          }">
          <option
            v-for="color in colors"
            :value="color.id"
            :style="{ color: color.hex }"
          > {{ color.name }} </option>
        </select>
        <div
          class="badge badge-pill pt-2 pb-2 pl-3 pr-3 text-light"
          :style="{ background: item.color.hex }">
          {{ item.color.name }}
        </div>
      </div>

      <div class="col col-2 bg-light pt-3 pb-3 border-bottom d-flex align-items-center">
        <select
          class="form-control form-control-sm h-100"
          v-model="item.category.id"
          v-if="isManagingInventory"
        ><option v-for="category in categories" :value="category.id">
            {{ category.name }}
          </option>
        </select>
          <img class="img w-25" :src="selectedCategoryImage" />
          {{ item.category.name }}
      </div>

      <span class="col col-2 bg-light pt-3 pb-3 border-bottom border-right d-flex align-items-center">
        <fa :icon="faEdit" />
      </span>

      <div class="col col-1">
        <button type="submit"
          class="btn btn-outline-secondary btn-sm h-100"
          v-on:click="updateInventory"
          v-if="isManagingInventory"
        > Save </button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';
  import { API_HOST } from '../config';
  import fa from '@fortawesome/vue-fontawesome';
  import { faEdit } from '@fortawesome/fontawesome-free-solid';

  import Gamecard from './Gamecard';

  export default {
    name: 'Item',
    props: ['item', 'colors', 'categories'],
    components: { Gamecard, fa },
    data: function () {
      return {
        isManagingInventory: false,
        isUpdatingInventory: false,
        isUpdateSuccessful: true
      }
    },
    computed: {
      faEdit: () => faEdit,
      selectedColor: function () {
        return this.item.color_id
          ? _.find(this.colors, { id: this.item.color_id})
          : { hex: '#111111' };
      },
      selectedCategory: function () {
        return this.item.category_id
          ? _.find(this.categories, { id: this.item.category_id })
          : {}
      },
      selectedCategoryImage: function () {
        const categoryName = this.item.category.name;
        const imageName = _.chain(categoryName).lowerCase().split(' ').join('');
        return _.size(this.item.category)
          ? require(`../assets/${imageName}.png`)
          : require('../assets/default.png')
      },
      status: function () {
        return this.isUpdatingInventory
          ? { symbol: '&#9678;', color: '#f0ad4e' }
          : this.isUpdateSuccessful
          ? { symbol: '&#9673;', color: '#5cb85c' }
          : { symbol: '&#10060;', color: '#d9534f' }
      }
    },
    methods: {
      updateInventory: function () {
        this.isUpdatingInventory = true;
        axios.post(`${API_HOST}/inventory?${this.generateInventoryQuery()}`)
        .then(result => {
          this.isUpdatingInventory = false;
          this.isUpdateSuccessful = result.status === 200;
        })
      },
      generateInventoryQuery: function() {
        const i = this.item;
        const queryString = [
          `game_id=${i.game_id}`,
          `location=${i.location}`,
          `colorId=${i.color_id}`,
          `categoryId=${i.category_id}`,
          `staffPick=${i.staff_pick}`,
          `notes=${i.notes}`
        ].join(`&`);
        return queryString;
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

  .image {
    flex-shrink: 0;
    max-width: 180%;
    max-height: 180%;
  }
</style>
