<template>
  <tr>
    <td>
      {{item.game_id}}
    </td>

      <td>
        {{item.name}}
      </td>

      <td>
        <input type="text"
          class="form-control form-control-sm"
          placeholder="Location"
          v-model="item.location"
        />
      </td>

      <td>
        <select
          class="form-control form-control-sm h-100"
          v-model="item.color_id"
          :style="{
            border: `1px solid ${selectedColorHex}`,
            color: selectedColorHex
          }">
          <option
            v-for="color in colors"
            :value="color.id"
            :style="{ color: color.hex }"
          > {{ color.name }} </option>
        </select>
      </td>

      <td>
        <select
          class="form-control form-control-sm h-100"
          v-model="item.category_id"
        ><option v-for="category in categories" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </td>

      <td>
        <textarea
          class="form-control form-control-sm"
          v-model="item.notes"
          placeholder="Notes"
          :rows="1"
          :max-rows="3"
        />
      </td>

      <td>
        <button type="submit"
          class="btn btn-outline-secondary btn-sm h-100"
          v-on:click="updateInventory"
        > Save </button>
      </td>

      <td
        v-html="status.symbol"
        :style="{ color: status.color }"
      ></td>

  </tr>
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
        isUpdatingInventory: false,
        isUpdateSuccessful: true
      }
    },
    computed: {
      selectedColorHex: function() {
        return this.item.color_id
          ? _.find(this.colors, { id: this.item.color_id}).hex
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
        return [
          `game_id=${i.game_id}`,
          `location=${i.location}`,
          `colorId=${i.color_id}`,
          `categoryId=${i.category_id}`,
          `notes=${i.notes}`
        ].join(`&`)
      }
    }
  }
</script>

<style scoped>
</style>
