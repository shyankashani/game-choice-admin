<template>
  <div class="badge badge-primary py-1">
    <fa :icon="faMapMarkerAlt" />
    {{ item.location }}
  </div>
</template>

<script>
import fa from '@fortawesome/vue-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'location',
    props: ['item'],
    components: { fa },
    computed: {
      faMapMarkerAlt: () => faMapMarkerAlt
    }
  }
</script>

<style scoped>
</style>
