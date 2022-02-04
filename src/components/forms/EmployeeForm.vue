<template>
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <div class="intro-y">
      <div
        class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5 items-center"
      >
        <div class="h-60 w-60 image-fit cursor-pointer zoom-in mx-auto">
          <img class="rounded-md" alt="Takk" :src="employee?.user?.avatar" />
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
        <div class="mx-auto cursor-pointer relative mt-5" v-if="!isEdit">
          <button
            type="button"
            @click="clickInput('avatar-image')"
            class="btn btn-primary w-full"
          >Change Photo</button>
          <div class="text-theme-6" v-text="getError('avatar')" />
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
          :disabled="isEdit"
          id="phone"
          type="text"
          class="form-control"
          :class="getError('phone') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Phone"
          v-model="employee.user.phone"
        />
        <div class="text-theme-6" v-text="getError('phone')" />
      </div>
      <div class="w-full px-3 mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          :disabled="isEdit"
          id="username"
          type="text"
          class="form-control"
          :class="getError('username') != null ? 'border-theme-6' : 'border-gray-300'"
          placeholder="Username"
          v-model="employee.user.username"
        />
        <div class="text-theme-6" v-text="getError('username')" />
      </div>
      <div class="w-full px-3 mb-3">
        <label for="employee.username" class="form-label">Position</label>
        <TomSelect
          v-model="employee.employee_position"
          :options="{
            placeholder: 'Select Position'
          }"
          class="w-full"
        >
          <option
            v-for="(item, index) in getEmployeeTypes"
            :key="index"
            :value="item.value"
          >{{ item.name }}</option>
        </TomSelect>
        <div class="text-theme-6" v-text="getError('employee_position')" />
      </div>
      <div class="w-full px-3 mb-3">
        <label class="form-label">Cafes</label>
        <TomSelect
          v-model="employee.cafes"
          :options="{
            placeholder: 'Select Position',
          }"
          class="w-full"
          multiple
        >
          <option
            v-for="(item, index) in cafeList"
            :key="index"
            :value="item.id"
          >{{ item.name }}</option>
        </TomSelect>
        <div class="text-theme-6" v-text="getError('cafes')" />
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
        <DeleteConfirmModal
          @onConfirmedDelete="deleteEmployee"
          :isLoading="deleteLoading"
          v-if="isEdit"
        />
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
import { fetchCafeList } from '../../api';
import { jsonToFormData } from '../../utils/functions'
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
export default defineComponent({
  data() {
    return {
      employee: {},
      images: {},
      isLoading: false,
      errors: {},
      successMessage: "Successfully saved!",
      cafeList: [],
      deleteLoading: false
    };
  },
  computed: {
    ...mapGetters(['getEmployeeTypes', 'getCompanyId'])
  },
  props: {
    form: {
      type: Object,
      default: {
        user: {
          avatar: '/src/assets/images/employee.png'
        },
        cafes: [],
        employee_position: 2
      },
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    dispatcher: {
      type: String,
      default: 'postEmployeeNew'
    }
  },
  async created() {
    this.employee = this.form;
    this.employee.cafes = this.employee.cafes.map(el => el.id);
    this.cafeList = await fetchCafeList();
  },
  methods: {
    ...mapActions(['fetchCafeList']),
    clickInput(name) {
      document.getElementById(name).click();
    },
    changeImage(e, name) {
      this.images[name] = e.target.files[0];
      const fileUrl = URL.createObjectURL(e.target.files[0])
      this.employee.user[name] = fileUrl;
    },
    removeAvatar() {
      this.images['avatar'] == null;
      this.form.user.avatar == null;
    },
    async submit() {
      this.isLoading = true;
      const user = { ...this.employee.user, ...this.images, password: '123456' }
      const userData = {};
      for (var key in user) {
        if (key == 'avatar') {
          if (typeof user[key] != 'string')
            userData[key] = user[key];
        } else {
          userData[key] = user[key];
        }
      }

      const formData = {};
      for (var key in this.employee) {
        formData[key] = this.employee[key];
      }
      formData['user'] = userData;
      formData['company'] = this.getCompanyId;
      // const data = jsonToFormData(formData);
      this.errors = {};
      const res = await this.$store.dispatch(this.dispatcher, formData);
      if (res.status) {
        this.errors = {};
        this.$refs.successNotification.show();
        this.$router.push('employees')
      }
      else {
        this.$refs.errorNotification.show();
        this.errors = res.data;
      }
      this.isLoading = false;
    },
    async deleteEmployee() {
      this.deleteLoading = true;
      this.errors = {};
      const res = await this.$store.dispatch('deleteEmployee', this.employee?.id);
      if (res.status) {
        this.errors = {};
        if (res.status) {
          this.$refs.successNotification.show();
          this.$router.push({ name: 'employees' });
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
  components: { SuccessNotification, ErrorNotification, DeleteConfirmModal }
})
</script>