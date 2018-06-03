<template>
    <div class="container-fluid sticky-top">
      <div class="row bg-warning text-dark pt-2 pb-2">
        <div class="col">
          VictorySquare
        </div>
      </div>
      <div class="row pt-4">
        <div class="col pb-3 pt-3 border-top border-bottom">
          Filter
        </div>
      </div>
      <div class="row pt-4">
        <div class="col border-bottom">
          <input type="text"
            class="form-control form-control-sm pl-0 border-0 border-bottom rounded-0 shadow-none"
            placeholder="Filter by name"
            v-model="query"
            v-on:keyup="updateQuery(query)"
          />
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'sidebar',
    props: ['updateQuery'],
    data: function () {
      return {
        query: ''
      }
    }
  }
</script>

<style scoped>
</style>
