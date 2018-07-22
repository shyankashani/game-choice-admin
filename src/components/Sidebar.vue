<template>
    <div class="col col-2 pr-0">
      <div class="container-fluid sticky-top p-0">
        <div class="row">
          <div class="col">
            <div class="border-top border-white">
              <div class="font-weight-bold py-3 border-bottom">
                Filter
              </div>
            </div>
          </div>
        </div>
        <div class="row py-4 mr-5">
          <div class="col mr-5">
            <input type="text"
              class="
                text-input
                form-control
                form-control-sm
                border-top-0
                border-left-0
                border-right-0
                border-bottom
                rounded-0
                shadow-none
                pl-0
                pb-2
              "
              placeholder="Name"
              v-model="query"
              v-on:keyup="updateQuery(query)"
            />
          </div>
        </div>

        <div class="row mr-5">
          <div class="col mr-5">
            <div class="border-bottom pb-2 mb-3">
              Difficulty
            </div>
          </div>
          <div class="col col-12">
            <checkbox
              v-for="color in colors"
              :toggleColorId="toggleColorId"
              :colorIds="colorIds"
              :choice="color"
              :key="`checkbox${color.id}`"
            />
          </div>
        </div>

        <div class="row mr-5 mt-5">
          <div class="col mr-5">
            <div class="border-bottom pb-2 mb-3">
              Categories
            </div>
          </div>
          <div class="col col-12">
            <checkbox
              v-for="category in categories"
              :toggleColorId="toggleColorId"
              :choice="category"
              :key="`checkbox${category.id}`"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Checkbox from './Checkbox';

  export default {
    name: 'sidebar',
    props: ['updateQuery', 'colors', 'categories', 'toggleColorId', 'colorIds'],
    components: { Checkbox },
    data: function () {
      return {
        query: ''
      }
    }
  }
</script>

<style scoped>
::placeholder {
  color: silver;
}

.text-input:hover,
.text-input:active {
  border-bottom: 1px solid #ffc107 !important;
}
</style>
