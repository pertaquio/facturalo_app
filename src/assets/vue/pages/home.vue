<template>
  <f7-page class="">
    <f7-popup class="demo-popup" :opened="splash" @popup:closed="popupOpened = false">
      <f7-page style="background:#676666">
        <f7-block>
          <img class="center" :src="logoban" alt />
        </f7-block>
      </f7-page>
    </f7-popup>
    <f7-navbar class="navbar color-theme-white no-shadow theme-dark" transparent="1">
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>
      <f7-nav-title>FacturaloPeru APP</f7-nav-title>
    </f7-navbar>

    <f7-block>
      <f7-row v-if="isOffline">
        <p style="color:red;">SIN ACCESO A INTERNET, VERIFICA TU CONEXION.</p>
      </f7-row>
      <f7-row>
        <f7-col width="100">
          <f7-card @click.native="go('cpe')" class="">
            <f7-card-content class="">
              <f7-row>
                <f7-col width="70"><h3>Validar CPE</h3></f7-col>
                <f7-col width="30">
                  <f7-icon material="center_focus_strong" size="55px" color="green"></f7-icon>
                </f7-col>
              </f7-row>
            </f7-card-content>
          </f7-card>
        </f7-col>
        <f7-col width="100">
          <f7-card @click.native="go('report')" class="">
            <f7-card-content class="">
              <f7-row>
                <f7-col width="70"><h3>Reportes</h3></f7-col>
                <f7-col width="30">
                  <f7-icon size="55px" color="green" material="insert_chart"></f7-icon>
                </f7-col>
              </f7-row>
            </f7-card-content>
          </f7-card>
        </f7-col>
        <f7-col width="100">
          <f7-card @click.native="go('ls_doc')" class="">
            <f7-card-content class="">
              <f7-row>
                <f7-col width="70"><h3>Listado de comprobantes</h3></f7-col>
                <f7-col width="30">
                  <f7-icon size="55px" color="green" f7="list_alt"></f7-icon>
                </f7-col>
              </f7-row>
            </f7-card-content>
          </f7-card>
        </f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col width="50">
          <f7-card @click.native="go('nw_doc')" class="">
            <f7-card-content class="text-align-center">
              <f7-icon size="35px" color="light-blue" class="fa fa-file-invoice"></f7-icon>
              <h3 class="no-padding">Factura <br> Electrónica</h3>
            </f7-card-content>
          </f7-card>
        </f7-col>
        <f7-col width="50">
          <f7-card @click.native="go('nw_docb')" class="">
            <f7-card-content class="text-align-center">
              <f7-icon size="35px" color="light-blue" class="fa fa-receipt"></f7-icon>
              <h3 class="no-padding">Boleta  <br> Electrónica</h3>
            </f7-card-content>
          </f7-card>
        </f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col width="33">
          <f7-card @click.native="go('sale_note')" class="">
            <f7-card-content class="text-align-center no-padding-horizontal">
              <span>
                <f7-icon size="44px" color="light-blue" material="note_add"></f7-icon>
              </span>
              <p class="no-padding">Nota de venta</p>
            </f7-card-content>
          </f7-card>
        </f7-col>
        <f7-col width="33">
          <f7-card @click.native="go('order_note')" class="">
            <f7-card-content class="text-align-center">
              <span>
                <f7-icon size="44px" color="light-blue" material="note_add"></f7-icon>
              </span>
              <p>Pedido</p>
            </f7-card-content>
          </f7-card>
        </f7-col>
        <f7-col width="33">
          <f7-card @click.native="go('purchase')" class="">
            <f7-card-content class="text-align-center">
              <span>
                <f7-icon size="44px" color="light-blue" material="note_add"></f7-icon>
              </span>
              <p>Compras</p>
            </f7-card-content>
          </f7-card>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<style scoped>
.navbar-cus{
   background:#17a2b8;
   color:white
}
.center_ic {
  text-align: center;
}
.title img {
  max-height: 70px;
  margin-top: 0;
  max-width: 40%;
  margin-left: 0;
}
</style>
<script>
import logo from "assets/images/logo9_b.png";
import logoFacturaloPeru from "assets/images/facturaloperu.png";
const url = "https://demo.facturador.pro/api";
const token = "hcTC1Up87AYr3p4D5jY1APRPwYZ7wXGxBSJL1yUwzynIIPcnyb";
export default {
  components: {},
  data: function() {
    // Must return an object
    return {
      logoban: logo,
      logoFacturaloPeru : logoFacturaloPeru,
      user: "",
      password: "",
      splash: true,
      isOffline: false
    };
  },
  created() {
    // this.verifytoken();
    var self = this;
    window.addEventListener("online", function() {
      self.isOffline = false;
    });
    window.addEventListener("offline", function() {
      self.isOffline = true;
    });
  },
  mounted() {
    setTimeout(this.verifytoken, 1000); // 2500);
  },
  methods: {
    go(name) {
      const self = this;

      if (self.isOffline) {
        return false;
      }

      switch (name) {
        case "ls_doc":
          self.$f7router.navigate("/documents/");
          break;
        case "nw_doc":
          self.$f7router.navigate("/form-document/01");
          break;
        case "nw_docb":
          self.$f7router.navigate("/form-document/03");
          break;
        case "report":
          self.$f7router.navigate("/report/");
          break;
        case "cpe":
          self.$f7router.navigate("/cpe/");
          break;
        case "sale_note":
          self.$f7router.navigate("/form-sale-note/");
          break;
        case "order_note":
          self.$f7router.navigate("/form-order-note/");
          break;
        case "purchase":
          self.$f7router.navigate("/form-purchase/");
          break;
      }
    },
    verifytoken() {
      const self = this;
      if (!localStorage.api_token) {
        this.splash = false;
        self.$f7router.navigate("/login/");
      } else {
        this.splash = false;
      }
    }
  }
};
</script>
