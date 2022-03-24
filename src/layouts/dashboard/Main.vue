<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <MobileMenu />
    <div class="flex">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav">
        <!-- BEGIN: Logo -->
        <router-link
          to="/dashboard"
          tag="a"
          class="intro-x flex items-center pl-5 pt-4"
        >
          <img alt="Takk" class="w-24" src="@/assets/images/new-logo.png" />
        </router-link>
        <!-- END: Logo -->
        <div class="side-nav__devider my-6"></div>
        <ul>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li
              v-if="menu == 'devider'"
              :key="menu + menuKey"
              class="side-nav__devider my-6"
            ></li>
            <li v-else :key="menu + menuKey + '2'">
              <SideMenuTooltip
                tag="a"
                :content="menu.title"
                :href="
                  menu.subMenu
                    ? 'javascript:;'
                    : router.resolve({ name: menu.pageName }).path
                "
                class="side-menu"
                :class="{
                  'side-menu--active': menu.active,
                  'side-menu--open': menu.activeDropdown
                }"
                @click="linkTo(menu, router, $event)"
              >
                <div class="side-menu__icon">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                  <div
                    v-if="menu.subMenu"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-90': menu.activeDropdown }"
                  >
                    <ChevronRightIcon />
                  </div>
                </div>
              </SideMenuTooltip>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li
                    v-for="(subMenu, subMenuKey) in menu.subMenu"
                    :key="subMenuKey"
                  >
                    <SideMenuTooltip
                      tag="a"
                      :content="subMenu.title"
                      :href="
                        subMenu.subMenu
                          ? 'javascript:;'
                          : router.resolve({ name: subMenu.pageName }).path
                      "
                      class="side-menu"
                      :class="{ 'side-menu--active': subMenu.active || $route.name.startsWith(subMenu.pageName) }"
                      @click="linkTo(subMenu, router, $event)"
                    >
                      <div class="side-menu__icon ml-5">
                        <component
                          :is="subMenu.icon"
                          v-if="subMenu.icon?.length > 0"
                        />
                        <ActivityIcon v-else />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <div
                          v-if="subMenu.subMenu"
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown
                          }"
                        >
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li
                          v-for="(lastSubMenu,
                          lastSubMenuKey) in subMenu.subMenu"
                          :key="lastSubMenuKey"
                        >
                          <SideMenuTooltip
                            tag="a"
                            :content="lastSubMenu.title"
                            :href="
                              lastSubMenu.subMenu
                                ? 'javascript:;'
                                : router.resolve({ name: lastSubMenu.pageName })
                                  .path
                            "
                            class="side-menu"
                            :class="{ 'side-menu--active': lastSubMenu.active }"
                            @click="linkTo(lastSubMenu, router, $event)"
                          >
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div
                              class="side-menu__title"
                            >{{ lastSubMenu.title }}</div>
                          </SideMenuTooltip>
                        </li>
                      </ul>
                    </transition>
                    <!-- END: Third Child -->
                  </li>
                </ul>
              </transition>
              <!-- END: Second Child -->
            </li>
          </template>
          <!-- END: First Child -->
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <TopBar />
        <div class="relative">
          <GlobalLoader />
        </div>
        <router-view />
        <SuccessNotification />
        <ErrorNotification />
      </div>
      <!-- END: Content -->
      <!-- BEGIN: Success Notification Content -->
      <div
        id="success-notification-content"
        class="toastify-content hidden flex"
      >
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Data saved successfully!</div>
          <div
            class="text-gray-600 mt-1"
          >Please check your e-mail for further info!</div>
        </div>
      </div>
      <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <div
        id="failed-notification-content"
        class="toastify-content hidden flex"
      >
        <XCircleIcon class="text-theme-6" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Data save failed!</div>
          <div class="text-gray-600 mt-1">Please check the fileld form.</div>
        </div>
      </div>
      <!-- END: Failed Notification Content -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { helper as $h } from '@/utils/helper'
import TopBar from '@/components/top-bar/Main.vue'
import MobileMenu from '@/components/mobile-menu/Main.vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import SideMenuTooltip from '@/components/side-menu-tooltip/Main.vue'
import { linkTo, nestedMenu, enter, leave } from './index'
import cash from 'cash-dom'
import GlobalLoader from '@/components/GlobalLoader.vue'
import SuccessNotification from '@/components/notifications/SuccessNotification.vue'
import ErrorNotification from '@/components/notifications/ErrorNotification.vue'
import useWebSocket from "@/features/useWebSocket.js"

const route = useRoute()
const router = useRouter()
const store = useStore()
const formattedMenu = ref([])
const sideMenu = computed(() =>
  nestedMenu(store.state.sideMenu.menu, route)
)
const { setConnection, sendEvent, getConnection } = useWebSocket();
const authUser = store.getters['getUser'];

watch(
  computed(() => route.path),
  () => {
    formattedMenu.value = $h.toRaw(sideMenu.value)
  }
)

onMounted(async () => {
  if (store.getters['getStep'] != store.state.user.STEP_DASHBOARD)
    router.push('/entry')

  cash('body')
    .removeClass('error-page')
    .removeClass('login')
    .addClass('main')

  formattedMenu.value = $h.toRaw(sideMenu.value)

  // connect to web socket
  await setConnection()

  getConnection.value.onopen = function (event) {
    console.log('Successfully connected to the websocket server...');
    console.log(event);
    sendEvent(JSON.stringify(
      {
        "event_type": "customer_update_status",
        "data": {
          "id": authUser.id,
          "status": true
        }
      }
    ));
  };


});
</script>

<style lang="scss">
.main {
  background-repeat: no-repeat;
  background-attachment: fixed;
  @apply py-5;
}
</style>
