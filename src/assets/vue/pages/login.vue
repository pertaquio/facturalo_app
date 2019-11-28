<template>
  <f7-page>
    <f7-navbar title="Login Facturalo"></f7-navbar>

    <form class="list form-store-data" id="demo-form"> <br> <br>
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Usuario</div>
            <div class="item-input-wrap">
              <input name="name" required validate type="text" v-model="email" placeholder="Ingrese usuario" />
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Password</div>
            <div class="item-input-wrap">
              <input name="password" required validate v-model="password" type="password" placeholder="Ingrese password" />
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
</style>
<script>
const url = "https://demo.facturador.pro/api";
//const token = "hcTC1Up87AYr3p4D5jY1APRPwYZ7wXGxBSJL1yUwzynIIPcnyb";

export default {
  components: {},
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    saveToken(token, name, email) {
      localStorage.api_token = token;
      localStorage.user_name = name;
      localStorage.user_email = email;
    },
    login() {

      if(!this.email || !this.password)
      {
        return
      }

      const self = this;

      self.$f7.preloader.show();

      this.$http
        .post(`${url}/login`, { email: this.email, password: this.password })
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
          console.log(err);
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    }
  }
};
</script>
