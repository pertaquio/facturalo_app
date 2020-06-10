<template>
  <f7-page class="page-red" color="white">
    <f7-block>
      <f7-row>
        <f7-col width="100">
          <p class="text-align-center">
            <img :src="fp_logo_white" alt="FacturaloPeru" width="60%" />
          </p>
          <p class="text-align-center text-color-white padding-top">BIENVENIDO</p>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-card color="red">
      <f7-card-content>
        <f7-row no-gap>
          <f7-col>
            <form class="form-store-data" id="demo-form">
              <f7-list no-hairlines-md>
                <f7-list-input
                  outline
                  floating-label
                  type="text"
                  clear-button
                  label="Correo"
                  placeholder="Correo"
                  name="name"
                  required
                  validate
                  :value="email"
                  @input="email = $event.target.value"
                >
                </f7-list-input>
                <f7-list-input
                  outline
                  floating-label
                  type="password"
                  clear-button
                  label="Contraseña"
                  placeholder="Contraseña"
                  name="password"
                  required
                  validate
                  :value="password"
                  @input="password = $event.target.value"
                >
                </f7-list-input>
                <f7-list-input
                  outline
                  floating-label
                  type="url"
                  clear-button
                  label="URL"
                  placeholder="https://demo.facturador.pro"
                  required
                  validate
                  :value="url"
                  @input="url = $event.target.value"
                >
                </f7-list-input>
              </f7-list>
            </form>
          </f7-col>
        </f7-row>
      </f7-card-content>
    </f7-card>

    <!-- <f7-block>
      <f7-row no-gap>
      <form class="form-store-data" id="demo-form">

        <ul>
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Usuario</div>
              <div class="item-input-wrap">
                <input
                  name="name"
                  required
                  validate
                  type="text"
                  v-model="email"
                  placeholder="Ingrese usuario"
                />
                <span class="input-clear-button"></span>
              </div>
            </div>
          </li>
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Password</div>
              <div class="item-input-wrap">
                <input
                  name="password"
                  required
                  validate
                  v-model="password"
                  type="password"
                  placeholder="Ingrese password"
                />
                <span class="input-clear-button"></span>
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
                  v-model="url"
                />
                <span class="input-clear-button"></span>
              </div>
            </div>
          </li>
        </ul>
      </form>
      </f7-row>
    </f7-block> -->

    <f7-block>
      <f7-row>
        <f7-col width="20"></f7-col>
        <f7-col width="60">
          <f7-button @click="login" color="red" fill raised>Ingresar</f7-button>
        </f7-col>
        <f7-col width="20"></f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<style scoped>

/*.item-label {
  font-size: 17px;
  font-weight: bold;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20%;
}*/
</style>
<script>

import { auth } from "mixins_/auth";
import FpLogoDark from "assets/images/facturaloperu.png";
import FpLogoWhite from "assets/images/fp_logo_white.png";

export default {
  mixins: [auth],
  components: {},
  data: function() {
    return {
      email: "demo@gmail.com",
      password: "123456",
      url: "https://demo.facturador.pro",
      fp_logo_dark: FpLogoDark,
      fp_logo_white: FpLogoWhite,
    };
  },
  created() {},
  computed: {},
  methods: {

    saveToken(token, name, email) {
      localStorage.api_token = token;
      localStorage.user_name = name;
      localStorage.user_email = email;

      localStorage.api_url = this.url
    },
    login() {
      if (!this.email || !this.password || !this.url) {
        return;
      }

      const self = this;

      self.$f7.preloader.show();

      this.$http
        .post(`${this.url}/api/login`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            self.saveToken(data.token, data.name, data.email);
            self.$f7router.navigate("/");
          } else {
            alert("Usuario o Password incorrectos.");
          }
        })
        .catch(err => {
          alert("No se logro conexion con la URL, verifique la URL.");
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    }
  }
};
</script>
