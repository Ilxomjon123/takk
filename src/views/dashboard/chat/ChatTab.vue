<script setup>
import ChatList from './ChatList.vue';
</script>

<template>
  <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
    <div class="intro-y pr-1">
      <div class="box p-2">
        <div class="chat__tabs nav nav-tabs justify-center" role="tablist">
          <a
            id="allchats-tab"
            data-toggle="tab"
            data-target="#allchats"
            href="javascript:;"
            class="flex-1 py-2 rounded-md text-center active"
            role="tab"
            aria-controls="allchats"
            aria-selected="true"
            >All Chats</a
          >
          <!-- <a
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
          >General Chats</a>-->
        </div>
      </div>
    </div>
    <div class="tab-content">
      <div
        id="allchats"
        class="tab-pane active"
        role="tabpanel"
        aria-labelledby="allchats-tab"
      >
        <ChatList />
        <!-- <ChatList :chats="chats" @update:selected-chat="showChatBox" /> -->
      </div>
      <div
        id="order-chats"
        class="tab-pane"
        role="tabpanel"
        aria-labelledby="order-chats-tab"
      >
        <ChatList chat-type="order" />
        <!-- <ChatList :chats="orderChats" @update:selected-chat="showChatBox" /> -->
      </div>
      <div
        id="company-chats"
        class="tab-pane"
        role="tabpanel"
        aria-labelledby="company-chats-tab"
      >
        <ChatList chat-type="main" />
        <!-- <ChatList :chats="companyChats" @update:selected-chat="showChatBox" /> -->
      </div>
    </div>
  </div>
</template>
