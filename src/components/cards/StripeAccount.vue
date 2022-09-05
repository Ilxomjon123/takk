<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useNotyf } from '../../composables/useNotyf';

const notyf = useNotyf();
const url = ref('#');
const store = useStore();

onMounted(async () => {
  try {
    const res = await store.dispatch('fetchStripeConnect');
    url.value = res?.url;
  } catch (error) {
    notyf.error('Something went wrong: ' + error.message);
  }
});
</script>

<template>
  <div>
    <label
      class="form-check-label text-base cursor-pointer"
      v-text="'Stripe Account'"
      @click="() => $refs['stripe-link'].click()"
    />
    <a :href="url" target="blank" ref="stripe-link">
      <ExternalLinkIcon class="ml-2 hover:text-theme-1 cursor-pointer" />
    </a>
  </div>
</template>
