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

    <f7-list class="components-list searchbar-found">
      <f7-list-item link="/documents/" title="Listado Comprobantes" panel-close>
        <f7-icon slot="media" ios="f7:receipt" md="material:receipt"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/form-document/" title="Nuevo Comprobante" panel-close>
        <f7-icon slot="media" ios="f7:filter_1" md="material:filter_1"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/cpe/" title="Consulta CPE" panel-close>
        <f7-icon slot="media" ios="f7:scanner" md="material:scanner"></f7-icon>
      </f7-list-item>
    </f7-list>
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
</style>
<script>
import logo from 'assets/images/logo9_b.png'
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
      splash:true
    };
  },
  created() {
   // this.verifytoken();
  },
  mounted()
  {
    
     setTimeout(this.verifytoken, 2500);
  },
  methods: {

    verifytoken() {
      const self = this;
      if (!localStorage.api_token) {
        this.splash = false
        self.$f7router.navigate("/login/");
      }
      else{
        this.splash = false
      }



    }
  }
};
</script>
