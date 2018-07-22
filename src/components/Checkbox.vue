<template>
  <div
    class="mb-2"
    v-on:click="toggleColorId(choice.id)"
    :style="{ cursor: 'pointer' }"
  >
    <fa
      v-if="isSelected"
      class="border border-secondary text-primary p-1"
      :icon="faSquareFull"
    />
    <fa
      v-else
      class="border border-secondary text-white"
      :icon="faSquareFull"
    />
    <span class="ml-1">
      {{ choice.name }}
    </span>
  </div>
</template>

<script>
  import fa from '@fortawesome/vue-fontawesome';
  import { faSquareFull } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'checkbox',
    props: ['choice', 'toggleColorId', 'colorIds'],
    components: { fa },
    computed: {
      isSelected: function () {
        return _.includes(this.colorIds, this.choice.id)
      },
      faSquareFull: () => faSquareFull
    }
  }
</script>

<style>
</style>
