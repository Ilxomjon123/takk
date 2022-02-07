<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-10">
    <h2 class="text-lg font-medium mr-auto">Categories List</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <router-link
        :to="getSelectedMenuId != null ? `/dashboard/categories/${getSelectedMenuId}/add` : ''"
        class="btn btn-primary"
      >
        <span class="w-5 h-5 flex items-center justify-center">
          <PlusIcon class="w-4 h-4" />
        </span>Add Category
      </router-link>
    </div>
  </div>
  <!-- BEGIN: Data List -->
  <div class="intro-y col-span-12 overflow-auto">
    <table class="table table-report -mt-2">
      <thead>
        <tr>
          <!-- <th class="whitespace-nowrap"></th>
          <th class="whitespace-nowrap">Rank</th>-->
          <!-- <th class="whitespace-nowrap">ID</th> -->
          <th class="whitespace-nowrap">LOGO</th>
          <th class="whitespace-nowrap">NAME</th>
          <th class="whitespace-nowrap">PARENT</th>
          <th class="whitespace-nowrap">START</th>
          <th class="whitespace-nowrap">END</th>
          <th class="whitespace-nowrap text-right">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="intro-x">
          <td class="w-10">
            <div class="w-10 h-10 image-fit zoom-in">
              <img alt="Takk" class="rounded-full" :src="item.image" />
            </div>
          </td>
          <td>
            <a href class="font-medium whitespace-nowrap">{{ item.name }}</a>
            <div
              class="text-gray-600 text-xs whitespace-nowrap mt-0.5"
            >{{ item.category?.name }}</div>
          </td>
          <td>{{ item.parent }}</td>
          <td>{{ item.start }}</td>
          <td>{{ item.end }}</td>
          <td class="table-report__action w-10">
            <div class="flex justify-end items-end">
              <Edit2Icon @click="editMenu(item)" class="hover:text-theme-12" />
              <DeleteConfirmModal
                @onConfirmedDelete="deleteMenu(item.id)"
                :isIcon="true"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- END: Data List -->
  <!-- BEGIN: Pagination -->
  <MainPaginator
    v-if="getSelectedMenuId"
    class="mt-5"
    dispatcher="fetchCategories"
    ref="paginator"
    @setItems="setItems($event)"
    :form="form"
  />
  <!-- END: Pagination -->
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import MainPaginator from '../paginator/MainPaginator.vue'
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';

export default defineComponent({
  data() {
    return {
      items: [],
      form: {}
    };
  },
  methods: {
    paginate(val) {
      this.items = val;
    },
    search() {
      this.$refs.paginator?.paginate(1);
    },
    fetchData() {
      //
    },
    setItems(val) {
      this.items = val
    }
  },
  computed: {
    ...mapGetters(['getSelectedMenuId'])
  },

  components: { MainPaginator, DeleteConfirmModal }
})
</script>
