<template>
  <nav class="navbar text-light bg-warning fixed-top rounded mt-4 mr-5 ml-5">
    <a class="navbar-brand font-weight-bold text-dark">
      VictorySquare
    </a>
  </nav>
</template>

<script>
  import fa from '@fortawesome/vue-fontawesome';
  import { faDiceFive } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'navigation',
    components: { fa },
    computed: { faDiceFive: () => faDiceFive }
  }
</script>

<style scoped>
</style>
