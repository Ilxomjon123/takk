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
                <label for="modifier-name">Name</label>
                <input
                  id="modifier-name"
                  v-model="modifier.name"
                  class="form-control w-full mt-2"
                  placeholder="Name"
                />
                <div class="text-theme-6" v-text="getError('name')" />
              </div>
              <div class="w-full mb-3">
                <label for="modifier-name">Modifier Type</label>
                <TomSelect
                  v-model="modifier.modifier"
                  :options="{
                    placeholder: 'Select Modifier Type',
                  }"
                  class="w-full mt-2"
                >
                  <option
                    v-for="(item, index) in getModifierTypes.results"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </TomSelect>
                <!-- <SingleSelect
                  class="mt-2"
                  :items="getModifierTypes.results"
                  v-model="modifierTypeId"
                /> -->

                <div class="text-theme-6" v-text="getError('modifier')" />
              </div>
              <div class="w-full mb-3">
                <label for="modifier-price">Price</label>
                <div class="input-group mt-2">
                  <div id="input-group-price" class="input-group-text">$</div>
                  <input
                    id="modifier-price"
                    v-model="modifier.price"
                    type="number"
                    step="0.01"
                    class="form-control"
                    :class="getError('price') != null ? 'border-theme-6' : ''"
                    placeholder="2"
                    aria-describedby="input-group-price"
                  />
                </div>
                <div class="text-theme-6" v-text="getError('price')" />
              </div>
              <!-- <div class="w-full mb-3 md:w-1/2">
                <div class="form-check">
                  <input
                    v-model="modifier.available"
                    id="modifier-available"
                    class="form-check-switch"
                    type="checkbox"
                  />
                  <label
                    class="form-check-label text-base"
                    for="modifier-available"
                    >Modifier available</label
                  >
                  <div class="text-theme-6" v-text="getError('available')" />
                </div>
              </div> -->
              <div class="w-full mb-3 md:w-1/2">
                <div class="form-check">
                  <input
                    v-model="modifier.default"
                    id="modifier-default"
                    class="form-check-switch"
                    type="checkbox"
                  />
                  <label
                    class="form-check-label text-base"
                    for="modifier-default"
                    >Modifier is default</label
                  >
                  <div class="text-theme-6" v-text="getError('default')" />
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
import { mapGetters } from 'vuex';
import SingleSelect from '../selects/SingleSelect.vue';
import SubmitButton from '../buttons/SubmitButton.vue';
import { useNotyf } from '@/composables/useNotyf';

const notyf = useNotyf();

export default defineComponent({
  props: {
    dispatcher: {
      type: String,
      default: 'postModifierType',
    },
    modalId: {
      type: String,
      default: 'modifier-form-modal',
    },
  },
  data() {
    return {
      name: null,
      id: null,
      modifierTypeId: null,
      isLoading: false,
      modifier: {
        name: '',
        modifier: null,
        price: 0,
        default: true,
        available: true,
      },
      errors: {},
    };
  },
  methods: {
    async submit() {
      try {
        this.isLoading = true;
        // console.log('this.modifier: ', this.modifier);
        const res = await this.$store.dispatch(this.dispatcher, {
          ...this.modifier,
          // modifier: this.modifierTypeId,
        });

        this.hideModal();
        this.$emit('submitted', {
          type: this.modifier.id ? 'edit' : 'add',
          ...res.data,
        });

        notyf.success();
      } catch (error) {
        this.errors = error.response.data;
        notyf.error();
      } finally {
        this.isLoading = false;
      }
    },
    showModal(form) {
      this.modifier = {
        ...this.modifier,
        ...form,
      };
      // this.modifierTypeId = modifierTypeId;
      // if (this.modifier.modifier == null) this.modifier.modifier = 0;
      cash('#' + this.modalId).modal('show');
    },
    hideModal() {
      this.modifier = {
        name: '',
        modifier: null,
        price: 0,
        default: true,
        available: true,
      };

      cash('#' + this.modalId).modal('hide');
    },
    getError(key) {
      return this.errors[key]?.[0];
    },
  },
  computed: {
    ...mapGetters(['getModifierTypes']),
  },
  components: { SingleSelect, SubmitButton },
});
</script>
