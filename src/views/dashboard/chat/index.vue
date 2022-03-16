<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Chat</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button
          class="btn btn-primary shadow-md mr-2"
          @click="openChatTypeModal"
        >New Chat</button>
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
          class="absolute h-screen w-full z-50 flex flex-col justify-center items-center"
          style="background-color: rgba(100, 100, 100, 0.1);"
        >
          <LoadingIcon icon="tail-spin" class="w-16 h-16" />
        </div>
        <ChatBox />
      </div>
      <!-- END: Chat Content -->
    </div>
  </div>

  <div id="chat-type-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- BEGIN: Modal Header -->
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">Select chat type</h2>
        </div>
        <!-- END: Modal Header -->
        <div class="modal-body p-10">
          <div class="flex flex-col sm:flex-row mt-2">
            <div class="form-check mr-2">
              <input
                id="radio-switch-4"
                class="form-check-input"
                type="radio"
                name="horizontal_radio_button"
                value="horizontal-radio-chris-evans"
              />
              <label class="form-check-label" for="radio-switch-4">Chris Evans</label>
            </div>
            <div class="form-check mr-2 mt-2 sm:mt-0">
              <input
                id="radio-switch-5"
                class="form-check-input"
                type="radio"
                name="horizontal_radio_button"
                value="horizontal-radio-liam-neeson"
              />
              <label class="form-check-label" for="radio-switch-5">Liam Neeson</label>
            </div>
          </div>
        </div>
        <!-- BEGIN: Modal Footer -->
        <div class="modal-footer text-right">
          <button
            type="button"
            data-dismiss="modal"
            class="btn btn-outline-secondary mr-1"
          >Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleCreate"
            :disabled="!isReordered"
          >Save positions</button>
        </div>
        <!-- END: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { fetchChats } from '@/api';
import useChatState from '@/features/useChatState';
import ChatTab from './ChatTab.vue';
import ChatBox from './ChatBox.vue';
import useWebSocket from '@/features/useWebSocket';
import cash from 'cash-dom';
import { createChatroom, createChatMessage } from '@/api';

const { setChatList, getChatBoxLoading } = useChatState();
const { getConnection } = useWebSocket();

onMounted(async () => {
  const res = await fetchChats();
  res.length > 0 && setChatList(res);

  getConnection.value.onnew_message = (event) => {
    console.log(event);
  }

  // handleCreate()
  // sendMessage("Hello gang!")

});

async function sendMessage(message) {
  console.log(message)
  console.log('ws connection: ', getConnection.value);
  const data = {
    item_type: "message",
    chat: 1,
    text: message,
    files: []
  }

  const res = await createChatMessage(data)
  console.log('res: ', res);
}

function openChatTypeModal() {
  cash('#chat-type-modal').modal('show')
}

function handleCreate() {
  const data = {
    customer: 11
  }
  const res = createChatroom(data)
}


</script>
