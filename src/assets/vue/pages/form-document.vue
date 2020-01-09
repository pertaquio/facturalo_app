<template>
  <f7-page>
    <f7-fab
      v-if="form.items.length > 0"
      @click="send"
      position="right-bottom"
      slot="fixed"
      color="green"
    >
      <f7-icon size="35px" color="white" material="check"></f7-icon>
    </f7-fab>
    <f7-fab position="left-bottom" @click="cancel" slot="fixed" color="red">
      <f7-icon ios="f7:close" aurora="f7:close" md="material:close"></f7-icon>
    </f7-fab>

    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <items-form @addItemsCar="addItems"></items-form>
    </f7-popup>

    <f7-navbar title="Nuevo Comprobante" back-link="Back"></f7-navbar>
    <f7-block>
      <form class="list no-hairlines-md" id="demo-form">
        <ul>
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Tipo Comprobante</div>
              <div class="item-input-wrap">
                <select
                  readonly
                  required
                  validate
                  @change="selectDocumentType"
                  v-model="form.codigo_tipo_documento"
                >
                  <option :value="'01'">Factura</option>
                  <option :value="'03'">Boleta</option>
                </select>
              </div>
            </div>
          </li>

          <li>
            <a
              class="item-link smart-select smart-select-init"
              data-open-in="popup"
              data-searchbar="true"
              data-searchbar-placeholder="buscar cliente"
            >
              <select
                required
                validate
                @change="selectCustomer"
                v-model="form.customer_id"
                placeholder="Seleccione un cliente..."
              >
                <option v-for="item in customers" :key="item.id" :value="item.id">{{item.name}}</option>
              </select>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">Cliente</div>
                </div>
              </div>
            </a>
          </li>

          <li class="item-content item-input">
            <f7-button
              style="width: 100%;"
              small
              outline
              @click="popupOpened = true"
            >Agregar Producto</f7-button>
          </li>

          <li style="margin-bottom: 5%;" class="item-content item-input">
            <br />
            <div class="data-table">
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
                <input required validate v-model="form.numero_orden_de_compra" type="text" />
                <span class="input-clear-button"></span>
              </div>
            </div>
          </li>

          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Fecha Vencimiento</div>
              <div class="item-input-wrap">
                <input name="date" v-model="form.fecha_de_vencimiento" type="date" />
              </div>
            </div>
          </li>
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">IGV</div>
              <div class="item-input-wrap">
                <input
                  style="text-align: center; font-weight: bold;"
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
                  style="text-align: center; font-weight: bold;"
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
      </form>
    </f7-block>
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";
import moment from "moment";
import _ from "lodash";
import ItemsForm from "components/document/ItemsForm";
import { auth } from "mixins_/auth";

export default {
  name: 'FormDocument',
  components: { ItemsForm },
  mixins: [auth],
  data: function() {
    // Must return an object
    return {
      search_item: "",
      customers: [],
      form: {},
      popupOpened: false
    };
  },
  computed: {},
  created() {
    this.initForm();
    this.getTables();
    this.selectDocumentType()

    
  },

  methods: {
    addItems(rows) {
      this.form.items = rows;
      this.calculateTotal();
      this.popupOpened = false;
    },
    cancel() {
      this.initForm();
      this.$f7router.navigate("/");
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

      if (!this.form.customer_id) {
        alert("Debe seleccionar un cliente.");
        return false;
      }

      self.$f7.preloader.show();

      this.$http
        .post(`${url}/documents`, this.getFormatter(), this.getHeaderConfig())
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.initForm();
            alert(`Compra registrada: ${data.data.number}`);
            self.$f7router.navigate("/documents/");
          } else {
            alert("No se registro la Compra");
          }
        })
        .catch(err => {
          alert(`${err.message}`);
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

    initForm() {
      this.form = {
        total_plastic_bag_taxes: 0,
        total_igv: 0,
        total: 0,
        serie_documento: "F001",
        numero_documento: "#",
        fecha_de_emision: moment().format("YYYY-MM-DD"),
        hora_de_emision: moment().format("HH:mm:ss"),
        codigo_tipo_operacion: "0101",
        codigo_tipo_documento: this.$f7route.params.cod,
        codigo_tipo_moneda: "PEN",
        fecha_de_vencimiento: moment().format("YYYY-MM-DD"),
        numero_orden_de_compra: "",
        informacion_adicional: "",
        datos_del_cliente_o_receptor: {},
        totales: {},
        items: []
      };
    },
    getTables() {
      const self = this;
      self.$f7.preloader.show();
      this.$http
        .get(`${this.returnBaseUrl()}/document/customers`, this.getHeaderConfig())
        .then(response => {
          let source = response.data.data;
          self.customers = source.customers;
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
