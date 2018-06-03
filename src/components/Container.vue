<template>
  <div>
    <div class="container-fluid bg-white sticky-top">
      <div class="row bg-warning text-dark pt-2 pb-2">
        <div class="col">
          &nbsp;
        </div>
      </div>
      <div class="row pt-4 font-weight-bold">
        <div class="col col-2 bg-light pt-3 pb-3 border-bottom border-top border-left"></div>
        <div class="col col-2 bg-light pt-3 pb-3 border-bottom border-top">Name</div>
        <div class="col col-2 bg-light pt-3 pb-3 border-bottom border-top">Location</div>
        <div class="col col-2 bg-light pt-3 pb-3 border-bottom border-top">Difficulty</div>
        <div class="col col-2 bg-light pt-3 pb-3 border-bottom border-top border-right">Category</div>
      </div>
    </div>
    <div class="container-fluid">
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
</style>
