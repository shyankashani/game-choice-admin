<template>
  <div>
      <b-row class="pt-4 pb-4 border border-bottom-0 border-left-0 border-right-0">

        <b-col align-self="center">
          {{ game.name }}
        </b-col>

        <b-col align-self="center">
          <b-form-input
            placeholder="Location"
            size="sm"
            v-model="inventory.location"
            v-bind:style="{ 'text-transform': 'uppercase' }"
          ></b-form-input>
        </b-col>

        <b-col align-self="center">
          <b-form-select
            size="sm"
            v-model="inventory.color_id"
            v-bind:style="{
              border: '1px solid ' + selectedColorHex,
              color: selectedColorHex
            }"
          ><option
              v-for="color in colors"
              :value="color.id"
              v-bind:style="{ color: color.hex }"
            > {{ color.name }} </option>
          </b-form-select>
        </b-col>

        <b-col align-self="center">
          <b-form-select
            size="sm"
            v-model="inventory.category_id"
          ><option v-for="category in categories" :value="category.id">
              {{ category.name }}
            </option>
          </b-form-select>
        </b-col>

        <b-col align-self="center">
          <b-button
            type="submit"
            variant="secondary"
            size="sm"
            v-on:click="updateInventory"
          > Save </b-button>
        </b-col>

        <b-col align-self="center"
          v-html="status.symbol"
          v-bind:style="{ color: status.color }"
        ></b-col>

      </b-row>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';
  import { API_HOST } from '../config';

  export default {
    name: 'Game',
    props: ['game', 'colors', 'categories'],
    data: function () {
      return {
        isUpdatingInventory: false,
        isUpdateSuccessful: true,
        inventory: {}
      }
    },
    computed: {
      selectedColorHex: function() {
        return this.inventory.color_id
          ? _.find(this.colors, { id: this.inventory.color_id}).hex
          : `#111111`;
      },
      status: function() {
        return this.isUpdatingInventory
        ? { symbol: '&#9678;', color: '#f0ad4e' }
        : this.isUpdateSuccessful
        ? { symbol: '&#9673;', color: '#5cb85c' }
        : { symcol: '&#10060;', color: '#d9534f' }
      }
    },
    created: function () {
      this.getInventory();
    },
    methods: {
      getInventory: function () {
        axios.get(`${API_HOST}/inventory?gameId=${this.game.gameId}`)
        .then(result => {
          console.log('result.data[0]', result.data[0]);
          this.inventory = result.data[0];
        });
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
        return [
          `inventoryId=${this.inventoryId}`,
          `gameId=${this.gameId}`,
          `location=${this.selectedLocation}`,
          `colorId=${this.selectedColorId}`,
          `categoryId=${this.selectedCategoryId}`
        ].join(`&`)
      }
    }
  }
</script>

<style scoped>
</style>
