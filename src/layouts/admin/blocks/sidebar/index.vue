<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideMenuTooltip from '@/components/side-menu-tooltip/Main.vue';
import { linkTo, enter, leave, nestedMenu } from './configs.js';
import { useStore } from '@/store';
import { helper as $h } from '@/utils/helper';
import cash from 'cash-dom';
import useWebSocket from '@/features/useWebSocket.js';

const route = useRoute();
const router = useRouter();
const store = useStore();
const formattedMenu = ref([]);
const sideMenu = computed(() =>
  nestedMenu(store.state.adminSideMenu.menu, route)
);
const { setConnection, sendEvent, getConnection } = useWebSocket();
const authUser = store.getters['getUser'];

watch(
  computed(() => route.path),
  () => {
    formattedMenu.value = $h.toRaw(sideMenu.value);
  }
);

onMounted(async () => {
  cash('body')
    .removeClass('error-page')
    .removeClass('login')
    .addClass('main');

  formattedMenu.value = $h.toRaw(sideMenu.value);

  // connect to web socket
  await setConnection();

  getConnection.value.onopen = function(event) {
    // console.log('Successfully connected to the websocket server...');
    // console.log(event);
    sendEvent(
      JSON.stringify({
        event_type: 'customer_update_status',
        data: {
          id: authUser.id,
          status: true
        }
      })
    );
  };
});
</script>

<template>
  <nav class="side-nav">
    <!-- BEGIN: Logo -->
    <router-link
      to="/admin"
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
                  :class="{
                    'side-menu--active':
                      subMenu.active || route.name.startsWith(subMenu.pageName)
                  }"
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
                      v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
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
                        <div class="side-menu__title">
                          {{ lastSubMenu.title }}
                        </div>
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
</template>
