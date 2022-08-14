import makeRequest from '../makeRequest';

export async function fetchCategories(
  menuID,
  payload = { page: 1, limit: 1000 }
) {
  try {
    const res = await makeRequest({
      url: `/adham/menus/${menuID}/categories/`,
      headers: { authorization: true },
      params: payload
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCategory(payload) {
  let response;
  await axios
    .get(`/adham/categories/${payload}/`, {
      // .get(`/adham/transactions/`, {
      headers: rootGetters.getHttpHeader
    })
    .then(res => {
      response = res.data;
      commit('setCategory', res?.data);
    })
    .catch(err => {
      response = err.data;
      // commit('setTransactions', err.response.data);
    });
  return response;
}

export async function postCategory(payload) {
  let response;
  await axios
    .post(`/adham/categories/`, payload, {
      headers: {
        ...rootGetters.getHttpHeader,
        'Conten-type': 'multipart/form-data'
      }
    })
    .then(async res => {
      response = {
        status: true,
        data: res.data
      };
    })
    .catch(err => {
      response = {
        status: false,
        data: err.response.data
      };
    });
  return response;
}

export async function putCategory({ rootGetters }, payload) {
  let response;
  await axios
    .put(`/adham/categories/${payload.id}/`, payload.form, {
      headers: rootGetters.getHttpHeader
    })
    .then(async res => {
      response = {
        status: true,
        data: res.data
      };
    })
    .catch(err => {
      response = {
        status: false,
        data: err.response.data
      };
    });
  return response;
}

export async function deleteCategory({ rootGetters }, payload) {
  let response;
  await axios
    .delete(`/adham/categories/${payload}/`, {
      headers: rootGetters.getHttpHeader
    })
    .then(async res => {
      response = {
        status: true,
        data: res.data
      };
    })
    .catch(err => {
      response = {
        status: false,
        data: err.response.data
      };
    });
  return response;
}
