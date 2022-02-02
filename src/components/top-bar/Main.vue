<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <Breadcumb />
    <!-- END: Breadcrumb -->
    <!-- BEGIN: Search -->
    <!-- <GlobalSearch /> -->
    <!-- END: Search -->
    <!-- BEGIN: Notifications -->
    <Notifications />
    <!-- END: Notifications -->
    <ProfileAvatar />
    <!-- BEGIN: Account Menu -->
    <!-- END: Account Menu -->
  </div>
  <!-- END: Top Bar -->
</template>

<script>
import { defineComponent } from 'vue'
import ProfileAvatar from './parts/ProfileAvatar.vue'
import Breadcumb from './parts/Breadcumb.vue';
import GlobalSearch from './parts/GlobalSearch.vue';
import Notifications from './parts/Notifications.vue';

export default defineComponent({
  components: { ProfileAvatar, Breadcumb, GlobalSearch, Notifications }
});
</script>
