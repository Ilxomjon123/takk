import { createSharedComposable } from '@vueuse/core';
import Toastify from 'toastify-js';

// import 'toastify-js/src/toastify.css';

export const useToastify = createSharedComposable(() => {
  return {
    success: text => {
      return Toastify({
        text,
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
          // padding: '1rem 1.5rem',
          color: '#fff'
        }
      }).showToast();
    },
    error: text => {
      return Toastify({
        text,
        style: {
          background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
          // padding: '1rem 1.5rem',
          color: '#fff'
        }
      }).showToast();
    }
    // error: payload => {
    //   return notyf.error(payload);
    // },
    // info: payload => {
    //   const options: Partial<INotyfNotificationOptions> = {
    //     type: 'info'
    //   };

    //   if (typeof payload === 'string') {
    //     options.message = payload;
    //   } else {
    //     Object.assign(options, payload);
    //   }

    //   return notyf.open(options);
    // },
    // warning: payload => {
    //   const options: Partial<INotyfNotificationOptions> = {
    //     type: 'warning'
    //   };

    //   if (typeof payload === 'string') {
    //     options.message = payload;
    //   } else {
    //     Object.assign(options, payload);
    //   }

    //   return notyf.open(options);
    // }
  };
});
