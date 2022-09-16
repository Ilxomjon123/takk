<template>
  <div :id="modalId" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <form @submit.prevent="submit">
        <div class="modal-content">
          <!-- <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">Add Menu</h2>
          </div>-->
          <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <div class="w-full mb-3">
                <label for="modifier-type-name">Title</label>
                <input
                  id="modifier-type-name"
                  required
                  v-model="modifier.name"
                  class="form-control w-full mt-2"
                  placeholder="Name"
                />
                <div class="text-theme-6" v-text="getError('name')" />
              </div>
              <div class="w-full mb-3">
                <div class="form-check">
                  <input
                    v-model="modifier.is_single"
                    id="modifier-type-is-single"
                    class="form-check-switch"
                    type="checkbox"
                  />
                  <label
                    class="form-check-label text-base"
                    for="modifier-type-is-single"
                    >Modifier is single</label
                  >
                  <div class="text-theme-6" v-text="getError('is_single')" />
                </div>
              </div>
              <!-- <div class="w-full mb-3 md:w-1/2">
                <div class="form-check">
                  <input
                    v-model="modifier.available"
                    id="modifier-type-available"
                    class="form-check-switch"
                    type="checkbox"
                  />
                  <label
                    class="form-check-label text-base"
                    for="modifier-type-available"
                    >Modifier available</label
                  >
                  <div class="text-theme-6" v-text="getError('available')" />
                </div>
              </div> -->
              <div class="w-full mb-3 md:w-1/2">
                <div class="form-check">
                  <input
                    v-model="modifier.required"
                    id="modifier-type-required"
                    class="form-check-switch"
                    type="checkbox"
                  />
                  <label
                    class="form-check-label text-base"
                    for="modifier-type-required"
                    >Modifier is required</label
                  >
                  <div class="text-theme-6" v-text="getError('required')" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary mr-3"
            >
              Cancel
            </button>
            <SubmitButton :is-loading="isLoading" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import cash from 'cash-dom';
import SubmitButton from '../buttons/SubmitButton.vue';

export default defineComponent({
  props: {
    dispatcher: {
      type: String,
      default: 'postModifierType',
    },
    modalId: {
      type: String,
      default: 'modifier-type-type-form-modal',
    },
  },
  data() {
    return {
      name: null,
      id: null,
      isLoading: false,
      modifier: {
        available: true,
      },
      errors: {},
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      const res = await this.$store.dispatch(this.dispatcher, this.modifier);
      if (res.status) {
        this.hideModal();
        this.$emit('submitted');
      } else {
        this.errors = res.data;
      }
      this.isLoading = false;
    },
    showModal(form) {
      this.modifier = form;
      cash('#' + this.modalId).modal('show');
    },
    hideModal() {
      cash('#' + this.modalId).modal('hide');
    },
    getError(key) {
      return this.errors[key]?.[0];
    },
  },
  components: { SubmitButton },
});
</script>
