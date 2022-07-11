<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const url = ref('#')
const store = useStore();
onMounted(() => {
  const res = store.dispatch('fetchStripeConnect').then(res => {
    if (res.status) {
      url.value = res?.url;
    } else {
      store.commit('setErrorNotification');
    }
  });
})
</script>

<template>
<label
      class="form-check-label text-base cursor-pointer"
      v-text="'Stripe Account'"
      @click="() => $refs['stripe-link'].click()"
    />
    <a :href="url" target="blank" ref="stripe-link">
      <ExternalLinkIcon class="ml-2 hover:text-theme-1 cursor-pointer" />
    </a>
</template>