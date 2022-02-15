<template>
  <TomSelect
    v-model="country"
    @input="$emit('update:modelValue', $event.target.value)"
    :options="{
      placeholder: 'Select country'
    }"
    class="w-full"
  >
    <option v-for="(item, index) in getCountries" :key="index" :value="item">
      {{
        item
      }}
    </option>
  </TomSelect>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  props: {
    selectedCountry: {
      type: String,
      default: 'United States'
    }
  },
  async mounted() {
    await this.fetchCountries();
    await this.$store.dispatch('fetchCities');
  },
  methods: {
    ...mapActions(['fetchCountries'])
  },
  computed: {
    ...mapGetters(['getCountries']),
    country: {
      get() {
        return this.$store.getters['selectedCountry'];
      },
      async set(value) {
        await this.$store.commit('setSelectedCountry', value);
        this.$store.dispatch('fetchCities');
      }
    }
  }
});
</script>
