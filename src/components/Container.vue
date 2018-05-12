<template>
  <div id="hello">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Game Id</th>
          <th>Name</th>
          <th>Location</th>
          <th>Color</th>
          <th>Category</th>
          <th>Notes</th>
          <th></th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <item
          v-for="item in inventory"
          v-bind:item="item"
          v-bind:key="item.id"
          v-bind:colors="colors"
          v-bind:categories="categories"
        />
      </tbody>
    </table class="table">
  </div>
</template>

<script>
import Item from './Item';

export default {
  name: 'container',
  props: ['inventory', 'colors', 'categories'],
  components: {
    Item
  }
}
</script>

<style scoped>
</style>
