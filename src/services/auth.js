import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_API_URL;

async function signin(form) {
  try {
    let res = await axios.post('/api/users/register/', form);
    return {
      status: true,
      data: res.data
    };
  } catch (err) {
    return {
      status: false,
      data: err.response
    };
  }
}

export default signin;
