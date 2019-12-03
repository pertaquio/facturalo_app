<template>
  <f7-page>
    <f7-navbar title="Lista Documentos" back-link="Back"></f7-navbar>
    <!-- <f7-block-title>Documentos</f7-block-title> -->
    <form class="searchbar">
      <div class="searchbar-inner">
        <div class="searchbar-input-wrap">
          <input @keyup="search" v-model="text_seacrh" type="search" placeholder="Search" />
          <i class="searchbar-icon"></i>
          <span @click="clean" class="input-clear-button"></span>
        </div>
        <span class="searchbar-disable-button">Cancel</span>
      </div>
    </form>

    <f7-block>
      <f7-card v-for="item in source" :key="item.id" class="demo-card-header-pic">
        <f7-card-header
          class="no-border"
          valign="bottom"
          style="background: darkgrey;"
        >{{ item.document_type_description }} : {{ item.number }}</f7-card-header>
        <f7-card-content>
          <p>
            Estado:
            <f7-badge color="green">{{ item.state_type_description }}</f7-badge>
          </p>
          <p>{{ item.created_at }}</p>
          <p>
            Total:
            <f7-badge color="orange">{{ item.total }}</f7-badge>
          </p>
          <p>RUC: {{ item.customer_number }}</p>
          <p>{{ item.customer_name }}</p>
        </f7-card-content>
        <f7-card-footer>
          <f7-button @click="download(item.download_pdf)" outline color="blue">PDF</f7-button>
          <!--<f7-button outline @click="download(item.download_xml)" color="blue">XML</f7-button> -->
        </f7-card-footer>
      </f7-card>
    </f7-block>
    <f7-fab position="right-bottom" slot="fixed" color="orange">
      <f7-icon ios="f7:add" aurora="f7:add" md="material:add"></f7-icon>
      <f7-icon ios="f7:close" aurora="f7:close" md="material:close"></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button @click="go" label="Nuevo">+</f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";

export default {
  name: "documents",
  components: {},
  data: function() {
    // Must return an object
    return {
      source: [],
      sourceClone: [],
      text_seacrh: ""
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    go()
    {
       this.$f7router.navigate("/form-document/");
    },
    download(download) {
      var ref = cordova.InAppBrowser.open(download, "_blank", "location=yes");
      //cordova.plugins.DownloadManager.download(download, function(status) { alert('Se descargó el archivo correctamente. Carpeta Download.') }, function(err){ alert(err) });
    },

    clean() {
      this.source = this.sourceClone;
    },
    search() {
      let texx = this.text_seacrh;
      if (texx.length > 0) {
        this.source = this.sourceClone.filter(row => {
          return row.number.includes(texx);
        });
      } else {
        this.source = this.sourceClone;
      }
    },
    getHeaderConfig() {
      let token = localStorage.api_token;
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      return axiosConfig;
    },

    getData() {
      const self = this;
      self.$f7.preloader.show();

      this.$http
        .get(`${url}/documents/lists`, this.getHeaderConfig())
        .then(response => {
          self.source = response.data.data;
          self.sourceClone = response.data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    }
  }
};
</script>
