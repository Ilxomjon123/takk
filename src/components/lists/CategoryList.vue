<template>
  <div v-if="getSelectedMenuId != null">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-10">
      <h2 class="text-lg font-medium">Categories List</h2>
      <div class="dropdown inline-block" data-placement="right-start">
        <button class="dropdown-toggle" aria-expanded="false">
          <MoreVerticalIcon />
        </button>
        <div class="dropdown-menu w-fit">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <button class="btn mb-2" @click="reorderModifierType" :disabled="items.length < 2" data-toggle="dropdown">
              <span class="w-5 h-5 flex items-center justify-center">
                <ShuffleIcon class="w-4 h-4" />
              </span>
              <span class="whitespace-nowrap">Reorder Categories</span>
            </button>
            <button class="btn mb-2" @click="reorderModifierItem" :disabled="showChildren.length === 0"
              data-toggle="dropdown">
              <span class="w-5 h-5 flex items-center justify-center">
                <ShuffleIcon class="w-4 h-4" />
              </span>
              <span class="whitespace-nowrap">Reorder Category Items</span>
            </button>
            <router-link :to="getSelectedMenuId != null ? `/dashboard/categories/${ getSelectedMenuId }/add` : ''"
              class="btn" data-toggle="dropdown">
              <span class="w-5 h-5 flex items-center justify-center">
                <PlusIcon class="w-4 h-4" />
              </span>
              <span class="whitespace-nowrap">Add Category</span>
            </router-link>
          </div>
        </div>
      </div>

    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12">
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
            <tr class="-intro-y zoom-in">
              <!-- <td class="w-0">{{ item.position }}</td> -->
              <td class="w-1/12">
                <div class="w-10 h-10 image-fit zoom-in">
                  <img alt="Takk" class="rounded-full" :src="item.image" />
                </div>
              </td>
              <td class="hover:text-theme-9" @click="toggleChildren(item.id)">
                <PlusIcon v-if="!isVisibleChildren(item.id)" />
                <MinusIcon v-if="isVisibleChildren(item.id)" />
                <span class="ml-3 font-medium whitespace-nowrap">{{ item.name }}</span>
              </td>
              <td>{{ item.parent }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.start }}</td>
              <td>{{ item.end }}</td>
              <td class="table-report__action">
                <div class="dropdown inline-block" data-placement="right-start">
                  <button class="dropdown-toggle -mr-3" aria-expanded="false">
                    <MoreVerticalIcon />
                  </button>
                  <div class="dropdown-menu w-40">
                    <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                      <router-link :to="`/dashboard/categories/${ getSelectedMenuId }/${ item.id }`"
                        data-dismiss="dropdown"
                        class="flex items-center  p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <Edit2Icon class="w-4 h-4 mr-2" />Edit
                      </router-link>
                      <a data-dismiss="dropdown"
                        class="flex items-center  p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <DeleteConfirmModal @onConfirmedDelete="deleteItem(item.id)" :isIcon="true"
                          :modalId="'category-delete-modal-' + item.id" iconClass="w-4 h-4 mr-2" />
                      </a>

                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="-intro-y inner-tr" v-for="(el, i) in item.children" :key="i" v-show="isVisibleChildren(item.id)">
              <!-- <td class="w-0">{{ el.position }}</td> -->
              <td class="w-10">
                <div class="w-10 h-10 image-fit zoom-in ml-10">
                  <img alt="Takk" class="rounded-full" :src="el.image" />
                </div>
              </td>
              <td>
                <a href class="font-medium whitespace-nowrap">{{ el.name }}</a>
                <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">{{ el.category?.name }}</div>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ el.position }}</td>
              <td>{{ el.start }}</td>
              <td>{{ el.end }}</td>
              <td class="table-report__action">
                <div class="dropdown inline-block" data-placement="right-start">
                  <button class="dropdown-toggle -mr-3" aria-expanded="false">
                    <MoreVerticalIcon />
                  </button>
                  <div class="dropdown-menu w-40">
                    <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                      <router-link :to="`/dashboard/categories/${ getSelectedMenuId }/${ el.id }`"
                        data-dismiss="dropdown"
                        class="flex items-center  p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <Edit2Icon class="w-4 h-4 mr-2" />Edit
                      </router-link>
                      <a data-dismiss="dropdown"
                        class="flex items-center  p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                        <DeleteConfirmModal @onConfirmedDelete="deleteItem(el.id)" :isIcon="true"
                          :modalId="`category-delete-modal-${ item.id }-${ el.id }`" iconClass="w-4 h-4 mr-2" />
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
    <MainPaginator v-if="getSelectedMenuId != 'null' && getSelectedMenuId" class="mt-5" dispatcher="fetchCategories"
      ref="paginator" @setItems="setItems($event)" :form="form" />
    <!-- END: Pagination -->
  </div>
  <div v-else class="text-base text-center mt-10 text-gray-600">For showing Categories Please select Menu</div>
  <DraggableTypeModal :list="items" :paginator="{ ...$refs.paginator?.paginator }" />
  <DraggableItemModal :list="items.find(item => showChildren.length > 0 && item.id == showChildren[0])?.children" />
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import MainPaginator from '../paginator/MainPaginator.vue'
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import DraggableTypeModal from '../../views/dashboard/categories/DraggableTypeModal.vue';
import DraggableItemModal from '../../views/dashboard/categories/DraggableItemModal.vue';
import cash from 'cash-dom';

export default defineComponent({
  data() {
    return {
      items: [],
      form: {},
      showChildren: []
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
      // console.log(val);
      this.items = val
      // this.showChildren = val.map(item => { if (item?.children?.length > 0) return item.id });
    },
    async deleteItem(val) {
      this.$store.commit('setLoadingStatus', true);
      const res = await this.$store.dispatch('deleteCategory', val);
      if (res.status) {
        this.$store.commit('setSuccessNotification', true);
        this.search();
      } else {
        this.$store.commit('setErrorNotification', true);
      }
      this.$store.commit('setLoadingStatus', false);
    },
    toggleChildren(valId) {
      this.isVisibleChildren(valId) ?
        this.showChildren = [] :
        this.showChildren = [valId]
      // if (this.isVisibleChildren(val)) {
      //   delete this.showChildren[this.showChildren.indexOf(val)];
      // } else {
      //   this.showChildren.push(val);
      // }
    },
    isVisibleChildren(val) {
      return this.showChildren.includes(val)
    },
    reorderModifierType() {
      cash('#draggable-category-type-modal').modal('show')
    },
    reorderModifierItem() {
      cash('#draggable-category-item-modal').modal('show')
    },
  },
  computed: {
    ...mapGetters(['getSelectedMenuId'])
  },

  components: {
    MainPaginator,
    DeleteConfirmModal,
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
