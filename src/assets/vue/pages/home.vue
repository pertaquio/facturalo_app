<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>
      <div class="title">App Facuralo</div>
      <f7-nav-right>
        <f7-link
          class="searchbar-enable"
          data-searchbar=".searchbar-components"
          icon="fas fa-search"
        ></f7-link>
      </f7-nav-right>
      <f7-searchbar
        class="searchbar-components"
        search-container=".components-list"
        search-in="a"
        expandable
      ></f7-searchbar>
    </f7-navbar>
    <f7-block inner>
      <p>App de Facturalo Perú.</p>
    </f7-block>
    <!-- <f7-block-title class="searchbar-found">Links</f7-block-title>-->
    <f7-list class="components-list searchbar-found">
      <f7-list-item link="/documents/" title="Listado Comprobantes" panel-close>
        <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/form-document/" title="Nuevo Comprobante" panel-close>
        <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
      </f7-list-item>
      <f7-list-item link="/cpe/" title="Consulta CPE" panel-close>
        <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
      </f7-list-item>
     
    </f7-list>
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";
const token = "hcTC1Up87AYr3p4D5jY1APRPwYZ7wXGxBSJL1yUwzynIIPcnyb";
export default {
  components: {},
  data: function() {
    // Must return an object
    return {
      user: "",
      password: ""
    };
  },
  created() {
    this.verifytoken();
  },
  methods: {
    verifytoken() {
      const self = this;
      if (!localStorage.api_token) {
        //self.$f7router.navigate("/documents/");
          self.$f7router.navigate("/login/");
      }
    }
    
  }
};
</script>
