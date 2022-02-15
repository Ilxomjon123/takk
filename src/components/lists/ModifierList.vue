<template>
  <div v-if="getSelectedModifierTypeId != null">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-10">
      <h2 class="text-lg font-medium mr-auto">Modifiers List</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <router-link
          :to="getSelectedModifierTypeId != null ? `/dashboard/modifiers/${getSelectedModifierTypeId}/add` : ''"
          class="btn btn-primary"
        >
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>Add Modifier
        </router-link>
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
                <router-link
                  :to="`/dashboard/categories/${getSelectedModifierTypeId}/${item.id}`"
                >
                  <Edit2Icon class="hover:text-theme-12" />
                </router-link>
                <DeleteConfirmModal
                  @onConfirmedDelete="deleteItem(item.id)"
                  :isIcon="true"
                  modalId="modifier-delete-modal"
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
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
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
    fetchData() {
      //
    },
    setItems(val) {
      this.items = val
      // this.showChildren = val.map(item => {
      //   if (item.children.length > 0) return item.id
      // });
    },
    async deleteItem(val) {
      this.$store.commit('setLoadingStatus', true);
      const res = await this.$store.dispatch('deleteModifier', val);
      if (res.status) {
        this.$store.commit('setSuccessNotification', true);
        this.$refs.paginator.search();
      } else {
        this.$store.commit('setErrorNotification', true);
      }
      this.$store.commit('setLoadingStatus', false);
    },
  },
  computed: {
    ...mapGetters(['getSelectedModifierTypeId', 'getModifiers'])
  },

  components: { DeleteConfirmModal }
})
</script>
