<template>
<button class="btn btn-success" @click="tableToExcel('Transactions')">Export Excel
<LoadingIcon icon="oval" color="white" class="w-4 h-4 ml-2" v-if="loading"/></button>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
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
      // const res = axios
      //   .get(
      //     this.url, {
      //       headers: {
      //         ...this.getHttpHeader,
      //       },
      //       params:this.form,
      //     }, {
      //       responseType: 'blob'
      //     }
      //   )
      //   .then(response => {
      //     const url = window.URL.createObjectURL(new Blob([response.data]));
      //     const link = document.createElement("a");
      //     link.href = url;
      //     link.setAttribute("download", `${name}.${type}`);
      //     document.body.appendChild(link);
      //     link.click();

      //     this.loading = false;
      //   })
      //   .catch(error => {
      //   this.$store.commit('setErrorNotification', true);
      //     // console.log(error);
      //     this.loading = false;
      //   });

      var xhr = new XMLHttpRequest();
      let url = this.url
      url += '?'
      Object.keys(this.form).forEach(item=>{
       url += `${item}=${this.form[item]}&`
      })
      console.log(url);
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      Object.keys(this.getHttpHeader).forEach(item => {
        xhr.setRequestHeader(item, this.getHttpHeader[item]);
      })
      const vm = this;
      xhr.onload = function (e) {
          var blob = e.currentTarget.response;
          var contentDispo = e.currentTarget.getResponseHeader('Content-Disposition');
          var fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
          saveBlob(blob, 'Transaction.xlsx');
          vm.loading = false;
      }
      xhr.send();

      function saveBlob(blob, fileName) {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.dispatchEvent(new MouseEvent('click'));
      }
    }
  }
}
</script>