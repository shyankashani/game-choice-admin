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
        <div class="col col-5">
          <img :src="item.image" class="align-self-start rounded w-100 border" />
        </div>
        <div class="col col-7">
          <div class="container">
            <div class="row">
              <div class="col">
                <fa :icon="faMapMarkerAlt" />
                Shelf {{ item.location }}
              </div>
            </div>
            <div class="row">
              <div class="col h1 font-weight-bold">
                {{ item.name }}
              </div>
            </div>
            <div class="row">
              <div class="col-auto pr-0">
                <fa :icon="faUser" />
                {{ this.numberOfPlayers }}
              </div>
              <div class="col-auto pr-0">
                <fa :icon="faClock" />
                {{ this.playTime }}
              </div>
              <div class="col-auto pr-0">
                <fa :icon="faChild" />
                {{ this.minAge }}
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <div v-if="this.isShowingDescription">
                  <p v-for="paragraph in this.description.paragraphs">
                    {{ paragraph }}
                  </p>
                  <span
                    class="text-primary"
                    v-on:click="toggleDescription"
                    :style="{ cursor: 'pointer' }"
                  >
                    Show less
                  </span>
                </div>
                <div v-else>
                  {{ this.description.truncated }}
                  <span
                    class="text-primary"
                    v-on:click="toggleDescription"
                    :style="{ cursor: 'pointer' }"
                  >
                    Show more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import he from 'he';
  import _ from 'lodash';
  import fa from '@fortawesome/vue-fontawesome';
  import { faUser, faClock, faChild, faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'gamecard',
    props: ['item', 'selectedColor', 'selectedCategory', 'selectedCategoryImage'],
    components: { fa },
    data: function () {
      return {
        isShowingDescription: false
      }
    },
    computed: {
      description: function () {
        const descArray = this.item.description.split('&#10;');
        const paragraphs = descArray.map(p => p.length ? he.decode(p) : '' );
        const truncated = _.truncate(paragraphs[0], { length: 480, separator: '.', omission: '.' })
        return { paragraphs, truncated };
      },
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
      faMapMarkerAlt: () => faMapMarkerAlt,
    },
    methods: {
      toggleDescription: function () {
        this.isShowingDescription
          ? this.isShowingDescription = false
          : this.isShowingDescription = true
      }
    }
  }
</script>

<style scoped>
  .h1 {
    font-size: 36px !important;
  }

  .h2 * {
  }
</style>
