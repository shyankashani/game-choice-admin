<template>
    <div class="container-fluid sticky-top bg-light border rounded shadow-sm">
      <div class="row">
        <div class="col pb-3 pt-3 border-bottom font-weight-bold">
          Filter
        </div>
      </div>
      <div class="row mt-5 mb-5 pl-3 pr-3">
        <div class="col border-bottom p-0">
          <input type="text"
            class="form-control form-control-sm pl-0 border-0 rounded-0 shadow-none bg-light"
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
