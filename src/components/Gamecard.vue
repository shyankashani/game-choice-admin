<template>
  <b-modal
    :id="item.id"
    size="lg"
    centered=true
    no-fade
    hide-footer
    header-class="pr-4 pt-4 border-0"
    body-class="p-0"
  >
    <div class="container pl-5 pb-5 pr-5">
      <div class="row">
        <div class="col col-4">
          <img :src="item.image" class="align-self-start rounded border w-100" />
        </div>
        <div class="col col-8">
          <div class="font-weight-bold">
            {{ item.name }}
          </div>
          <div class="text-truncate">
            {{ item.description }}
          </div>
        </div>
        </div>
    </div>
  </b-modal>
</template>

<script>
  export default {
    name: 'gamecard',
    props: ['item']
  }
</script>

<style scoped>
</style>
