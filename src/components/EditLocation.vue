<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text pl-2 pr-1 bg-white border-primary py-tiny" :id="`location-id${item.id}`">
        <fa :icon="faMapMarkerAlt" />
      </span>
    </div>
    <input
      type="text"
      class="form-control form-control-sm p-0 border-left-0 border-primary"
      placeholder="Location"
      :aria-describedby="`location-id${item.id}`"
      v-model="item.location"
    >
  </div>
</template>

<script>
import fa from '@fortawesome/vue-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'edit-location',
    props: [
      'item'
    ],
    components: {
      fa
    },
    computed: {
      faMapMarkerAlt: () => faMapMarkerAlt
    }
  }
</script>

<style scoped>
  .py-tiny {
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
