<script setup>
import StripeIntegrate from '../../../components/cards/StripeIntegrate.vue';

</script>

<template>
  <div class="col-span-12 lg:col-span-9 2xl:col-span-9">
    <div class="intro-y box">
      <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">Banking Information</h2>
      </div>
      <div class="p-5">
        <StripeIntegrate />
      </div>
    </div>
  </div>
</template>
