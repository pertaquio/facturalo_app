<template>
  <f7-page>
    <f7-navbar title="Nuevo Documento" back-link="Back"></f7-navbar>
    <div class="block block-strong"></div>
    <div class="list inline-labels no-hairlines-md">
      <ul>
        <li class="item-content item-input">
          <div class="item-media">
            <i class="icon demo-list-icon"></i>
          </div>
          <div class="item-inner">
            <div class="item-title item-label">Tipo Comprobante</div>
            <div class="item-input-wrap input-dropdown-wrap">
              <select>
                <option>Factura</option>
                <option>Boleta</option>
              </select>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-media">
            <i class="icon demo-list-icon"></i>
          </div>
          <div class="item-inner">
            <div class="item-title item-label">Tipo Moneda</div>
            <div class="item-input-wrap input-dropdown-wrap">
              <select>
                <option>Soles</option>
                <option>Dolares</option>
              </select>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-media">
            <i class="icon demo-list-icon"></i>
          </div>
          <div class="item-inner">
            <div class="item-title item-label">Fecha Venc.</div>
            <div class="item-input-wrap">
              <input type="date" placeholder="Please choose..." />
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-media">
            <i class="icon demo-list-icon"></i>
          </div>
          <div class="item-inner">
            <div class="item-title item-label">Cliente</div>
            <div class="item-input-wrap input-dropdown-wrap">
              <select>
                <option>JUAN PERES</option>
                <option>PRDRO MORALES</option>
              </select>
            </div>
          </div>
        </li>

        <li class="item-content item-input">
          <div class="item-media">
            <i class="icon demo-list-icon"></i>
          </div>
          <div class="item-inner">
            <div class="item-title item-label">Cliente</div>
            <div class="item-input-wrap input-dropdown-wrap">
              <select>
                <option>Inka kola 2L</option>
                <option>Sprite 1L</option>
              </select>
            </div>
          </div>
        </li>
      </ul>

      <f7-button fill>Procesar</f7-button>
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
      //source: []
    };
  },
  created() {
    // this.getData();
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

    getData() {}
  }
};
</script>
