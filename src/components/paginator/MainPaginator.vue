<template>
  <Pagination
    :total="total"
    :currentPage="paginator.page"
    :perPage="paginator.limit"
    @paginate="paginate($event, form)"
    @changePerPage="changePerPage($event)"
  />
</template>

<script>
import { defineComponent } from 'vue';
import Pagination from './Pagination.vue';

export default defineComponent({
  components: { Pagination },
  props: {
    dispatcher: {
      type: String,
      required: true,
    },
    form: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      paginator: {
        page: 1,
        limit: 10,
      },
      total: 10,
    };
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async paginate(val, form = {}) {
      this.paginator.page = val;
      this.total = 0;
      await this.fetchData(form);
    },
    async changePerPage(val) {
      this.paginator.limit = val;
      this.paginator.page = 1;
      await this.fetchData();
    },
    async fetchData(form = {}) {
      console.log({ form });
      if (form == {}) {
        form = this.from;
      }
      const res = await this.$store.dispatch(this.dispatcher, {
        ...form,
        ...this.paginator,
      });
      this.total = res?.total_objects;
      console.log('res?.results', res?.results);
      this.$emit('setItems', res?.results);
    },
  },
});
</script>
