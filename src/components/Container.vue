<template>
  <div class="col col-10 pl-0">
    <div class="
      container-fluid
      full-height
      border
      rounded
      bg-light
      shadow-sm">

      <div class="row
        p-3
        sticky-top
        border-bottom
        bg-light
        font-weight-bold">

        <div class="col col-2">
        </div>

        <div class="col col-2">
          Name
        </div>

        <div class="col col-2">
          Location
        </div>

        <div class="col col-2">
          Difficulty
        </div>

        <div class="col col-2">
          Category
        </div>

        <div class="col col-2">
        </div>

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
