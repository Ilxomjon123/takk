<script setup>
import { computed, reactive, ref } from 'vue';
import store from '@/store';
import cash from 'cash-dom';
import { useNotyf } from '@/composables/useNotyf';
import MainPaginator from '../paginator/MainPaginator.vue';
import ModifierTypeModalForm from '../forms/ModifierTypeModalForm.vue';
import ModifierModalForm from '../forms/ModifierModalForm.vue';
import DraggableTypeModal from '@/views/dashboard/modifiers/DraggableTypeModal.vue';
import DraggableItemModal from '@/views/dashboard/modifiers/DraggableItemModal.vue';
import ConfirmDeletionModal from '../modals/ConfirmDeletionModal.vue';
import SearchProduct from '../forms/SearchProduct.vue';

const notyf = useNotyf();
const props = defineProps({
  withAdmin: {
    type: Boolean,
    default: false,
  },
});
const activeMenuID = computed(() => store.getters['getSelectedMenuId']);
const dispatcherAction = computed(() =>
  props.withAdmin ? 'adminModifier/fetchModifierTypes' : 'fetchModifierTypes'
);
const isLoading = ref(false);
const items = ref([]),
  form = reactive({}),
  showChildren = ref([]),
  typeModalId = ref(null),
  itemModalId = ref(null),
  typeAddDispatcher = ref('postModifierType'),
  typeEditDispatcher = ref('putModifierType'),
  typeDispatcher = ref('postModifierType'),
  itemAddDispatcher = computed(() =>
    props.withAdmin ? 'adminModifier/postModifier' : 'postModifier'
  ),
  itemEditDispatcher = ref('putModifier'),
  itemDispatcher = ref('postModifier'),
  selectedModifierItemId = ref(null),
  selectedModifierTypeId = ref(null),
  paginator = ref(null);

const search = () => {
    paginator.value?.paginate(1);
  },
  setItems = (val) => {
    items.value = val;
  },
  deleteItem = async () => {
    try {
      const deleteAction = props.withAdmin
        ? 'adminModifier/deleteModifier'
        : 'deleteModifier';
      const res = await store.dispatch(
        deleteAction,
        selectedModifierItemId.value
      );

      notyf.success('Record deleted successfully!');
      search();
    } catch (error) {
      notyf.error('Error while deleting record: ' + error.message);
    }
  },
  deleteType = async () => {
    try {
      const deleteAction = props.withAdmin
        ? 'adminModifier/deleteModifierType'
        : 'deleteModifierType';
      const res = await store.dispatch(
        deleteAction,
        selectedModifierTypeId.value
      );
      notyf.success('Record deleted successfully!');
      search();
    } catch (error) {
      notyf.error('Error while deleting record');
    }
  },
  typeAvailableChange = async (val) => {
    val.available = !val.available;
    await store.dispatch(typeEditDispatcher.value, val);
  },
  itemAvailableChange = async (val) => {
    val.available = !val.available;
    await store.dispatch(itemEditDispatcher.value, val);
  },
  toggleChildren = (valId) => {
    isVisibleChildren(valId)
      ? (showChildren.value = [])
      : (showChildren.value = [valId]);
  },
  isVisibleChildren = (val) => showChildren.value.includes(val),
  getYesNo = (val) => (val ? 'YES' : 'NO'),
  addModifierType = () => {
    typeDispatcher.value = props.withAdmin
      ? 'adminModifier/' + typeAddDispatcher.value
      : typeAddDispatcher.value;
    typeModalId.value.showModal({});
  },
  editModifierType = (val) => {
    typeDispatcher.value = props.withAdmin
      ? 'adminModifier/' + typeEditDispatcher.value
      : typeEditDispatcher.value;
    typeModalId.value.showModal({ ...val });
  },
  addModifierItem = () => {
    itemDispatcher.value = props.withAdmin
      ? 'adminModifier/' + itemAddDispatcher.value
      : itemAddDispatcher.value;
    itemModalId.value.showModal({});
  },
  editModifierItem = (val, typeId) => {
    itemDispatcher.value = props.withAdmin
      ? 'adminModifier/' + itemEditDispatcher.value
      : itemEditDispatcher.value;
    itemModalId.value.showModal({ ...val, modifier: typeId });
  },
  reorderModifierType = () => {
    cash('#draggable-modifier-type-modal').modal('show');
  },
  reorderModifierItem = () => {
    cash('#draggable-modifier-item-modal').modal('show');
  },
  onTypeDeleteAction = (val) => {
    selectedModifierTypeId.value = val;
    cash('#confirm-modifier-type-deletion-modal').modal('show');
  },
  onItemDeleteAction = (val) => {
    selectedModifierItemId.value = val;
    cash('#confirm-modifier-item-deletion-modal').modal('show');
  };

async function handleSearchEvent(value) {
  isLoading.value = true;
  const fetchList = props.withAdmin
    ? 'adminModifier/fetchModifierTypes'
    : 'fetchModifierTypes';

  try {
    if (value.length === 0 || value.length > 2) {
      // const res = await store.dispatch(fetchList, {
      //   page: paginator.page,
      //   limit: paginator.limit,
      //   search: value,
      // });

      // setItems(res.results);
      // paginator.total = res.total_objects;
      form.search = value;
      await paginator.value.paginate(1, form);
    }
  } catch (error) {
    notyf.error('Error while fetching data list: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}

async function handleSearchSubmit(value) {
  isLoading.value = true;
  const fetchList = props.withAdmin
    ? 'adminModifier/fetchModifierTypes'
    : 'fetchModifierTypes';

  try {
    // const res = await store.dispatch(fetchList, {
    //   page: paginator.page,
    //   limit: paginator.limit,
    //   search: value,
    // });

    // setItems(res.results);
    // paginator.total = res.total_objects;
    form.search = value;
    await paginator.value.paginate(1, form);
  } catch (error) {
    notyf.error('Error while fetching data list: ' + error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <div v-if="activeMenuID">
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
        <!-- search input -->
        <SearchProduct
          class="md:col-start-4 lg:col-start-6 xl:col-start-8"
          :loading="isLoading"
          :is-disabled="!activeMenuID"
          @searching="handleSearchEvent"
          @search:manual="handleSearchSubmit"
        />
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
        v-if="activeMenuID"
        class="mt-5"
        :dispatcher="dispatcherAction"
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
      modalId="typeModalId"
      ref="typeModalId"
      @submitted="search"
    />
    <ModifierModalForm
      :dispatcher="itemDispatcher"
      modalId="itemModalId"
      ref="itemModalId"
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
