<template>
  <div :class="`badge border border-${badgeColor} badge-${badgeColor} py-1`">
    {{ item.color.name }}
  </div>
</template>

<script>
  export default {
    name: 'color',
    props: ['item'],
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
</style>
