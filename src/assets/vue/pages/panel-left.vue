<template>
  <f7-page>
    <f7-block-title>Acciones</f7-block-title>
    <f7-block>
      <f7-block>
        <f7-button class="button-fill" color="green" @click="go" outline>Configuracion</f7-button>
      </f7-block>
      <f7-block>
        <f7-button class="button-fill" color="red" @click="logout" outline>Cerrar Sesión</f7-button>
      </f7-block>
      <!--<p>
         hola mundo cristian:
        <f7-link panel-close>close me</f7-link>. You can put here anything.
      </p>-->
    </f7-block>
    <!--<f7-block-title>Main View Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" panel-close></f7-list-item>
    </f7-list>-->

    <div class="footer">
      <f7-block-title>FacturaloPeru APP</f7-block-title>
    </div>
  </f7-page>
</template>

<style  scoped>
.footer {
  text-align: center;
  z-index: 9999;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
</style>
<script>
export default {
  components: {},
  methods: {
    go() {
      this.$f7router.navigate("/configuration/");
    },
    logout() {
      localStorage.removeItem("api_token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      localStorage.removeItem('api_url')
      location.reload();
      // this.$f7router.navigate("/");
    }
  }
};
</script>
