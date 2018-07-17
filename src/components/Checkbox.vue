<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" :id="choice.key">
    <label class="form-check-label" :for="choice.key">
      {{ choice.name }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    props: ['choice']
  }
</script>

<style>
</style>
