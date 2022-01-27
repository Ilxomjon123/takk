<template>
  <div
    class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
  >
    <ul class="pagination">
      <li>
        <a class="pagination__link">
          <ChevronsLeftIcon class="w-4 h-4" />
        </a>
      </li>
      <li>
        <a class="pagination__link">
          <ChevronLeftIcon class="w-4 h-4" />
        </a>
      </li>
      <li>
        <a class="pagination__link">...</a>
      </li>
      <li>
        <a class="pagination__link">1</a>
      </li>
      <li>
        <a class="pagination__link pagination__link--active">2</a>
      </li>
      <li>
        <a class="pagination__link">3</a>
      </li>
      <li>
        <a class="pagination__link">...</a>
      </li>
      <li>
        <a class="pagination__link">
          <ChevronRightIcon class="w-4 h-4" />
        </a>
      </li>
      <li>
        <a class="pagination__link">
          <ChevronsRightIcon class="w-4 h-4" />
        </a>
      </li>
    </ul>
    <div
      class="hidden md:block mx-auto text-gray-600"
    >Showing 1 to 10 of 150 entries</div>
    <select class="w-20 form-select box mt-3 sm:mt-0">
      <option>10</option>
      <option>25</option>
      <option>35</option>
      <option>50</option>
    </select>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dispatcher: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      paginator: {
        page: 0,
        limit: 10,
      }
    }
  },
  async mounted() {
    await this.$store(this.dispatcher,)
  }
})
</script>
