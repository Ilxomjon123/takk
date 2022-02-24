<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Chat</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary shadow-md mr-2">New Chat</button>
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
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <UsersIcon class="w-4 h-4 mr-2" />Create Group
              </a>
              <a
                href
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
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
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
// import EmojisBlock from './EmojisBlock.vue';
import { fetchChats } from '@/api';
import useChatState from '@/features/useChatState';
// import ChatList from './ChatList.vue';
// import moment from 'moment';
// import { useStore } from 'vuex';
// import { isEmpty } from 'lodash';
import ChatTab from './ChatTab.vue';
import ChatBox from './ChatBox.vue';

// const store = useStore();
// const chats = reactive([]);
// const orderChats = reactive([]);
// const companyChats = reactive([]);
// const selectedChat = ref({});
// const isLoading = ref(false);
// const errorMessage = ref('');

// const showChatBox = async (id) => {
//   if (selectedChat.value.id !== id) {
//     try {
//       isLoading.value = true
//       const res = await fetchChatMessages(id);
//       selectedChat.value = {
//         ...chats.find(chat => chat.id === id),
//         messages: res.results
//       };
//       // selectedChat.value.messages = res.results;
//     } catch (error) {
//       console.log('Error while fetching chat messages: ', error.response)
//       errorMessage.value = 'Something went wrong while fetching messages!'
//     } finally {
//       isLoading.value = false
//     }
//   } // else Object.assign(selectedChat, reactive({}));
// };

// const formattedDate = (value) => {
//   return moment(value).fromNow();
// };

const { setChatList, getChatBoxLoading } = useChatState();
onMounted(async () => {
  const res = await fetchChats();
  setChatList(res);
});

// const myAvatar = computed(() => store.getters.getUser.avatar);

// function keyListener(event) {
//   if (event.defaultPrevented)
//     return;

//   const key = event.key || event.keyCode;

//   if (key === 'Escape' || key === 'Esc' || key === 27) {
//     selectedChat.value = {}
//     errorMessage.value = ''
//   }
// }


</script>
