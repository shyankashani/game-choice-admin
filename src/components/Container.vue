<template>
    <div class="container-fluid pt-4 pl-5 pr-5 bg-light rounded">
      <div class="row pb-4 font-weight-bold">
        <div class="col col-2"></div>
        <div class="col col-2">Name</div>
        <div class="col col-2">Location</div>
        <div class="col col-2">Difficulty</div>
        <div class="col col-2">Category</div>
      </div>
      <item
        v-for="item in inventory"
        :item="item"
        :key="`item${item.id}`"
        :colors="colors"
        :categories="categories"
      />
      <spinner v-if="!inventory.length"/>
    </div>
</template>

<script>
  import Item from './Item';
  import Spinner from './Spinner';

  export default {
    name: 'container',
    props: ['inventory', 'colors', 'categories'],
    components: { Item, Spinner }
  }
</script>

<style scoped>
</style>
