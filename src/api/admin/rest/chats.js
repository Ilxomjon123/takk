import { useApi } from '@/composables/useApi';
import useWebSocket from '@/features/useWebSocket.js';

const api = useApi();

const { sendEvent } = useWebSocket();

export const fetchChats = async () => {
  try {
    const res = await api({
      url: `/adham/ws-chat/`
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchChatMessages = async (chatID, page = 1) => {
  try {
    const res = await api({
      url: `/adham/ws-chat/${chatID}/messages/`,
      params: { page }
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createChatroom = async payload => {
  try {
    const res = await api({
      url: `/adham/ws-chat/`,
      method: 'post',
      data: payload // {item_type -> тип сообщения [video, image, message, video], files -> список файлов, chat*}
    });

    sendEvent(
      JSON.stringify({
        event_type: 'new_chat',
        data: {
          chat_id: res.data?.id
        }
      })
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const sendMessagesInChatroom = async payload => {
  try {
    const res = await api({
      url: `/adham/ws-chat/send-messages-chat/`,
      method: 'post',
      data: payload
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const sendMessageToCustomers = async payload => {
  try {
    const res = await api({
      url: `/adham/ws-chat/send-messages-customer/`,
      method: 'post',
      data: payload // {item_type -> тип сообщения [video, image, message, video], files -> список файлов, chat*}
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
