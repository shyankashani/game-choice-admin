<template>
  <div>
      <b-row>
        <b-col class="border pt-3 pb-3 border-top-0 border-right-0">
          <div class="pt-2">
            {{ name }}
          </div>
        </b-col>
        <b-col class="border pt-3 pb-3 border-top-0 border-right-0">
          <b-form-input type="text" v-bind:placeholder="location" class="w-50" />
        </b-col>
        <b-col class="border pt-3 pb-3 border-top-0 border-right-0">
          <b-button-group>
            <b-button v-bind:variant="colorVariants.green">G</b-button>
            <b-button v-bind:variant="colorVariants.yellow">Y</b-button>
            <b-button v-bind:variant="colorVariants.red">R</b-button>
          </b-button-group>
        </b-col>
        <b-col class="pt-3 pb-3 border-top-0 border">
          <b-button-group>
            <b-button variant="outline-secondary">G</b-button>
            <b-button variant="outline-secondary">Y</b-button>
            <b-button variant="outline-secondary">R</b-button>
            <b-button variant="outline-secondary">G</b-button>
            <b-button variant="outline-secondary">Y</b-button>
            <b-button variant="outline-secondary">R</b-button>
            <b-button variant="outline-secondary">G</b-button>
            <b-button variant="outline-secondary">Y</b-button>
            <b-button variant="outline-secondary">R</b-button>
            <b-button variant="outline-secondary">R</b-button>
          </b-button-group>
        </b-col>
      </b-row>
  </div>
</template>

<script>
  export default {
    name: 'Game',
    props: ['game'],
    data: function() {

      let name = this.game.name;
      let location = this.game.location || 'Enter location';
      let color = this.game.color;

      let colorVariants = {
        green: 'outline-success',
        yellow: 'outline-warning',
        red: 'outline-danger'
      };

      if (color === 'green') { colorVariants.green = 'success' }
      if (color === 'yellow') { colorVariants.yellow = 'warning' }
      if (color === 'red') { colorVariants.red = 'danger' }

      return {
        name: name,
        location: location,
        colorVariants: colorVariants,
      }
    }
  }
</script>

<style scoped>
</style>
