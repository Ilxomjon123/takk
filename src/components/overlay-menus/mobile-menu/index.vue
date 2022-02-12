<template>
  <div
    id="mobile-over-menu"
    class="modal modal-slide-over"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header p-5">
          <!-- <h2 class="font-medium text-base mr-auto">Slide Over With Close Button</h2> -->
          <button data-dismiss="modal">
            <XIcon class="w-10 h-10 text-gray-700" />
          </button>
        </div>
        <div class="modal-body">
          <ul class="py-5 text-3xl font-medium">
            <li
              v-for="(menu, index) in formattedMenu"
              :key="(index + 1) + '-link'"
              class="mb-5"
            >
              <router-link
                :to="menu.path"
                :class="menu.selfClass"
                @click="goto"
              >
                <span>{{ menu.label }}</span>
              </router-link>
            </li>
          </ul>
          <ul class="text-3xl font-medium">
            <li class="mb-10">
              <router-link
                v-if="route.path == '/'"
                to="/for-customers"
                class="rounded_btn_1"
                @click="goto"
              >
                <span>For Customers</span>
              </router-link>
              <router-link
                v-if="route.path == '/for-customers'"
                to="/"
                class="rounded_btn_1"
                @click="goto"
              >
                <span>For Coffee Shops</span>
              </router-link>
            </li>
            <li>
              <router-link to="/" class="rounded_btn_1">
                <span>Contact us</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { onMounted, ref } from 'vue'
import cash from 'cash-dom'

const route = useRoute()
const store = useStore()
const formattedMenu = ref([
  {
    label: 'Preordering',
    path: '#preordering-rectangle',
    selfClass: ''
  },
  {
    label: 'Delivery',
    path: '#delivery-rectangle',
    selfClass: ''
  },
  {
    label: 'Loyalty Stamps',
    path: '#loyalty-stamps-rectangle',
    selfClass: ''
  },
  {
    label: 'Self Checkout System',
    path: '#self-checkout-rectangle',
    selfClass: ''
  },
  {
    label: 'Analytics',
    path: '#analytics-rectangle',
    selfClass: ''
  },
  {
    label: 'Sign In',
    path: '/login',
    selfClass: 'text-theme-31'
  },
])

function goto() {
  cash("#mobile-over-menu").modal("hide");
}

onMounted(() => {
  // formattedMenu.value =
})
</script>
