import { useApi } from '@/composables/useApi';
import { useWebSocket } from '@vueuse/core';
import store from '@/store';

const wsUrl = import.meta.env.VITE_WS_URL;
// const { send } = useWebSocket(`${wsUrl}/?token=${store.getters['getToken']}`);

const api = useApi();

export const fetchChats = async () => {
  try {
    const res = await api({
      url: `/api2/ws-chat/`,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchChatMessages = async (chatID, page = 1) => {
  try {
    const res = await api({
      url: `/api2/ws-chat/${chatID}/messages/`,
      params: { page },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const sendMessagesInChatroom = async (payload) => {
  try {
    const res = await api({
      url: `/api2/ws-chat/send-messages-chat/`,
      method: 'post',
      data: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const sendMessageToCustomers = async (payload) => {
  try {
    const res = await api({
      url: `/api2/ws-chat/send-messages-customer/`,
      method: 'post',
      data: payload, // {item_type -> тип сообщения [video, image, message, video], files -> список файлов, chat*}
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
