<template>
  <div v-if="getSelectedMenuId">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-10">
      <h2 class="text-lg font-medium mr-auto">Categories List</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary mr-3" @click="addModifierType">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Modifier Type
        </button>
        <button class="btn btn-primary" @click="addModifierItem">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Modifier Item
        </button>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <th class="whitespace-nowrap">NAME</th>
            <th class="whitespace-nowrap">REQUIRED</th>
            <th class="whitespace-nowrap">AVAILABLE</th>
            <th class="whitespace-nowrap">DEFAULT</th>
            <th class="whitespace-nowrap">SINGLE / MULTI CHOICE</th>
            <th class="whitespace-nowrap">PRICE</th>
            <th class="whitespace-nowrap text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in items" :key="index">
            <tr class="-intro-y zoom-in">
              <!-- <ChevronRightIcon
                class="hover:text-theme-9"
                :class="{
                  'transform rotate-90 duration-300': isVisibleChildren(item.id),
                  'transform rotate-0 duration-300': !isVisibleChildren(item.id),
                }"
              />-->
              <td
                class="flex items-center gap-3 hover:text-theme-9"
                @click="toggleChildren(item.id)"
              >
                <PlusIcon v-if="!isVisibleChildren(item.id)" />
                <MinusIcon v-if="isVisibleChildren(item.id)" />
                <p class="font-medium whitespace-nowrap">{{ item.name }}</p>
              </td>
              <td>{{ getYesNo(item.required) }}</td>
              <td>{{ getYesNo(item.available) }}</td>
              <td />
              <td>{{ item.is_single ? "SINGLE" : "MULTI" }}</td>
              <td />
              <td class="table-report__action w-10">
                <div class="flex justify-end items-end">
                  <Edit2Icon
                    @click="editModifierType(item)"
                    class="hover:text-theme-12"
                  />
                  <DeleteConfirmModal
                    @onConfirmedDelete="deleteType(item.id)"
                    :isIcon="true"
                    :modalId="`modifier-type-delete-modal-${item.id}`"
                  />
                </div>
              </td>
            </tr>
            <tr
              class="-intro-y inner-tr"
              v-for="(el, i) in item.items"
              :key="i"
              v-show="isVisibleChildren(item.id)"
            >
              <td>
                <a
                  href
                  class="font-medium whitespace-nowrap ml-10"
                >{{ el.name }}</a>
              </td>
              <td>{{ getYesNo(item.required) }}</td>
              <td>{{ getYesNo(item.available) }}</td>
              <td>{{ getYesNo(el.default) }}</td>
              <td>{{ item.is_single ? "SINGLE" : "MULTI" }}</td>
              <td>{{ el.price }}</td>
              <td class="table-report__action w-10">
                <div class="flex">
                  <Edit2Icon
                    @click="editModifierItem(el)"
                    class="hover:text-theme-12"
                  />
                  <DeleteConfirmModal
                    @onConfirmedDelete="deleteItem(el.id)"
                    :isIcon="true"
                    :modalId="`modifier-delete-modal-${item.id}-${el.id}`"
                  />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
        <!-- <ModifierDraggable :items="items" @action:delete-type="search" /> -->
      </table>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <MainPaginator
      v-if="getSelectedMenuId"
      class="mt-5"
      dispatcher="fetchModifierTypes"
      ref="paginator"
      @setItems="setItems($event)"
      :form="form"
    />
    <ModifierTypeModalForm
      :dispatcher="typeDispatcher"
      :modalId="typeModalId"
      :ref="typeModalId"
      @submitted="search"
    />
    <ModifierModalForm
      :dispatcher="itemDispatcher"
      :modalId="itemModalId"
      :ref="itemModalId"
      @submitted="search"
    />
    <!-- END: Pagination -->
  </div>
  <div
    v-else
    class="text-base text-center mt-10 text-gray-600"
  >For showing Categories Please select Menu</div>
</template>

<script >
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import MainPaginator from '../paginator/MainPaginator.vue'
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import ModifierTypeModalForm from '../forms/ModifierTypeModalForm.vue';
import ModifierModalForm from '../forms/ModifierModalForm.vue';
import Draggable from "vuedraggable";
import ModifierDraggable from './ModifierDraggable.vue';
import DraggableTable from './DraggableTable.vue';

export default defineComponent({
  data() {
    return {
      items: [],
      form: {},
      showChildren: [],
      typeModalId: "type-modal-id",
      typeAddDispatcher: 'postModifierType',
      typeEditDispatcher: 'putModifierType',
      typeDispatcher: "postModifierType",
      itemModalId: "item-modal-id",
      itemAddDispatcher: 'postModifier',
      itemEditDispatcher: 'putModifier',
      itemDispatcher: "postModifier"
    };
  },
  methods: {
    paginate(val) {
      this.items = val;
    },
    search() {
      this.$refs.paginator?.paginate(1);
    },
    setItems(val) {
      this.items = val
      this.showChildren = val.map(item => {
        if (item.items.length > 0) return item.id
      });
    },
    async deleteItem(val) {
      this.$store.commit('setLoadingStatus', true);
      const res = await this.$store.dispatch('deleteModifier', val);
      if (res.status) {
        this.$store.commit('setSuccessNotification', true);
        this.search();
      } else {
        this.$store.commit('setErrorNotification', true);
      }
      this.$store.commit('setLoadingStatus', false);
    },
    async deleteType(val) {
      this.$store.commit('setLoadingStatus', true);
      const res = await this.$store.dispatch('deleteModifierType', val);
      if (res.status) {
        this.$store.commit('setSuccessNotification', true);
        this.search();
      } else {
        this.$store.commit('setErrorNotification', true);
      }
      this.$store.commit('setLoadingStatus', false);
    },
    toggleChildren(val) {
      if (this.isVisibleChildren(val)) {
        delete this.showChildren[this.showChildren.indexOf(val)];
      } else {
        this.showChildren.push(val);
      }
    },
    isVisibleChildren(val) {
      return this.showChildren.includes(val)
    },
    getYesNo(val) {
      return val ? "YES" : "NO";
    },
    addModifierType() {
      this.typeDispatcher = this.typeAddDispatcher;
      this.$refs[this.typeModalId].showModal({});
    },
    editModifierType(val) {
      this.typeDispatcher = this.typeEditDispatcher;
      this.$refs[this.typeModalId].showModal({ ...val });
    },
    addModifierItem() {
      this.itemDispatcher = this.itemAddDispatcher;
      this.$refs[this.itemModalId].showModal({});
    },
    editModifierItem(val) {
      this.itemDispatcher = this.itemEditDispatcher;
      this.$refs[this.itemModalId].showModal({ ...val });
    }
  },
  computed: {
    ...mapGetters(['getSelectedMenuId'])
  },

  components: { MainPaginator, DeleteConfirmModal, ModifierTypeModalForm, ModifierModalForm, Draggable, ModifierDraggable, DraggableTable }
});
</script>

<style lang="scss" scoped>
.dark .inner-tr td {
  background-color: #1e2533 !important;
}
.inner-tr td {
  background-color: #dfdfdf !important;
}
</style>
