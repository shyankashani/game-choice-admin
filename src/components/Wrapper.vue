<template>
  <div id="hello">
    <b-container fluid>
      <game
        v-for="game in searchGamesResults"
        v-bind:game="game"
        v-bind:key="game.id"
      />
    </b-container>
  </div>
</template>

<script>
import Game from './Game';

export default {
  name: 'HelloWorld',
  components: {
    Game
  },
  props: ['searchGamesResults'],
  data: function () {
    return {
      games: this.searchGamesResults
    }
  }
}
</script>

<style scoped>
</style>
