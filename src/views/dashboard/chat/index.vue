<script setup>
import { onMounted, ref } from 'vue';
import { isEmpty } from 'lodash';
import cash from 'cash-dom';
import { fetchChats } from '@/api';
import useChatState from '@/features/useChatState';
import ChatTab from './ChatTab.vue';
import ChatBox from './ChatBox.vue';
import SendMessageModal from './SendMessageModal.vue';
import store from '@/store';

const {
  setChatList,
  getChatBoxLoading,
  getSelectedChat,
  getErrorMessage
} = useChatState();

onMounted(async () => {
  store.commit('setLoadingStatus', true);

  const res = await fetchChats();
  res.results.length > 0 && setChatList(res.results);

  store.commit('setLoadingStatus', false);
});

function openMessageModal() {
  cash('#new-chatmessage-modal').modal('show');
}
</script>

<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Chat</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button
          class="btn btn-primary shadow-md mr-2"
          @click="openMessageModal"
        >
          New Message
        </button>
        <div class="dropdown ml-auto sm:ml-0">
          <button
            class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
            aria-expanded="false"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <PlusIcon class="w-4 h-4" />
            </span>
          </button>
          <div class="dropdown-menu w-40">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
              <a
                href
                class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <UsersIcon class="w-4 h-4 mr-2" />Create Group
              </a>
              <a
                href
                class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <SettingsIcon class="w-4 h-4 mr-2" />Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Chat Side Menu -->
      <ChatTab />
      <!-- END: Chat Side Menu -->
      <!-- BEGIN: Chat Content -->
      <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
        <div
          v-if="getChatBoxLoading"
          class="absolute min-h-full w-full z-50 flex flex-col justify-center items-center"
          style="background-color: rgba(100, 100, 100, 0.1);"
        >
          <LoadingIcon icon="tail-spin" class="w-16 h-16" />
        </div>
        <div
          v-if="getChatBoxLoading"
          class="absolute min-h-full w-full z-50 flex flex-col justify-center items-center"
          style="background-color: rgba(100, 100, 100, 0.1);"
        >
          <LoadingIcon icon="tail-spin" class="w-16 h-16" />
        </div>
        <div class="chat__box box">
          <!-- BEGIN: Chat Active -->
          <ChatBox v-if="!isEmpty(getSelectedChat)" />
          <!-- END: Chat Active -->
          <!-- BEGIN: Chat Default -->
          <div v-else class="h-full flex items-center">
            <div class="mx-auto text-center">
              <div class="mt-3">
                <!-- <div class="font-medium">Hey, {{ $f()[0]["users"][0]["name"] }}!</div> -->
                <div class="text-gray-600 mt-1">
                  {{
                    !isEmpty(getErrorMessage)
                      ? getErrorMessage
                      : 'Please select a chat to start messaging.'
                  }}
                </div>
              </div>
            </div>
          </div>
          <!-- END: Chat Default -->
        </div>
      </div>
      <!-- END: Chat Content -->
    </div>

    <!-- create message modal -->
    <SendMessageModal />
  </div>
</template>
