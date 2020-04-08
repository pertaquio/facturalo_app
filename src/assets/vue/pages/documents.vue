<template>
  <div class="page">
    <!-- <f7-fab
      style="margin-bottom: 12%;"
      position="right-bottom"
      @click="go"
      slot="fixed"
      color="green"
    >
      <f7-icon ios="f7:note_add" aurora="f7:note_add" md="material:note_add"></f7-icon>
    </f7-fab>-->

    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding navbar-cus">
        <div class="left">
          <a href="#" class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        <div class="title">
          Listado de comprobantes
          <f7-badge color="blue">{{ countDoc }}</f7-badge>
        </div>
      </div>
    </div>
    <div class="toolbar tabbar toolbar-bottom tabbar-scrollable">
      <div class="toolbar-inner">
        <a href="#tab-1" @click="show(1)" class="tab-link tab-link-active"
          >Factura</a
        >
        <a href="#tab-2" @click="show(2)" class="tab-link">Boleta</a>
        <a href="#tab-3" @click="show(3)" class="tab-link">Nota</a>
        <a href="#tab-purchases" @click="show('purchases')" class="tab-link">Compras</a>
        <a href="#tab-4" @click="show(4)" class="tab-link">Todo</a>
      </div>
    </div>
    <div class="tabs-animated-wrap">
      <div class="tabs">
        <div id="tab-1" class="page-content tab tab-active">
          <div class="block">
            <f7-card
              v-for="item in source_fact"
              :key="item.id"
              class="demo-card-header-pic"
            >
              <f7-card-header
                class="no-border"
                valign="bottom"
                style="background: #73C1FF;"
              >
                {{ item.document_type_description }} :
                {{ item.number }}</f7-card-header
              >
              <f7-card-content>
                <p>
                  Estado:
                  <f7-badge color="green">{{
                    item.state_type_description
                  }}</f7-badge>
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
                <f7-button
                  @click="download(item.external_id)"
                  outline
                  color="blue"
                >
                  <f7-icon color="blue" material="cloud_download"></f7-icon>
                </f7-button>

              
                  <div class="col-50">
                    <f7-button
                      @click="whatsap(item.customer_telephone, item.external_id)"
                      outline
                      color="green"
                    >
                      <i
                        style="font-size: 1.7em;"
                        class="icon fab fa-whatsapp"
                      ></i>
                     
                    </f7-button>
                  </div>
                  <div class="col-50">
                    <f7-button @click="email(item.id)" outline color="blue">
                      <f7-icon
                        size="30px"
                        color="blue"
                        material="email"
                      ></f7-icon>
                    </f7-button>
                  </div>
               
              </f7-card-footer>
            </f7-card>
          </div>
        </div>
        <div id="tab-2" class="page-content tab">
          <div class="block">
            <f7-card
              v-for="item in source_bol"
              :key="item.id"
              class="demo-card-header-pic"
            >
              <f7-card-header
                class="no-border"
                valign="bottom"
                style="background: #73C1FF;"
                >{{ item.document_type_description }} :
                {{ item.number }}</f7-card-header
              >
              <f7-card-content>
                <p>
                  Estado:
                  <f7-badge color="green">{{
                    item.state_type_description
                  }}</f7-badge>
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
                <f7-button
                  @click="download(item.external_id)"
                  outline
                  color="blue"
                  >PDF</f7-button
                >
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
            <f7-card
              v-for="item in source_nota"
              :key="item.id"
              class="demo-card-header-pic"
            >
              <f7-card-header
                class="no-border"
                valign="bottom"
                style="background: #73C1FF;"
                >NOTA DE VENTA : {{ item.identifier }}</f7-card-header
              >
              <f7-card-content>
                <p>
                  Estado:
                  <f7-badge color="green">{{
                    item.state_type_description
                  }}</f7-badge>
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
                <f7-button
                  @click="download(item.external_id, 'sale-notes')"
                  outline
                  color="blue"
                  >PDF</f7-button
                >
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
        
        <div id="tab-purchases" class="page-content tab">
          <div class="block">
            <f7-card v-for="item in source_purchases" :key="item.id" class="demo-card-header-pic">
              <f7-card-header
                class="no-border"
                valign="bottom"
                style="background: #73C1FF;"
              > {{ item.document_type_description }} : {{ item.number }}</f7-card-header>
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
                <p>RUC: {{ item.supplier_number }}</p>
                <p>{{ item.supplier_name }}</p>
              </f7-card-content>
              <!-- <f7-card-footer>
                <f7-button @click="download(item.external_id)" outline color="blue">
                  <f7-icon color="blue" material="cloud_download"></f7-icon>
                </f7-button>

                <div class="row no-gap" style="width: 51%;">
                  <div class="col-50">
                    <f7-button
                      @click="whatsap(item.customer_telephone, item.external_id)"
                      outline
                      color="green"
                    >
                      <i style="font-size: 1.6em;" class="icon fab fa-whatsapp"></i>
                      <i style="font-size: 1.0em;" class="icon fa fa-arrow-right"></i>
                    </f7-button>
                  </div>
                  <div class="col-50">
                    <f7-button @click="email(item.id)" outline color="blue">
                      <f7-icon size="30px" color="blue" material="email"></f7-icon>
                    </f7-button>
                  </div>
                </div>
              </f7-card-footer> -->
            </f7-card>
          </div>
        </div>

        <div id="tab-4" class="page-content tab">
          <div class="block">
            <f7-card
              v-for="item in source"
              :key="item.id"
              class="demo-card-header-pic"
            >
              <f7-card-header
                class="no-border"
                valign="bottom"
                style="background: #73C1FF;"
                >{{ item.document_type_description }} :
                {{ item.number }}</f7-card-header
              >
              <f7-card-content>
                <p>
                  Estado:
                  <f7-badge color="green">{{
                    item.state_type_description
                  }}</f7-badge>
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
                <f7-button
                  @click="download(item.external_id)"
                  outline
                  color="blue"
                  >PDF</f7-button
                >
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
      @sheet:closed="
        sendMailOpen = false;
        initformEmail();
      "
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
                    <input
                      v-model="form_email.email"
                      type="email"
                      placeholder="Your e-mail"
                    />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <f7-button style="width: 104%;" @click="sendEmail" outline
                      >Enviar</f7-button
                    >
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
<style scoped>
.navbar-cus {
  background: #17a2b8;
  color: white;
}
</style>
<script>
//const url = "https://demo.facturador.pro/api";
import _ from "lodash";
import { auth } from "mixins_/auth";

