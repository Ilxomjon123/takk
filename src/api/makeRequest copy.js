import axios from 'axios';
import * as config from './config';

// axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.get['Content-Type'] = 'application/json';

export default async ({
  url = '/',
  method = 'get',
  headers = {},
  params = {},
  data = {}
}) => {
  if (headers && headers.authorization) {
    headers.authorization = 'Basic ' + config.getToken();
  }

  try {
    return await axios({
      url,
      method,
      headers,
      params,
      data
    });
  } catch (error) {
    config.errorHandler(error, { url, method, headers, params, data });
    throw error;
  }
};
