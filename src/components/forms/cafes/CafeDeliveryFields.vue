<template>
  <div class="flex gap-5">
    <div class="form-check w-auto mt-9">
      <input
        id="delivery_is_available"
        class="form-check-switch"
        type="checkbox"
        name="delivery_is_available"
        v-model="delivery.delivery_available"
      />
      <label class="form-check-label" for="delivery_is_available"
        >Delivery available</label
      >
    </div>
  </div>
  <template v-if="delivery.delivery_available">
    <div class="flex gap-5">
      <div class="input-form mt-3 basis-1/2">
        <label
          for="delivery_max_distance"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Delivery max distance
        </label>
        <input
          id="delivery_max_distance"
          v-model="delivery.delivery_max_distance"
          type="number"
          name="delivery_max_distance"
          class="form-control"
          placeholder="Type.."
        />
      </div>
      <div class="input-form mt-3 basis-1/2">
        <label
          for="delivery_min_amount"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Delivery min amount
        </label>
        <input
          id="delivery_min_amount"
          v-model="delivery.delivery_min_amount"
          type="number"
          step="0.001"
          name="delivery_min_amount"
          class="form-control"
          placeholder="Type.."
        />
      </div>
    </div>
    <div class="flex gap-5">
      <div class="input-form mt-3 basis-1/2">
        <label
          for="delivery_fee"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Delivery fee
        </label>
        <input
          id="delivery_fee"
          v-model="delivery.delivery_fee"
          type="number"
          step="0.001"
          name="delivery_fee"
          class="form-control"
          placeholder="Type.."
        />
      </div>
      <div class="input-form mt-3 basis-1/2">
        <label
          for="delivery_percent"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Delivery percent
        </label>
        <input
          id="delivery_percent"
          v-model="delivery.delivery_percent"
          type="number"
          step="0.001"
          name="delivery_percent"
          class="form-control"
          placeholder="Type.."
        />
      </div>
    </div>
    <div class="flex gap-5">
      <div class="input-form mt-3 basis-1/2">
        <label
          for="delivery_km_amount"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Delivery km amount
        </label>
        <input
          id="delivery_km_amount"
          v-model="delivery.delivery_km_amount"
          type="number"
          name="delivery_km_amount"
          class="form-control"
          placeholder="Type.."
        />
      </div>
      <div class="input-form mt-3 basis-1/2">
        <label
          for="delivery_min_time"
          class="form-label w-full flex flex-col sm:flex-row"
        >
          Delivery min time
        </label>
        <input
          id="delivery_min_time"
          v-model="delivery.delivery_min_time"
          type="number"
          name="delivery_min_time"
          class="form-control"
          placeholder="Type.."
        />
      </div>
    </div>
  </template>
</template>

<script setup>
defineProps({
  delivery: {
    delivery_available: false,
    delivery_max_distance: null,
    delivery_min_amount: null,
    delivery_fee: null,
    delivery_percent: null,
    delivery_km_amount: null,
    delivery_min_time: null
  }
});
</script>

<style></style>
