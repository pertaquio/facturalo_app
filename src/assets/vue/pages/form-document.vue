<template>
  <f7-page>
    <f7-navbar title="Nuevo Comprobante" back-link="Back"></f7-navbar>

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
                <option :value="'01'">Factura</option>
                <option :value="'03'">Boleta</option>
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

        <f7-button fill @click="formAddItem = !formAddItem">Agregar Producto</f7-button>
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
                <tr v-for="(row, index) in form.items" :key="index">
                  <td class="label-cell">{{index + 1 }}</td>
                  <td class="numeric-cell">{{row.item.description}}</td>
                  <td class="numeric-cell">{{row.quantity}}</td>

                  <td class="numeric-cell">S/. {{ Number(row.unit_price).toFixed(2)}}</td>
                  <td class="numeric-cell">S/. {{row.total_value}}</td>
                  <td class="numeric-cell">S/. {{row.total}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>

        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Orden de Compra</div>
            <div class="item-input-wrap">
              <input name="phone" v-model="form.numero_orden_de_compra" type="text" />
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>

        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Fecha Vencimiento</div>
            <div class="item-input-wrap">
              <input
                name="date"
                v-model="form.fecha_de_vencimiento"
                type="date"
                placeholder="Please choose..."
              />
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">IGV</div>
            <div class="item-input-wrap">
              <input
                :disabled="true"
                name="date"
                v-model="form.total_igv"
                type="text"
                placeholder="Please choose..."
              />
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">TOTAL A PAGAR</div>
            <div class="item-input-wrap">
              <input
                :disabled="true"
                name="date"
                v-model="form.total"
                type="text"
                placeholder="Please choose..."
              />
            </div>
          </div>
        </li>
      </ul>

      <f7-button fill @click="send">Generar</f7-button>
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
            <b>Precio Unitario:</b>
          </div>
          <div style="font-size: 22px">
            <b>S/. {{form_item.sale_unit_price}}</b>
          </div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button v-show="form_item.item_id" @click="addItem" large fill>Agregar</f7-button>
          <form class="list form-store-data" id="demo-form-item">
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Producto</div>
                <div class="item-input-wrap">
                  <select
                    @change="changeItem"
                    v-model="form_item.item_id"
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
                  <select v-model="form_item.quantity" placeholder="Please choose...">
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
    </f7-sheet>
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";
import moment from "moment";
import _ from "lodash";
import { calculateRowItem } from "js_/helpers/functions";

export default {
  components: {},
  data: function() {
    // Must return an object
    return {
      customers: [],
      items: [],
      form: {},
      form_item: {},
      formAddItem: false,
      affectation_igv_types: [],
      row: {},
      exchangeRateSale: 3.353
    };
  },
  async created() {
    await this.initForm();
    this.initFormItem();
    this.getTables();
  },

  methods: {
    changeItem() {
      this.form_item.item = _.find(this.items, { id: this.form_item.item_id });
      /*this.form_item.item_unit_types = _.find(this.items, {
        id: this.form_item.item_id
      }).item_unit_types;*/
      this.form_item.unit_price_value = this.form_item.item.sale_unit_price;

      this.form_item.has_igv = this.form_item.item.has_igv;
      this.form_item.affectation_igv_type_id = this.form_item.item.sale_affectation_igv_type_id;
    },
    getFormatter() {
      return {
        serie_documento: this.form.serie_documento,
        numero_documento: this.form.numero_documento,
        fecha_de_emision: this.form.fecha_de_emision,
        hora_de_emision: this.form.hora_de_emision,
        codigo_tipo_operacion: this.form.codigo_tipo_operacion,
        codigo_tipo_documento: this.form.codigo_tipo_documento,
        codigo_tipo_moneda: "PEN",
        fecha_de_vencimiento: this.form.fecha_de_vencimiento,
        datos_del_cliente_o_receptor: this.form.datos_del_cliente_o_receptor,
        totales: {
          total_exportacion: this.form.total_exportation,
          total_operaciones_gravadas: this.form.total_taxed,
          total_operaciones_inafectas: this.form.total_unaffected,
          total_operaciones_exoneradas: this.form.total_exonerated,
          total_operaciones_gratuitas: this.form.total_free,
          total_impuestos_bolsa_plastica: 0.0,
          total_igv: this.form.total_igv,
          total_impuestos: this.form.total_taxes,
          total_valor: this.form.total_value,
          total_venta: 118.2
        },
        items: this.form.items.map(x => {
          return {
            codigo_interno: x.item.internal_id,
            descripcion: x.item.description,
            codigo_producto_sunat: x.item.item_code,
            unidad_de_medida: "NIU",
            cantidad: x.quantity,
            valor_unitario: x.unit_value,
            codigo_tipo_precio: "01",
            precio_unitario: x.unit_price,
            codigo_tipo_afectacion_igv: x.affectation_igv_type_id,
            total_base_igv: x.total_base_igv,
            porcentaje_igv: x.percentage_igv,
            total_igv: x.total_igv,
            total_impuestos_bolsa_plastica: x.total_plastic_bag_taxes,
            total_impuestos: x.total_taxes,
            total_valor_item: x.total_value,
            total_item: x.total
          };
        }),
        informacion_adicional: "Forma de pago:Efectivo|Caja: 1"
      };
    },
    send() {
      const self = this;

      self.$f7.preloader.show();

      this.$http
        .post(`${url}/documents`, this.getFormatter(), this.getHeaderConfig())
        .then(response => {
          let data = response.data;
          if (data.success) {
            alert("Compra registrada");
            self.$f7router.navigate("/documents/");
          } else {
            alert("No se registro la Compra");
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
    calculateTotal() {
      let total_discount = 0;
      let total_charge = 0;
      let total_exportation = 0;
      let total_taxed = 0;
      let total_exonerated = 0;
      let total_unaffected = 0;
      let total_free = 0;
      let total_igv = 0;
      let total_value = 0;
      let total = 0;
      let total_plastic_bag_taxes = 0;
      this.form.items.forEach(row => {
        if (row.affectation_igv_type_id === "10") {
          total_taxed += parseFloat(row.total_value);
        }
        if (row.affectation_igv_type_id === "20") {
          total_exonerated += parseFloat(row.total_value);
        }
        if (row.affectation_igv_type_id === "30") {
          total_unaffected += parseFloat(row.total_value);
        }
        if (row.affectation_igv_type_id === "40") {
          total_exportation += parseFloat(row.total_value);
        }
        if (["10", "20", "30", "40"].indexOf(row.affectation_igv_type_id) < 0) {
          total_free += parseFloat(row.total_value);
        }
        if (
          ["10", "20", "30", "40"].indexOf(row.affectation_igv_type_id) > -1
        ) {
          total_igv += parseFloat(row.total_igv);
          total += parseFloat(row.total);
        }
        total_value += parseFloat(row.total_value);
        total_plastic_bag_taxes += parseFloat(row.total_plastic_bag_taxes);
      });

      this.form.total_exportation = _.round(total_exportation, 2);
      this.form.total_taxed = _.round(total_taxed, 2);
      this.form.total_exonerated = _.round(total_exonerated, 2);
      this.form.total_unaffected = _.round(total_unaffected, 2);
      this.form.total_free = _.round(total_free, 2);
      this.form.total_igv = _.round(total_igv, 2);
      this.form.total_value = _.round(total_value, 2);
      this.form.total_taxes = _.round(total_igv, 2);
      this.form.total = _.round(total + this.form.total_plastic_bag_taxes, 2);
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

    addItem() {
      this.formAddItem = false;

      let unit_price = this.form_item.has_igv
        ? this.form_item.unit_price_value
        : this.form_item.unit_price_value * 1.18;

      this.form_item.unit_price = unit_price;
      this.form_item.item.unit_price = unit_price;
      this.form_item.item.presentation = null;

      this.form_item.charges = [];
      this.form_item.discounts = [];
      this.form_item.attributes = [];
      this.form_item.affectation_igv_type = _.find(this.affectation_igv_types, {
        id: this.form_item.affectation_igv_type_id
      });

      // console.log(this.form_item)
      this.row = calculateRowItem(
        this.form_item,
        this.form.currency_type_id,
        this.exchangeRateSale
      );
      this.form.items.push(this.row);
      this.initFormItem();
      this.calculateTotal();
    },

    initFormItem() {
      this.form_item = {
        item_id: null,
        item: {},
        affectation_igv_type_id: null,
        affectation_igv_type: {},
        has_isc: false,
        system_isc_type_id: null,
        calculate_quantity: false,
        percentage_isc: 0,
        suggested_price: 0,
        quantity: 1,
        aux_quantity: 1,
        unit_price_value: 0,
        unit_price: 0,
        charges: [],
        discounts: [],
        attributes: [],
        has_igv: null
      };
    },
    initForm() {
      this.form = {
        total_plastic_bag_taxes: 0,
        total_igv: 0,
        total: 0,
        serie_documento: "",
        numero_documento: "#",
        fecha_de_emision: moment().format("YYYY-MM-DD"),
        hora_de_emision: moment().format("HH:mm:ss"),
        codigo_tipo_operacion: "0101",
        codigo_tipo_documento: "01",
        codigo_tipo_moneda: "PEN",
        fecha_de_vencimiento: moment().format('YYYY-MM-DD'),
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
          self.affectation_igv_types = source.affectation_types;
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
