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
          >
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-select
            size="sm"
          >
            <option v-for="colorName in colorNames">
              {{ colorName }}
            </option>
          </b-form-select>
        </b-col>

        <b-col>
          <b-form-select
            size="sm"
          >
            <option v-for="categoryName in categoryNames">
              {{ categoryName }}
            </option>
          </b-form-select>
        </b-col>

      </b-row>
  </div>
</template>

<script>
  export default {
    name: 'Game',
    props: ['game', 'colors', 'categories'],
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
    }
  }
</script>

<style scoped>
</style>
