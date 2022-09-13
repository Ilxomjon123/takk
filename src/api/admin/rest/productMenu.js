import { useApi } from '@/composables/useApi';

const api = useApi();

export const updateProductPositions = async (payload) => {
  try {
    const res = api({
      url: '/admn/menus/ordering-items/',
      method: 'post',
      data: payload,
    });

    return (await res).data;
  } catch (error) {
    throw err;
  }
};

export const fetchMenus = async () => {
  try {
    const res = await api({
      url: '/admn/menus/',
    });

    return res.data;
  } catch (error) {
    throw err;
  }
};

export const fetchSelectedMenuCategories = async (menuID, limit = 10) => {
  try {
    const res = await api({
      url: `/admn/menus/${menuID}/categories/`,
      method: 'get',
      params: {
        limit,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchSelectedMenuModifiers = async (menuID) => {
  try {
    const res = await api({
      url: `/admn/menus/${menuID}/modifiers/`,
      method: 'get',
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
