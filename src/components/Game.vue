<template>
  <div>
      <b-row class="pb-4">

        <b-col>
          <div>
            <b-form-input
              :placeholder="name"
              size="sm"
              disabled
            >
            </b-form-input>
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
