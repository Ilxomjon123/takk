import makeRequest from '../makeRequest';

export const fetchChats = async () => {
  try {
    const res = await makeRequest({
      url: `/api/chats/`,
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching chat list: ', err);
  }
};

export const fetchChatMessages = async chatID => {
  try {
    const res = await makeRequest({
      url: `/api/chats/${chatID}/messages/`,
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching chat messages: ', err);
  }
};

export const createChatMessage = async payload => {
  try {
    const res = await makeRequest({
      url: `/api/chats/message/`,
      data: payload, // {item_type*, text, chat*(chat_id)}
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching chat messages: ', err);
  }
};
