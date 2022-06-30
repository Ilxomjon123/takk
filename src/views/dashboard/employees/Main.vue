<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium">Employees List</h2>
      <!-- <div class="dropdown inline-block" data-placement="right-start">
        <button class="dropdown-toggle" aria-expanded="false">
          <MoreVerticalIcon />
        </button>
        <div class="dropdown-menu w-48">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <router-link to="/dashboard/employees/add-new" data-dismiss="dropdown"
              class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
              <UserPlusIcon class="w-4 h-4 mr-2" />Add New User
            </router-link>
            <router-link to="/dashboard/employees/add-exist" data-dismiss="dropdown"
              class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
              <UserCheckIcon class="w-4 h-4 mr-2" />Add Existing User
            </router-link>

          </div>
        </div>
      </div> -->
      <div class="w-full sm:w-auto flex mt-4 ml-2 sm:mt-0">
        <router-link to="/dashboard/employees/add-new" class="btn btn-primary mr-3">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add New User
        </router-link>
        <router-link to="/dashboard/employees/add-exist" class="btn btn-success">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Existing User
        </router-link>
      </div>
    </div>

    <!-- BEGIN: Data List -->
    <div class="intro-y grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-5">
      <router-link v-for="(item, index) in items" :key="index"
        class="intro-y block col-span-12 sm:col-span-4 xl:col-span-3 2xl:col-span-2" :to="`employees/${item.id}`"
        @click="setEmployee(item)">
        <EmployeeCard :employee="item" />
      </router-link>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <MainPaginator class="mt-5" dispatcher="fetchEmployees" ref="paginator" @setItems="setItems($event)" :form="form" />
    <!-- END: Pagination -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MainPaginator from '../../../components/paginator/MainPaginator.vue'
import EmployeeCard from '../../../components/cards/EmployeeCard.vue'

export default defineComponent({
  components: { MainPaginator, EmployeeCard },
  data() {
    return {
      items: [],
      form: {}
    }
  },
  methods: {
    setItems(val) {
      this.items = val
    },
    search() {
      this.$refs.paginator.paginate(1)
    },
    setEmployee(item) {
      this.$store.commit('setEmployee', item);
    }
  }
})
</script>
