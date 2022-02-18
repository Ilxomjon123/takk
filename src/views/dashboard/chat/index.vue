<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Chat</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary shadow-md mr-2">Start New Chat</button>
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
      <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
        <div class="intro-y pr-1">
          <div class="box p-2">
            <div class="chat__tabs nav nav-tabs justify-center" role="tablist">
              <a
                id="chats-tab"
                data-toggle="tab"
                data-target="#chats"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center active"
                role="tab"
                aria-controls="chats"
                aria-selected="true"
              >All Chats</a>
              <a
                id="order-chats-tab"
                data-toggle="tab"
                data-target="#order-chats"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="order-chats"
                aria-selected="false"
              >Order Chats</a>
              <a
                id="company-chats-tab"
                data-toggle="tab"
                data-target="#company-chats"
                href="javascript:;"
                class="flex-1 py-2 rounded-md text-center"
                role="tab"
                aria-controls="company-chats"
                aria-selected="false"
              >Company Chats</a>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div
            id="chats"
            class="tab-pane active"
            role="tabpanel"
            aria-labelledby="chats-tab"
          >
            <div class="pr-1">
              <div class="box p-5 my-5">
                <div class="relative text-gray-700 dark:text-gray-300">
                  <input
                    type="text"
                    class="form-control py-3 px-4 border-transparent bg-gray-200 pr-10 placeholder-theme-13"
                    placeholder="Search for messages or users..."
                  />
                  <SearchIcon
                    class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                  />
                </div>
              </div>
            </div>
            <ChatList :chats="chats" @update:show-chat-box="showChatBox" />
          </div>
          <!-- <div
            id="profile"
            class="tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="pr-1">
              <div class="box px-5 py-10 mt-5">
                <div
                  class="w-20 h-20 flex-none image-fit rounded-full overflow-hidden mx-auto"
                >
                  <img
                    alt="Icewall Tailwind HTML Admin Template"
                    :src="`${$f()[0].photos[0]}`"
                  />
                </div>
                <div class="text-center mt-3">
                  <div
                    class="font-medium text-lg"
                  >{{ $f()[0]["users"][0]["name"] }}</div>
                  <div class="text-gray-600 mt-1">Tailwind HTML Admin Template</div>
                </div>
              </div>
              <div class="box p-5 mt-5">
                <div
                  class="flex items-center border-b border-gray-200 dark:border-dark-5 pb-5"
                >
                  <div>
                    <div class="text-gray-600">Country</div>
                    <div class="mt-1">New York City, USA</div>
                  </div>
                  <GlobeIcon class="w-4 h-4 text-gray-600 ml-auto" />
                </div>
                <div
                  class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5"
                >
                  <div>
                    <div class="text-gray-600">Phone</div>
                    <div class="mt-1">+32 19 23 62 24 34</div>
                  </div>
                  <MicIcon class="w-4 h-4 text-gray-600 ml-auto" />
                </div>
                <div
                  class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5"
                >
                  <div>
                    <div class="text-gray-600">Email</div>
                    <div class="mt-1">
                      <div class="mt-1">{{ $f()[0]["users"][0]["email"] }}</div>
                    </div>
                  </div>
                  <MailIcon class="w-4 h-4 text-gray-600 ml-auto" />
                </div>
                <div class="flex items-center pt-5">
                  <div>
                    <div class="text-gray-600">Joined Date</div>
                    <div class="mt-1">{{ $f()[0]["dates"][0] }}</div>
                  </div>
                  <ClockIcon class="w-4 h-4 text-gray-600 ml-auto" />
                </div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
      <!-- END: Chat Side Menu -->
      <!-- BEGIN: Chat Content -->
      <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
        <div class="chat__box box">
          <!-- BEGIN: Chat Active -->
          <div v-if="chatBox" class="h-full flex flex-col">
            <div
              class="flex flex-col sm:flex-row border-b border-gray-200 dark:border-dark-5 px-5 py-4"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative"
                >
                  <img
                    alt="Icewall Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="selectedChat.user.avatar"
                  />
                </div>
                <div class="ml-3 mr-auto">
                  <div
                    class="font-medium text-base"
                  >{{ selectedChat.interlocutor_fullname }}</div>
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
                        class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >
                        <Share2Icon class="w-4 h-4 mr-2" />Share Contact
                      </a>
                      <a
                        href="javascript:;"
                        class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >
                        <SettingsIcon class="w-4 h-4 mr-2" />Settings
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
              <!-- <template v-for="item, itemIndex in selectedChat.last_message"> -->
              <template v-if="selectedChat.last_message">
                <div
                  v-if="!selectedChat.last_message.is_my_message"
                  class="chat__box__text-box flex items-end float-left mb-4"
                >
                  <div
                    class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
                  >
                    <img
                      alt="Icewall Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="selectedChat.user.avatar"
                    />
                  </div>
                  <div
                    class="bg-gray-200 dark:bg-dark-5 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md"
                  >
                    <img
                      v-if="selectedChat.last_message.item_type === 'image'"
                      :src="selectedChat.last_message.image"
                      alt="image message"
                    />
                    <p
                      v-if="selectedChat.last_message.item_type === 'string'"
                    >{{ selectedChat.last_message.text }}</p>
                    <div
                      class="mt-1 text-xs text-gray-600"
                    >{{ formattedDate(selectedChat.last_message.created_dt) }}</div>
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
                      <div
                        class="dropdown-menu__content box dark:bg-dark-1 p-2"
                      >
                        <a
                          href="javascript:;"
                          class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <CornerUpLeftIcon class="w-4 h-4 mr-2" />Reply
                        </a>
                        <a
                          href="javascript:;"
                          class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
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
                      <div
                        class="dropdown-menu__content box dark:bg-dark-1 p-2"
                      >
                        <a
                          href="javascript:;"
                          class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                          <CornerUpLeftIcon class="w-4 h-4 mr-2" />Reply
                        </a>
                        <a
                          href="javascript:;"
                          class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
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
                      v-if="selectedChat.last_message.item_type === 'image'"
                      :src="selectedChat.last_message.image"
                      alt="image message"
                    />
                    <p
                      v-if="selectedChat.last_message.item_type === 'string'"
                    >{{ selectedChat.last_message.text }}</p>
                    <div
                      class="mt-1 text-xs text-theme-21"
                    >{{ formattedDate(selectedChat.last_message.created_dt) }}</div>
                  </div>
                  <div
                    class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5"
                  >
                    <img
                      alt="Icewall Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="me.avatar"
                    />
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
              <!-- <div
                class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto"
              >
                <img
                  alt="Icewall Tailwind HTML Admin Template"
                  :src="`${$f()[0].photos[0]}`"
                />
              </div>-->
              <div class="mt-3">
                <!-- <div class="font-medium">Hey, {{ $f()[0]["users"][0]["name"] }}!</div> -->
                <div
                  class="text-gray-600 mt-1"
                >Please select a chat to start messaging.</div>
              </div>
            </div>
          </div>
          <!-- END: Chat Default -->
        </div>
      </div>
      <!-- END: Chat Content -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import EmojisBlock from './EmojisBlock.vue';
import { fetchChats } from '@/api';
import ChatList from './ChatList.vue';
import moment from 'moment';
import { useStore } from 'vuex';

const store = useStore();
const chats = reactive([]);
const selectedChat = reactive({
  messages: []
});
const chatBox = ref(false);
const showChatBox = (id) => {
  if (chatBox.value === true) {
    if (selectedChat.id === id)
      chatBox.value = !chatBox.value;
    Object.assign(selectedChat, chats.find(chat => chat.id === id));
  } else {
    chatBox.value = !chatBox.value;
    Object.assign(selectedChat, chats.find(chat => chat.id === id));
  }
};

const formattedDate = (value) => {
  return moment(value).fromNow();
};

onMounted(async () => {
  const res = await fetchChats();
  Object.assign(chats, res);
});

const me = computed(() => store.getters.getUser);

</script>
