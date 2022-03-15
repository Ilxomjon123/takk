<template>
  <div class="chat__box box">
    <!-- BEGIN: Chat Active -->
    <div v-if="!isEmpty(getSelectedChat)" class="h-full flex flex-col">
      <div
        class="flex flex-col sm:flex-row border-b border-gray-200 dark:border-dark-5 px-5 py-4"
      >
        <div class="flex items-center">
          <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
            <img
              alt="image"
              class="rounded-full"
              :src="getSelectedChat.user?.avatar"
            />
          </div>
          <div class="ml-3 mr-auto">
            <div
              class="font-medium text-base"
            >{{ getSelectedChat.user?.username }}</div>
            <div class="text-gray-600 text-xs sm:text-sm">
              Hey, I am using chat
              <span class="mx-1">•</span> Online
            </div>
          </div>
        </div>
        <div
          class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-gray-200 pt-3 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0"
        >
          <a href="javascript:;" class="w-5 h-5 text-gray-600">
            <SearchIcon class="w-5 h-5" />
          </a>
          <!-- <a href="javascript:;" class="w-5 h-5 text-gray-600 ml-5">
                  <UserPlusIcon class="w-5 h-5" />
          </a>-->
          <div class="dropdown ml-auto sm:ml-3">
            <a
              href="javascript:;"
              class="dropdown-toggle w-5 h-5 text-gray-600"
              aria-expanded="false"
            >
              <MoreVerticalIcon class="w-5 h-5" />
            </a>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <a
                  href="javascript:;"
                  class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <Share2Icon class="w-4 h-4 mr-2" />Share Contact
                </a>
                <a
                  href="javascript:;"
                  class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <SettingsIcon class="w-4 h-4 mr-2" />Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
        <template v-for="message, messageIndex in getSelectedChat.messages">
          <!-- <template v-if="getSelectedChat.last_message"> -->
          <div
            v-if="!message.is_my_message"
            class="chat__box__text-box flex items-end float-left mb-4"
          >
            <div
              class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
            >
              <img
                alt="image"
                class="rounded-full"
                :src="getSelectedChat.user?.avatar"
              />
            </div>
            <div
              class="bg-gray-200 dark:bg-dark-5 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md"
            >
              <img
                v-if="message.item_type === 'image'"
                :src="message.image"
                alt="image message"
              />
              <p v-if="message.item_type === 'message'">{{ message.text }}</p>
              <div
                class="mt-1 text-xs text-gray-600"
              >{{ formattedDate(message.created_dt) }}</div>
            </div>
            <div class="hidden sm:block dropdown ml-3 my-auto">
              <a
                href="javascript:;"
                class="dropdown-toggle w-4 h-4 text-gray-600"
                aria-expanded="false"
              >
                <MoreVerticalIcon class="w-4 h-4" />
              </a>
              <div class="dropdown-menu w-40">
                <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                  <a
                    href="javascript:;"
                    class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                  >
                    <CornerUpLeftIcon class="w-4 h-4 mr-2" />Reply
                  </a>
                  <a
                    href="javascript:;"
                    class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                  >
                    <TrashIcon class="w-4 h-4 mr-2" />Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="chat__box__text-box flex items-end float-right mb-4"
          >
            <div class="hidden sm:block dropdown mr-3 my-auto">
              <a
                href="javascript:;"
                class="dropdown-toggle w-4 h-4 text-gray-600"
                aria-expanded="false"
              >
                <MoreVerticalIcon class="w-4 h-4" />
              </a>
              <div class="dropdown-menu w-40">
                <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                  <a
                    href="javascript:;"
                    class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                  >
                    <CornerUpLeftIcon class="w-4 h-4 mr-2" />Reply
                  </a>
                  <a
                    href="javascript:;"
                    class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                  >
                    <TrashIcon class="w-4 h-4 mr-2" />Delete
                  </a>
                </div>
              </div>
            </div>
            <div
              class="bg-theme-1 px-4 py-3 text-white rounded-l-md rounded-t-md"
            >
              <img
                v-if="message.item_type === 'image'"
                :src="message.image"
                alt="image message"
              />
              <p v-if="message.item_type === 'message'">{{ message.text }}</p>
              <div
                class="mt-1 text-xs text-theme-21"
              >{{ formattedDate(message.created_dt) }}</div>
            </div>
            <div
              class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5"
            >
              <img alt="image" class="rounded-full" :src="myAvatar" />
            </div>
          </div>
          <div class="clear-both"></div>
        </template>
      </div>
      <div
        class="pt-4 pb-10 sm:py-4 flex items-center border-t border-gray-200 dark:border-dark-5"
      >
        <textarea
          class="chat__box__input form-control dark:bg-dark-3 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:ring-0"
          rows="1"
          placeholder="Type your message..."
        ></textarea>
        <div
          class="flex absolute sm:static left-0 bottom-0 ml-5 sm:ml-0 mb-5 sm:mb-0"
        >
          <EmojisBlock />
          <div
            class="w-4 h-4 sm:w-5 sm:h-5 relative text-gray-600 mr-3 sm:mr-5"
          >
            <PaperclipIcon class="w-full h-full" />
            <input
              type="file"
              class="w-full h-full top-0 left-0 absolute opacity-0"
            />
          </div>
        </div>
        <a
          href="javascript:;"
          class="w-8 h-8 sm:w-10 sm:h-10 block bg-theme-1 text-white rounded-full flex-none flex items-center justify-center mr-5"
        >
          <SendIcon class="w-4 h-4" />
        </a>
      </div>
    </div>
    <!-- END: Chat Active -->
    <!-- BEGIN: Chat Default -->
    <div v-else class="h-full flex items-center">
      <div class="mx-auto text-center">
        <div class="mt-3">
          <!-- <div class="font-medium">Hey, {{ $f()[0]["users"][0]["name"] }}!</div> -->
          <div
            class="text-gray-600 mt-1"
          >{{ !isEmpty(getErrorMessage) ? getErrorMessage : 'Please select a chat to start messaging.' }}</div>
        </div>
      </div>
    </div>
    <!-- END: Chat Default -->
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import EmojisBlock from './EmojisBlock.vue';
import moment from 'moment';
import { useStore } from 'vuex';
import { isEmpty } from 'lodash';
import useChatState from '../../../features/useChatState';

// const props = defineProps({
//   selectedChat: Object,
//   errorMessage: String
// });

const { getSelectedChat, getErrorMessage } = useChatState();

const store = useStore();
const formattedDate = (value) => {
  return moment(value).fromNow();
};

const myAvatar = computed(() => store.getters.getUser.avatar);

</script>
