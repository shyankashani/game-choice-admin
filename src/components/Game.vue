<template>
  <div>
      <b-row class="pt-4 pb-4 border border-bottom-0 border-left-0 border-right-0">

        <b-col>
          <div>
            <p>
              {{ gameName }}
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
          >
            <option v-for="color in colors" :value="color.colorId">
              {{ color.name }}
            </option>
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
            v-on:click="saveInventory"
          >Save</b-button>
        </b-col>

      </b-row>
  </div>
</template>

<script>
  export default {
    name: 'Game',
    props: ['game', 'colors', 'categories'],
    data: function () {
      return {
        selectedLocation: '',
        selectedColorId: null,
        selectedCategoryId: null
      }
    },
    computed: {
      gameName: function () {
        return this.game.name;
      },
      colorNames: function () {
        return this.colors.map(color => {
          if (color.colorId === 1) {
            return 'Green';
          }
          if (color.colorId === 2) {
            return 'Yellow';
          }
          if (color.colorId === 3) {
            return 'Red';
          }
        })
      },
      categoryNames: function () {
        return this.categories.map(category => {
          return category.name
        });
      }
    },
    methods: {
      saveInventory: function () {
        console.log('this.selectedLocation', this.selectedLocation);
        console.log('this.selectedColorId', this.selectedColorId);
        console.log('this.selectedCategoryId', this.selectedCategoryId);
      }
    }
  }
</script>

<style scoped>
</style>
