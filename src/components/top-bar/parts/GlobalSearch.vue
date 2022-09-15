<script setup>
import { ref } from 'vue';

const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};
</script>

<template>
  <div class="intro-x relative mr-3 sm:mr-6">
    <div class="search hidden sm:block">
      <input
        type="text"
        class="search__input form-control border-transparent placeholder-theme-13"
        placeholder="Search..."
        @focus="showSearchDropdown"
        @blur="hideSearchDropdown"
      />
      <SearchIcon class="search__icon dark:text-gray-300" />
    </div>
    <a class="notification sm:hidden" href>
      <SearchIcon class="notification__icon dark:text-gray-300" />
    </a>
    <div class="search-result" :class="{ show: searchDropdown }">
      <div class="search-result__content">
        <div class="search-result__content__title">Pages</div>
        <div class="mb-5">
          <a href class="flex items-center">
            <div
              class="w-8 h-8 bg-theme-18 text-theme-9 flex items-center justify-center rounded-full"
            >
              <InboxIcon class="w-4 h-4" />
            </div>
            <div class="ml-3">Mail Settings</div>
          </a>
          <a href class="flex items-center mt-2">
            <div
              class="w-8 h-8 bg-theme-17 text-theme-11 flex items-center justify-center rounded-full"
            >
              <UsersIcon class="w-4 h-4" />
            </div>
            <div class="ml-3">Users & Permissions</div>
          </a>
          <a href class="flex items-center mt-2">
            <div
              class="w-8 h-8 bg-theme-14 text-theme-10 flex items-center justify-center rounded-full"
            >
              <CreditCardIcon class="w-4 h-4" />
            </div>
            <div class="ml-3">Transactions Report</div>
          </a>
        </div>
        <div class="search-result__content__title">Users</div>
        <div class="mb-5">
          <!-- <a
              v-for="(faker, fakerKey) in $_.take($f(), 4)"
              :key="fakerKey"
              href
              class="flex items-center mt-2"
            >
              <div class="w-8 h-8 image-fit">
                <img
                  alt="Takk"
                  class="rounded-full"
                  :src="`@/assets/images/${faker.photos[0]}`"
                />
              </div>
              <div class="ml-3">{{ faker.users[0].name }}</div>
              <div
                class="ml-auto w-48 truncate text-gray-600 text-xs text-right"
              >{{ faker.users[0].email }}</div>
          </a>-->
        </div>
        <div class="search-result__content__title">Products</div>
        <!-- <a
            v-for="(faker, fakerKey) in $_.take($f(), 4)"
            :key="fakerKey"
            href
            class="flex items-center mt-2"
          >
            <div class="w-8 h-8 image-fit">
              <img
                alt="Takk"
                class="rounded-full"
                :src="`@/assets/images/${faker.images[0]}`"
              />
            </div>
            <div class="ml-3">{{ faker.products[0].name }}</div>
            <div
              class="ml-auto w-48 truncate text-gray-600 text-xs text-right"
            >{{ faker.products[0].category }}</div>
        </a>-->
      </div>
    </div>
  </div>
</template>
