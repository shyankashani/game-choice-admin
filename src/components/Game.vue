<template>
  <div>
      <b-row class="pt-4 pb-4 border border-bottom-0 border-left-0 border-right-0">

        <b-col>
          <div>
            <p>
              {{ game.name }}
            </p>
          </div>
        </b-col>

        <b-col>
          <b-form-input
            placeholder="Location"
            size="sm"
            v-model="selectedLocation"
          ></b-form-input>
        </b-col>

        <b-col>
          <b-form-select
            size="sm"
            v-model="selectedColorId"
            v-bind:style="{
              border: '1px solid ' + selectedColorHex,
              color: selectedColorHex
            }"
          >
            <option
              v-for="color in colors"
              :value="color.colorId"
              v-bind:style="{ color: color.hex }"
            > {{ color.name }} </option>
          </b-form-select>
        </b-col>

        <b-col>
          <b-form-select
            size="sm"
            v-model="selectedCategoryId"
          >
            <option v-for="category in categories" :value="category.categoryId">
              {{ category.name }}
            </option>
          </b-form-select>
        </b-col>

        <b-col>
          <b-button
            type="submit"
            variant="secondary"
            size="sm"
            v-on:click="updateInventory"
          >Save</b-button>
        </b-col>

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
        selectedCategoryId: null
      }
    },
    computed: {
      selectedColorHex: function() {
        return this.selectedColorId
          ? _.find(this.colors, { colorId: this.selectedColorId}).hex
          : `#111111`;
      }
    },
    created: function () {
      this.getInventory();
    },
    methods: {
      getInventory: function () {
        axios.get(`http://localhost:3000/inventory?gameId=${this.game.gameId}`)
        .then(result => {
          this.gameId = result.data.gameId;
          this.inventoryId = result.data.inventoryId;
          this.selectedLocation = result.data.location;
          this.selectedColorId = result.data.colorId;
          this.selectedCategoryId = result.data.categoryId;
        });
      },
      updateInventory: function () {
        axios.post(`http://localhost:3000/inventory?${this.generateInventoryQuery()}`)
        .then(result => console.log(result))
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
