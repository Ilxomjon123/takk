<template>
  <div class="wrapper antialiased text-gray-900">
    <div class="hover01 column">
      <figure>
        <img
          :src="cafe.logo_small"
          alt=" random imgee"
          class="w-full h-96 object-cover object-center shadow-lg"
        />
      </figure>
    </div>

    <div class="relative px-4 -mt-16">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <!-- <div class="flex items-baseline">
          <span
            class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide"
          >New</span>
          <div
            class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider"
          >2 baths &bull; 3 rooms</div>
        </div>-->

        <h4
          class="mt-1 text-xl font-semibold uppercase leading-tight truncate"
        >{{ cafe.name }}</h4>

        <div class="mt-1">{{ cafe.address }}</div>
        <!-- <div class="mt-1">
          $1800
          <span class="text-gray-600 text-sm">/wk</span>
        </div>-->
        <div class="mt-4">
          <span class="text-teal-600 text-md font-semibold">4/5 ratings</span>
          <span class="text-sm text-gray-600">(based on 234 ratings)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cafe: Object
})
</script>

<style scoped>
.wrapper {
  place-items: center;
}

/* Zoom In #1 */
figure {
  margin: 0;
  padding: 0;
  background: #fff;
  overflow: hidden;
  border-radius: 1rem;
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
</style>
