<template>
  <f7-page>
    <f7-navbar title="CPE" back-link="Back"></f7-navbar>
    <f7-block-title>
      <p>Escanea Qr y Codigo de Barras.</p>
    </f7-block-title>

    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button @click="scan" outline>Escanear</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block>
      <f7-card v-if="init" class="demo-card-header-pic">
        <!--<f7-card-header
          class="no-border"
          valign="bottom"
          style=""
        >Journey To Mountains</f7-card-header>-->
        <f7-card-content>
          <p>
            <span>Comprobante Estado Código:</span>
            {{report.comprobante_estado_codigo}}
          </p>
          <p>
            <span>Comprobante Descripción:</span>
            {{report.comprobante_estado_descripcion}}
          </p>
          <p>
            <span>Empresa Estado Código:</span>
            {{report.empresa_estado_codigo}}
          </p>
          <p>
            <span>Empresa Estado Descripción:</span>
            {{report.empresa_estado_description}}
          </p>
          <p>
            <span>Estado Condicion Código:</span>
            {{report.empresa_condicion_codigo}}
          </p>
          <p>
            <span>Estado Codicion Descripción:</span>
            {{report.empresa_condicion_descripcion}}
          </p>
        </f7-card-content>
        <!--<f7-card-footer>
          <f7-link>Like</f7-link>
          <f7-link>Read more</f7-link>
        </f7-card-footer>-->
      </f7-card>
    </f7-block>
  </f7-page>
</template>
<script>
//const url = "https://demo.facturador.pro/api";
//const token = "hcTC1Up87AYr3p4D5jY1APRPwYZ7wXGxBSJL1yUwzynIIPcnyb";

import { auth } from "mixins_/auth";
export default {
  name: 'Cpe',
  components: {},
  mixins: [auth],

  data() {
    return {
      report: {},
      init: false
    };
  },
  created() {
    this.initReport();
  },
  mounted() {
    
    
  },
  methods: {
    initReport() {
      this.report = {
        comprobante_estado_codigo: "",
        comprobante_estado_descripcion: "",
        empresa_estado_codigo: "",
        empresa_estado_description: "",
        empresa_condicion_codigo: "",
        empresa_condicion_descripcion: ""
      };
    },
    scan() {
      this.init = false;

      const self = this;
      cordova.plugins.barcodeScanner.scan(
        function(result) {
           if(result.text) {
             self.sendApi(result.text);
           }
        },
        function(error) {
         
        }
      );
    },
    getFormatter(data) {
      let arr = data.split("|");
      return {
        numero_ruc_emisor: arr[0],
        codigo_tipo_documento: arr[1],
        serie_documento: arr[2],
        numero_documento: arr[3],
        fecha_de_emision: arr[6],
        total: arr[5]
      };
    },
    sendApi(data) {
      const self = this;

      self.$f7.preloader.show();

      this.$http
        .post(
          `http://35.222.4.229/api/validar-cpe`,
          this.getFormatter(data),
          this.getHeaderConfig()
        )
        .then(response => {
          self.renderReport(response.data.data);
        })
        .catch(err => {
          //console.log(err);
          alert(err);
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    },
    renderReport(data) {
      this.initReport();
      this.report = data;
      this.init = true;
    }
  }
};
</script>
