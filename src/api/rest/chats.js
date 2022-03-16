import makeRequest from '../makeRequest';

export const fetchChats = async () => {
  try {
    const res = await makeRequest({
      url: `/api/ws-chat/`,
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
      url: `/api/ws-chat/${chatID}/messages/`,
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
      url: `/api/ws-chat/`,
      method: 'post',
      data: payload, // {item_type -> тип сообщения [video, image, message, video], files -> список файлов, chat*}
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
      url: `/api/ws-chat/messages/`,
      method: 'post',
      data: payload, // {item_type -> тип сообщения [video, image, message, video], files -> список файлов, chat*}
      headers: { authorization: true }
    });
    return res.data;
  } catch (err) {
    return console.log('error while fetching chat messages: ', err);
  }
};
