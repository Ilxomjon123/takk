<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Menus List</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <a class="btn btn-primary mr-3" href="javascript:;" @click="addMenu">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Menu
        </a>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <div
        class="col-span-12 sm:col-span-4 xl:col-span-3 2xl:col-span-2 box p-5 cursor-pointer zoom-in"
        v-for="(item, index) in items"
        :key="index"
        :class="item.id == getSelectedMenuId ? 'bg-theme-1 dark:bg-theme-1 text-white' : ''"
        @click="selectMenu(item.id)"
      >
        <div class="flex">
          <div class="mr-auto font-medium text-base">{{ item.name }}</div>
          <Edit2Icon @click="editMenu(item)" class="hover:text-theme-12" />
          <DeleteConfirmModal
            @onConfirmedDelete="deleteMenu(item.id)"
            :isIcon="true"
          />
          <!-- <TrashIcon @click="editMenu(item)" class="hover:text-theme-6" /> -->
        </div>
        <div class="flex">
          <div
            class="mr-auto text-gray-600"
          >{{ subItemTitle + ": " + item[subItemValue] }}</div>
        </div>
      </div>
    </div>

    <!-- BEGIN: Pagination -->
    <MainPaginator
      class="mt-5"
      dispatcher="fetchMenus"
      ref="paginator"
      @setItems="setItems($event)"
      :form="paginationForm"
    />
    <!-- END: Pagination -->
  </div>
  <MenuModalForm
    :dispatcher="dispatcher"
    :modalId="modalId"
    :ref="modalId"
    @submitted="search"
  />
  <SuccessNotification ref="successNotification" :message="successMessage" />
  <ErrorNotification ref="errorNotification" />
</template>

<script>
import { defineComponent } from 'vue'
import MainPaginator from '../paginator/MainPaginator.vue'
import MenuModalForm from '../forms/MenuModalForm.vue'
import { mapGetters } from 'vuex'
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue'
import SuccessNotification from '../notifications/SuccessNotification.vue'
import ErrorNotification from '../notifications/ErrorNotification.vue'
export default defineComponent({
  props: {
    subItemTitle: String,
    subItemValue: String
  },
  components: {
    MainPaginator,
    MenuModalForm,
    DeleteConfirmModal,
    SuccessNotification,
    ErrorNotification
  },
  data() {
    return {
      paginationForm: {},
      items: [],
      dispatcher: 'postMenu',
      modalId: 'menu-form-modal',
      addDispatcher: 'postMenu',
      editDispatcher: 'putMenu',
      successMessage: 'Successfully Deleted!',
      loadingDelete: {}
    }
  },
  computed: {
    ...mapGetters(['getSelectedMenuId'])
  },
  methods: {
    paginate(val) {
      this.items = val
    },
    search() {
      this.selectMenu(null);
      this.$refs.paginator.paginate(1)
    },
    setItems(val) {
      this.items = val;
    },
    selectMenu(val) {
      if (val != this.getSelectedMenuId) {
        this.$store.commit('setSelectedMenuId', val);
        this.$emit('update-id', val);
      }
    },
    addMenu() {
      this.dispatcher = this.addDispatcher;
      this.$refs[this.modalId].showModal({});
    },
    editMenu(val) {
      this.dispatcher = this.editDispatcher;
      this.$refs[this.modalId].showModal(val);
    },
    async deleteMenu(val) {
      this.selectMenu(null);
      const res = await this.$store.dispatch('deleteMenu', val);
      if (res.status) {
        this.successMessage = 'Successfully Deleted!'
        this.$refs.successNotification.show();
        this.search();
      } else {
        this.$refs.errorNotification.show();
      }
    }
  }
});
</script>