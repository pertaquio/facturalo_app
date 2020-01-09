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
                <f7-button @click="download(item.external_id)" outline color="blue">PDF</f7-button>
                <f7-button
                  @click="whatsap(item.customer_telephone, item.external_id)"
                  outline
                  color="green"
                >
                  <i style="font-size: 1.7em;" class="icon fab fa-whatsapp"></i>
                </f7-button>
                <f7-button @click="email(item.id)" outline color="blue">
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
                <f7-button @click="download(item.external_id)" outline color="blue">PDF</f7-button>
                <f7-button
                  @click="whatsap(item.customer_telephone, item.external_id)"
                  outline
                  color="green"
                >
                  <i style="font-size: 1.7em;" class="icon fab fa-whatsapp"></i>
                </f7-button>
                <f7-button @click="email(item.id)" outline color="blue">
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
                <f7-button @click="download(item.external_id)" outline color="blue">PDF</f7-button>
                <f7-button
                  @click="whatsap(item.customer_telephone, item.external_id)"
                  outline
                  color="green"
                >
                  <i style="font-size: 1.7em;" class="icon fab fa-whatsapp"></i>
                </f7-button>
                <f7-button @click="email(item.id)" outline color="blue">
                  <f7-icon size="30px" color="blue" material="email"></f7-icon>
                </f7-button>

                <!--<f7-button outline @click="download(item.download_xml)" color="blue">XML</f7-button> -->
              </f7-card-footer>
            </f7-card>
          </div>
        </div>
      </div>
    </div>

    <f7-sheet
      class="demo-sheet"
      :opened="sendMailOpen"
      @sheet:closed="sendMailOpen = false; initformEmail()"
    >
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Cancelar</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block>
          <div class="list no-hairlines-md">
            <ul>
              <li class="item-content item-input item-input-outline">
                <div class="item-inner">
                  <div class="item-title item-floating-label">E-mail</div>
                  <div class="item-input-wrap">
                    <input v-model="form_email.email" type="email" placeholder="Your e-mail" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <f7-button style="width: 104%;" @click="sendEmail" outline>Enviar</f7-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
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
      sendMailOpen: false,
      source: [],
      sourceClone: [],
      text_seacrh: "",
      source_fact: [],
      source_bol: [],
      source_nota: [],
      form_email: {}
    };
  },
  created() {
    this.initformEmail();
    this.getData();
  },
  mounted() {},
  methods: {
    initformEmail() {
      this.form_email = {
        email: null,
        id: null
      };
    },
    whatsap(phone, external_id) {
      if (phone.length == 9) {
        let link_pdf = `https://demo.facturador.pro/print/document/${external_id}/a4`;
        let message = `Hola, revisa tu comprobante ingresando a este link ${link_pdf}`;
        let message_ = message.split(" ").join("%20");
        window.open(`https://wa.me/51${phone}/?text=${message_}`, "_system");
      } else {
        alert("El numero telefonico no cuenta con WhatsApp");
      }
    },

    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sendEmail() {
      if (!this.form_email.email) {
        alert("Ingrese Email.");
        return false;
      }

      if (!this.validateEmail(this.form_email.email)) {
        alert("Ingrese Essmail.");
        return false;
      }

      const self = this;
      self.$f7.preloader.show();

      this.$http
        .post(`${url}/document/email`, this.form_email, this.getHeaderConfig())
        .then(response => {
          if (response.data.success) {
            alert(`${response.data.message}`);
            this.initformEmail();
          }
        })
        .catch(err => {
          alert("Sucedio un error.");
        })
        .then(() => {
          self.$f7.preloader.hide();
          self.sendMailOpen = false;
        });
    },
    email(id) {
      this.form_email.id = id;
      this.sendMailOpen = true;
    },
    applyFilters() {
      this.source_fact = _.filter(this.source, { document_type_id: "01" });
      this.source_bol = _.filter(this.source, { document_type_id: "03" });
      //this.source_nota =  _.filter(this.source, { document_type_id: '01' });
    },
    go() {
      this.$f7router.navigate("/form-document/");
    },
    download(external_id) {

       cordova.InAppBrowser.open(`https://demo.facturador.pro/print/document/${external_id}/a4`, "_system", "location=yes");

      /*cordova.plugins.DownloadManager.download(
        "https://demo.facturador.pro/print/document/3b0358b0-02b6-4272-a7dd-05932a7dcabb/a4",
        function(status) {
          alert("Se descargó el archivo correctamente. Carpeta Download.");
        },
        function(err) {
          alert(err);
        }
      );*/
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
