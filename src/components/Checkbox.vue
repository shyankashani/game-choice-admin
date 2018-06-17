<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
    <label class="form-check-label" for="defaultCheck1">
      Go for it
    </label>
  </div>
</template>

<script>
  import fa from '@fortawesome/vue-fontawesome';
  import { faDiceFive } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'spinner',
    components: { fa },
    computed: { faDiceFive: () => faDiceFive }
  }
</script>

<style>
  .spinner {
    color: gray;
    font-size: 24px !important;
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier();
  }
  @keyframes spin {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }
</style>
