<template>
  <div>
    <div v-if="getSelectedMenuId">
      <div
        class="grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mt-10 items-center"
      >
        <div class="col-span-1">
          <h2 class="text-lg font-medium">Modifiers List</h2>
        </div>
        <div class="col-auto flex gap-2 whitespace-nowrap">
          <button
            @click="addModifierType"
            class="btn btn-primary w-36"
            data-toggle="dropdown"
          >
            Add Modifier Type
          </button>
          <button
            @click="addModifierItem"
            class="btn btn-success"
            data-toggle="dropdown"
          >
            Add Modifier Item
          </button>
          <div class="dropdown inline-block" data-placement="right-start">
            <button
              class="btn btn-primary dropdown-toggle"
              aria-expanded="false"
            >
              Reorder
            </button>
            <div class="dropdown-menu w-fit">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <button
                  @click="reorderModifierType"
                  class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md w-full"
                  data-toggle="dropdown"
                  :disabled="items.length < 2"
                >
                  <ShuffleIcon class="w-4 h-4 mr-3" />
                  <span class="whitespace-nowrap"> Reorder Modifier Type </span>
                </button>
                <button
                  @click="reorderModifierItem"
                  class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md w-full cursor-pointer disabled:cursor-not-allowed"
                  data-toggle="dropdown"
                  :disabled="showChildren.length === 0"
                >
                  <ShuffleIcon class="w-4 h-4 mr-3" />
                  <span class="whitespace-nowrap"> Reorder Modifier Item </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
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
                  <div
                    class="flex items-center gap-3 hover:text-theme-9"
                    @click="toggleChildren(item.id)"
                  >
                    <MinusIcon v-if="isVisibleChildren(item.id)" />
                    <PlusIcon v-else />
                    {{ item.name }}
                  </div>
                </td>
                <td>{{ getYesNo(item.required) }}</td>
                <td>
                  <input
                    class="form-check-switch"
                    type="checkbox"
                    @change="typeAvailableChange(item)"
                    :checked="item.available"
                  />
                </td>
                <td />
                <td>{{ item.is_single ? 'SINGLE' : 'MULTI' }}</td>
                <td />
                <td class="table-report__action w-10">
                  <div
                    class="dropdown inline-block"
                    data-placement="right-start"
                  >
                    <button class="dropdown-toggle -mr-3" aria-expanded="false">
                      <MoreVerticalIcon />
                    </button>
                    <div class="dropdown-menu w-40">
                      <div class="box dark:bg-dark-1 p-2 flex flex-col gap-3">
                        <a
                          href="javascript:;"
                          @click="editModifierType(item)"
                          data-dismiss="dropdown"
                          class="hover:text-theme-6"
                        >
                          <Edit2Icon class="w-4 h-4 mr-2" />
                          <span>Edit</span>
                        </a>
                        <a
                          href="javascript:;"
                          @click="onTypeDeleteAction(item.id)"
                          data-dismiss="dropdown"
                          class="hover:text-theme-6"
                        >
                          <TrashIcon class="w-4 h-4 mr-2" />
                          <span>Delete</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr
                class="inner-tr"
                v-for="(el, i) in item.items"
                :key="i"
                v-show="isVisibleChildren(item.id)"
              >
                <td>
                  <span class="font-medium whitespace-nowrap ml-10">{{
                    el.name
                  }}</span>
                </td>
                <td>{{ getYesNo(item.required) }}</td>
                <td>
                  <input
                    class="form-check-switch"
                    type="checkbox"
                    @change="itemAvailableChange({ ...el, modifier: item.id })"
                    :checked="el.available"
                  />
                  <!-- {{ getYesNo(item.available) }} -->
                </td>
                <td>{{ getYesNo(el.default) }}</td>
                <td>{{ item.is_single ? 'SINGLE' : 'MULTI' }}</td>
                <td>{{ el.price }}</td>
                <td class="table-report__action w-10">
                  <div
                    class="dropdown inline-block"
                    data-placement="right-start"
                  >
                    <button class="dropdown-toggle -mr-3" aria-expanded="false">
                      <MoreVerticalIcon />
                    </button>
                    <div class="dropdown-menu w-40">
                      <div class="box dark:bg-dark-1 p-2 flex flex-col gap-3">
                        <!-- <a
                          @click="editModifierItem(el, item.id)"
                          data-dismiss="dropdown"
                          class="flex cursor-pointer items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <Edit2Icon class="w-4 h-4 mr-2" />Edit
                        </a>
                        <a
                          data-dismiss="dropdown"
                          class="flex cursor-pointer items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <DeleteConfirmModal
                            @onConfirmedDelete="deleteItem(el.id)"
                            :isIcon="true"
                            :modalId="`modifier-delete-modal-${item.id}-${el.id}`"
                            iconClass="w-4 h-4 mr-2"
                          />
                        </a> -->
                        <a
                          href="javascript:;"
                          @click="editModifierItem(el, item.id)"
                          data-dismiss="dropdown"
                          class="hover:text-theme-6"
                        >
                          <Edit2Icon class="w-4 h-4 mr-2" />
                          <span>Edit</span>
                        </a>
                        <a
                          href="javascript:;"
                          @click="onItemDeleteAction(el.id)"
                          data-dismiss="dropdown"
                          class="hover:text-theme-6"
                        >
                          <TrashIcon class="w-4 h-4 mr-2" />
                          <span>Delete</span>
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
      <MainPaginator
        v-if="getSelectedMenuId"
        class="mt-5"
        dispatcher="fetchModifierTypes"
        ref="paginator"
        @setItems="setItems($event)"
        :form="form"
      />
      <!-- END: Pagination -->
    </div>
    <div v-else class="text-base text-center mt-10 text-gray-600">
      For showing Categories Please select Menu
    </div>

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

    <DraggableTypeModal
      :list="items"
      :paginator="{ ...$refs.paginator?.paginator }"
    />
    <DraggableItemModal
      :list="
        items.find(
          (item) => showChildren.length > 0 && item.id == showChildren[0]
        )?.items
      "
    />
    <ConfirmDeletionModal
      modal-id="confirm-modifier-type-deletion-modal"
      @confirm="deleteType"
    />
    <ConfirmDeletionModal
      modal-id="confirm-modifier-item-deletion-modal"
      @confirm="deleteItem"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import MainPaginator from '../paginator/MainPaginator.vue';
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import ModifierTypeModalForm from '../forms/ModifierTypeModalForm.vue';
import ModifierModalForm from '../forms/ModifierModalForm.vue';
import DraggableTypeModal from '@/views/dashboard/modifiers/DraggableTypeModal.vue';
import DraggableItemModal from '@/views/dashboard/modifiers/DraggableItemModal.vue';
import cash from 'cash-dom';
import ConfirmDeletionModal from '../modals/ConfirmDeletionModal.vue';
import { useNotyf } from '@/composables/useNotyf';

