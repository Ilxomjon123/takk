<template>
  <div
    class="hidden md:block mx-auto text-gray-600 text-center col-span-12"
    v-if="total == 0"
  >No Data</div>
  <div
    v-else
    class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
  >
    <ul class="pagination">
      <li>
        <a class="pagination__link">
          <ChevronsLeftIcon class="w-4 h-4" @click="paginate(1)" />
        </a>
      </li>
      <li>
        <a class="pagination__link">
          <ChevronLeftIcon class="w-4 h-4" @click="paginate(currentPage - 1)" />
        </a>
      </li>
      <li v-for="(item, index) in pagesList" :key="index">
        <a
          class="pagination__link"
          @click="paginate(item)"
          :class="item == currentPage ? 'pagination__link--active' : ''"
        >{{ item }}</a>
      </li>
      <li>
        <a class="pagination__link">
          <ChevronRightIcon class="w-4 h-4" @click="paginate(currentPage + 1)" />
        </a>
      </li>
      <li>
        <a class="pagination__link">
          <ChevronsRightIcon class="w-4 h-4" @click="paginate(totalPages)" />
        </a>
      </li>
    </ul>
    <div
      class="hidden md:block mx-auto text-gray-600"
    >Showing {{ firstIndex }} to {{ lastIndex }} of {{ total }} entries</div>
    <select class="w-20 form-select box mt-3 sm:mt-0" @change="changePerPage">
      <option
        v-for="(item, index) in perPageList"
        :key="index"
        :selected="perPage == item"
      >{{ item }}</option>
    </select>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      perPage: 10
    }
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPageList: {
      type: Array,
      default: [10, 20, 50, 100]
    },
    showedPages: {
      type: Number,
      default: 3
    }
  },
  computed: {
    totalPages() {
      const rem = this.total % this.perPage;
      return rem == 0 ? Math.floor(this.total / this.perPage) : Math.floor(this.total / this.perPage) + 1
    },
    firstIndex() {
      return (this.currentPage - 1) * this.perPage + 1
    },
    lastIndex() {
      if (this.currentPage != this.totalPages)
        return this.currentPage * this.perPage
      else return this.total;
    },
    pagesList() {
      const length = this.totalPages;
      const index = this.currentPage;
      if (length > 3) {
        switch (index) {
          case length:
            return [length - 2, length - 1, length];
          case 1:
            return Array.from({ length: 3 }, (_, i) => i + 1);
          default:
            return [index - 1, index, index + 1];
        }
      } else {
        return Array.from({ length: length }, (_, i) => i + 1)
      }
    }
  },
  methods: {
    async paginate(val) {
      this.$store.commit('setLoadingStatus', true)
      if (1 <= val && val <= this.totalPages)
        this.$emit('paginate', val);
      // this.currentPage = val;
      this.$store.commit('setLoadingStatus', false)
    },
    async changePerPage(e) {
      this.$store.commit('setLoadingStatus', true)
      this.perPage = e.target.value;
      this.$emit('changePerPage', this.perPage);
      this.$store.commit('setLoadingStatus', false)
    }
  }
})
</script>
