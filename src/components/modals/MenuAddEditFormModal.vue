<script setup>
import cash from 'cash-dom'
import { isEmpty } from 'lodash';
import { ref } from 'vue';
import store from '../../store';

const props = defineProps({
  item: {
    type: Object, default: () => { }
  }
});

const emit = defineEmits(['submitted'])

const isLoading = ref(false)
const errors = ref(null)

async function submit(event) {
  const nameValue = Object.fromEntries(new FormData(event.target)).menuName
  console.log('nameValue: ', nameValue);

  isLoading.value = true;
  let res = null

  if (!isEmpty(props.item)) {
    res = await store.dispatch(
      'putMenu',
      {
        id: props.item.id,
        name: nameValue
      }
    );
  }

  if (isEmpty(props.item)) {
    res = await store.dispatch(
      'postMenu',
      {
        name: nameValue
      }
    );
  }

  if (res.status) {
    hideModal();
    emit('submitted');
  } else {
    errors.value = res.data;
  }

  isLoading.value = false;
}

function hideModal() {
  cash('#menu-add-edit-modal').modal('hide');
}

</script>

<template>
  <div id="menu-add-edit-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="submit">
        <div class="modal-content">
          <!-- <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">Add Menu</h2>
          </div>-->
          <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <label for="menu-name" class="form-label">Name</label>
              <input
                id="menu-name"
                name="menuName"
                required
                :value="item.name"
                class="form-control w-full mt-2"
                placeholder="Name"
              />
            </div>
          </div>
          <div class="modal-footer text-right">
            <button
              type="button"
              @click="hideModal"
              class="btn btn-outline-secondary w-24 mr-1"
            >Cancel</button>
            <button type="submit" class="btn btn-primary w-24">
              {{ isLoading ? '' : 'Save' }}
              <LoadingIcon
                v-if="isLoading"
                icon="three-dots"
                color="white"
                class="my-2"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
