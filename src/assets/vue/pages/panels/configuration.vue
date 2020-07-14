<template>
  <f7-page class="panel-dark">
    <f7-block>
      <p center class="text-color-white">
        <f7-icon material="settings" class="padding-right padding-left"></f7-icon>
        Configuración
      </p>
    </f7-block>
    <hr>
    <f7-block>
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
                    :value="form.email"
                    @input="form.email = $event.target.value"
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
                    :value="form.password"
                    @input="form.password = $event.target.value"
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
                    :value="form.url"
                    @input="form.url = $event.target.value"
                  >
                  </f7-list-input>
                </f7-list>
              </form>
            </f7-col>
          </f7-row>
        </f7-card-content>
      </f7-card>
    </f7-block>
    <div class="footer">
      <f7-block>
        <f7-button class="trasnparent" color="white" @click="submit">
          <f7-icon material="save" size="20"></f7-icon>
          Guardar
        </f7-button>
        <f7-button class="trasnparent panel-previous" color="white" @click="back">
          <f7-icon material="keyboard_arrow_left" size="20"></f7-icon>
          Volver
        </f7-button>
      </f7-block>
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
// VForm
import Form from 'vform';
// Axios
import axios from 'axios';

export default {
  name: "Configuration",
  components: {},
  data: function() {
    return {
      form: new Form({
        email:     localStorage.user_email,
        password:  null,
        url:       localStorage.api_url,
        api_token: localStorage.api_token,
      }),
    };
  },
  methods: {
    async submit() {
      this.$f7.preloader.show();

      this.form.post(`${localStorage.api_url}/api/config_user`)
        .then((response) => {
          this.$f7.preloader.hide();
          if(response.data.data) {
            const data = response.data.data;
            Object.keys(data).forEach(key => {
              localStorage[key] = data[key]
            });
            alert("Datos actualizados");
          }
        })
        .catch((error) => {
          this.$f7.preloader.hide();
          alert("Ocurrio un error");
          console.log(error);
        });
    },
    saveToken(token, name, email) {
      localStorage.api_token = token;
      localStorage.user_name = name;
      localStorage.user_email = email;

      localStorage.api_url = this.form.url;
    },
    back() {
      this.$f7router.navigate("/panel-right/");
    },
  }
};
</script>
