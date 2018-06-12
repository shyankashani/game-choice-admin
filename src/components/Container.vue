<template>
  <div>
    <div class="container-fluid border-top border-bottom full-height rounded shadow-sm">
      <div class="row sticky-top font-weight-bold border-bottom shadow-sm">
        <div class="col col-4 bg-light pt-3 pb-3 border-left"></div>
        <div class="col col-2 bg-light pt-3 pb-3">Name</div>
        <div class="col col-2 bg-light pt-3 pb-3">Location</div>
        <div class="col col-2 bg-light pt-3 pb-3">Difficulty</div>
        <div class="col col-2 bg-light pt-3 pb-3 border-right">Category</div>
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
.full-height {
  height: 90vh;
  overflow: scroll;
}
</style>
