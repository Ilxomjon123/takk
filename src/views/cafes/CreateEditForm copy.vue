<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Cafe Form</h2>
    </div>
    <!-- BEGIN: Form Layout -->
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <div class="intro-y box p-5">
            <div>
              <label for="crud-form-1" class="form-label">{{
                formFields.name.title
              }}</label>
              <Field
                name="name"
                type="text"
                class="form-control w-full"
                :class="{ 'is-invalid': errors.name }"
                :placeholder="formFields.name.title"
              />
              <div class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="mt-3">
              <span class="text-lg">{{ formFields.week_time.title }}</span>
              <label for="week_time_day" class="form-label">{{
                formFields.week_time.title
              }}</label>
              <TomSelect id="week_time_day" name="week_time_day" class="w-full">
                <option
                  v-for="(day, index) in formFields.week_time.day.options"
                  :key="day + index"
                  >{{ day }}</option
                >
              </TomSelect>
              <div class="invalid-feedback">{{ errors.week_time_day }}</div>
            </div>

            <div class="mt-3">
              <label for="crud-form-2" class="form-label">Category</label>
              <TomSelect
                id="crud-form-2"
                v-model="categories"
                class="w-full"
                multiple
              >
                <option value="1">Sport & Outdoor</option>
                <option value="2">PC & Laptop</option>
                <option value="3">Smartphone & Tablet</option>
                <option value="4">Photography</option>
              </TomSelect>
            </div>

            <div class="mt-3">
              <label>Active Status</label>
              <div class="mt-2">
                <input type="checkbox" class="form-check-switch" />
              </div>
            </div>
            <div class="mt-3">
              <label>Description</label>
              <div class="mt-2">
                <ClassicEditor v-model="editorData" :config="editorConfig" />
              </div>
            </div>
            <div class="text-right mt-5">
              <button type="button" class="btn btn-outline-secondary w-24 mr-1">
                Cancel
              </button>
              <button type="button" class="btn btn-primary w-24">Save</button>
            </div>
          </div>
        </div>
        <div class="intro-y col-span-12 lg:col-span-6">
          <div class="intro-y box p-5">
            <div class="mt-3">
              <h2 class="text-lg">{{ formFields.week_time.title }}</h2>
              <label for="week_time_day" class="form-label">{{
                formFields.week_time.title
              }}</label>
              <TomSelect id="week_time_day" name="week_time_day" class="w-full">
                <option
                  v-for="(day, index) in formFields.week_time.day.options"
                  :key="day + index"
                  >{{ day }}</option
                >
              </TomSelect>
              <div class="invalid-feedback">{{ errors.week_time_day }}</div>
            </div>

            <div class="mt-3">
              <label>{{ formFields.week_time.is_open.title }}</label>
              <div class="mt-2">
                <input
                  type="checkbox"
                  name="week_time_is_open"
                  class="form-check-switch"
                />
              </div>
            </div>

            <div class="mt-3">
              <label>{{ formFields.week_time.opening_time.title }}</label>
              <div class="mt-2">
                <input
                  type="time"
                  name="week_time_opening_time"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <!-- END: Form Layout -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm, Form, Field } from 'vee-validate';
import * as yup from 'yup';
import formFields from './formFields.js';

const schema = yup.object({
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(8)
});

const { handleSubmit } = useForm({
  validationSchema: schema
});

// No need to define rules for fields
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});

const categories = ref([1, 3]);

const editorConfig = {
  toolbar: {
    items: ['bold', 'italic', 'link']
  }
};

const editorData = ref('<p>Content of the editor.</p>');
</script>
