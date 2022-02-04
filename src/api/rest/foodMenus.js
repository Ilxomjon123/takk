import makeRequest from '../makeRequest';

export const fetchFoodMenuList = async () => {
  try {
    const companyId = JSON.parse(localStorage.getItem('required_details'))?.user
      ?.company_id;

    const res = await makeRequest({
      url: `/api/companies/${companyId}/menus/`,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    return console.log('error while fetching foodMenus: ', err);
  }
};

// export const fetchFoodMenu = async foodMenuId => {
//   try {
//     const res = await makeRequest({
//       url: `/api/menus/${foodMenuId}/`,
//       headers: { authorization: true }
//     });

//     return res.data;
//   } catch (err) {
//     console.log('error while fetching foodMenus: ', err);
//     throw err;
//   }
// };

export const updateFoodMenu = async payload => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${payload.id}/`,
      method: 'put',
      data: payload.data,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while updating foodMenus: ', err);
    throw err;
  }
};

export const createFoodMenu = async payload => {
  try {
    const companyId = JSON.parse(localStorage.getItem('required_details'))?.user
      ?.company_id;
    const data = { ...payload, company: companyId };
    const res = await makeRequest({
      url: `/api/menus/`,
      method: 'post',
      data,
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while saving foodMenu data: ', err);
    throw err;
  }
};

export const deleteFoodMenu = async payload => {
  try {
    const res = await makeRequest({
      url: `/api/menus/${payload}/`,
      method: 'delete',
      headers: { authorization: true }
    });

    return res.data;
  } catch (err) {
    console.log('error while deleting foodMenu data: ', err);
    throw err;
  }
};
