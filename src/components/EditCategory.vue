<template>
  <div class="input-group w-100">
    <div class="input-group-prepend">
      <label class="input-group-text pl-tiny pr-0 bg-white border-secondary" :for="`category-id${item.id}`">
        <div class="image-wrapper-teensy mr-1 d-inline-flex align-bottom">
          <img class="image" :src="selectedCategoryImage" />
        </div>
      </label>
    </div>
    <select
      class="custom-select py-teensy pl-0 border-secondary border-left-0 h-100"
      :aria-describedby="`category-id${item.id}`"
      v-model="item.category.id"
    >
      <option v-for="category in categories" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'edit-category',
    props: [
      'item',
      'categories'
    ],
    computed: {
      selectedCategoryImage: function () {
        const categoryName = this.item.category.name;
        const imageName = _.chain(categoryName).lowerCase().split(' ').join('');
        return _.size(this.item.category)
          ? require(`../assets/${imageName}.png`)
          : require('../assets/default.png')
      }
    }
  }
</script>

<style scoped>
  .image-wrapper-teensy {
    height: 10px;
    width: 10px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .image {
    flex-shrink: 0;
    max-width: 140%;
    max-height: 140%;
  }
  .py-teensy {
    padding-top: 1px;
    padding-bottom: 1px;
  }
  .pl-tiny {
    padding-left: 8px;
  }
</style>