export default {
  name: "documents",
  mixins: [auth],
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
      source_purchases: [],
      form_email: {},
      count: 0
    };
  },
  computed: {
    countDoc() {
      return this.count;
    }
  },
  created() {
    this.initformEmail();
    this.getDataPurchases();
    this.getData();
    this.getDataSaleNote();
  },

  methods: {
    show(type) {
      const self = this;
      switch (type) {
        case 1:
          self.count = self.source_fact.length;
          break;
        case 2:
          self.count = self.source_bol.length;
          break;
        case 3:
          self.count = self.source_nota.length;
          break;
        case 'purchases':
          self.count = self.source_purchases.length;
          break;
        case 4:
          self.count = self.source.length;
          break;
      }
    },
    initformEmail() {
      this.form_email = {
        email: null,
        id: null
      };
    },
    whatsap(phone, external_id) {
      const self = this;

      self.$f7.dialog
        .create({
          text: "WhattsApp (9 dígitos)",
          on: {
            opened: function() {
            }
          },
          content: `
              <div class="dialog-input-field input">
                <input type="tel" name="dialog-wasap" placeholder="Ingrese numero celular" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="dialog-input dialog-wasap">
              </div>`,
          buttons: [
            {
              text: "Cancel",
              keyCodes: null,
              color: null
            },
            {
              text: "Ok",
              bold: true,
              keyCodes: null
            }
          ],
          onClick(dialog, e) {
            if (e == 1) {
             
              let number = (dialog.$el.find('.dialog-wasap').val()).toString()

              if (number.length == 9) {
                let link_pdf = `https://demo.facturador.pro/print/document/${external_id}/a4`;
                let message = `Hola, revisa tu comprobante ingresando a este link ${link_pdf}`;
                let message_ = message.split(" ").join("%20");
                window.open(`https://wa.me/51${number}/?text=${message_}`, "_system");
              } else {
                self.$f7.dialog.alert(
                  `Ingrese correctamente los dígitos`,
                  "WhattsApp"
                );
              }
            }
          }
        }).open();

  
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
        alert("Ingrese un Email valido.");
        return false;
      }

      const self = this;
      self.$f7.preloader.show();

      this.$http
        .post(
          `${this.returnBaseUrl()}/document/email`,
          this.form_email,
          this.getHeaderConfig()
        )
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
      const self = this;
      self.initformEmail();
      self.form_email.id = id;
      //  this.sendMailOpen = true;
      self.$f7.dialog.prompt("Ingresa el Email", "", function(value) {
        if (value) {
          self.form_email.email = value;
          self.sendEmail();
        } else {
          alert("Ingrese el Email.");
        }
      });
    },
    applyFilters() {
      this.source_fact = _.filter(this.source, { document_type_id: "01" });
      this.source_bol = _.filter(this.source, { document_type_id: "03" });

      this.show(1);
      //this.source_nota =  _.filter(this.source, { document_type_id: '01' });
    },
    go() {
      this.$f7router.navigate("/form-document/");
    },
    download(external_id, type = "document") {
      if (type == "document") {
        cordova.InAppBrowser.open(
          `${localStorage.api_url}/print/${type}/${external_id}/a4`,
          "_system",
          "location=yes"
        );
      } else if (type == "sale-notes") {
        cordova.InAppBrowser.open(
          `${localStorage.api_url}/${type}/print/${external_id}/a4`,
          "_system",
          "location=yes"
        );
      }
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
        .get(`${this.returnBaseUrl()}/documents/lists`, this.getHeaderConfig())
        .then(response => {
          self.source = response.data.data;
          this.applyFilters();
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    },
    getDataSaleNote() {
      const self = this;
      this.$http
        .get(`${this.returnBaseUrl()}/sale-note/lists`, this.getHeaderConfig())
        .then(response => {
          self.source_nota = response.data.data;
        })
        .catch(err => {})
        .then(() => {});
    },
    getDataPurchases() {
      const self = this;
      this.$http
        .get(`${this.returnBaseUrl()}/purchases/records`, this.getHeaderConfig())
        .then(response => {
          self.source_purchases = response.data.data;
          // console.log(self.source_purchases)
        })
        .catch(err => {})
        .then(() => {});
    }
  }
};
</script>
