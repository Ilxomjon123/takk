<script setup>
import cash from 'cash-dom';
import { ref } from 'vue';
import Draggable from 'vuedraggable';
import store from '@/store';

const props = defineProps({
  list: Array,
});

const isReordered = ref(false);
const isLoading = ref(false);

async function saveReorderedList() {
  isLoading.value = true;
  try {
    const res = await store.dispatch('updateModifierTypePositions', {
      obj_type: 'product_category',
      obj_list: props.list.map((item, itemIndex) => ({
        id: item.id,
        position: itemIndex + 1,
      })),
    });

    isReordered.value = false;
    cash('#draggable-category-item-modal').modal('hide');
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    id="draggable-category-item-modal"
    class="modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- BEGIN: Modal Header -->
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">Reorder category items</h2>
        </div>
        <!-- END: Modal Header -->
        <div class="modal-body p-10">
          <draggable
            tag="ul"
            :list="list"
            handle=".handle"
            item-key="id"
            @change="isReordered = true"
          >
            <template #item="{ element, index }">
              <li class="flex gap-3">
                <AlignJustifyIcon class="handle" />

                <span>{{ element.name }}</span>
                <span class="ml-auto">{{ element.position }}</span>
              </li>
            </template>
          </draggable>
        </div>
        <!-- BEGIN: Modal Footer -->
        <div class="modal-footer text-right">
          <button
            type="button"
            data-dismiss="modal"
            class="btn btn-outline-secondary mr-1"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveReorderedList"
            :disabled="!isReordered || isLoading"
          >
            <LoadingIcon
              v-if="isLoading"
              icon="three-dots"
              color="white"
              class="my-2 mx-1"
            />
            <span v-else>Save positions</span>
          </button>
        </div>
        <!-- END: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.handle {
  cursor: move;
}
</style>
