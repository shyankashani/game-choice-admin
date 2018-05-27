<template>
  <div
    class="row pt-4 pb-4"
    :style="{
      borderTop: '3px solid #F0F0F0'
    }">

      <div class="col col-2">
        <div
          class="rounded border"
          :style="{
            display: 'flex',
            height: '75px',
            width: '75px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflow: 'hidden'
          }">
          <img class="img-fluid" :src="item.image"
          :style="{
            flexShrink: '0',
            minWidth: '100%',
            minHeight: '100%'
            }"/>
        </div>
      </div>

      <span class="col col-2 d-flex align-items-center">
        {{ item.name }}
      </span>

      <div class="col col-2 d-flex align-items-center">
        <input type="text"
          class="form-control form-control-sm"
          placeholder="Location"
          v-model="item.location"
          v-if="isManagingInventory"
        />
        {{ item.location }}
      </div>

      <div class="col col-2 d-flex align-items-center">
        <select
          class="form-control form-control-sm h-100"
          v-model="item.color_id"
          v-if="isManagingInventory"
          :style="{
            border: `1px solid ${selectedColor.hex}`,
            color: selectedColor.hex
          }">
          <option
            v-for="color in colors"
            :value="color.id"
            :style="{ color: color.hex }"
          > {{ color.name }} </option>
        </select>
        <div
          class="rounded pt-1 pb-1 pl-2 pr-2 text-light"
          :style="{ background: selectedColor.hex }">
          {{ selectedColor.name }}
        </div>
      </div>

      <div class="col col-2 d-flex align-items-center">
        <select
          class="form-control form-control-sm h-100"
          v-model="item.category_id"
          v-if="isManagingInventory"
        ><option v-for="category in categories" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        {{ selectedCategory.name }}
      </div>

      <div class="col col-1">
        <button type="submit"
          class="btn btn-outline-secondary btn-sm h-100"
          v-on:click="updateInventory"
          v-if="isManagingInventory"
        > Save </button>
      </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';
  import { API_HOST } from '../config';

  export default {
    name: 'Item',
    props: ['item', 'colors', 'categories'],
    data: function () {
      return {
        isManagingInventory: false,
        isUpdatingInventory: false,
        isUpdateSuccessful: true
      }
    },
    computed: {
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
</style>
