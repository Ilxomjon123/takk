<template>
  <div v-if="getSelectedMenuId != null">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-10">
      <h2 class="text-lg font-medium mr-auto">Categories List</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary mr-3" @click="addModifierType">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Modifier Type
        </button>
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
            <th class="whitespace-nowrap">LOGO</th>
            <th class="whitespace-nowrap">NAME</th>
            <th class="whitespace-nowrap">PARENT CATEGORY</th>
            <th class="whitespace-nowrap">START</th>
            <th class="whitespace-nowrap">END</th>
            <th class="whitespace-nowrap text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in items" :key="index">
            <tr class="-intro-y zoom-in" @click="toggleChildren(item.id)">
              <!-- <td class="w-0">{{ item.position }}</td> -->
              <td class="w-10">
                <div class="w-10 h-10 image-fit zoom-in">
                  <img alt="Takk" class="rounded-full" :src="item.image" />
                </div>
              </td>
              <td>
                <a href class="font-medium whitespace-nowrap">{{ item.name }}</a>
              </td>
              <td>
                <div
                  class="text-gray-600 text-xs whitespace-nowrap mt-0.5"
                >{{ item.category?.name }}</div>
              </td>
              <td>{{ item.parent }}</td>
              <td>{{ item.start }}</td>
              <td>{{ item.end }}</td>
              <td class="table-report__action w-10">
                <div class="flex justify-end items-end">
                  <router-link
                    :to="`/dashboard/categories/${getSelectedMenuId}/${item.id}`"
                  >
                    <Edit2Icon class="hover:text-theme-12" />
                  </router-link>
                  <DeleteConfirmModal
                    @onConfirmedDelete="deleteItem(item.id)"
                    :isIcon="true"
                    modalId="category-delete-modal"
                  />
                  <ChevronRightIcon
                    class="hover:text-theme-9"
                    :class="{
                      'transform rotate-90 duration-300': isVisibleChildren(item.id),
                      'transform duration-150': !isVisibleChildren(item.id),
                    }"
                  />
                </div>
              </td>
            </tr>
            <tr
              class="-intro-y"
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
                <a href class="font-medium whitespace-nowrap">{{ el.name }}</a>
                <div
                  class="text-gray-600 text-xs whitespace-nowrap mt-0.5"
                >{{ el.category?.name }}</div>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ el.start }}</td>
              <td>{{ el.end }}</td>
              <td class="table-report__action w-10">
                <div class="flex">
                  <router-link
                    :to="`/dashboard/categories/${getSelectedMenuId}/${el.id}`"
                  >
                    <Edit2Icon class="hover:text-theme-12" />
                  </router-link>
                  <DeleteConfirmModal
                    @onConfirmedDelete="deleteItem(el.id)"
                    :isIcon="true"
                    modalId="category-delete-modal"
                  />
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
      v-if="getSelectedMenuId != 'null' && getSelectedMenuId"
      class="mt-5"
      dispatcher="fetchCategories"
      ref="paginator"
      @setItems="setItems($event)"
      :form="form"
    />
    <!-- END: Pagination -->
  </div>
  <div
    v-else
    class="text-base text-center mt-10 text-gray-600"
  >For showing Categories Please select Menu</div>
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
      this.items = val
      this.showChildren = val.map(item => {
        if (item.children.length > 0) return item.id
      });
    },
    async deleteItem(val) {
      this.$store.commit('setLoadingStatus', true);
      const res = await this.$store.dispatch('deleteCategory', val);
      if (res.status) {
        this.$store.commit('setSuccessNotification', true);
        this.$refs.paginator.search();
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
    }
  },
  computed: {
    ...mapGetters(['getSelectedMenuId'])
  },

  components: { MainPaginator, DeleteConfirmModal }
})
</script>
