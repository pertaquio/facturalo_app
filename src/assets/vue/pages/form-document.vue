<template>
  <f7-page>
    <f7-navbar title="Nuevo Comprobante" back-link="Back"></f7-navbar>
    <div class="block block-strong">
      <!--  <p></p> -->
    </div>
    <form class="list form-store-data" id="demo-form">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Tipo Comprobante</div>
            <div class="item-input-wrap">
              <select
                @change="selectDocumentType"
                v-model="form.codigo_tipo_documento"
                name="gender"
                placeholder="Please choose..."
              >
                <option selected value="01">Factura</option>
                <option value="03">Boleta</option>
              </select>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Cliente</div>
            <div class="item-input-wrap">
              <select
                @change="selectCustomer"
                v-model="form.customer_id"
                name="gender"
                placeholder="Please choose..."
              >
                <option v-for="item in customers" :key="item.id" :value="item.id">{{item.name}}</option>
              </select>
            </div>
          </div>
        </li>

        <f7-button fill @click="formAddItem = true">Agregar Producto</f7-button>
        <li class="item-content item-input">
          <br />
          <div class="data-table card">
            <table>
              <thead>
                <tr>
                  <th class="label-cell">#</th>
                  <th class="numeric-cell">Descripcion</th>
                  <th class="medium-only">Cantidad</th>

                  <th class="medium-only">Precio</th>
                  <th class="medium-only">Subtotal</th>
                  <th class="medium-only">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in form.items" :key="index">
                  <td class="label-cell">{{index + 1 }}</td>
                  <td class="numeric-cell">{{item.descripcion}}</td>
                  <td class="numeric-cell">{{item.cantidad}}</td>

                  <td class="numeric-cell">{{item.precio_unitario}}</td>
                  <td class="numeric-cell">{{item.total_item}}</td>
                  <td class="numeric-cell">{{item.total_item}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>

        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">URL</div>
            <div class="item-input-wrap">
              <input name="url" type="url" placeholder="URL" />
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Phone</div>
            <div class="item-input-wrap">
              <input name="phone" type="tel" placeholder="Your phone number" />
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Gender</div>
            <div class="item-input-wrap">
              <select name="gender" placeholder="Please choose...">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Birthday</div>
            <div class="item-input-wrap">
              <input name="birthday" type="date" value="2014-04-30" placeholder="Please choose..." />
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Date time</div>
            <div class="item-input-wrap">
              <input name="date" type="datetime-local" placeholder="Please choose..." />
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Range</div>
            <div class="item-input-wrap">
              <div class="range-slider range-slider-init" data-label="true">
                <input name="range" type="range" value="50" min="0" max="100" step="1" />
              </div>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">About you</div>
            <div class="item-input-wrap">
              <textarea name="bio" class="resizable" placeholder="Bio"></textarea>
            </div>
          </div>
        </li>
      </ul>
    </form>
    <f7-sheet
      class="demo-sheet"
      :opened="formAddItem"
      style="height:auto; --f7-sheet-bg-color: #fff;"
      swipe-to-close
      swipe-to-step
      backdrop
    >
      <!-- Initial swipe step sheet content -->
      <div class="sheet-modal-swipe-step">
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px">
            <b>Total:</b>
          </div>
          <div style="font-size: 22px">
            <b>S/. {{form_item.total}}</b>
          </div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button @click="addItem" large fill>Agregar</f7-button>
          <form class="list form-store-data" id="demo-form-item">
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Producto</div>
                <div class="item-input-wrap">
                  <select
                    @change="calculateTotalItem"
                    v-model="form_item.id"
                    placeholder="Please choose..."
                  >
                    <option v-for="item in items" :key="item.id" :value="item.id">{{item.name}}</option>
                  </select>
                </div>
              </div>
            </li>
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Cantidad</div>
                <div class="item-input-wrap">
                  <select
                    @change="calculateTotalItem"
                    v-model="form_item.quantity"
                    placeholder="Please choose..."
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </li>
          </form>
        </div>
      </div>
      <!-- Rest of the sheet content that will opened with swipe -->
      <f7-block-title medium class="margin-top">Your order:</f7-block-title>
      <f7-list no-hairlines>
        <f7-list-item title="Item 1">
          <b slot="after" class="text-color-black">$200</b>
        </f7-list-item>
        <f7-list-item title="Item 2">
          <b slot="after" class="text-color-black">$180</b>
        </f7-list-item>
        <f7-list-item title="Delivery">
          <b slot="after" class="text-color-black">$120</b>
        </f7-list-item>
      </f7-list>
    </f7-sheet>
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";
import moment from "moment";
export default {
  components: {},
  data: function() {
    // Must return an object
    return {
      customers: [],
      items: [],
      form: {},
      form_item: {},
      formAddItem: false
    };
  },
  async created() {
    await this.initForm();
    this.initFormItem();
    this.getTables();
  },

  methods: {
    send() {
      const self = this;

      self.$f7.preloader.show();

      this.$http
        .post(`${url}/documents`, this.form)
        .then(response => {
          let data = response.data;
          if (data.success) {
            alert('Compra registrada')
            self.$f7router.navigate("/documents/");
          } else {

            alert('No se registro la Compra')

          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    },
    selectDocumentType() {
      if (this.form.codigo_tipo_documento == "01") {
        this.form.serie_documento = "F001";
      } else if (this.form.codigo_tipo_documento == "03") {
        this.form.serie_documento = "B001";
      }
    },
    setTotals() {
      this.form.totales = {
        total_exportacion: 0.0,
        total_operaciones_gravadas: 100.0,
        total_operaciones_inafectas: 0.0,
        total_operaciones_exoneradas: 0.0,
        total_operaciones_gratuitas: 0.0,
        total_igv: 18.0,
        total_impuestos: 18.0,
        total_valor: 100,
        total_venta: 118
      };
    },
    selectCustomer() {
      let row = this.customers.find(x => x.id == this.form.customer_id);
      if (!row) return false;

      this.form.datos_del_cliente_o_receptor = {
        codigo_tipo_documento_identidad: row.identity_document_type_id,
        numero_documento: row.number,
        apellidos_y_nombres_o_razon_social: row.name,
        codigo_pais: "PE",
        ubigeo: "150101",
        direccion: row.address,
        correo_electronico: row.email,
        telefono: "427-1148"
      };
    },
    calculateItem() {
      let row = this.form_item;
      return {
        codigo_interno: row.item.internal_id,
        descripcion: row.item.description,
        codigo_producto_sunat: row.item.item_code,
        unidad_de_medida: row.item.unit_type_id,
        cantidad: row.quantity,
        valor_unitario: row.item.purchase_unit_price,
        codigo_tipo_precio: "01",
        precio_unitario: row.item.sale_unit_price,
        codigo_tipo_afectacion_igv: row.item.sale_affectation_igv_type_id,
        total_base_igv: 100.0,
        porcentaje_igv: 18,
        total_igv: 18,
        total_impuestos: 18,
        total_valor_item: 100,
        total_item: row.total
      };
    },
    addItem() {
      this.formAddItem = false;
      this.form.items.push(this.calculateItem());
      this.initFormItem();
      this.setTotals();
    },
    calculateTotalItem() {
      if (this.form_item.id) {
        let id = this.form_item.id;
        let row = this.items.find(x => x.id == id);

        this.form_item.total =
          parseInt(this.form_item.quantity) * Number(row.purchase_unit_price);

        this.form_item.item = row;
      }
    },
    initFormItem() {
      this.form_item = {
        id: null,
        quantity: 1,
        total: 0,
        item: {}
      };
    },
    initForm() {
      this.form = {
        serie_documento: "",
        numero_documento: "#",
        fecha_de_emision: moment().format("YYYY-MM-DD"),
        hora_de_emision: moment().format("HH:mm:ss"),
        codigo_tipo_operacion: "0101",
        codigo_tipo_documento: "",
        codigo_tipo_moneda: "PEN",
        fecha_de_vencimiento: moment().format("HH:mm:ss"),
        numero_orden_de_compra: "",
        informacion_adicional: "",
        datos_del_cliente_o_receptor: {},
        totales: {},
        items: []
      };
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
    getTables() {
      const self = this;
      self.$f7.preloader.show();
      this.$http
        .get(`${url}/document/tables`, this.getHeaderConfig())
        .then(response => {
          let source = response.data.data;
          self.customers = source.customers;
          self.items = source.items;
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
