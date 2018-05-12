<template>
  <div id="hello">
    <b-container fluid>
      <item
        v-for="item in inventory"
        v-bind:item="item"
        v-bind:key="item.id"
        v-bind:colors="colors"
        v-bind:categories="categories"
      />
    </b-container>
  </div>
</template>

<script>
import Item from './Item';

export default {
  name: 'container`',
  props: ['inventory', 'colors', 'categories'],
  components: {
    Item
  }
}
</script>

<style scoped>
</style>
