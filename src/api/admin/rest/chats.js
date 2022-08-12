import makeRequest from '../makeRequest';
import useWebSocket from '@/features/useWebSocket.js';

const { sendEvent } = useWebSocket();

export const fetchChats = async () => {
  try {
    const res = await makeRequest({
      url: `/adham/ws-chat/`,
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching chat list: ', err);
  }
};

export const fetchChatMessages = async (chatID, page = 1) => {
  try {
    const res = await makeRequest({
      url: `/adham/ws-chat/${chatID}/messages/`,
      params: { page },
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching chat messages: ', err);
  }
};

export const createChatroom = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/ws-chat/`,
      method: 'post',
      data: payload, // {item_type -> тип сообщения [video, image, message, video], files -> список файлов, chat*}
      headers: { authorization: true }
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
    return console.log('error while fetching chat messages: ', err);
  }
};

export const sendMessagesInChatroom = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/ws-chat/send-messages-chat/`,
      method: 'post',
      data: payload,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    return console.log('error while fetching chat messages: ', err);
  }
};

export const sendMessageToCustomers = async payload => {
  try {
    const res = await makeRequest({
      url: `/adham/ws-chat/send-messages-customer/`,
      method: 'post',
      data: payload, // {item_type -> тип сообщения [video, image, message, video], files -> список файлов, chat*}
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    return console.log('error while fetching chat messages: ', err);
  }
};