<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import StripeIntegrate from '@/components/cards/StripeIntegrate.vue';
import StripeAccount from '@/components/cards/StripeAccount.vue';
const store = useStore();
const getCompany = computed(() => store.getters.getCompany);
</script>

<template>
  <div class="col-span-12 lg:col-span-9 2xl:col-span-9">
    <div class="intro-y box">
      <div
        class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Banking Information</h2>
      </div>
      <div class="p-5" v-if="!getCompany.has_stripe_account">
        <StripeIntegrate />
      </div>
      <div class="p-5" v-else>
        <StripeAccount />
      </div>
    </div>
  </div>
</template>
