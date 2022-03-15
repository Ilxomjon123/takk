import { computed, ref } from 'vue';
import { getToken } from '../api/config';

const token = getToken();
const wsUrl = 'ws://api.echtmal.com:8080/connect';
const wsConnect = ref(null);

export default () => {
  const setConnection = () => {
    wsConnect.value = new WebSocket(`${wsUrl}/?token=${token}`);
    wsConnect.value.onopen = function(event) {
      console.log('Successfully connected to the websocket server...');
      console.log(event);
    };
  };

  const getConnection = computed(() => wsConnect.value);

  return {
    setConnection,
    getConnection
  };
};
