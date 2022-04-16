<script setup>
import { ref } from "vue";
import Draggable from "vuedraggable";

const props = defineProps({
  list: Array
});

const emit = defineEmits(['update:list']);
const notAvaibleProducts = ref([]);
async function reorderList(event) {
  emit('update:list')
}

function handleSwitcher(event, productId) {
  console.log('event in handleSwitcher func: ', event);
  notAvaibleProducts.value.push(productId)
}
</script>

<template>
  <Draggable tag="tbody" :list="list" group="list" item-key="id" @change="reorderList" :animation="300">
    <template #item="{ element }">
      <tr class="intro-x">
        <td>
          <div class="form-check">
            <input :id="'product_available' + element.id" class="form-check-switch" type="checkbox"
              @change="(e) => handleSwitcher(e, element.id)" :checked="true" />
            <!-- <label class="form-check-label" :for="'product_available' + element.id">Available</label> -->
          </div>
        </td>
        <td scope="row">
          <div class="w-20 h-20 image-fit zoom-in">
            <img alt="image" class="rounded-full" :src="element.image" />
          </div>
        </td>
        <td>
          <p class="font-medium whitespace-nowrap">{{ element.name }}</p>
          <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">{{ element.category?.name }}</div>
        </td>
        <td class="text-center">{{ element.position }}</td>
        <td class>{{ element.description }}</td>
        <td class="table-report__action">
          <div class="dropdown inline-block" data-placement="right-start">
            <button class="dropdown-toggle -mr-3" aria-expanded="false">
              <MoreVerticalIcon />
            </button>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <button @click="$router.push('/dashboard/products/' + element.id)"
                  class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                  <Edit2Icon class="w-4 h-4 mr-2" />Edit
                </button>
                <button data-toggle="modal" data-target="#delete-confirmation-modal"
                  @click="clickedProductId = element.id"
                  class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                  <Trash2Icon class="w-4 h-4 mr-2" />Delete
                </button>

              </div>
            </div>
          </div>
          <!-- <div class="flex justify-center items-center">
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
          </div> -->
        </td>
      </tr>
    </template>
  </Draggable>
</template>

<style scoped>
</style>
