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
          v-if="isManagingInventory"
        />
      </td>

      <td>
        <select
          class="form-control form-control-sm h-100"
          v-model="item.color_id"
          v-if="isManagingInventory"
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
          v-if="isManagingInventory"
        ><option v-for="category in categories" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </td>

      <td>
        <div class="form-check">
          <input type="checkbox"
            id="staff-pick"
            class="form-check-input"
            v-model="item.staff_pick"
            v-if="isManagingInventory"
          />
        </div>
      </td>

      <td>
        <textarea
          class="form-control form-control-sm"
          v-model="item.notes"
          v-if="isManagingInventory"
          placeholder="Notes"
          :rows="1"
          :max-rows="3"
        />
      </td>

      <td>
        <button type="submit"
          class="btn btn-outline-secondary btn-sm h-100"
          v-on:click="updateInventory"
          v-if="isManagingInventory"
        > Save </button>
      </td>

      <td
        v-html="status.symbol"
        v-if="isManagingInventory"
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
        isManagingInventory: true,
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
