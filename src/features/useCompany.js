import { computed, ref } from 'vue';
import { fetchCompanyList } from '@/api/admin/rest/companies';

const list = ref([]);
const selected = ref();

export default () => {
  const setList = async (limit, page) => {
    try {
      const res = await fetchCompanyList(limit, page);
      list.value = res;
    } catch (error) {
      throw error;
    }
  };

  const setSelected = payload => {
    selected.value = payload;
  };

  const getList = computed(() => list.value);
  const getSelected = computed(() => selected.value);

  return {
    setList,
    setSelected,
    getList,
    getSelected
  };
};
