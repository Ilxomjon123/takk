<template>
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <div class="intro-y">
      <div
        class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5 items-center"
      >
        <div class="h-60 w-60 image-fit cursor-pointer zoom-in mx-auto">
          <img
            class="rounded-md"
            alt="Employee's photo"
            :src="employee.user?.avatar"
            data-action="zoom"
          />
          <!-- <input
            type="file"
            hidden
            id="avatar-image"
            @change="(e) => changeImage(e, 'avatar')"
          /> -->
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
        <span class="text-theme-6">*</span>
        <input
          :disabled="isEdit"
          id="phone"
          type="text"
          class="form-control"
          :class="
            getError('phone') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Phone"
          v-model="employee.phone"
        />
        <div class="text-theme-6" v-text="getError('phone')" />
        <div class="text-theme-6" v-text="errors?.detail" />
      </div>
      <div class="w-full px-3 mb-3" v-if="!isAddExist">
        <label for="username" class="form-label">Username</label>
        <input
          :disabled="isEdit"
          id="username"
          type="text"
          class="form-control"
          :class="
            getError('username') != null ? 'border-theme-6' : 'border-gray-300'
          "
          placeholder="Username"
          v-model="user.username"
        />
        <div class="text-theme-6" v-text="getError('username')" />
      </div>
      <div class="w-full px-3 mb-3" v-if="!isAddExist">
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
        <div class="text-theme-6" v-text="getError('date_of_birthday')" />
      </div>
      <div class="w-full px-3 mb-3">
        <label for="employee.position" class="form-label">Position</label>
        <span class="text-theme-6">*</span>
        <TomSelect
          class="w-full"
          v-model="employee.employee_position"
          :options="{
            placeholder: 'Select Position',
          }"
        >
          <option
            v-for="(item, index) in getEmployeeTypes"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </TomSelect>
        <div class="text-theme-6" v-text="getError('employee_position')" />
      </div>
      <div class="w-full px-3 mb-3">
        <label class="form-label">Cafes</label>
        <TomSelect
          v-model="employee.cafes"
          :options="{
            placeholder: 'Select Cafe',
          }"
          class="w-full"
          multiple
        >
          <option
            v-for="(item, index) in cafeList.results"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </TomSelect>
        <div class="text-theme-6" v-text="getError('cafes')" />
      </div>
    </div>
    <div class="flex justify-end gap-3">
      <DeleteConfirmModal
        @onConfirmedDelete="deleteAdminEmployee"
        :isLoading="deleteLoading"
        v-if="isEdit"
      />
      <SubmitButton :is-loading="isLoading" />
    </div>
  </form>
</template>

<script>
import { isUndefined } from 'lodash';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { useNotyf } from '@/composables/useNotyf';
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import SubmitButton from '../buttons/SubmitButton.vue';

const notyf = useNotyf();

export default defineComponent({
  data() {
    return {
      employee: {
        phone: '',
        employee_position: null,
        cafes: [],
      },
      user: {
        avatar: '',
        date_of_birthday: '2000-01-01',
        phone: '',
        username: '',
      },
      images: {},
      isLoading: false,
      errors: {},
      cafeList: {
        results: [],
      },
      deleteLoading: false,
    };
  },
  computed: {
    ...mapGetters(['getEmployeeTypes', 'getCompanyId']),
  },
  props: {
    form: {
      type: Object,
      default: {
        user: {
          avatar: '/images/default_employee.png',
        },
        cafes: [],
        employee_position: 2,
        phone: '',
      },
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    dispatcher: {
      type: String,
      default: 'adminEmployee/postEmployeeExist',
    },
    isAddExist: {
      type: Boolean,
      default: false,
    },
  },
  async created() {
    this.employee = this.form;
    this.user = this.form.user;
    this.employee.cafes = this.form.cafes
      ?.filter((el) => !isUndefined(el))
      .map((el) => el.id);
    this.cafeList = await this.fetchAdminCafeList();
  },
  methods: {
    ...mapActions({ fetchAdminCafeList: 'adminCafe/fetchAdminCafeList' }),

    async submit() {
      try {
        this.isLoading = true;
        this.errors = {};

        let data;

        if (this.isEdit) {
          data = {
            id: this.employee?.id,
            form: {
              cafes: this.employee.cafes,
              employee_position: this.employee.employee_position,
              user: { date_of_birthday: this.employee.user?.date_of_birthday },
            },
          };
        } else {
          data = this.employee;
        }
        const res = await this.$store.dispatch(this.dispatcher, data);

        notyf.success();
        this.$router.push('/admin/employees');
      } catch (error) {
        notyf.error();
        this.errors = error.response?.data;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteAdminEmployee() {
      this.deleteLoading = true;
      this.errors = {};
      const res = await this.$store.dispatch(
        'adminEmployee/deleteAdminEmployee',
        this.employee?.id
      );

      if (res.status) {
        this.errors = {};
        if (res.status) {
          this.$router.push('/admin/employees');
        } else {
        }
      } else {
        this.errors = res.data;
      }
      this.deleteLoading = false;
    },
    getError(key) {
      return this.errors[key]?.[0];
    },
  },
  components: { DeleteConfirmModal, SubmitButton },
});
</script>
