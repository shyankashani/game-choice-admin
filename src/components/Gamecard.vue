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
          <img :src="item.image" class="align-self-start rounded w-100 border" />
        </div>
        <div class="col col-8">
          <div class="container">
            <div class="row font-weight-bold">
              <div class="col text-primary">
                <fa :icon="faMapMarkerAlt" />
                {{ item.location }}
              </div>
            </div>
            <div class="row">
              <div class="col h1 text-dark">
                {{ item.name }}
              </div>
            </div>
            <div class="row font-weight-bold text-primary">
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
            <div class="row pt-4 text-muted">
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
            <div class="row pt-4">
              <div class="col col-6">
                <div class="progress" style="height: 30px">
                  <div
                    :class="`progress-bar ${bggDifficulty.className}`"
                    role="progressbar"
                    :style="{width: bggDifficulty.width}"
                    :aria-valuenow="bggDifficulty.absolute"
                    aria-valuemin="0"
                    aria-valuemax="5"
                  > {{ bggDifficulty.width }} </div>
                </div>
                <div class="text-center pt-2">
                  Difficulty
                </div>
              </div>
              <div class="col col-6">
                <div class="progress" style="height: 30px">
                  <div
                    :class="`progress-bar ${bggRating.className}`"
                    role="progressbar"
                    :style="{width: bggRating.width}"
                    :aria-valuenow="bggRating.absolute"
                    aria-valuemin="0"
                    aria-valuemax="5"
                  > {{ bggRating.width }} </div>
                </div>
                <div class="text-center pt-2">
                  Rating
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
      bggDifficulty: function () {
        const bggAverageWeight = this.item.bgg_average_weight;
        const absolute = Number(bggAverageWeight);
        const percentage = Math.round((absolute / 5) * 100);
        const width = `${percentage}%`;
        let className;
        if (percentage < 25) {
          className = 'bg-success';
        } else if (percentage < 50) {
          className = 'bg-warning';
        } else {
          className = 'bg-danger';
        }
        return { absolute, width, className };
      },
      bggRating: function () {
        const bggAverageRating = this.item.bgg_average_rating;
        const absolute = Number(bggAverageRating);
        const percentage = Math.round((absolute / 10) * 100);
        const width = `${Math.round((absolute / 10) * 100)}%`;
        let className;
        if (percentage < 30) {
          className = 'bg-danger';
        } else if (percentage < 60) {
          className = 'bg-warning';
        } else {
          className = 'bg-success';
        }
        return { absolute, width, className };
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
@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700|Merriweather:400,700&subset=latin-ext');
  .h1 {
    font-size: 36px !important;
    font-weight: 800;
  }

  .h2 * {
  }

  .description * {
    /* font-family: 'Merriweather', serif !important; */
  }
</style>
