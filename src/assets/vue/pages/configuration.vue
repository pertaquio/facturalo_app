<template>
  <f7-page>
    <f7-block-title>Configuración</f7-block-title>
    <div class="list">
      <ul>
        <li class="item-content item-input item-input-with-info">
          <div class="item-inner">
            <div class="item-title item-label">Email</div>
            <div class="item-input-wrap">
              <input type="email" placeholder="Tu email" required validate v-model="form.email" />
              <span class="input-clear-button"></span>
              <div class="item-input-info">Default "required" validation</div>
            </div>
          </div>
        </li>
        <li class="item-content item-input item-input-with-info">
          <div class="item-inner">
            <div class="item-title item-label">Contraseña</div>
            <div class="item-input-wrap">
              <input
                type="password"
                placeholder="Tu contraseña"
                required
                validate
                v-model="form.password"
              />
              <span class="input-clear-button"></span>
              <!--<div class="item-input-info">Default "required" validation</div> -->
            </div>
          </div>
        </li>
        <li class="item-content item-input item-input-with-info">
          <div class="item-inner">
            <div class="item-title item-label">URL</div>
            <div class="item-input-wrap">
              <input
                type="url"
                placeholder="https://demo.facturador.pro"
                required
                validate
                v-model="form.url"
              />
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <f7-block>
      <f7-button class="button-fill" color="green" @click="submit" outline>Guardar</f7-button>
    </f7-block>
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
  name: "Configuration",
  components: {},
  data: function() {
    return {
      form: {}
    };
  },
  created() {
    this.initForm();
  },
  methods: {
    initForm() {
      this.form = {
        email: localStorage.user_email,
        password: "",
        url: localStorage.api_url
      };
    },
    submit() {
      if (!this.form.email || !this.form.password || !this.form.url) {
        return;
      }

      this.$http
        .post(`${this.form.url}/api/login`, {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {

          let data = response.data;
          if (data.success) {
            this.saveToken(data.token, data.name, data.email);
            this.initForm();
            location.reload();
          } else {
            alert("Usuario o Contraseña incorrecta.");
          }
        })
        .catch(err => {
          alert("No se logro conexion con la URL, verifique la URL.");
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    },
    saveToken(token, name, email) {
      localStorage.api_token = token;
      localStorage.user_name = name;
      localStorage.user_email = email;

      localStorage.api_url = this.form.url;
    }
  }
};
</script>
