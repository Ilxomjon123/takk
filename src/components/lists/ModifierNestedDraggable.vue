<script setup>
import { ref } from "vue";
import Draggable from "vuedraggable";
import { useStore } from "vuex";
import DeleteConfirmModal from "../modals/DeleteConfirmModal.vue";

const store = useStore()
const props = defineProps({
  parent: {
    required: true,
    type: Object
  }
});
// const emit = defineEmits(['action:deleteType']);
const typeModalId = "type-modal-id"
const typeAddDispatcher = 'postModifierType'
const typeEditDispatcher = 'putModifierType'
const typeDispatcher = "postModifierType"
const itemModalId = ref("item-modal-id")
const itemAddDispatcher = 'postModifier'
const itemEditDispatcher = 'putModifier'
let itemDispatcher = "postModifier"

function getYesNo(val) {
  return val ? "YES" : "NO";
}

function editModifierItem(val) {
  itemDispatcher = itemEditDispatcher;
  // $refs[itemModalId].showModal({ ...val });
  itemModalId.value.showModal({ ...val })

}

async function deleteItem(val) {
  store.commit('setLoadingStatus', true);
  const res = await store.dispatch('deleteModifier', val);
  if (res.status) {
    store.commit('setSuccessNotification', true);
    // emit('action:deleteType')
  } else {
    store.commit('setErrorNotification', true);
  }
  store.commit('setLoadingStatus', false);
}

</script>

<template>
  <Draggable
    tag="tbody"
    :list="parent.items"
    item-key="id"
    group="items"
    :animation="300"
  >
    <template #item="{ element }">
      <tr class="inner-tr" v-for="element in parent.items">
        <td>
          <a href class="font-medium whitespace-nowrap ml-10">{{ element.name }}</a>
        </td>
        <td>{{ getYesNo(parent.required) }}</td>
        <td>{{ getYesNo(parent.available) }}</td>
        <td>{{ getYesNo(element.default) }}</td>
        <td>{{ parent.is_single ? "SINGLE" : "MULTI" }}</td>
        <td>{{ element.price }}</td>
        <td class="table-report__action w-10">
          <div class="flex">
            <Edit2Icon
              @click="editModifierItem(element)"
              class="hover:text-theme-12"
            />
            <DeleteConfirmModal
              @onConfirmedDelete="deleteItem(element.id)"
              :isIcon="true"
              :modalId="`modifier-delete-modal-${parent.id}-${element.id}`"
            />
          </div>
        </td>
      </tr>
    </template>
  </Draggable>
</template>

<style lang="scss" scoped>
.dark .inner-tr td {
  background-color: #1e2533 !important;
}

.inner-tr td {
  background-color: #dfdfdf !important;
}
</style>
