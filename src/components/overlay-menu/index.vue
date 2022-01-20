<template>
  <div
    id="mobile-over-menu"
    class="modal modal-slide-over"
    data-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <button data-dismiss="modal">
          <XIcon class="w-8 h-8 text-gray-500" />
        </button>
        <!-- <div class="modal-header p-5">
          <h2 class="font-medium text-base mr-auto">Slide Over With Close Button</h2>
        </div>-->
        <div class="modal-body">
          <ul class="border-t border-theme-29 py-5">
            <li
              v-for="(menu, index) in formattedMenu"
              :key="(index + 1) + '-link'"
            >
              <router-link :to="menu.path" class="menu" @click="goto">
                <p>{{ menu.label }}</p>
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

const store = useStore()
const formattedMenu = ref([
  {
    label: 'Preordering',
    path: '#preordering-rectangle'
  },
  {
    label: 'Delivery',
    path: '#delivery-rectangle'
  },
  {
    label: 'Loyalty Stamps',
    path: '#loyalty-stamps-rectangle'
  },
  {
    label: 'Self Checkout System',
    path: '#self-checkout-rectangle'
  },
  {
    label: 'Analytics',
    path: '#analytics-rectangle'
  },
  {
    label: 'Sign In',
    path: '/login'
  },
])

function goto() {
  cash("#mobile-over-menu").modal("hide");
}

onMounted(() => {
  // formattedMenu.value =
})
</script>
