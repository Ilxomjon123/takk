<template>
  <div>
    <div class="grid sm:grid-cols-10 mt-5 items-center">
      <div class="col-span-1">
        <h2 class="text-lg font-medium">Employees List</h2>
      </div>
      <div class="col-auto">
        <router-link
          to="/dashboard/employees/add-exist"
          class="btn btn-primary w-36"
        >
          Add Employee
        </router-link>
      </div>
    </div>

    <!-- BEGIN: Data List -->
    <div
      class="intro-y grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-5"
    >
      <router-link
        v-for="(item, index) in items"
        :key="index"
        class="intro-y block col-span-12 sm:col-span-4 xl:col-span-3 2xl:col-span-2"
        :to="`employees/${item.id}`"
        @click="setEmployee(item)"
      >
        <EmployeeCard :employee="item" />
      </router-link>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <MainPaginator
      class="mt-5"
      dispatcher="fetchEmployees"
      ref="paginator"
      @setItems="setItems($event)"
      :form="form"
    />
    <!-- END: Pagination -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MainPaginator from '@/components/paginator/MainPaginator.vue';
import EmployeeCard from '@/components/cards/EmployeeCard.vue';

export default defineComponent({
  components: { MainPaginator, EmployeeCard },
  data() {
    return {
      items: [],
      form: {},
    };
  },
  methods: {
    setItems(val) {
      this.items = val;
    },
    search() {
      this.$refs.paginator.paginate(1);
    },
    setEmployee(item) {
      this.$store.commit('setEmployee', item);
    },
  },
});
</script>
