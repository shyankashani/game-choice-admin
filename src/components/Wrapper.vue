<template>
  <div id="hello">
    <b-container fluid>
      <game
        v-for="game in games"
        v-bind:game="game"
        v-bind:key="game.id"
      />
    </b-container>
  </div>
</template>

<script>
import Game from './Game';

export default {
  name: 'wrapper',
  props: ['searchResults'],
  computed: {
    games: function() {
      return this.searchResults;
    }
  },
  components: {
    Game
  }
}
</script>

<style scoped>
</style>
