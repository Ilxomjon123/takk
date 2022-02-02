<template>
  <div class="box rounded-md p-3 relative zoom-in">
    <div class="h-60 image-fit cursor-pointer mx-auto mb-3">
      <img class="rounded-md" alt="Takk" :src="employee?.user?.avatar" />
    </div>
    <div
      class="block font-bold text-center mt-3 text-lg"
    >{{ employee?.user?.username }}</div>
    <div
      class="block text-center text-gray-700 dark:text-gray-600 block"
    >{{ getPosition }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getEmployeeTypes']),
    getPosition() {
      return this.getEmployeeTypes.find(el => el.value == this.employee.employee_position)?.name;
    }
  }
})
</script>
