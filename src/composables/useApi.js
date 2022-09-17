import axios from 'axios';
import nProgress from 'nprogress';
import store from '@/store';

let api;
nProgress.configure({ parent: '#custom-nprogress' });

export function createApi() {
  // Here we set the base URL for all requests made to the api
  // api = axios.create({
  //   baseURL: import.meta.env.VITE_CLIENT_API_URL,
  // });

  api = axios.create();

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use((config) => {
    nProgress.start();
    nProgress.set(0.4);

    if (store.getters['isLoggedIn']) {
      config.headers = {
        ...config.headers,
        Authorization: `JWT ${store.getters['getToken']}`,
      };
    }

    return config;
  });

  // We set an interceptor for each response to
  // check if user is logged in
  api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      nProgress.done();
      return response;
    },
    async function (error) {
      nProgress.done();

      if (error) {
        const originalRequest = error.config;

        if (error.response?.status === 401 /* && !originalRequest._retry */) {
          try {
            const res = await store.dispatch('refreshToken');

            location.reload();
            originalRequest._retry = true;
          } catch (error) {
            store.dispatch('logout');
            // location.href = '/'
          }
        }

        throw error;
      }
    }
  );

  return api;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}
