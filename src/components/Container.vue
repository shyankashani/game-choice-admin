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
      <gamecard
        v-for="item in inventory"
        :item="item"
        :key="`gamecard${item.id}`"
      />
      <spinner v-if="!inventory.length"/>
    </div>
</template>

<script>
  import Item from './Item';
  import Spinner from './Spinner';
  import Gamecard from './Gamecard';


  export default {
    name: 'container',
    props: ['inventory', 'colors', 'categories'],
    components: { Item, Spinner, Gamecard }
  }
</script>

<style scoped>
</style>
