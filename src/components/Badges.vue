<template>
  <div class="container">
    <div class="row d-flex align-items-center">

      <div class="col-auto pr-0">
        <location :item="item" />
      </div>

      <div class="col-auto pr-0">
        <color :item="item" />
      </div>

      <div class="col-auto pr-0">
        <category :item="item" />
      </div>

    </div>
  </div>
</template>

<script>
  import Color from './Color.vue';
  import Location from './Location';
  import Category from './Category';

  export default {
    name: 'badges',
    props: ['item'],
    components: { Color, Location, Category }
  }
</script>

<style scoped>
</style>
