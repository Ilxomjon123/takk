import { computed, reactive, ref } from 'vue';

const chatList = reactive([]);
const selectedChat = ref({});
const errorMessage = ref({});
const chatBoxLoading = ref(false);
// const selectedChatMessages = reactive([]);

export default () => {
  const setChatList = array => {
    console.log('arr in setChatList func: ', array);
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

  const getChatList = computed(() => chatList);
  const getSelectedChat = computed(() => selectedChat.value);
  const getErrorMessage = computed(() => errorMessage.value);
  const getChatBoxLoading = computed(() => chatBoxLoading.value);
  // const getSelectedChatMessages = computed(() => selectedChatMessages);

  return {
    setChatList,
    setSelectedChat,
    setSelectedChatMessages,
    setErrorMessage,
    setChatBoxLoading,
    getChatList,
    getSelectedChat,
    // getSelectedChatMessages,
    getErrorMessage,
    getChatBoxLoading
  };
};
