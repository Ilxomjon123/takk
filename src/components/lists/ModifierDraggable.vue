<script setup>
import { reactive } from "vue";
import Draggable from "vuedraggable";
import { useStore } from "vuex";
import ModifierNestedDraggable from "./ModifierNestedDraggable.vue";
import DeleteConfirmModal from "../modals/DeleteConfirmModal.vue";

const store = useStore()
const props = defineProps({
  items: Array
});
const emit = defineEmits(['action:deleteType']);
const showChildren = reactive([]);

function getYesNo(val) {
  return val ? "YES" : "NO";
}

function isVisibleChildren(val) {
  return showChildren.includes(val)
}

async function deleteType(val) {
  store.commit('setLoadingStatus', true);
  const res = await store.dispatch('deleteModifierType', val);
  if (res.status) {
    store.commit('setSuccessNotification', true);
    emit('action:deleteType')
  } else {
    store.commit('setErrorNotification', true);
  }
  store.commit('setLoadingStatus', false);
}

function toggleChildren(val) {
  if (isVisibleChildren(val)) {
    delete showChildren[showChildren.indexOf(val)];
  } else {
    showChildren.push(val);
  }
}
</script>

<template>
  <Draggable
    tag="tbody"
    :list="items"
    item-key="id"
    group="items"
    :animation="300"
  >
    <template #item="{ element }">
      <template v-if="element">
        <tr @click="toggleChildren(element.id)">
          <td>
            <p class="font-medium whitespace-nowrap">{{ element.name }}</p>
          </td>
          <td>{{ getYesNo(element.required) }}</td>
          <td>{{ getYesNo(element.available) }}</td>
          <td />
          <td>{{ element.is_single ? "SINGLE" : "MULTI" }}</td>
          <td />
          <td class="table-report__action w-10">
            <div class="flex justify-end items-end">
              <Edit2Icon
                @click="editModifierType(element)"
                class="hover:text-theme-12"
              />
              <DeleteConfirmModal
                @onConfirmedDelete="deleteType(element.id)"
                :isIcon="true"
                :modalId="`modifier-type-delete-modal-${element.id}`"
              />
              <ChevronRightIcon
                class="hover:text-theme-9"
                :class="{
                  'transform rotate-90 duration-300': isVisibleChildren(element.id),
                  'transform rotate-0 duration-300': !isVisibleChildren(element.id),
                }"
              />
            </div>
          </td>
        </tr>
        <ModifierNestedDraggable
          :parent="element"
          v-show="isVisibleChildren(element.id)"
        />
      </template>
    </template>
  </Draggable>
</template>
