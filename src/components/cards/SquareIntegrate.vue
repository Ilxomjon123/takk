<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { fetchSquareRedirectUrl } from '@/api';
import { useNotyf } from '@/composables/useNotyf';

const store = useStore();
const notyf = useNotyf();
const loading = ref(false);

async function gotoSquareUpSite() {
  try {
    loading.value = true;
    const res = await fetchSquareRedirectUrl({
      is_make_create_order: true,
    });

    location.href = res?.url;
  } catch (error) {
    notyf.error('Error while redirect: ' + error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="p-0 mt-5">
    <div class="p-5 text-center">
      <div class="flex justify-center my-3 h-10 mt-3">
        <img src="@/assets/images/Takk_Logo.png" class="mr-3" />
        <img src="@/assets/images/squareup.png" />
      </div>
      <div class="text-3xl mt-5">Do you want to integrate with SquareUp</div>
      <div class="text-base mt-3">
        Do you already use Square? We can import all your menu and products from
        Square if you like.
      </div>
      <!-- <div class="text-gray-600 mt-2">
                <div class="sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                  <input id="show-example-1" data-target="#basic-button" class="show-code form-check-switch mr-0 ml-3"
                    type="checkbox" v-model="is_make_create_order" />
                  <label class="form-check-label ml-0 sm:ml-2" for="show-example-1">Do you want to get notifications on
                    SquareApp?</label>
                </div>
              </div> -->
    </div>
    <div class="px-5 pb-8 text-center">
      <!-- <button
          class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1">No</button> -->
      <button
        type="button"
        class="btn btn-success w-24"
        @click="gotoSquareUpSite"
      >
        Integrate
        <LoadingIcon icon="oval" class="ml-2 w-4 h-4" v-if="loading" />
      </button>
    </div>
  </div>
</template>
