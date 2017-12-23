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
  name: 'HelloWorld',
  components: {
    Game
  },
  data: function () {
    return {
      games: [
        { id: 0, name: 'BANG!', location: 'A1', color: 'green', sticker: 'choice' },
        { id: 1, name: 'Checkers', location: null, color: null, sticker: null },
      ]
    }
  }
}
</script>

<style scoped>
</style>
