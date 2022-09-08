import { useApi } from '@/composables/useApi';

const api = useApi();

export const fetchProductsList = async (payload) => {
  try {
    const res = await api({
      url: `/adham/menus/${payload.menuId}/products/`,
      params: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchProduct = async (productID) => {
  try {
    const res = await api({
      url: `/adham/products/${productID}/`,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchProductSizes = async (productSizeID) => {
  try {
    const res = await api({
      url: `/adham/products/sizes/${productSizeID}/`,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (payload) => {
  try {
    const res = await api({
      url: `/adham/products/${payload.id}/`,
      method: 'put',
      data: payload.data,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createProduct = async (payload) => {
  try {
    const res = await api({
      url: `/adham/products/`,
      method: 'post',
      data: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const duplicateProduct = async (payload) => {
  try {
    const res = await api({
      url: `/adham/products/duplicate/`,
      method: 'post',
      data: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const isProductAvailable = async (payload) => {
  try {
    const res = await api({
      url: `/adham/products/available/`,
      method: 'post',
      data: payload,
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (productID) => {
  try {
    const res = await api({
      url: `/adham/products/${productID}/`,
      method: 'delete',
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
