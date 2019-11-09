<template>
  <f7-page>
    <!--<f7-navbar title="Lista de Documentos" back-link="Back"></f7-navbar> -->
    <div class="block block-strong"></div>

    <div class="list media-list">

      <f7-link href="/form-document/">Nuevo</f7-link>
      <ul id="documents-lists">
        <li>
          <div v-for="item in source" :key="item.id" class="item-content row">
            <div class="col-33">
              <p class="text-align-left size-12">{{ item.number }}</p>
              <p class="text-align-left size-12">{{ item.document_type_description }}</p>
              <p class="text-align-left size-12">
                <span class="badge color-green">{{ item.state_type_description }}</span>
              </p>
            </div>

            <div class="col-66">
              <div class="item-title-row">
                <div class="item-title">{{ item.created_at }}</div>
                <div class="item-after">{{ item.total }}</div>
              </div>

              <div class="item-subtitle">RUC: {{ item.customer_number }}</div>
              <div class="item-text">{{ item.customer_name }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";

export default {
  components: {},
  data: function() {
    // Must return an object
    return {
      source: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getHeaderConfig() {
      let token = localStorage.api_token;
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      return axiosConfig;
    },

    getData() {
      const self = this;
      self.$f7.preloader.show();

      this.$http
        .get(`${url}/documents/lists`, this.getHeaderConfig())
        .then(response => {
          self.source = response.data.data;
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
