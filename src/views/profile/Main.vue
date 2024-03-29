<template>
  <div class="grid grid-cols-12 gap-6">
    <!-- BEGIN: Profile Menu -->

    <!-- END: Profile Menu -->
    <div class="col-span-12 lg:col-span-12 2xl:col-span-12">
      <!-- BEGIN: Display Information -->
      <div class="intro-y box lg:mt-5" v-if="!globalLoading">
        <div
          class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
        >
          <h2 class="font-medium text-base mr-auto">Profile</h2>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-12 gap-6">
            <div
              class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
            >
              <div class="intro-y">
                <div
                  class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5 items-center"
                >
                  <div
                    class="h-60 w-60 image-fit cursor-pointer zoom-in mx-auto mb-3"
                  >
                    <img class="rounded-md" alt="Takk" :src="user.avatar" />
                    <input
                      type="file"
                      hidden
                      id="avatar-image"
                      @change="(e) => changeImage(e, 'avatar')"
                    />
                  </div>
                  <div class="text-theme-6" v-text="getError('avatar')" />
                  <div class="mx-auto cursor-pointer relative mt-5">
                    <button
                      type="button"
                      @click="clickInput('avatar-image')"
                      class="btn btn-primary w-full"
                    >
                      Change Photo
                    </button>
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
                  <label for="phone" class="form-label">Phone</label>
                  <input
                    disabled
                    id="phone"
                    type="text"
                    class="form-control"
                    :class="
                      getError('phone') != null
                        ? 'border-theme-6'
                        : 'border-gray-300'
                    "
                    placeholder="Phone"
                    v-model="getUser.phone"
                  />
                  <div class="text-theme-6" v-text="getError('phone')" />
                </div>
                <div class="w-full px-3 mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    id="username"
                    type="text"
                    class="form-control"
                    :class="
                      getError('username') != null
                        ? 'border-theme-6'
                        : 'border-gray-300'
                    "
                    placeholder="Username"
                    v-model="user.username"
                  />
                  <div class="text-theme-6" v-text="getError('username')" />
                </div>
                <div class="w-full px-3 mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    :class="
                      getError('email') != null
                        ? 'border-theme-6'
                        : 'border-gray-300'
                    "
                    placeholder="example@gmail.com"
                    v-model="user.email"
                  />
                  <div class="text-theme-6" v-text="getError('email')" />
                </div>
                <div class="w-full px-3 mb-3">
                  <label for="birth-date" class="form-label">Birthday</label>
                  <div class="relative mx-auto">
                    <div
                      class="absolute rounded-l w-10 h-full flex items-center justify-center bg-gray-100 border text-gray-600 dark:bg-dark-1 dark:border-dark-4"
                    >
                      <CalendarIcon class="w-4 h-4" />
                    </div>
                    <Litepicker
                      v-model="user.date_of_birthday"
                      :options="{
                        autoApply: false,
                        showWeekNumbers: true,
                        format: 'DD MMM YYYY',
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }"
                      class="form-control pl-12"
                    />
                  </div>
                  <div
                    class="text-theme-6"
                    v-text="getError('date_of_birthday')"
                  />
                </div>
              </div>
              <div class="flex justify-end gap-3">
                <SubmitButton :is-loading="isLoading" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useNotyf } from '@/composables/useNotyf';
import SubmitButton from '@/components/buttons/SubmitButton.vue';

const notyf = useNotyf();

export default defineComponent({
  data() {
    return {
      images: {},
      isLoading: false,
      errors: {},
      user: {},
      successMessage: 'Successfully saved!',
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    globalLoading() {
      return this.$store.state.common.loadingStatus;
    },
  },
  async created() {
    await this.fetchProfile();
    this.user = { ...this.getUser };
    if (this.user.date_of_birthday == null) {
      this.user.date_of_birthday = '28-04-1998';
    }
  },
  methods: {
    ...mapActions(['putProfile', 'fetchProfile']),
    clickInput(name) {
      document.getElementById(name).click();
    },
    changeImage(e, name) {
      this.images[name] = e.target.files[0];
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      this.user[name] = fileUrl;
    },
    removeAvatar() {
      this.images['avatar'] == null;
      this.user.avatar == null;
    },
    async submit() {
      try {
        this.isLoading = true;
        this.errors = {};
        let form = this.user;
        form = { ...form, ...this.images };
        const formData = new FormData();
        for (var key in form) {
          if (key == 'avatar') {
            if (typeof form[key] != 'string') formData.append(key, form[key]);
          } else formData.append(key, form[key]);
        }
        await this.putProfile(formData);
        this.user = this.getUser;
        notyf.success();
      } catch (error) {
        console.log({ error });
        notyf.error();
        this.errors = error.response?.data;
      } finally {
        this.isLoading = false;
      }
    },
    getError(key) {
      return this.errors[key]?.[0];
    },
  },
  components: { SubmitButton },
});
</script>
