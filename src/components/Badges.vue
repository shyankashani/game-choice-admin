<template>

  <div v-if="isEditing" class="container">
    <div class="row d-flex align-items-center">

      <div class="col-2 pr-0">
        <edit-location :item="item" />
      </div>

      <div class="col-4 pr-0">
        <edit-color :item="item" :colors="colors" />
      </div>

      <div class="col-5 pr-0">
        <edit-category :item="item" :categories="categories" />
      </div>

      <div class="col-1 pr-0">
        <div v-on:click="edit" class="badge badge-white text-muted py-1">
          <fa :icon="faPencilAlt" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <div class="row d-flex align-items-center">

      <div class="col-auto pr-0">
        <location :item="item" />
      </div>

      <div class="col-auto pr-0">
        <color :item="item" />
      </div>

      <div class="col-auto pr-0">
        <category :item="item" />
      </div>

      <div class="col-auto pr-0">
        <div v-on:click="edit" class="badge badge-white text-muted py-1">
          <fa :icon="faPencilAlt" />
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import Color from './Color';
  import Location from './Location';
  import Category from './Category';
  import EditColor from './EditColor';
  import EditLocation from './EditLocation';
  import EditCategory from './EditCategory';
  import fa from '@fortawesome/vue-fontawesome';
  import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';

  export default {
    name: 'badges',
    props: [
      'item',
      'colors',
      'categories'
    ],
    data: function () {
      return {
        isEditing: false,
      }
    },
    components: {
      fa,
      Color,
      Location,
      Category,
      EditColor,
      EditLocation,
      EditCategory
    },
    computed: {
      faPencilAlt: () => faPencilAlt
    },
    methods: {
      edit: function() {
        this.isEditing = true;
      },
      updateInventory: function () {
        this.isUpdatingInventory = true;
        axios.post(`${API_HOST}/inventory?${this.generateInventoryQuery()}`)
        .then(result => {
          this.isUpdatingInventory = false;
          this.isUpdateSuccessful = result.status === 200;
        })
      },
      generateInventoryQuery: function() {
        const i = this.item;
        const queryString = [
          `game_id=${i.game_id}`,
          `location=${i.location}`,
          `colorId=${i.color_id}`,
          `categoryId=${i.category_id}`,
          `staffPick=${i.staff_pick}`,
          `notes=${i.notes}`
        ].join(`&`);
        return queryString;
      }
    }
  }
</script>

<style scoped>
</style>
