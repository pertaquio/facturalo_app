<template>
  <f7-page>
    <f7-navbar title="Facturador PRO APP"></f7-navbar>

    <f7-block-title class="title">Inicio de Sesión</f7-block-title>

    <form class="list form-store-data" id="demo-form">
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
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button color="green" @click="login" outline>Ingresar</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<style scoped>
.item-label {
  font-size: 17px;
  font-weight: bold;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20%;
}
</style>
<script>
import { auth } from "mixins_/auth";

export default {
  mixins: [auth],
  components: {},
  data: function() {
    return {
      email: "demo@gmail.com",
      password: "123456",
      url: "https://demo.facturador.pro"
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
