<template>
  <draggable
    tag="tbody"
    :list="item.items"
    item-key="id"
    @change="reorderList"
    :animation="300"
  >
    <template #item="{ element }">
      <tr class="-intro-y zoom-in" @click="toggleChildren(item.id)">
        <td>
          <a href class="font-medium whitespace-nowrap">{{ item.name }}</a>
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
            <ChevronRightIcon
              class="hover:text-theme-9"
              :class="{
                'transform rotate-90 duration-300': isVisibleChildren(item.id),
                'transform rotate-0 duration-300': !isVisibleChildren(item.id),
              }"
            />
          </div>
        </td>
      </tr>
      <tr class="-intro-y">
        <td>
          <a href class="font-medium whitespace-nowrap ml-10">{{ element.name }}</a>
        </td>
        <td>{{ item.required ? "YES" : "NO" }}</td>
        <td>{{ item.available ? "YES" : "NO" }}</td>
        <td>{{ element.default ? "YES" : "NO" }}</td>
        <td>{{ item.is_single ? "SINGLE" : "MULTI" }}</td>
        <td>{{ element.price }}</td>
        <td class="table-report__action w-10">
          <div class="flex">
            <Edit2Icon
              @click="$emit('update:selectedEl', element)"
              class="hover:text-theme-12"
            />
            <DeleteConfirmModal
              @onConfirmedDelete="deleteItem(element.id)"
              :isIcon="true"
              :modalId="`modifier-delete-modal-${item.id}-${element.id}`"
            />
          </div>
        </td>
      </tr>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal.vue";

const props = defineProps({
  item: Array
});
const emit = defineEmits(['update:item-list', 'update:selectedEl']);
const store = useStore()
const router = useRouter()

const drag = ref(false);

async function reorderList(event) {
  emit('update:item-list')
}

async function deleteItem(val) {
  store.commit('setLoadingStatus', true);
  const res = await store.dispatch('deleteModifier', val);
  if (res.status) {
    store.commit('setSuccessNotification', true);
    // search();
  } else {
    store.commit('setErrorNotification', true);
  }
  store.commit('setLoadingStatus', false);
}

</script>

<style scoped>
</style>
