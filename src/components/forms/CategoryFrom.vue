<template>
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <div class="intro-y">
      <div
        class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5 items-center"
      >
        <div class="h-60 w-60 image-fit cursor-pointer zoom-in mx-auto">
          <img class="rounded-md" alt="Takk" :src="category?.user?.image" />
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
        <div class="mx-auto cursor-pointer relative mt-5" v-if="!isEdit">
          <button
            type="button"
            @click="clickInput('avatar-image')"
            class="btn btn-primary w-full"
          >Change Photo</button>
          <div class="text-theme-6" v-text="getError('image')" />
        </div>
      </div>
    </div>
  </div>
  <form
    @submit.prevent="submit"
    class="col-span-12 lg:col-span-8 2xl:col-span-9"
  >
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3 mb-3">
        <div class="form-check">
          <input
            id="checkbox-switch-7"
            class="form-check-switch"
            type="checkbox"
          />
          <label
            class="form-check-label text-base"
            for="checkbox-switch-7"
          >Available</label>
        </div>
      </div>
      <div class="w-full px-3 mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          :disabled="isEdit"
          id="name"
          type="text"
          class="form-control"
          :class="getError('name') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Name"
          v-model="category.name"
        />
        <div class="text-theme-6" v-text="getError('name')" />
      </div>

      <label for="username" class="w-full px-3 mb-2">Available Time</label>
      <div class="w-full px-3 mb-3 md:w-1/2">
        <input
          :disabled="isEdit"
          id="username"
          type="time"
          class="form-control"
          :class="getError('username') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Username"
          v-model="category.user.username"
        />
        <div class="text-theme-6" v-text="getError('username')" />
      </div>
      <div class="w-full px-3 mb-3 md:w-1/2">
        <input
          :disabled="isEdit"
          id="username"
          type="time"
          class="form-control"
          :class="getError('username') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Username"
          v-model="category.user.username"
        />
        <div class="text-theme-6" v-text="getError('username')" />
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
          <option
            v-for="(item, index) in getCategories"
            :key="index"
            :value="item.value"
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
            class="w-8 h-8 my-2"
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
      cafeList: [],
      deleteLoading: false,
      menuId: null
    };
  },
  computed: {
    ...mapGetters(['getcategoryTypes', 'getCompanyId'])
  },
  props: {
    form: {
      type: Object,
      default: {
        user: {
          avatar: '/src/assets/images/category.png'
        },
        cafes: [],
        category_position: 2
      },
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    dispatcher: {
      type: String,
      default: 'postcategoryNew'
    }
  },
  async created() {
    this.menuId = this.$route.params.menuId;
    this.$store.commit('setSelectedMenuId', this.menuId),
      this.category = this.form;
    this.category.cafes = this.category.cafes.map(el => el.id);
    this.cafeList = await this.fetchCategories();
  },
  methods: {
    ...mapActions(['fetchCategories']),
    clickInput(name) {
      document.getElementById(name).click();
    },
    changeImage(e, name) {
      this.images[name] = e.target.files[0];
      const fileUrl = URL.createObjectURL(e.target.files[0])
      this.category.user[name] = fileUrl;
    },
    removeAvatar() {
      this.images['image'] == null;
      this.form.user.image == null;
    },
    async submit() {
      this.isLoading = true;
      const user = { ...this.category.user, ...this.images, password: '123456' }
      const userData = {};
      for (var key in user) {
        if (key == 'image') {
          if (typeof user[key] != 'string')
            userData[key] = user[key];
        } else {
          userData[key] = user[key];
        }
      }

      const formData = {};
      for (var key in this.category) {
        formData[key] = this.category[key];
      }
      formData['user'] = userData;
      formData['company'] = this.getCompanyId;
      // const data = jsonToFormData(formData);
      this.errors = {};
      const res = await this.$store.dispatch(this.dispatcher, formData);
      if (res.status) {
        this.errors = {};
        this.$refs.successNotification.show();
        this.$router.push('categories')
      }
      else {
        this.$refs.errorNotification.show();
        this.errors = res.data;
      }
      this.isLoading = false;
    },
    async deletecategory() {
      this.deleteLoading = true;
      this.errors = {};
      const res = await this.$store.dispatch('deletecategory', this.category?.id);
      if (res.status) {
        this.errors = {};
        if (res.status) {
          this.$refs.successNotification.show();
          this.$router.push({ name: 'categorys' });
        }
        else {
          this.$refs.errorNotification.show();
        }
      }
      else {
        this.errors = res.data;
      }
      this.deleteLoading = false;
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