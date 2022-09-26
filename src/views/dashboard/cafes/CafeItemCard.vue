<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  cafe: {
    type: Object,
    default: () => ({}),
  },
});

const happyCount = ref(3);
const unhappyCount = ref(1);
const messageCount = ref(2);
const offerCount = ref(4);

const cafeMainPhoto = computed(() =>
  props.cafe.photos?.length
    ? props.cafe.photos[0]?.image_medium
    : props.cafe.logo_small
);
</script>

<template>
  <div class="wrapper antialiased">
    <div class="hover01 column relative shadow-lg">
      <figure class="rounded-xl">
        <img
          :src="cafeMainPhoto"
          alt="cafe image"
          class="w-full h-60 lg:h-72 object-cover object-center"
        />
      </figure>
      <div
        class="bg-dark-1/50 rounded-xl rounded-t-none absolute bottom-0 w-full p-3"
      >
        <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
          {{ cafe.name }}
        </h4>

        <div class="mt-1">{{ cafe.address }}</div>
        <div class="flex justify-center mt-4 space-x-3">
          <button type="button">
            <SmileIcon size="1.5x" />
            <br />
            {{ cafe.like_count }}
          </button>
          <button type="button">
            <FrownIcon size="1.5x" />
            <br />
            {{ cafe.dislike_count }}
          </button>
          <!-- <button type="button">
            <MessageSquareIcon size="1.5x" />
            <br />
            {{ messageCount }}
          </button> -->
          <button type="button">
            <CoffeeIcon size="1.5x" />
            <br />
            {{ cafe.orders_count }}
          </button>
        </div>
      </div>
      <!-- <div class="relative text-white bottom-0">
      </div>-->
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
</style>
