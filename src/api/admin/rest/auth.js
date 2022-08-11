import { setToken } from '../config.js';
import makeRequest from '../makeRequest.js';

export const login = async ({ username, password }) => {
  try {
    const res = await makeRequest({
      url: '/adham/users/register',
      method: 'post',
      data: {
        username,
        password
      }
    });

    return setToken(res.data.token);
  } catch (err) {
    if (err.message === 'WRONG_PASSWORD') {
      //
    }
  }
};

export const logout = async () => {
  await makeRequest({
    url: '/adham/auth/logout',
    method: 'post',
    headers: { authorization: true }
  });
  return setToken(null);
};

// export const checkAuth = function({ axios, redirect, $auth }) {
//   axios.onError(error => {
//     const code = parseInt(error.response && error.response.status);
//     if (code === 401) {
//       if ($auth && $auth.loggedIn) {
//         $auth.logout();
//       }
//       redirect('/');
//     }
//     throw error;
//   });
// }
