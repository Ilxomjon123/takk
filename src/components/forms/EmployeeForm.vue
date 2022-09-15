<template>
  <div
    class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
  >
    <SimpleImageUpload
      :image-path="employee.user?.avatar"
      @update-image-file="employee.user.avatar = $event"
    />
    <!-- <div class="intro-y">
      <div
        class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5 items-center"
      >
        <div class="h-60 image-fit cursor-pointer zoom-in mx-auto">
          <img class="rounded-md" alt="Takk" :src="employee.user?.avatar" />
          <input
            type="file"
            hidden
            id="avatar-image"
            @change="e => changeImage(e, 'avatar')"
          />
        </div>
      </div>
    </div> -->
  </div>
  <form
    @submit.prevent="submit"
    class="col-span-12 lg:col-span-8 2xl:col-span-9"
  >
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3 mb-3">
        <label for="phone" class="form-label">
          Phone <span class="text-theme-6">*</span>
        </label>
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
          v-model="employee.user.username"
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
            v-model="employee.user.date_of_birthday"
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
        <label for="employee.username" class="form-label">
          Position <span class="text-theme-6">*</span>
        </label>
        <TomSelect class="w-full" v-model="employee.employee_position">
          <option value="">Select position</option>
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
          <option disabled value="">Select cafe</option>
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
        @onConfirmedDelete="deleteEmployee"
        :isLoading="deleteLoading"
        v-if="isEdit"
      />
      <SubmitButton :is-loading="isLoading" />
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { isUndefined } from 'lodash';
import { useNotyf } from '@/composables/useNotyf';
import { fetchCafeList } from '@/api';
import DeleteConfirmModal from '../modals/DeleteConfirmModal.vue';
import SimpleImageUpload from './file-upload/SimpleImageUpload.vue';
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
      images: {},
      isLoading: false,
      errors: {},
      cafeList: [],
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
          avatar: '/src/assets/images/default_employee.png',
        },
        cafes: [],
        employee_position: '',
        phone: '',
      },
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    dispatcher: {
      type: String,
      default: 'postEmployeeExist',
    },
    isAddExist: {
      type: Boolean,
      default: false,
    },
  },
  async created() {
    this.employee = this.form;
    this.employee.cafes = this.form.cafes
      ?.filter((el) => !isUndefined(el))
      .map((el) => el.id);
    this.cafeList = await fetchCafeList();
  },
  methods: {
    ...mapActions(['fetchCafeList']),

    async submit() {
      try {
        this.isLoading = true;
        this.errors = {};

        let data;

        if (this.isEdit) {
          data = {
            id: this.employee?.id,
            form: this.employee,
          };
        } else {
          data = this.employee;
        }
        const res = await this.$store.dispatch(this.dispatcher, data);

        notyf.success();
        this.$router.push('/dashboard/employees');
      } catch (error) {
        notyf.error();
        this.errors = error.response?.data;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteEmployee() {
      try {
        this.deleteLoading = true;
        this.errors = {};
        const res = await this.$store.dispatch(
          'deleteEmployee',
          this.employee?.id
        );
        notyf.success('Record deleted successfully!');
        this.$router.push({ name: 'employees' });
      } catch (error) {
        notyf.error('Error while deleting data: ' + error.messages);
      } finally {
        this.deleteLoading = false;
      }
    },
    getError(key) {
      return this.errors[key]?.[0];
    },
  },
  components: { DeleteConfirmModal, SimpleImageUpload, SubmitButton },
});
</script>
