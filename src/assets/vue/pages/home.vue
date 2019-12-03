<template>
  <f7-page>
    <f7-popup class="demo-popup" :opened="splash" @popup:closed="popupOpened = false">
      <f7-page style="background:#676666">
        <f7-block>
          <img class="center" :src="logoban" alt />
        </f7-block>
      </f7-page>
    </f7-popup>
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>
      <div class="title">App Factúralo Perú</div>
    </f7-navbar>
    <f7-block inner>
      <p>App de Factúralo Perú.</p>
    </f7-block>

    <f7-block>
      <f7-row>
        <f7-col>
          <f7-card @click.native="go('ls_doc')" class="demo-card-header-pic">
            <f7-card-content class="center_ic">
              <span>
                <f7-icon f7="folder" size="44px" color="blue"></f7-icon>
              </span>
              <p>Listado Documentos</p>
            </f7-card-content>
          </f7-card>
        </f7-col>
        <f7-col>
          <f7-card @click.native="go('nw_doc')" class="demo-card-header-pic">
            <f7-card-content class="center_ic">
              <span>
                <f7-icon f7="bag" size="44px" color="blue"></f7-icon>
              </span>
              <p>Nuevo Comprobante</p>
              
            </f7-card-content>
          </f7-card>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <f7-card @click.native="go('report')" class="demo-card-header-pic">
            <f7-card-content class="center_ic">
              <span>
                <f7-icon f7="calendar_today" size="44px" color="blue"></f7-icon>
              </span>
              <p>Reportes</p>
            </f7-card-content>
          </f7-card>
        </f7-col>
        <f7-col>
          <f7-card @click.native="go('cpe')" class="demo-card-header-pic">
            <f7-card-content class="center_ic">
              <span>
                <f7-icon f7="lessthan_circle_fill" size="44px" color="blue"></f7-icon>
              </span>
              <p>Validar CPE</p>
            </f7-card-content>
          </f7-card>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<style scoped>
.center {
  margin-top: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}
.center_ic {
  text-align: center;
}
</style>
<script>
import logo from "assets/images/logo9_b.png";
const url = "https://demo.facturador.pro/api";
const token = "hcTC1Up87AYr3p4D5jY1APRPwYZ7wXGxBSJL1yUwzynIIPcnyb";
export default {
  components: {},
  data: function() {
    // Must return an object
    return {
      logoban: logo,
      user: "",
      password: "",
      splash: true
    };
  },
  created() {
    // this.verifytoken();
  },
  mounted() {
    setTimeout(this.verifytoken, 2500);
  },
  methods: {
    go(name) {
      const self = this;
      switch (name) {
        case "ls_doc":
          self.$f7router.navigate("/documents/");
          break;
        case "nw_doc":
          self.$f7router.navigate("/form-document/");
          break;
        case "report":
          self.$f7router.navigate("/report/");
          break;
        case "cpe":
          self.$f7router.navigate("/cpe/");
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
