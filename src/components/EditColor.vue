<template>
  <select
    class="custom-select w-100 h-100 py-teensy"
    v-model="item.color.id"
    :style="{
      border: `1px solid ${item.color.hex}`,
      color: item.color.hex
    }"
  >
    <option
     class="py-teensy"
      v-for="color in colors"
      :value="color.id"
      :style="{ color: color.hex }"
    >
      {{ color.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: 'edit-color',
    props: [
      'item',
      'colors'
    ],
    computed: {
      badgeColor: function() {
        return this.item.color.name === 'Go for it'
          ? 'success'
          : this.item.color.name === 'Use caution'
          ? 'warning'
          : 'danger'
      }
    }
  }
</script>

<style scoped>
 .py-teensy {
   padding-top: 1px;
   padding-bottom: 1px;
 }
</style>
