<template>
  <div v-if="getSelectedMenuId != null">
    <div>
      <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Modifier Types List</h2>
        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
          <button class="btn btn-primary" @click="addModifierType">
            <span class="w-5 h-5 flex items-center justify-center">
              <PlusIcon class="w-4 h-4" /> </span
            >Add Modifier Type
          </button>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-5 mt-5">
        <div
          class="col-span-12 sm:col-span-4 xl:col-span-3 2xl:col-span-2 box p-5 cursor-pointer zoom-in"
          v-for="(item, index) in items"
          :key="index"
          :class="
            item.id == getSelectedModifierTypeId
              ? 'bg-theme-1 dark:bg-theme-1 text-white'
              : ''
          "
          @click="selectModifierType(item)"
        >
          <div class="flex col-span-12 w-full">
            <div class="mr-auto font-medium text-base">{{ item.name }}</div>
            <div class="flex">
              <Edit2Icon
                @click="editModifierType(item)"
                class="hover:text-theme-12"
              />
              <TrashIcon
                class="hover:text-theme-6"
                @click="onDeleteAction(item)"
              />
            </div>
            <!-- <TrashIcon @click="editModifierType(item)" class="hover:text-theme-6" /> -->
          </div>
          <div class="flex">
            <!-- <div
            class="mr-auto text-gray-600"
            >{{ subItemTitle + ": " + item[subItemValue] }}</div>-->
          </div>
        </div>
      </div>

      <!-- BEGIN: Pagination -->
      <MainPaginator
        class="mt-5"
        dispatcher="fetchModifierTypes"
        ref="paginator"
        @setItems="setItems($event)"
        :form="paginationForm"
      />
      <!-- END: Pagination -->
    </div>
    <ModifierTypeModalForm
      :dispatcher="dispatcher"
      :modalId="modalId"
      :ref="modalId"
      @submitted="search"
    />
    <ConfirmDeletionModal
      @confirm="deleteItem"
      :modal-id="deleteModalId"
      :ref="deleteModalId"
    />
  </div>
  <div v-else class="text-base text-center mt-10 text-gray-600">
    For showing Modifiers Types Please select Menu
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MainPaginator from '../paginator/MainPaginator.vue';
import MenuModalForm from '../forms/MenuModalForm.vue';
import { mapGetters } from 'vuex';
import ModifierTypeModalForm from '../forms/ModifierTypeModalForm.vue';
import ConfirmDeletionModal from '../modals/ConfirmDeletionModal.vue';
export default defineComponent({
  components: {
    MainPaginator,
    MenuModalForm,
    ModifierTypeModalForm,
    ConfirmDeletionModal
  },
  data() {
    return {
      paginationForm: {},
      items: [],
      dispatcher: 'postModifierType',
      modalId: 'modifier-form-modal',
      deleteModalId: 'modifier-type-delete-modal',
      addDispatcher: 'postModifierType',
      editDispatcher: 'putModifierType',
      successMessage: 'Successfully Deleted!',
      loadingDelete: {},
      selectedItem: {}
    };
  },
  emits: ['update-modifier-type-id'],
  computed: {
    ...mapGetters(['getSelectedMenuId', 'getSelectedModifierTypeId'])
  },
  methods: {
    paginate(val) {
      this.items = val;
    },
    search() {
      this.selectModifierType(null);
      this.$refs.paginator.paginate(1);
    },
    setItems(val) {
      this.items = val;
    },
    selectModifierType(val) {
      if (val?.id != this.setSelectedModifierTypeId?.id) {
        this.$store.commit('setSelectedModifierTypeId', val?.id);
        this.$emit('update-modifier-type-id', val);
      }
    },
    addModifierType() {
      this.dispatcher = this.addDispatcher;
      this.$refs[this.modalId].showModal({});
    },
    editModifierType(val) {
      this.dispatcher = this.editDispatcher;
      this.$refs[this.modalId].showModal(val);
    },
    async deleteItem() {
      const val = this.selectedItem?.id;
      this.$store.commit('setLoadingStatus', true);

      this.selectModifierType(null);
      const res = await this.$store.dispatch('deleteModifierType', val);
      if (res.status) {
        this.successMessage = 'Successfully Deleted!';
        this.$store.commit('setSuccessNotification', true);
        this.search();
      } else {
        this.$store.commit('setErrorNotification', true);
      }
      this.$store.commit('setLoadingStatus', false);
    },
    onDeleteAction(val) {
      this.selectedItem = val;
      this.$refs[this.deleteModalId].showModal();
    }
  }
});
</script>
