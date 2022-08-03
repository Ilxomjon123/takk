import axios from 'axios';
import * as config from './config';

const companyID = localStorage.getItem('selectedCompanyID');

const parameter = companyID == 0 ? {} : { company: companyID };

export default async ({
  url = '/',
  method = 'get',
  headers = {},
  params = {},
  data = {}
}) => {
  if (headers && headers.authorization) {
    headers.authorization = 'JWT ' + config.getToken();
  }

  try {
    return await axios({
      url,
      method,
      headers,
      params: { ...params, ...parameter },
      data
    });
  } catch (error) {
    config.errorHandler(error, { url, method, headers, params, data });
    throw error;
  }
};
