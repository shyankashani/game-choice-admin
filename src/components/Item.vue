<template>
  <div>
    <gamecard :item="item" :key="`gamecard${item.id}`"
      :selectedCategoryImage="this.selectedCategoryImage"
    />
    <div
      class="row border-bottom p-3 d-flex align-items-center"
      v-b-modal="`id${item.id}`"
    >
      <div class="col col-2">
        <div class="rounded border image-wrapper-small">
          <img class="image" :src="item.game.image"/>
        </div>
      </div>

      <span class="col col-2">
        {{ item.game.name }}
      </span>

      <div class="col col-2">
        <input type="text"
          class="form-control form-control-sm"
          placeholder="Location"
          v-model="item.location"
          v-if="isManagingInventory"
        />
        <location :item="item" />
      </div>

      <div class="col col-2">
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
        <color :item="item" />
      </div>

      <div class="col col-2">
        <select
          class="form-control form-control-sm h-100"
          v-model="item.category.id"
          v-if="isManagingInventory"
        ><option v-for="category in categories" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <category :item="item" />
      </div>

      <span class="col col-2 text-centered">
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

  .row:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
</style>
