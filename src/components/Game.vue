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
            v-model="selectedLocation"
            v-bind:style="{ 'text-transform': 'uppercase' }"
            v-on:change="updateInventory"
          ></b-form-input>
        </b-col>

        <b-col align-self="center">
          <b-form-select
            size="sm"
            v-model="selectedColorId"
            v-on:change="updateInventory"
            v-bind:style="{
              border: '1px solid ' + selectedColorHex,
              color: selectedColorHex
            }"
          ><option
              v-for="color in colors"
              :value="color.colorId"
              v-bind:style="{ color: color.hex }"
            > {{ color.name }} </option>
          </b-form-select>
        </b-col>

        <b-col align-self="center">
          <b-form-select
            size="sm"
            v-model="selectedCategoryId"
            v-on:change="updateInventory"
          ><option v-for="category in categories" :value="category.categoryId">
              {{ category.name }}
            </option>
          </b-form-select>
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

  export default {
    name: 'Game',
    props: ['game', 'colors', 'categories'],
    data: function () {
      return {
        gameId: null,
        inventoryId: null,
        selectedLocation: null,
        selectedColorId: null,
        selectedCategoryId: null,
        isUpdatingInventory: false,
        isUpdateSuccessful: true
      }
    },
    computed: {
      selectedColorHex: function() {
        return this.selectedColorId
          ? _.find(this.colors, { colorId: this.selectedColorId}).hex
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
        axios.get(`https://gamechoice-api.herokuapp.com/inventory?gameId=${this.game.gameId}`)
        .then(result => {
          this.gameId = result.data.gameId;
          this.inventoryId = result.data.inventoryId;
          this.selectedLocation = result.data.location;
          this.selectedColorId = result.data.colorId;
          this.selectedCategoryId = result.data.categoryId;
        });
      },
      updateInventory: function () {
        this.isUpdatingInventory = true;
        axios.post(`https://gamechoice-api.herokuapp.com/inventory?${this.generateInventoryQuery()}`)
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
