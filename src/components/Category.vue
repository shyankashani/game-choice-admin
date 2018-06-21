<template>
  <div class="badge badge-light border border-secondary py-1 align-items-baseline">

    <div class="image-wrapper-teensy mr-1 d-inline-flex align-bottom">
      <img class="image" :src="selectedCategoryImage" />
    </div>

    <div class="d-inline-flex">
      {{ item.category.name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'category',
    props: ['item'],
    computed: {
      selectedCategoryImage: function () {
        const categoryName = this.item.category.name;
        const imageName = _.chain(categoryName).lowerCase().split(' ').join('');
        return _.size(this.item.category)
          ? require(`../assets/${imageName}.png`)
          : require('../assets/default.png')
      },
    }
  }
</script>

<style scoped>
.image-wrapper-teensy {
  height: 14px;
  width: 14px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.image {
  flex-shrink: 0;
  max-width: 130%;
  max-height: 130%;
}
</style>
