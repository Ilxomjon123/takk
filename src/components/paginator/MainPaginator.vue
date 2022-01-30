<template>
  <Pagination
    :total="paginator.total"
    :currentPage="paginator.page"
    :perPage="paginator.limit"
    @paginate="paginate($event)"
    @changePerPage="changePerPage($event)"
  />
</template>

<script>
import { defineComponent } from 'vue'
import Pagination from './Pagination.vue'

export default defineComponent({
  components: { Pagination },
  props: {
    dispatcher: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      default: {}
    },

  },
  data() {
    return {
      paginator: {
        page: 1,
        limit: 10,
        total: 100,
      },
    }
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async paginate(val) {
      this.paginator.page = val
      await this.fetchData();
    },
    async changePerPage(val) {
      this.paginator.limit = val
      await this.fetchData();
    },
    async fetchData() {
      this.$store.commit('setLoadingStatus', true)
      const res = await this.$store.dispatch(this.dispatcher, { ...this.form, ...this.paginator })
      this.paginator.total = res.total_objects;
      this.$emit('paginate', res.result);
      this.$store.commit('setLoadingStatus', false)

    }
  }
})
</script>
