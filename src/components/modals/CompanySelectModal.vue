<script setup>
import cash from 'cash-dom'
import { isEmpty } from 'lodash';
import { ref } from 'vue';
import store from '../../store';
import CompanySelect from '../selects/CompanySelect.vue';

const isLoading = ref(false)
const errors = ref(null)
const selectedCompany = ref(null)

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
  errors.value = ''
  cash('#company-select-modal').modal('hide');
}

function setCompany() {
  isLoading.value = true
  if (selectedCompany.value) {
    store.commit('setSelectedCompanyID', selectedCompany.value)
    hideModal()
  } else errors.value = 'Company not set'
  isLoading.value = false
}
</script>

<template>
  <div id="company-select-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">Add Menu</h2>
          </div>-->
        <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
          <div class="col-span-12">
            <label for="menu-name" class="form-label">Select a company</label>
            <CompanySelect v-model="selectedCompany" />
            <div class="text-red-500">{{ errors }}</div>
          </div>
        </div>
        <div class="modal-footer text-right">
          <button type="button" @click="hideModal" class="btn btn-outline-secondary w-24 mr-1">Cancel</button>
          <button type="button" class="btn btn-primary w-24" @click="setCompany">
            {{ isLoading ? '' : 'Save' }}
            <LoadingIcon v-if="isLoading" icon="three-dots" color="white" class="my-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
