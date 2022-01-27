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
      default: null
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
        return this.$store.state.common.selectedCountry;
      },
      async set(value) {
        this.$store.commit('setSelectedCountry', value);
        await this.$store.dispatch('fetchCities');
      }
    }
  }
});
</script>
