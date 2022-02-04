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
              <label for="menu-name" class="form-label">Name</label>
              <input
                id="menu-name"
                required
                v-model="name"
                class="form-control w-full mt-2"
                placeholder="Name"
              />
            </div>
          </div>
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 mr-1"
            >Cancel</button>
            <button type="submit" class="btn btn-primary w-24">
              {{ isLoading ? '' : 'Add' }}
              <LoadingIcon
                v-if="isLoading"
                icon="three-dots"
                color="white"
                class="my-2"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import cash from 'cash-dom'

export default defineComponent({
  props: {
    dispatcher: {
      type: String,
      default: "postMenu"
    },
    modalId: {
      type: String,
      default: 'menu-form-modal'
    }
  },
  data() {
    return {
      name: null,
      id: null,
      isLoading: false,
      errors: {}
    }
  },
  methods: {
    async submit() {
      this.isLoading = true;

      const res = await this.$store.dispatch(this.dispatcher, { id: this.id, name: this.name });
      if (res.status) {
        this.hideModal();
        this.$emit('submitted');
      } else {
        this.errors = res.data;
      }

      this.isLoading = false;
    },
    showModal(form) {
      this.name = form?.name;
      this.id = form?.id;
      cash('#' + this.modalId).modal('show');
    },
    hideModal() {
      cash('#' + this.modalId).modal('hide');
    }
  }
})
</script>
