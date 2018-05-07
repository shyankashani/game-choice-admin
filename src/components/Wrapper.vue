<template>
  <div id="hello">
    <b-container fluid>
      <game
        v-for="game in games"
        v-bind:game="game"
        v-bind:key="game.id"
        v-bind:colors="colors"
        v-bind:categories="categories"
      />
    </b-container>
  </div>
</template>

<script>
import Game from './Game';

export default {
  name: 'wrapper',
  props: ['games', 'colors', 'categories'],
  components: {
    Game
  }
}
</script>

<style scoped>
</style>
