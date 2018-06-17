<template>
  <div class="badge bg-light">
    <div class="d-flex">
      <div class="image-wrapper-teensy mr-1 align-self-center">
        <img class="image" :src="selectedCategoryImage" />
      </div>
      <div class="align-self-center">
        {{ item.category.name }}
      </div>
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
.badge * {
  font-size: 12px !important;
}
.image-wrapper-teensy {
  display: flex;
  height: 14px;
  width: 14px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.image {
  flex-shrink: 0;
  max-width: 140%;
  max-height: 140%;
}
</style>
