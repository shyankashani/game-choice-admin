<template>
  <div>
      <b-row class="pt-4 pb-4 border border-bottom-0 border-left-0 border-right-0">

        <b-col>
          <div>
            <p>
              {{ name }}
            </p>
          </div>
        </b-col>

        <b-col>
          <b-form-input
            placeholder="Location"
            size="sm"
          >
          </b-form-input>
        </b-col>

        <b-col>
          <b-form-select
            size="sm"
          >
            <option>Green</option>
            <option>Yellow</option>
            <option>Red</option>
          </b-form-select>
        </b-col>

        <b-col>
          <b-form-select
            size="sm"
          >
            <option>G</option>
            <option>Y</option>
            <option>R</option>
            <option>G</option>
            <option>Y</option>
            <option>R</option>
            <option>G</option>
            <option>Y</option>
            <option>R</option>
            <option>R</option>
          </b-form-select>
        </b-col>

      </b-row>
  </div>
</template>

<script>
  export default {
    name: 'Game',
    props: ['game'],
    computed: {
      name: function() {
        return this.game.name;
      }
    }
  }
</script>

<style scoped>
</style>
