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
        total: 1000,
      },
    }
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async paginate(val, form = {}) {
    this.paginator.page = val
    await this.fetchData(form);
    },
    async changePerPage(val) {
      this.paginator.limit = val;
      this.paginator.page = 1;
      await this.fetchData();
    },
    async fetchData(form = {}) {
      if(form == {}){
        form = this.from;
      }
      this.$store.commit('setLoadingStatus', true);
      const res = await this.$store.dispatch(this.dispatcher, { ...form, ...this.paginator });
      this.paginator.total = res?.total_objects;
      this.$emit('setItems', res?.results);
      this.$store.commit('setLoadingStatus', false);

    }
  }
})
</script>
