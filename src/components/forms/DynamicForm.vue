<template>
  <Form @submit="onSubmit">
    <div
      v-for="{ as, name, label, children, ...attrs } in schema.fields"
      :key="name"
    >
      <label :for="name">{{ label }}</label>
      <Field :as="as" :id="name" :name="name" v-bind="attrs">
        <template v-if="children && children.length">
          <component
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            :is="tag"
            v-bind="childAttrs"
          >{{ text }}</component>
        </template>
      </Field>
      <ErrorMessage :name="name" />
    </div>

    <button type="submit">Submit</button>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DynamicForm',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },

});
</script>
