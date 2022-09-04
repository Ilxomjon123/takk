<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  // current_page_size: 10,
  limit: '',
  links: {
    next: '',
    previous: ''
  },
  page: '',
  // total_objects: 51,
  total: ''
});
const emits = defineEmits(['paginate', 'update:limit']);
const amount = ref(5);
const amountOfPagesToShow = computed(() => {
  if (props.total >= amount.value) {
    if (props.page >= amount.value - 2 && amount.value < props.total) {
      amount.value += 1;
    }

    if (props.page <= amount.value - 3 && amount.value > 5) {
      amount.value -= 1;
    }
  } else amount.value = props.total;

  return amount.value;
});

function gotoFirstPage() {
  amount.value = 5;
  emits('paginate', 1);
}

function gotoLastPage() {
  amount.value = props.total;
  emits('paginate', props.total);
}

function gotoPreviousPage() {
  emits('paginate', props.page - 1);
}

function gotoNextPage() {
  emits('paginate', props.page + 1);
}

function gotoPage(page) {
  emits('paginate', page);
}

function onChangeLimit(event) {
  emits('update:limit', event.target.value);
}
</script>

<template>
  <div
    class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
  >
    <ul class="pagination">
      <li>
        <button
          class="pagination__link"
          @click="gotoFirstPage"
          :disabled="page == 1"
        >
          <ChevronsLeftIcon class="w-4 h-4" />
        </button>
      </li>
      <li>
        <button
          class="pagination__link"
          @click="gotoPreviousPage"
          :disabled="page == 1"
        >
          <ChevronLeftIcon class="w-4 h-4" />
        </button>
      </li>
      <li v-for="pageIndex in 5">
        <button
          class="pagination__link"
          :class="{
            'pagination__link--active':
              amountOfPagesToShow - 5 + pageIndex == props.page
          }"
          @click="gotoPage(amountOfPagesToShow - 5 + pageIndex)"
        >
          {{ amountOfPagesToShow - 5 + pageIndex }}
        </button>
      </li>
      <li>
        <button
          class="pagination__link"
          @click="gotoNextPage"
          :disabled="page == total"
        >
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </li>
      <li>
        <button
          class="pagination__link"
          @click="gotoLastPage"
          :disabled="page == total"
        >
          <ChevronsRightIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
    <select class="w-20 form-select box mt-3 sm:mt-0" @change="onChangeLimit">
      <option>6</option>
      <option>10</option>
      <option>20</option>
      <option>50</option>
      <option>100</option>
    </select>
  </div>
</template>
