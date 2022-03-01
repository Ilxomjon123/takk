<template>
  <draggable tag="tbody" v-model="list" item-key="position" :move="reorderList">
    <template #item="{ element }">
      <tr class="intro-x">
        <td scope="row">
          <div class="w-20 h-20 image-fit zoom-in">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="rounded-full"
              :src="element.image"
            />
          </div>
        </td>
        <td>
          <a href class="font-medium whitespace-nowrap">{{ element.name }}</a>
          <div
            class="text-gray-600 text-xs whitespace-nowrap mt-0.5"
          >{{ element.category?.name }}</div>
        </td>
        <td class="text-center">{{ element.position }}</td>
        <td class>{{ element.description }}</td>
        <td class="table-report__action">
          <div class="flex justify-center items-center">
            <button
              class="flex items-center mr-3"
              @click="$router.push('/dashboard/products/' + element.id)"
            >
              <CheckSquareIcon class="w-4 h-4 mr-1" />Edit
            </button>
            <a
              class="flex items-center text-theme-6"
              href="javascript:;"
              data-toggle="modal"
              data-target="#delete-confirmation-modal"
              @click="clickedProductId = element.id"
            >
              <Trash2Icon class="w-4 h-4 mr-1" />Delete
            </a>
          </div>
        </td>
      </tr>
    </template>
  </draggable>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import draggable from "vuedraggable";
import { useStore } from "vuex";
import { fetchProductsList, updateProduct } from "@/api";
import { useRouter } from "vue-router";

const props = defineProps({
  list: Array
});
const emit = defineEmits(['update:list']);
const store = useStore()
const router = useRouter()

const drag = ref(false);

async function reorderList(event) {
  console.log('event in reorderList func: ', event);

  const draggedId = event.draggedContext.element.id;
  const relatedId = event.relatedContext.element.id;
  const draggedPos = event.draggedContext.element.position;
  const relatedPos = event.relatedContext.element.position;
  const formData1 = new FormData()
  const formData2 = new FormData()
  formData1.append('position', relatedPos);
  formData2.append('position', draggedPos);

  store.commit('setLoadingStatus', true)
  try {
    const res1 = await updateProduct({
      id: draggedId,
      data: formData1,
    });
    const res2 = await updateProduct({
      id: relatedId,
      data: formData2,
    });

    if (res1 && res2) {
      // Object.assign(list, res2.results);
      emit('update:list')
    }
  } catch (error) {
    console.log(error);
  } finally {
    store.commit('setLoadingStatus', false)
  }

  // Object.assign(list, list.map(item => {
  //   if (item.id === draggedId) {
  //     return { ...item, position: relatedPos }
  //   }
  //   if (item.id === relatedId) {
  //     return { ...item, position: draggedPos }
  //   }
  //   return item
  // }));
}

</script>

<style scoped>
</style>
