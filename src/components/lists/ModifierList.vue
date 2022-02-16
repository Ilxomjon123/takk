<template>
  <div v-if="getSelectedModifierTypeId != null">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-10">
      <h2 class="text-lg font-medium mr-auto">Modifiers List</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary" @click="addModifier">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Modifier
        </button>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <!-- <th class="whitespace-nowrap"></th> -->
            <!-- <th class="whitespace-nowrap">Rank</th> -->
            <!-- <th class="whitespace-nowrap">ID</th> -->
            <th class="whitespace-nowrap">NAME</th>
            <th class="whitespace-nowrap">PRICE</th>
            <th class="whitespace-nowrap text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="-intro-y"
            v-for="(item, index) in getModifiers"
            :key="index"
          >
            <td>
              <a href class="font-medium whitespace-nowrap">{{ item.name }}</a>
            </td>
            <td>
              <div
                class="text-gray-600 text-xs whitespace-nowrap mt-0.5"
              >{{ item.price }}</div>
            </td>
            <td class="table-report__action w-10">
              <div class="flex justify-end items-end">
                <a @click="editModifier(item)">
                  <Edit2Icon class="hover:text-theme-12" />
                </a>
                <TrashIcon
                  class="hover:text-theme-6"
                  @click="selectItem(item)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="getModifiers.length == 0"
        class="text-base text-center mt-10 text-gray-600"
      >No Data</div>
    </div>
    <!-- END: Data List -->
  </div>
  <div
    v-else
    class="text-base text-center mt-10 text-gray-600"
  >For showing Modifiers Please select Modifier Type</div>
  <ModifierModalForm
    :dispatcher="dispatcher"
    :modalId="modalId"
    :ref="modalId"
    @submitted="refresh($event)"
  />
  <DeleteConfirmModal2
    @onConfirmedDelete2="deleteItem"
    :modalId="deleteModalId"
    :ref="deleteModalId"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import ModifierModalForm from '../forms/ModifierModalForm.vue';
import DeleteConfirmModal2 from '../modals/DeleteConfirmModal2.vue';

export default defineComponent({
  data() {
    return {
      modalId: "modifier-modal-form",
      deleteModalId: "modifier-delete-modal",
      dispatcher: "postModifier",
      addDispatcher: "postModifier",
      editDispatcher: "putModifier",
      selectedItem: {}
    };
  },
  methods: {
    refresh(val) {
      let items;
      switch (val?.type) {
        case 'add':
          items = this.getModifiers;
          items.push(val)
          break;
        case 'edit':
          items = this.getModifiers.filter(item => item.id != val.id);
          items.push(val)
          break;
        case 'delete':
          items = this.getModifiers.filter(item => item.id != val.id);
          break;
      }
      this.$store.commit('setModifiers', items)
    },
    addModifier() {
      this.dispatcher = this.addDispatcher;
      this.$refs[this.modalId].showModal({});
    },
    editModifier(val) {
      console.log("edit:", val);
      this.dispatcher = this.editDispatcher;
      this.$refs[this.modalId].showModal({ ...val });
    },
    async deleteItem() {
      const val = this.selectedItem;
      this.$store.commit('setLoadingStatus', true);
      const res = await this.$store.dispatch('deleteModifier', val.id);
      if (res.status) {
        this.$store.commit('setSuccessNotification', true);
        this.refresh({ type: 'delete', ...val });
      } else {
        this.$store.commit('setErrorNotification', true);
      }
      this.$store.commit('setLoadingStatus', false);
    },
    selectItem(val) {
      this.selectedItem = val;
      this.$refs[this.deleteModalId].showModal();
    }
  },
  computed: {
    ...mapGetters(['getSelectedModifierTypeId', 'getModifiers'])
  },

  components: { ModifierModalForm, DeleteConfirmModal2 }
})
</script>
