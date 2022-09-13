import { useApi } from '@/composables/useApi';

const api = useApi();

export async function fetchCategories(
  menuID,
  payload = { page: 1, limit: 1000 }
) {
  try {
    const res = await api({
      url: `https://api.takk.cafe/api/v1/dashboard/admin/menus/${menuID}/categories/`,
      params: payload,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
