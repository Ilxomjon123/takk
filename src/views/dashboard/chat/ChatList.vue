<template>
  <div class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4">
    <div
      v-for="(chat, chatKey) in chats"
      :key="chatKey"
      class="intro-x cursor-pointer box relative flex items-center p-5"
      :class="{ 'mt-5': chatKey }"
      @click="showChatBox(chat.id)"
    >
      <div class="w-12 h-12 flex-none image-fit mr-1">
        <img
          alt="Icewall Tailwind HTML Admin Template"
          class="rounded-full"
          :src="chat.user?.avatar"
        />

        <div
          class="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white"
        ></div>
      </div>
      <div class="ml-2 overflow-hidden w-full">
        <div class="flex items-center">
          <h6 href="javascript:;" class="font-medium">{{ chat.user?.username }}</h6>
          <div
            class="text-xs text-gray-500 ml-auto"
          >{{ chat.last_message?.created_dt && formattedDate(chat.last_message.created_dt) }}</div>
        </div>
        <template v-if="chat.last_message">
          <div
            class="w-full truncate text-gray-600 mt-0.5"
            v-if="chat.last_message.item_type === 'string'"
          >{{ chat.last_message.text }}</div>
          <div
            v-if="chat.last_message.item_type === 'image'"
            class="w-full truncate text-gray-600 mt-0.5"
          >
            <img
              :src="chat.last_message.image"
              alt="last image"
              width="10"
              height="5"
            />
          </div>
        </template>
      </div>
      <div
        v-if="chat.unread_message_count"
        class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-theme-1 font-medium -mt-1 -mr-1"
      >{{ chat.unread_message_count }}</div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';

const props = defineProps({
  chats: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:showChatBox']);

const showChatBox = (id) => {
  emit('update:showChatBox', id);
};

const formattedDate = (value) => {
  return moment(value).fromNow();
};
</script>
