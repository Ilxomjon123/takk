<template>
  <div class="intro-x dropdown w-8 h-8">
    <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in" role="button"
      aria-expanded="false">
      <img alt="Takk" :src="getUser.avatar" />
    </div>
    <div class="dropdown-menu w-56">
      <div class="dropdown-menu__content box bg-theme-26 dark:bg-dark-6 text-white">
        <div class="p-4 border-b border-theme-27 dark:border-dark-3">
          <div class="font-medium">{{ getUser.username }}</div>
          <div class="text-xs text-theme-28 mt-0.5 dark:text-gray-600">{{ getUser.user_type }}</div>
        </div>
        <div class="p-2">
          <router-link data-dismiss="dropdown" to="/dashboard/profile"
            class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
            <UserIcon class="w-4 h-4 mr-2" />Profile
          </router-link>
          <!-- <a
            href
            class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
          >
            <EditIcon class="w-4 h-4 mr-2" />Add Account
          </a>-->
          <a href
            class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
            <HelpCircleIcon class="w-4 h-4 mr-2" />Help
          </a>
        </div>
        <div class="p-2 border-t border-theme-27 dark:border-dark-3">
          <button @click="log_out" data-dismiss="dropdown"
            class="flex w-full items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
            <ToggleRightIcon class="w-4 h-4 mr-2" />Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['logout']),
    log_out() {
      this.logout()
      window.location.replace('/')
    }
  }
})
</script>
