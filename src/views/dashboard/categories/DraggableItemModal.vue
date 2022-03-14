<script setup>
import cash from "cash-dom";
import { ref } from "vue";
import Draggable from "vuedraggable";
import { useStore } from "vuex";

const props = defineProps({
  list: Array
});
const store = useStore()

const isReordered = ref(false);

async function saveReorderedList() {
  store.commit('setLoadingStatus', true)
  try {
    const res = await store.dispatch('updateModifierTypePositions', {
      obj_type: "product_category",
      obj_list: props.list.map((item, itemIndex) => ({ id: item.id, position: itemIndex + 1 }))
    });

    isReordered.value = false
    cash('#draggable-category-item-modal').modal('hide')

  } catch (error) {
    console.log(error);
  } finally {
    store.commit('setLoadingStatus', false)
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
          <h2 class="font-medium text-base mr-auto">Reorder items</h2>
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

          <!-- <div class="flex mt-5">
            <button
              class="btn btn-success ml-auto"
              @click="saveReorderedList"
              type="button"
            >Save positions</button>
          </div>-->
        </div>
        <!-- BEGIN: Modal Footer -->
        <div class="modal-footer text-right">
          <button
            type="button"
            data-dismiss="modal"
            class="btn btn-outline-secondary mr-1"
          >Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveReorderedList"
            :disabled="!isReordered"
          >Save positions</button>
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
