import { computed, ref } from 'vue';
import { getToken } from '@/api/config';
import useChatState from './useChatState';
import { fetchChatMessages } from '@/api';

// const token = getToken();
const wsUrl = import.meta.env.VITE_WS_URL;
const wsConnect = ref(null);
const wsMessages = ref([]);
const { getSelectedChat, setSelectedChatMessages } = useChatState();

export default () => {
  const setConnection = () => {
    wsConnect.value = new WebSocket(`${wsUrl}/?token=${getToken.value}`);
    wsConnect.value.addEventListener('open', event => {
      console.log('Successfully connected to the websocket server...');
      console.log(event);
    });
    wsConnect.value.addEventListener('message', async event => {
      try {
        const data = JSON.parse(event.data).data;
        if (data.chat_id && getSelectedChat.value.id === data.chat_id) {
          const res = await fetchChatMessages(data.chat_id);
          setSelectedChatMessages(res.results);
        }
      } catch (error) {
        console.log('Error while fetching Chat Messages', error);
      }
    });
    wsConnect.value.addEventListener('close', event => {
      console.error('Websocket closed unexpectedly: ', event);
    });
  };

  const waitForOpenConnection = () => {
    // We use this to measure how many times we have tried to connect to the websocket server
    // If it fails, it throws an error.
    return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 10;
      const intervalTime = 200;

      let currentAttempt = 0;
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval);
          reject(new Error('Maximum number of attempts exceeded.'));
        } else if (wsConnect.value.readyState === wsConnect.value.OPEN) {
          clearInterval(interval);
          resolve();
        }
        currentAttempt++;
      }, intervalTime);
    });
  };

  const handleNewMessage = event => {
    const data = JSON.parse(event.data);
    const message = data.message;
    wsMessages.value.push(message);
  };

  const sendEvent = async payload => {
    if (wsConnect.value.readyState !== wsConnect.value.OPEN) {
      try {
        await waitForOpenConnection(wsConnect.value);
        wsConnect.value.send(payload);
      } catch (err) {
        console.error('Error while sending event via websocket: ', err);
        console.error(err);
      }
    } else {
      wsConnect.value.send(payload);
    }
  };

  const getConnection = computed(() => wsConnect.value);

  return {
    setConnection,
    sendEvent,
    getConnection
  };
};
