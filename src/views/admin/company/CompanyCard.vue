<script setup>
import { ref } from 'vue';

const props = defineProps({
  company: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div class="wrapper antialiased">
    <div class="hover01 column relative shadow-lg">
      <figure class="rounded-xl">
        <img
          :src="company.logo"
          alt="company image"
          class="w-full h-60 lg:h-72 object-cover object-center"
        />
      </figure>
      <div
        class="bg-dark-1/50 rounded-xl rounded-t-none absolute bottom-0 w-full p-3"
      >
        <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
          {{ company.name }}
        </h4>

        <div class="mt-1">{{ company.address }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  place-items: center;
}

/* Zoom In #1 */
figure {
  margin: 0;
  padding: 0;
  background: #fff;
  overflow: hidden;
}

.hover01 figure img {
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.hover01 figure:hover img {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}

// .wrapper .info {
// margin-top: -8.5rem;
// @media (min-width: 1440px) {
//   margin-top: -9.8rem;
// }
// }
</style>
