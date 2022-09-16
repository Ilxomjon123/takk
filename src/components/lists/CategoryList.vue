<script setup>
import { computed, reactive, ref, watch } from 'vue';
import cash from 'cash-dom';
import MainPaginator from '../paginator/MainPaginator.vue';
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import DraggableTypeModal from '@/views/dashboard/categories/DraggableTypeModal.vue';
import DraggableItemModal from '@/views/dashboard/categories/DraggableItemModal.vue';
import store from '@/store';

const items = ref([]);
const form = reactive({});
const showChildren = ref([]);
const paginator = ref(null);

const activeMenuID = computed(() => store.getters['getSelectedMenuId']);

watch(
  () => activeMenuID.value,
  (newVal) => {
    search();
  },
  { deep: true, immediate: true }
);

function paginate(val) {
  items.value = val;
}

function search() {
  paginator.value?.paginate(1);
}

function setItems(val) {
  items.value = val;
}

async function deleteItem(val) {
  const res = await store.dispatch('deleteCategory', val);

  if (res.status) {
    store.commit('setSuccessNotification', true);
    search();
  } else {
    store.commit('setErrorNotification', true);
  }
}

function toggleChildren(valId) {
  isVisibleChildren(valId)
    ? (showChildren.value = [])
    : (showChildren.value = [valId]);
}

function isVisibleChildren(val) {
  return showChildren.value.includes(val);
}

function reorderModifierType() {
  cash('#draggable-category-type-modal').modal('show');
}

function reorderModifierItem() {
  cash('#draggable-category-item-modal').modal('show');
}
</script>

<template>
  <div>
    <div v-if="activeMenuID != null">
      <div
        class="grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mt-10 gap-3 md:gap-0 items-center"
      >
        <div class="col-span-1">
          <h2 class="text-lg font-medium">Categories List</h2>
        </div>
        <router-link
          :to="`/dashboard/categories/${activeMenuID}/add`"
          class="btn btn-primary w-36 whitespace-nowrap"
        >
          Add Category
        </router-link>
        <div class="dropdown" data-placement="right-start">
          <button class="btn btn-primary dropdown-toggle" aria-expanded="false">
            <!-- <MoreVerticalIcon /> -->
            Reorder
          </button>
          <div class="dropdown-menu w-fit">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
              <button
                class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md w-full"
                @click="reorderModifierType"
                :disabled="items.length < 2"
                data-toggle="dropdown"
              >
                <ShuffleIcon class="w-4 h-4 mr-3" />
                <span class="whitespace-nowrap">Reorder Categories</span>
              </button>
              <button
                class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md w-full cursor-pointer disabled:cursor-not-allowed"
                @click="reorderModifierItem"
                :disabled="showChildren.length === 0"
                data-toggle="dropdown"
              >
                <ShuffleIcon class="w-4 h-4 mr-3" />
                <span class="whitespace-nowrap">Reorder Subcategories</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <!-- <th class="whitespace-nowrap"></th> -->
              <!-- <th class="whitespace-nowrap">Rank</th> -->
              <!-- <th class="whitespace-nowrap">ID</th> -->
              <th class="whitespace-nowrap">LOGO</th>
              <th class="whitespace-nowrap">NAME</th>
              <th class="whitespace-nowrap">PARENT CATEGORY</th>
              <th class="whitespace-nowrap">POSITION</th>
              <th class="whitespace-nowrap">START</th>
              <th class="whitespace-nowrap">END</th>
              <th class="whitespace-nowrap text-right w-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in items" :key="index">
              <tr class="zoom-in">
                <!-- <td class="w-0">{{ item.position }}</td> -->
                <td class="w-1/12">
                  <div class="w-10 h-10 image-fit zoom-in">
                    <img alt="Takk" class="rounded-full" :src="item.image" />
                  </div>
                </td>
                <td class="hover:text-theme-9" @click="toggleChildren(item.id)">
                  <PlusIcon v-if="!isVisibleChildren(item.id)" />
                  <MinusIcon v-if="isVisibleChildren(item.id)" />
                  <span class="ml-3 font-medium whitespace-nowrap">{{
                    item.name
                  }}</span>
                </td>
                <td>{{ item.parent }}</td>
                <td>{{ item.position }}</td>
                <td>{{ item.start }}</td>
                <td>{{ item.end }}</td>
                <td class="table-report__action">
                  <div
                    class="dropdown inline-block"
                    data-placement="right-start"
                  >
                    <button class="dropdown-toggle -mr-3" aria-expanded="false">
                      <MoreVerticalIcon />
                    </button>
                    <div class="dropdown-menu w-40">
                      <div
                        class="dropdown-menu__content box dark:bg-dark-1 p-2"
                      >
                        <router-link
                          :to="`/dashboard/categories/${activeMenuID}/${item.id}`"
                          data-dismiss="dropdown"
                          class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <Edit2Icon class="w-4 h-4 mr-2" />Edit
                        </router-link>
                        <a
                          data-dismiss="dropdown"
                          class="flex items-center cursor-pointer p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <DeleteConfirmModal
                            @onConfirmedDelete="deleteItem(item.id)"
                            :isIcon="true"
                            :modalId="'category-delete-modal-' + item.id"
                            iconClass="w-4 h-4 mr-2"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr
                class="inner-tr"
                v-for="(el, i) in item.children"
                :key="i"
                v-show="isVisibleChildren(item.id)"
              >
                <!-- <td class="w-0">{{ el.position }}</td> -->
                <td class="w-10">
                  <div class="w-10 h-10 image-fit zoom-in ml-10">
                    <img alt="Takk" class="rounded-full" :src="el.image" />
                  </div>
                </td>
                <td>
                  <a href class="font-medium whitespace-nowrap">{{
                    el.name
                  }}</a>
                  <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">
                    {{ el.category?.name }}
                  </div>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ el.position }}</td>
                <td>{{ el.start }}</td>
                <td>{{ el.end }}</td>
                <td class="table-report__action">
                  <div
                    class="dropdown inline-block"
                    data-placement="right-start"
                  >
                    <button class="dropdown-toggle -mr-3" aria-expanded="false">
                      <MoreVerticalIcon />
                    </button>
                    <div class="dropdown-menu w-40">
                      <div
                        class="dropdown-menu__content box dark:bg-dark-1 p-2"
                      >
                        <router-link
                          :to="`/dashboard/categories/${activeMenuID}/${el.id}`"
                          data-dismiss="dropdown"
                          class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <Edit2Icon class="w-4 h-4 mr-3" />Edit
                        </router-link>
                        <a
                          data-dismiss="dropdown"
                          class="flex items-center cursor-pointer p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <DeleteConfirmModal
                            @onConfirmedDelete="deleteItem(el.id)"
                            :isIcon="true"
                            :modalId="`category-delete-modal-${item.id}-${el.id}`"
                            iconClass="w-4 h-4 mr-2"
                          />
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
        v-if="activeMenuID != 'null' && activeMenuID"
        class="mt-5"
        dispatcher="fetchCategories"
        ref="paginator"
        @set-items="setItems($event)"
        :form="form"
      />
      <!-- END: Pagination -->
    </div>
    <div v-else class="text-base text-center mt-10 text-gray-600">
      For showing Categories Please select Menu
    </div>
    <DraggableTypeModal
      :list="items"
      :paginator="{ ...$refs.paginator?.paginator }"
    />
    <DraggableItemModal
      :list="
        items.find(
          (item) => showChildren.length > 0 && item.id == showChildren[0]
        )?.children
      "
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
</style>
