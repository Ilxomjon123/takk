<template>
  <button class="btn btn-primary" @click="tableToExcel('Transactions')">
    Export Excel
    <LoadingIcon
      icon="oval"
      color="white"
      class="w-4 h-4 ml-2"
      v-if="loading"
    />
  </button>
</template>

<script>
import { useNotyf } from '@/composables/useNotyf';
import store from '@/store';

const notyf = useNotyf();

export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    url: {
      type: String,
      default: '/api/companies/transactions/export/',
    },
    form: {
      type: Object,
      default: {
        start: '01-01-2020',
        end: '01-01-2021',
      },
    },
  },
  computed: {
    httpHeader() {
      return store.getters['getHttpHeader'];
    },
  },
  methods: {
    blobToBase64(blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    async tableToExcel(name) {
      try {
        this.loading = true;

        const xhr = new XMLHttpRequest();
        let url = this.url;
        url += '?';

        Object.keys(this.form).forEach((item) => {
          url += `${item}=${this.form[item]}&`;
        });

        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        Object.keys(this.httpHeader).forEach((item) => {
          xhr.setRequestHeader(item, this.httpHeader[item]);
        });

        const this_vm = this;
        xhr.onload = function (e) {
          const blob = e.currentTarget.response;
          saveBlob(
            blob,
            `Transaction_for_${this_vm.form.start}_${this_vm.form.end}.xlsx`
          );
        };
        xhr.send();

        function saveBlob(blob, fileName) {
          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = fileName;
          a.dispatchEvent(new MouseEvent('click'));
        }
      } catch (error) {
        notyf.error(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