const notyf = useNotyf();

export default defineComponent({
  props: {
    withAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [],
      form: {},
      showChildren: [],
      typeModalId: 'type-modal-id',
      typeAddDispatcher: 'postModifierType',
      typeEditDispatcher: 'putModifierType',
      typeDispatcher: 'postModifierType',
      itemModalId: 'item-modal-id',
      itemAddDispatcher: this.withAdmin
        ? 'adminModifier/postModifier'
        : 'postModifier',
      itemEditDispatcher: 'putModifier',
      itemDispatcher: 'postModifier',
      deleteModalId: 'modifier-type-delete-modal',
      selectedModifierItemId: null,
      selectedModifierTypeId: null,
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
      this.items = val;
      // this.showChildren = val.map(item => {
      //   if (item.items.length > 0) return item.id
      // });
    },

    async deleteItem() {
      try {
        const deleteAction = this.withAdmin
          ? 'adminModifier/deleteModifier'
          : 'deleteModifier';
        const res = await this.$store.dispatch(
          deleteAction,
          this.selectedModifierItemId
        );

        notyf.success('Record deleted successfully!');
        this.search();
      } catch (error) {
        notyf.error('Error while deleting record: ' + error.message);
      }
    },

    async deleteType() {
      try {
        const deleteAction = this.withAdmin
          ? 'adminModifier/deleteModifierType'
          : 'deleteModifierType';
        const res = await this.$store.dispatch(
          deleteAction,
          this.selectedModifierTypeId
        );
        notyf.success('Record deleted successfully!');
        this.search();
      } catch (error) {
        notyf.error('Error while deleting record');
      }
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
      this.isVisibleChildren(valId)
        ? (this.showChildren = [])
        : (this.showChildren = [valId]);
    },
    isVisibleChildren(val) {
      return this.showChildren.includes(val);
    },
    getYesNo(val) {
      return val ? 'YES' : 'NO';
    },
    addModifierType() {
      this.typeDispatcher = this.withAdmin
        ? 'adminModifier/' + this.typeAddDispatcher
        : this.typeAddDispatcher;
      this.$refs[this.typeModalId].showModal({});
    },
    editModifierType(val) {
      this.typeDispatcher = this.withAdmin
        ? 'adminModifier/' + this.typeEditDispatcher
        : this.typeEditDispatcher;
      this.$refs[this.typeModalId].showModal({ ...val });
    },
    addModifierItem() {
      this.itemDispatcher = this.withAdmin
        ? 'adminModifier/' + this.itemAddDispatcher
        : this.itemAddDispatcher;
      this.$refs[this.itemModalId].showModal({});
    },
    editModifierItem(val, typeId) {
      this.itemDispatcher = this.withAdmin
        ? 'adminModifier/' + this.itemEditDispatcher
        : this.itemEditDispatcher;
      this.$refs[this.itemModalId].showModal({ ...val, modifier: typeId });
    },
    reorderModifierType() {
      cash('#draggable-modifier-type-modal').modal('show');
    },
    reorderModifierItem() {
      cash('#draggable-modifier-item-modal').modal('show');
    },
    onTypeDeleteAction(val) {
      this.selectedModifierTypeId = val;
      cash('#confirm-modifier-type-deletion-modal').modal('show');
    },
    onItemDeleteAction(val) {
      this.selectedModifierItemId = val;
      cash('#confirm-modifier-item-deletion-modal').modal('show');
    },
  },
  computed: {
    ...mapGetters(['getSelectedMenuId']),
  },

  components: {
    MainPaginator,
    DeleteConfirmModal,
    ModifierTypeModalForm,
    ModifierModalForm,
    DraggableTypeModal,
    DraggableItemModal,
    ConfirmDeletionModal,
  },
});
</script>

<style lang="scss" scoped>
.dark .inner-tr td {
  background-color: #1e2533 !important;
}

.inner-tr td {
  background-color: #dfdfdf !important;
}

.zoom-in {
  &:hover {
    @apply scale-[1.01] shadow-xl;
  }
}
</style>
