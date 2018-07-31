<template>
  <div
    class="mb-2 align-items-baseline"
    v-on:click="toggleCheckbox(choice.id, choiceType)"
    :style="{ cursor: 'pointer' }"
  >
    <fa
      v-if="isSelected"
      :class="`d-inline-flex border border-${color} text-${color} p-1 mr-1`"
      :icon="faSquareFull"
    />
    <fa
      v-else
      :class="`d-inline-flex border border-${color} text-white mr-1`"
      :icon="faSquareFull"
    />
    <div
      v-if="isCategory"
      class="image-wrapper-teensy d-inline-flex align-middle"
    >
      <img
        class="image mr-1"
        :src="image"
      />
    </div>
    <div class="d-inline-flex">
      {{ choice.name }}
    </div>
  </div>
</template>

<script>
  import fa from '@fortawesome/vue-fontawesome';
  import { faSquareFull } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'checkbox',
    props: ['choice', 'toggleCheckbox', 'colorIds', 'categoryIds'],
    components: { fa },
    computed: {
      color: function () {
        return this.choice.name === 'Go for it'
          ? 'success'
          : this.choice.name === 'Use caution'
          ? 'warning'
          : this.choice.name === 'Alert'
          ? 'danger'
          : 'secondary'
      },
      image: function () {
        return this.isCategory
          ? require(`../assets/${_.chain(this.choice.name).lowerCase().split(' ').join('')}.png`)
          : require('../assets/default.png')
      },
      isCategory: function () {
        return this.color === 'secondary';
      },
      choiceType: function () {
        return this.isCategory
          ? 'category'
          : 'color'
      },
      isSelected: function () {
        return _.includes(this.colorIds || this.categoryIds, this.choice.id)
      },
      faSquareFull: () => faSquareFull
    }
  }
</script>

<style scoped>
  .image-wrapper-teensy {
    height: 14px;
    width: 14px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .image {
    flex-shrink: 0;
    max-width: 130%;
    max-height: 130%;
  }
</style>
