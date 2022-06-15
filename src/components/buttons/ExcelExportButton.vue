<template>
<button class="btn btn-success" @click="tableToExcel('Transactions')">Export Excel
<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" v-if="loading"/></button>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  data(){
    return {
      loading:false,
    }
  },
  props: {
    url: {
      type: String,
      default: '/api/companies/transactions/export/'
    },
    form: {
      type:Object,
      default:{
        start:'01-01-2020',
        end:'01-01-2021'
      }
    }
  },
  computed:{
    ...mapGetters(['getHttpHeader']),
  },
  methods: {
    blobToBase64(blob) {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    tableToExcel(name) {
      const type = "xlsx";
      this.loading = true;
      const res = axios
        .get(
          this.url, {
            headers: {
              ...this.getHttpHeader,
              // Accept: 'application/json'
            },
            params:this.form,
          }, {
            responseType: 'blob'
          }
        )
        .then(response => {
          // const blob = this.blobToBase64(response.data);
          console.log(typeof response.data);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${name}.${type}`);
          document.body.appendChild(link);
          link.click();

          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
}
</script>