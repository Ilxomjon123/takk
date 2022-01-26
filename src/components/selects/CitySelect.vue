<template>
  <TomSelect
    v-model="city"
    @input="$emit('update:modelValue', $event.target.value)"
    :options="{
      placeholder: 'Select city'
    }"
    class="w-full"
  >
    <option v-if="getCities.length == 0" disabled>Firstly select country</option>
    <option v-for="(item, index) in getCities" :key="index" :value="item">
      {{
        item
      }}
    </option>
  </TomSelect>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  computed: {
    ...mapGetters(['getCities']),
    city: {
      get() {
        return this.$store.state.common.selectedCity;
      },
      set(value) {
        this.$store.commit('setSelectedCity', value);
      }
    }
  }
});
</script>
