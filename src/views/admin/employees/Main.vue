<script setup>
import MainPaginator from '@/components/paginator/MainPaginator.vue';
import EmployeeCard from '@/components/cards/EmployeeCard.vue';
import { reactive, ref } from 'vue';
import store from '@/store';

const items = ref([]),
  paginator = ref(null),
  form = reactive({});

function setItems(val) {
  items.value = val;
}

function search() {
  paginator.value.paginate(1);
}

function setAdminEmployee(item) {
  store.commit('adminEmployee/setAdminEmployee', item);
}
</script>

<template>
  <div>
    <div class="grid sm:grid-cols-10 mt-5 items-center">
      <div class="col-span-1">
        <h2 class="text-lg font-medium">Employees List</h2>
      </div>
      <div class="col-auto">
        <router-link
          to="/admin/employees/add-exist"
          class="btn btn-primary w-36"
        >
          Add Employee
        </router-link>
      </div>
    </div>

    <!-- BEGIN: Data List -->
    <div
      class="intro-y grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-5 pt-5 border-t border-theme-5"
    >
      <router-link
        v-for="(item, index) in items"
        :key="index"
        class="intro-y block"
        :to="`employees/${item.id}`"
        @click="setAdminEmployee(item)"
      >
        <EmployeeCard :employee="item" />
      </router-link>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <MainPaginator
      class="mt-5"
      dispatcher="adminEmployee/fetchAdminEmployees"
      ref="paginator"
      @setItems="setItems($event)"
      :form="form"
    />
    <!-- END: Pagination -->
  </div>
</template>
