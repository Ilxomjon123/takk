import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function signin(form) {
  try {
    let res = axios.post('/api/users/register/', form);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export default signin;
