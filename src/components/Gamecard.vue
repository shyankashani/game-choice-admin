<template>
  <b-modal
    :id="`id${item.id}`"
    size="lg"
    centered=true
    no-fade
    hide-footer
    header-class="pr-4 pt-4 border-0"
    body-class="p-0"
  >
    <div class="container pl-5 pb-5 pr-5">
      <div class="row">
        <div class="col col-4">
          <img :src="item.image" class="align-self-start rounded border w-100" />
        </div>
        <div class="col col-8">
          <div class="mb-2">
            <div class="h1 font-weight-bold">
              {{ item.name }}
            </div>
            <div class="h2">
              <span class="mr-2">
                <fa class="mr-1" :icon="faUser" />
                {{ this.numberOfPlayers }}
              </span>
              <span class="ml-2 mr-2">
                <fa class="mr-1" :icon="faClock" />
                {{ this.playTime }}
              </span>
              <span class="ml-2">
                <fa class="mr-1" :icon="faChild" />
                {{ this.minAge }}
              </span>
            </div>
            <div>
              <span class="mr-1">
                Board Game Geek Weight:
              </span>
              <b-progress :value="this.bggWeight" :max="100" show-progress />
            </div>
          </div>
        </div>
        </div>
    </div>
  </b-modal>
</template>

<script>
  import he from 'he';
  import fa from '@fortawesome/vue-fontawesome';
  import { faUser, faClock, faChild } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'gamecard',
    props: ['item'],
    components: { fa },
    computed: {
      decodedDescription: () => he.decode(this.item.description),
      numberOfPlayers: function () {
        const minPlayers = this.item.min_players;
        const maxPlayers = this.item.max_players;
        return minPlayers < maxPlayers
          ? `${minPlayers}-${maxPlayers} players`
          : `${maxPlayers} players`;
      },
      playTime: function () {
        const minPlayTime = this.item.min_play_time;
        const maxPlayTime = this.item.max_play_time;
        return minPlayTime < maxPlayTime
          ? `${minPlayTime}-${maxPlayTime} minutes`
          : `${maxPlayTime} minutes`;
      },
      minAge: function () {
        const minAge = this.item.min_age;
        return `${minAge} years and up`;
      },
      bggWeight: function () {
        const bggAverageWeight = this.item.bgg_average_weight;
        return Math.round(bggAverageWeight * 25);
      },
      faUser: () => faUser,
      faClock: () => faClock,
      faChild: () => faChild,
    }
  }
</script>

<style scoped>
  .h1 {
    font-size: 36px !important;
  }

  .h2 * {
    font-size: 16px !important;
  }
</style>
