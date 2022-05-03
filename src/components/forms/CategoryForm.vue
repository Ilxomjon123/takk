<template>
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <div class="intro-y">
      <div
        class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5 items-center"
      >
        <div class="h-60 w-60 image-fit cursor-pointer zoom-in mx-auto">
          <img class="rounded-md" alt="Takk" :src="category?.image" />
          <input
            type="file"
            hidden
            id="avatar-image"
            @change="e => changeImage(e, 'image')"
          />
          <!-- <Tippy
                        tag="div"
                        content="Remove this profile photo?"
                        class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-6 right-0 top-0 -mr-2 -mt-2"
                        @click="removeAvatar"
                      >
                        <xIcon class="w-4 h-4" />
          </Tippy>-->
        </div>
        <div class="text-theme-6" v-text="getError('image')" />
        <div class="mx-auto cursor-pointer relative mt-5">
          <button
            type="button"
            @click="clickInput('avatar-image')"
            class="btn btn-primary w-full"
          >Change Photo</button>
        </div>
      </div>
    </div>
  </div>
  <form
    @submit.prevent="submit"
    class="col-span-12 lg:col-span-8 2xl:col-span-9"
  >
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3">
        <div class="form-check">
          <input
            v-model="category.available"
            id="category-available"
            class="form-check-switch"
            type="checkbox"
          />
          <label
            class="form-check-label text-base"
            for="category-available"
          >Available</label>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-3 mb-3">
        <div class="form-check">
          <input
            v-model="category.is_kitchen"
            id="kitchen-order"
            class="form-check-switch"
            type="checkbox"
          />
          <label
            class="form-check-label text-base"
            for="kitchen-order"
          >Kitchen Order</label>
        </div>
      </div>
      <div class="w-full px-3 mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          id="name"
          type="text"
          class="form-control"
          :class="getError('name') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Name"
          v-model="category.name"
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>

      <label for="start-time" class="w-full px-3 mb-2">Available Time</label>
      <div class="w-full px-3 mb-3 md:w-1/2">
        <input
          id="start-time"
          type="time"
          class="form-control"
          :class="getError('start') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Username"
          v-model="category.start"
        />
        <div class="text-theme-6" v-text="getError('start')" />
      </div>
      <div class="w-full px-3 mb-3 md:w-1/2">
        <input
          id="end-time"
          type="time"
          class="form-control"
          :class="getError('end') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Username"
          v-model="category.end"
        />
        <div class="text-theme-6" v-text="getError('end')" />
      </div>
      <div class="w-full px-3 mb-3">
        <label class="form-label">Parent Category</label>
        <TomSelect
          v-model="category.parent"
          :options="{
            placeholder: 'Select Category'
          }"
          class="w-full"
        >
          <option value="0">- - - - - - -</option>
          <option
            v-for="(item, index) in categoryList"
            :key="index"
            :value="item.id"
          >{{ item.name }}</option>
        </TomSelect>
        <div class="text-theme-6" v-text="getError('parent')" />
      </div>
      <div class="text-theme-6" v-text="errors?.detail" />
    </div>
    <div>
      <div class="mx-auto">
        <button
          type="submit"
          class="btn btn-primary mt-8 px-10 py-3 px-4 mr-3"
          :disabled="isLoading"
        >
          {{ isLoading ? '' : 'Save' }}
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
  <SuccessNotification ref="successNotification" :message="successMessage" />
  <ErrorNotification ref="errorNotification" />
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex';
import SuccessNotification from '../../components/notifications/SuccessNotification.vue';
import ErrorNotification from '../../components/notifications/ErrorNotification.vue';
import { jsonToFormData } from '../../utils/functions'
export default defineComponent({
  data() {
    return {
      category: {},
      images: {},
      isLoading: false,
      errors: {},
      successMessage: "Successfully saved!",
      menuId: null
    };
  },
  computed: {
    ...mapGetters(['getCategories']),
    categoryList() {
      return this.getCategories.filter(item => item.id != this.category?.id)
    }
  },
  props: {
    form: {
      type: Object,
      default: {
        image: '/src/assets/images/product_category.jpg'
      },
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    dispatcher: {
      type: String,
      default: 'postCategory'
    }
  },
  async created() {
    this.menuId = this.$route.params.menuId;
    this.$store.commit('setSelectedMenuId', this.menuId);
    this.category = this.form;
    await this.fetchCategories();
  },
  methods: {
    ...mapActions(['fetchCategories']),

    // Image part start
    clickInput(name) {
      document.getElementById(name).click();
    },
    changeImage(e, name) {
      this.images[name] = e.target.files[0];
      const fileUrl = URL.createObjectURL(e.target.files[0])
      this.category[name] = fileUrl;
    },
    removeAvatar() {
      this.images['image'] == null;
      this.form.user.image == null;
    },
    // Image part end

    async submit() {
      this.isLoading = true;
      if (this.category?.parent == 0) {
        this.category.parent = null;
      }
      let formData;
      const data = { ...this.category, ...this.images, menu: this.menuId };
      if (typeof data.image == 'string')
        delete data.image;
      if (this.isEdit) {
        formData = {
          id: data.id,
          form: jsonToFormData(data),
        }
      } else {
        formData = jsonToFormData(data);
      }
      this.errors = {};

      const res = await this.$store.dispatch(this.dispatcher, formData);
      if (res.status) {
        this.errors = {};
        this.$refs.successNotification.show();
        this.$router.push('/dashboard/categories')
      }
      else {
        this.$refs.errorNotification.show();
        this.errors = res.data;
      }
      this.isLoading = false;
    },
    getError(key) {
      return this.errors[key]?.[0];
    }
  },
  components: { SuccessNotification, ErrorNotification }
})
</script>

<style>
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(100%) sepia(13%) saturate(3207%) hue-rotate(130deg)
    brightness(100%) contrast(80%);
}
</style>