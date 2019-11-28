<template>
  <f7-page>
    <f7-navbar title="Lista Documentos" back-link="Back"></f7-navbar>
    <!-- <f7-block-title>Documentos</f7-block-title> -->
    <form class="searchbar">
      <div class="searchbar-inner">
        <div class="searchbar-input-wrap">
          <input @keyup="search" v-model="text_seacrh" type="search" placeholder="Search" />
          <i class="searchbar-icon"></i>
          <span @click="clean" class="input-clear-button"></span>
        </div>
        <span  class="searchbar-disable-button">Cancel</span>
      </div>
    </form>

    <f7-block>
      <f7-card v-for="item in source" :key="item.id" class="demo-card-header-pic">
        <f7-card-header
          class="no-border"
          valign="bottom"
          style="background: darkgrey;"
        >{{ item.document_type_description }} : {{ item.number }}</f7-card-header>
        <f7-card-content>
          <p class="date">Estado: {{ item.state_type_description }}</p>
          <p>{{ item.created_at }}</p>
          <p>{{ item.total }}</p>
          <p>RUC: {{ item.customer_number }}</p>
          <p>{{ item.customer_name }}</p>
        </f7-card-content>
        <!--<f7-card-footer>
          <f7-link>Like</f7-link>
          <f7-link>Read more</f7-link>
        </f7-card-footer>-->
      </f7-card>
    </f7-block>

    <!-- <f7-link href="/form-document/">Nuevo</f7-link> -->
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";

export default {
  components: {},
  data: function() {
    // Must return an object
    return {
      source: [],
      sourceClone: [],
      text_seacrh: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {

    clean()
    {
      this.source = this.sourceClone;
    },
    search() {
      let texx = this.text_seacrh;
      if (texx.length > 0) {
        this.source = this.sourceClone.filter(row => {
          return row.number.includes(texx);
        });
      } else {
        this.source = this.sourceClone;
      }
    },
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
          self.sourceClone = response.data.data;
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
