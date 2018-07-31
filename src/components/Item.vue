<template>
  <div>
    <gamecard :item="item" :key="`gamecard${item.id}`"
      :selectedCategoryImage="this.selectedCategoryImage"
    />
    <div
      class="row border-bottom p-3 d-flex align-items-center"
      v-b-modal="vBModal"
    >

      <div class="col col-2">
        <div class="rounded border image-wrapper-small">
          <img class="image-small" :src="item.game.image"/>
        </div>
      </div>

      <div class="col col-2">
        {{ item.game.name }}
      </div>

      <div class="col col-2">
        <div v-if="isManagingInventory" class="input-group w-50">
          <div class="input-group-prepend">
            <span class="input-group-text pr-1 py-0 bg-white border-primary" :id="`location-id${item.id}`">
              <fa :icon="faMapMarkerAlt" />
            </span>
          </div>
          <input type="text"
            class="form-control form-control-sm py-1 pl-0 border-left-0 border-primary"
            placeholder="Location"
            :aria-describedby="`location-id${item.id}`"
            v-model="item.location"
          >
        </div>
        <location v-else :item="item" />
      </div>

      <div class="col col-2">
        <select
          class="custom-select w-50 p-1 h-100"
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
        <color v-else :item="item" />
      </div>

      <div class="col col-2">


        <div v-if="isManagingInventory" class="input-group w-75">
          <div class="input-group-prepend">
            <label class="input-group-text pr-1 bg-white border-secondary" :for="`category-id${item.id}`">
              <div class="image-wrapper-teensy mr-1 d-inline-flex align-bottom">
                <img class="image" :src="selectedCategoryImage" />
              </div>
            </label>
          </div>
          <select
            class="custom-select px-0 py-1 border-secondary border-left-0 h-100"
            :aria-describedby="`category-id${item.id}`"
            v-model="item.category.id"
          ><option v-for="category in categories" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <category v-else :item="item" />
      </div>

      <div class="col col-2 text-centered">
        <button type="submit"
          class="btn btn-link btn-sm h-100 py-0"
          v-on:click="stopManagingInventory"
          v-if="isManagingInventory"
        > Cancel </button>

        <button type="submit"
          class="btn btn-link btn-sm h-100 py-0"
          v-on:click="manageInventory"
          v-on:mouseenter="makeModalUnavailable"
          v-on:mouseleave="makeModalAvailable"
          v-else
        > Edit </button>
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
    props: ['item', 'colors', 'categories'],
    components: { Gamecard, Location, Category, Color, fa },
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
      vBModal: function() {
        return this.isModalAvailable
        ? `modal-id${this.item.id}`
        : '';
      },
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
      makeModalAvailable: function() {
        this.isModalAvailable = true;
        console.log('hello')
      },
      makeModalUnavailable: function() {
        this.isModalAvailable = false;
        console.log('goodbye')
      },
      manageInventory: function () {
        this.isManagingInventory = true;
      },
      stopManagingInventory: function () {
        this.isManagingInventory = false;
      },
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
