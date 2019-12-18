<template>
  <div class="page">
    <f7-fab
      style="margin-bottom: 12%;"
      position="right-bottom"
      @click="go"
      slot="fixed"
      color="green"
    >
      <f7-icon ios="f7:note_add" aurora="f7:note_add" md="material:note_add"></f7-icon>
    </f7-fab>

    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding">
        <div class="left">
          <a href="#" class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        <div class="title">Listado de comprobantes</div>
      </div>
    </div>
    <div class="toolbar tabbar toolbar-bottom">
      <div class="toolbar-inner">
        <a href="#tab-1" class="tab-link tab-link-active">Factura</a>
        <a href="#tab-2" class="tab-link">Boleta</a>
        <a href="#tab-3" class="tab-link">Nota</a>
        <a href="#tab-4" class="tab-link">Todo</a>
      </div>
    </div>
    <div class="tabs-animated-wrap">
      <div class="tabs">
        <div id="tab-1" class="page-content tab tab-active">
          <div class="block">
            <f7-card v-for="item in source_fact" :key="item.id" class="demo-card-header-pic">
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
                <f7-button @click="whatsap(item.customer_telephone, item.external_id)" outline color="green">
                  <i style="font-size: 1.7em;" class="icon fab fa-whatsapp"></i>
                </f7-button>
                <f7-button @click="email(item.download_pdf)" outline color="blue">
                  <f7-icon size="30px" color="blue" material="email"></f7-icon>
                </f7-button>
              </f7-card-footer>
            </f7-card>
          </div>
        </div>
        <div id="tab-2" class="page-content tab">
          <div class="block">
            <f7-card v-for="item in source_bol" :key="item.id" class="demo-card-header-pic">
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
                <f7-button @click="whatsap(item.customer_telephone, item.external_id)" outline color="green">
                  <i style="font-size: 1.7em;" class="icon fab fa-whatsapp"></i>
                </f7-button>
                <f7-button @click="email(item.download_pdf)" outline color="blue">
                  <f7-icon size="30px" color="blue" material="email"></f7-icon>
                </f7-button>
              </f7-card-footer>
            </f7-card>
          </div>
        </div>
        <div id="tab-3" class="page-content tab">
          <div class="block">
            <p>No existen registros disponibles.</p>
          </div>
        </div>
        <div id="tab-4" class="page-content tab">
          <div class="block">
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
                <f7-button @click="whatsap(item.customer_telephone, item.external_id)" outline color="green">
                  <i style="font-size: 1.7em;" class="icon fab fa-whatsapp"></i>
                </f7-button>
                <f7-button @click="email(item.download_pdf)" outline color="blue">
                  <f7-icon size="30px" color="blue" material="email"></f7-icon>
                </f7-button>

                <!--<f7-button outline @click="download(item.download_xml)" color="blue">XML</f7-button> -->
              </f7-card-footer>
            </f7-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const url = "https://demo.facturador.pro/api";
import _ from "lodash";

export default {
  name: "documents",
  components: {},
  data: function() {
    // Must return an object
    return {
      source: [],
      sourceClone: [],
      text_seacrh: "",
      source_fact: [],
      source_bol: [],
      source_nota: []
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    whatsap(phone, external_id) {
      if (phone.length == 9) {
        let link_pdf = `https://demo.facturador.pro/print/document/${external_id}/a4`;
        let message = `Hola, revisa tu comprobante ingresa a este link ${link_pdf}`;
        let message_ = message.split(" ").join("%20");
        window.open(`https://wa.me/51${phone}/?text=${message_}`, "_system");
      } else {
        alert("El numero telefonico no cuenta con WhatsApp");
      }
    },
    email() {},
    applyFilters() {
      this.source_fact = _.filter(this.source, { document_type_id: "01" });
      this.source_bol = _.filter(this.source, { document_type_id: "03" });
      //this.source_nota =  _.filter(this.source, { document_type_id: '01' });
    },
    go() {
      this.$f7router.navigate("/form-document/");
    },
    download(download) {
      // var ref = cordova.InAppBrowser.open(download, "_blank", "location=yes");
      cordova.plugins.DownloadManager.download(
        "https://demo.facturador.pro/print/document/3b0358b0-02b6-4272-a7dd-05932a7dcabb/a4",
        function(status) {
          alert("Se descargó el archivo correctamente. Carpeta Download.");
        },
        function(err) {
          alert(err);
        }
      );
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
          this.applyFilters();
          // self.sourceClone = response.data.data;
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
