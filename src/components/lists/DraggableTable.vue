<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from "vuex";
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

onMounted(() => {
  //
});


</script>

<template>
  <table ref="table" class="draggable-table table table-report -mt-2">
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
    <tbody ref="tbody" v-dragula="items">
      <template v-for="(item, index) in items" :key="index">
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
        <!-- <tr
          class="-intro-y inner-tr"
          v-for="(el, i) in item.items"
          :key="i"
          v-show="isVisibleChildren(item.id)"
        >
          <td>
            <a href class="font-medium whitespace-nowrap ml-10">{{ el.name }}</a>
          </td>
          <td>{{ getYesNo(item.required) }}</td>
          <td>{{ getYesNo(item.available) }}</td>
          <td>{{ getYesNo(el.default) }}</td>
          <td>{{ item.is_single ? "SINGLE" : "MULTI" }}</td>
          <td>{{ el.price }}</td>
          <td class="table-report__action w-10">
            <div class="flex">
              <Edit2Icon
                @click="editModifierItem(el)"
                class="hover:text-theme-12"
              />
              <DeleteConfirmModal
                @onConfirmedDelete="deleteItem(el.id)"
                :isIcon="true"
                :modalId="`modifier-delete-modal-${item.id}-${el.id}`"
              />
            </div>
          </td>
        </tr>-->
      </template>
    </tbody>
  </table>
</template>

