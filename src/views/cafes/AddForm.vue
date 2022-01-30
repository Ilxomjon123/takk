<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Create Form</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12">
        <!-- BEGIN: Form Validation -->
        <div class="intro-y box">
          <div id="form-validation" class="p-5">
            <!-- BEGIN: Validation Form -->
            <form class="validate-form" @submit.prevent="save">
              <CafeForm
                :validate="validate"
                :form-data="formData"
                :external-errors="externalErrors"
                @update:form-data="formData = $event"
                @update:validate="validate = $event"
              />
              <div class="flex">
                <button
                  type="submit"
                  class="btn btn-primary mt-5 lg:ml-auto"
                  :disabled="isLoading"
                >
                  <LoadingIcon
                    v-if="isLoading"
                    icon="tail-spin"
                    class="w-4 h-4 mr-3"
                    color="#fff"
                  />
                  <span>Save</span>
                </button>
              </div>
            </form>
            <!-- END: Validation Form -->
          </div>
        </div>
        <!-- END: Form Validation -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import CafeForm from './CafeForm.vue';
import Toastify from 'toastify-js';
import cash from 'cash-dom';
import { useStore } from 'vuex';
const store = useStore();

const formData = ref({})
const validate = ref({})
const externalErrors = ref({})
const isLoading = ref(false)

async function save() {
  isLoading.value = true
  validate.value.$touch();
  console.log('cafe validate: ', validate.value);

  if (validate.value.$invalid) {
    Toastify({
      node: cash('#failed-notification-content')
        .clone()
        .removeClass('hidden')[0],
      duration: 3000,
    }).showToast();
    isLoading.value = false
  } else {
    try {
      const res = await store.dispatch('cafes/cafePost', formData);
      if (res.status) {
        Toastify({
          node: cash('#success-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
        }).showToast();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        $externalResults.value = error.response.data;
      }
    } finally {
      isLoading.value = false
    }

  }

}
</script>
