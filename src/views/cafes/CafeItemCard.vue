<template>
  <div class="wrapper antialiased text-gray-900">
    <div class="hover01 column">
      <figure class="rounded-xl">
        <img
          :src="cafe.logo_large"
          alt=" random imgee"
          class="w-full h-60 lg:h-72 object-cover object-center shadow-lg"
        />
      </figure>
    </div>

    <div class="relative text-white -mt-32">
      <div class="bg-dark-1/50 p-5 rounded-xl rounded-t-none shadow-lg">
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
