import { computed, reactive, ref, toRaw, readonly } from 'vue';

const chatList = reactive([]);
const selectedChat = ref({});
const errorMessage = ref({});
const chatBoxLoading = ref(false);

export default () => {
  const setChatList = array => {
    Object.assign(chatList, [...array]);
  };

  const setSelectedChat = value => {
    selectedChat.value = value;
  };

  const setSelectedChatMessages = array => {
    selectedChat.value.messages = array;
  };

  const setErrorMessage = value => {
    errorMessage.value = value;
  };

  const setChatBoxLoading = value => {
    chatBoxLoading.value = value;
  };

  const getSelectedChat = computed(() => selectedChat.value);
  const getSelectedChatMessages = computed(() => selectedChat.value.messages);
  const getErrorMessage = computed(() => errorMessage.value);
  const getChatBoxLoading = computed(() => chatBoxLoading.value);

  return {
    setChatList,
    setSelectedChat,
    setSelectedChatMessages,
    setErrorMessage,
    setChatBoxLoading,
    chatList,
    getSelectedChat,
    getSelectedChatMessages,
    getErrorMessage,
    getChatBoxLoading
  };
};
