<template>
  <span :class="`badge badge-${badgeColor} align-self-center`">
    {{ item.color.name }}
  </span>
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

<style>
.badge {
  font-size: 12px !important;
  padding: 5px 7px;
}
</style>
