<template>
  <div>
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
                        @change="e => changeImage(e, 'avatar')"
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
                          format: 'YYYY-MM-DD',
                          dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: true,
                            years: true
                          }
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
                <div>
                  <button
                    type="submit"
                    class="btn btn-primary py-3 block mx-auto mt-8 px-10 align-top"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SuccessNotification ref="successNotification" :message="successMessage" />
  <ErrorNotification ref="errorNotification" />
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import SuccessNotification from '@/components/notifications/SuccessNotification.vue';
import ErrorNotification from '@/components/notifications/ErrorNotification.vue';

export default defineComponent({
  data() {
    return {
      images: {},
      isLoading: false,
      errors: {},
      user: {},
      successMessage: 'Successfully saved!'
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    globalLoading() {
      return this.$store.state.common.loadingStatus;
    }
  },
  async created() {
    this.$store.commit('setLoadingStatus', true);
    await this.fetchProfile();
    this.user = { ...this.getUser };
    if (this.user.date_of_birthday == null) {
      this.user.date_of_birthday = '28-04-1998';
    }
    this.$store.commit('setLoadingStatus', false);
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
      this.isLoading = true;
      let form = this.user;
      // delete form.avatar;
      form = { ...form, ...this.images };
      const formData = new FormData();

      for (var key in form) {
        if (key == 'avatar') {
          if (typeof form[key] != 'string') formData.append(key, form[key]);
        } else formData.append(key, form[key]);
      }
      this.errors = {};
      const res = await this.putProfile(formData);
      // await this.fetchProfile();
      this.user = this.getUser;
      if (res.status) {
        this.errors = {};
        if (res.status) {
          this.$refs.successNotification.show();
          // window.location.reload();
        } else {
          this.$refs.errorNotification.show();
        }
      } else {
        this.errors = res.data;
      }
      this.isLoading = false;
    },
    getError(key) {
      return this.errors[key]?.[0];
    }
  },
  components: { SuccessNotification, ErrorNotification }
});
</script>
