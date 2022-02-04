<template>
  <form @submit.prevent="submit">
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3 md:mb-0">
        <label for="company-name" class="form-label">
          Title
          <span class="text-theme-6">*</span>
        </label>
        <input
          id="company-name"
          type="text"
          class="form-control"
          :class="getError('name') != null ? 'border-theme-6' : ''"
          placeholder="Title"
          v-model="form.name"
          required
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>
    </div>
    <div>
      <button
        type="submit"
        class="btn btn-primary py-3 px-4 block mx-auto mt-8 px-10 align-top"
        :disabled="isLoading"
      >
        {{ isLoading ? '' : 'Submit' }}
        <LoadingIcon
          v-if="isLoading"
          icon="three-dots"
          color="white"
          class="w-8 h-8 my-2"
        />
      </button>
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue'
import CountrySelect from '../../components/selects/CountrySelect.vue'
import CitySelect from '../../components/selects/CitySelect.vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  data() {
    return {
      form: {
        week_time: [{ day: "monday" }],
        cafe_timezone: "Etc/GMT+12",
        location: {
          lat: 0,
          lon: 0
        },
      },
      isLoading: false,
      errors: {}
    }
  },
  methods: {
    ...mapActions(['postStepMenu']),
    async submit() {
      this.isLoading = true;
      this.errors = {};
      this.form.company = this.getUser.company_id;
      const res = await this.postStepMenu(this.form);
      console.log(res);
      if (res.status) {
        this.$router.push('/dashboard')
      } else {
        this.errors = res.data;
      }
      this.isLoading = false
    },
    getError(key) {
      return this.errors[key]?.[0];
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  components: { CountrySelect, CitySelect }
})
</script>

<style scoped>
/* Chrome, Saf
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.form-check-label {
  margin-left: 0;
}
</style>