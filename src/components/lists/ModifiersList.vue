<template>
  <div v-if="getSelectedMenuId">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-10">
      <h2 class="text-lg font-medium">Modifiers List</h2>
      <div class="dropdown inline-block" data-placement="right-start">
        <button class="dropdown-toggle" aria-expanded="false">
          <MoreVerticalIcon />
        </button>
        <div class="dropdown-menu w-fit">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <button @click="reorderModifierType" class="btn whitespace-nowrap mb-2" data-toggle="dropdown"
              :disabled="items.length < 2">
              <span class="w-5 h-5 flex items-center justify-center">
                <ShuffleIcon class="w-4 h-4" />
              </span>Reorder Modifier Type
            </button>
            <button @click="reorderModifierItem" class="btn whitespace-nowrap mb-2" data-toggle="dropdown"
              :disabled="showChildren.length === 0">
              <span class="w-5 h-5 flex items-center justify-center">
                <ShuffleIcon class="w-4 h-4" />
              </span>Reorder Modifier Item
            </button>
            <button @click="addModifierType" class="btn whitespace-nowrap mb-2" data-toggle="dropdown">
              <span class="w-5 h-5 flex items-center justify-center">
                <PlusIcon class="w-4 h-4" />
              </span>Add Modifier Type
            </button>
            <button @click="addModifierItem" class="btn whitespace-nowrap mb-2" data-toggle="dropdown">
              <span class="w-5 h-5 flex items-center justify-center">
                <PlusIcon class="w-4 h-4" />
              </span>Add Modifier Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12">
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
            <tr class="zoom-in">
              <td>
                <div class="flex items-center gap-3 hover:text-theme-9" @click="toggleChildren(item.id)">
                  <PlusIcon v-if="!isVisibleChildren(item.id)" />
                  <MinusIcon v-if="isVisibleChildren(item.id)" />
                  {{ item.name }}
                </div>
              </td>
              <td>{{ getYesNo(item.required) }}</td>
              <td>
                <input class="form-check-switch" type="checkbox" @change="typeAvailableChange(item)"
                  :checked="item.available" />
              </td>
              <td />
              <td>{{ item.is_single ? "SINGLE" : "MULTI" }}</td>
              <td />
              <td class="table-report__action w-10">
                <div class="dropdown inline-block" data-placement="right-start">
                  <button class="dropdown-toggle -mr-3" aria-expanded="false">
                    <MoreVerticalIcon />
                  </button>
                  <div class="dropdown-menu w-40">
                    <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                      <a @click="editModifierType(item)" data-dismiss="dropdown"
                        class="flex cursor-pointer items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <Edit2Icon class="w-4 h-4 mr-2" />Edit
                      </a>
                      <a data-dismiss="dropdown"
                        class="flex cursor-pointer items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <DeleteConfirmModal @onConfirmedDelete="deleteType(item.id)" :isIcon="true"
                          :modalId="`modifier-type-delete-modal-${ item.id }`" iconClass="w-4 h-4 mr-2" />
                      </a>

                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="inner-tr" v-for="(el, i) in item.items" :key="i" v-show="isVisibleChildren(item.id)">
              <td>
                <span class="font-medium whitespace-nowrap ml-10">{{ el.name }}</span>
              </td>
              <td>{{ getYesNo(item.required) }}</td>
              <td>
                <input class="form-check-switch" type="checkbox"
                  @change="itemAvailableChange({ ...el, modifier: item.id })" :checked="el.available" />
                <!-- {{ getYesNo(item.available) }} -->
              </td>
              <td>{{ getYesNo(el.default) }}</td>
              <td>{{ item.is_single ? "SINGLE" : "MULTI" }}</td>
              <td>{{ el.price }}</td>
              <td class="table-report__action w-10">
                <div class="dropdown inline-block" data-placement="right-start">
                  <button class="dropdown-toggle -mr-3" aria-expanded="false">
                    <MoreVerticalIcon />
                  </button>
                  <div class="dropdown-menu w-40">
                    <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                      <a @click="editModifierItem(el, item.id)" data-dismiss="dropdown"
                        class="flex cursor-pointer items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <Edit2Icon class="w-4 h-4 mr-2" />Edit
                      </a>
                      <a data-dismiss="dropdown"
                        class="flex cursor-pointer items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <DeleteConfirmModal @onConfirmedDelete="deleteItem(el.id)" :isIcon="true"
                          :modalId="`modifier-delete-modal-${ item.id }-${ el.id }`" iconClass="w-4 h-4 mr-2" />
                      </a>

                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <MainPaginator v-if="getSelectedMenuId" class="mt-5" dispatcher="fetchModifierTypes" ref="paginator"
      @setItems="setItems($event)" :form="form" />
    <ModifierTypeModalForm :dispatcher="typeDispatcher" :modalId="typeModalId" :ref="typeModalId" @submitted="search" />
    <ModifierModalForm :dispatcher="itemDispatcher" :modalId="itemModalId" :ref="itemModalId" @submitted="search" />
    <!-- END: Pagination -->
  </div>
  <div v-else class="text-base text-center mt-10 text-gray-600">For showing Categories Please select Menu</div>
  <DraggableTypeModal :list="items" :paginator="{ ...$refs.paginator?.paginator }" />
  <DraggableItemModal :list="items.find(item => showChildren.length > 0 && item.id == showChildren[0])?.items" />
</template>

<script >
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import MainPaginator from '../paginator/MainPaginator.vue'
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import ModifierTypeModalForm from '../forms/ModifierTypeModalForm.vue';
import ModifierModalForm from '../forms/ModifierModalForm.vue';
import DraggableTypeModal from '../../views/dashboard/modifiers/DraggableTypeModal.vue';
import DraggableItemModal from '../../views/dashboard/modifiers/DraggableItemModal.vue';
import cash from 'cash-dom';

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
      // this.showChildren = val.map(item => {
      //   if (item.items.length > 0) return item.id
      // });
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
    async typeAvailableChange(val) {
      val.available = !val.available;
      await this.$store.dispatch(this.typeEditDispatcher, val);
    },
    async itemAvailableChange(val) {
      console.log(val);
      val.available = !val.available;
      await this.$store.dispatch(this.itemEditDispatcher, val);
    },
    toggleChildren(valId) {
      this.isVisibleChildren(valId) ?
        this.showChildren = [] :
        this.showChildren = [valId]
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
    editModifierItem(val, typeId) {
      this.itemDispatcher = this.itemEditDispatcher;
      this.$refs[this.itemModalId].showModal({ ...val }, typeId);
    },
    reorderModifierType() {
      cash('#draggable-modifier-type-modal').modal('show')
    },
    reorderModifierItem() {
      cash('#draggable-modifier-item-modal').modal('show')
    },
  },
  computed: {
    ...mapGetters(['getSelectedMenuId'])
  },

  components: {
    MainPaginator,
    DeleteConfirmModal,
    ModifierTypeModalForm,
    ModifierModalForm,
    DraggableTypeModal,
    DraggableItemModal
  }
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
