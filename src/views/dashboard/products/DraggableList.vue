<template>
  <draggable
    tag="tbody"
    :list="list"
    group="list"
    item-key="id"
    @change="reorderList"
    :animation="300"
  >
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
          <p class="font-medium whitespace-nowrap">{{ element.name }}</p>
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
import { ref } from "vue";
import draggable from "vuedraggable";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  list: Array
});
const emit = defineEmits(['update:list']);
const store = useStore()
const router = useRouter()

const drag = ref(false);

async function reorderList(event) {
  emit('update:list')
}

</script>

<style scoped>
</style>
