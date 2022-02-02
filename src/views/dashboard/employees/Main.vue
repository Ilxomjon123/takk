<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Employees List</h2>

    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <router-link to="employees/add-new" class="btn btn-primary mr-3">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add New User
        </router-link>
        <router-link
          to="/dashboard/employees/add-existing"
          class="btn btn-success"
        >
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Existing User
        </router-link>
        <!-- <div class="dropdown">
          <button
            class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
            aria-expanded="false"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <PlusIcon class="w-4 h-4" />
            </span>
          </button>
          <div class="dropdown-menu w-40">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
              <a
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <PlusIcon class="w-4 h-4 mr-2" />New User
              </a>
              <a
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <PlusIcon class="w-4 h-4 mr-2" />Exiscting User
              </a>
            </div>
          </div>
        </div>-->
      </div>
    </div>

    <!-- BEGIN: Data List -->
    <div
      class="intro-y grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-5"
    >
      <router-link
        v-for="(item, index) in items"
        :key="index"
        class="intro-y block col-span-12 sm:col-span-4 2xl:col-span-3"
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
      @paginate="paginate($event)"
      :form="form"
    />
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
    paginate(val) {
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
