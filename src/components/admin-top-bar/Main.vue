<script setup>
import ProfileAvatar from './parts/ProfileAvatar.vue';
import Breadcumb from './parts/Breadcumb.vue';
import ThemeModeButton from '../dark-mode-switcher/Button.vue';
import RouteBackButton from './parts/RouteBackButton.vue';
import CompanySelect from '../selects/CompanySelect.vue';
</script>

<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <RouteBackButton />
    <Breadcumb />
    <!-- END: Breadcrumb -->
    <!-- BEGIN: Search -->
    <!-- <GlobalSearch /> -->
    <!-- END: Search -->
    <!-- BEGIN: Notifications -->
    <!-- <Notifications /> -->
    <!-- END: Notifications -->
    <!-- <CompanySelect class="mr-3 w-60" @update:modelValue="changeCompany" v-model="selectedCompnay"/> -->
    <CompanySelect class="w-44 mr-3" />
    <ProfileAvatar />
    <ThemeModeButton class="ml-3" />
    <!-- BEGIN: Account Menu -->
    <!-- END: Account Menu -->
  </div>
  <!-- END: Top Bar -->
</template>
