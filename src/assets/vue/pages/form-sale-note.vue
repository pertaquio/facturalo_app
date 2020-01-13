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
    <f7-fab small position="left-bottom" @click="cancel" slot="fixed" color="red">
      <f7-icon ios="f7:close" aurora="f7:close" md="material:close"></f7-icon>
    </f7-fab>

    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <items-form ref="form_items_car" @addItemsCar="addItems"></items-form>
    </f7-popup>

    <f7-navbar title="Nuevo Comprobante" back-link="Back"></f7-navbar>
    <f7-block>
      <form class="list no-hairlines-md" id="demo-form">
        <ul>
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Tipo Comprobante</div>
              <div class="item-input-wrap">
                <select disabled>
                  <option :value="'01'">Nota de Venta</option>
                </select>
              </div>
            </div>
          </li>

          <li>
            <a
              data-popup-close-link-text
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

          <li>
            <a class="item-link" @click="popupOpened = true">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">Agregar producto</div>
                </div>
              </div>
            </a>
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
        </ul>
      </form>
    </f7-block>
    <div class="footer">
      <div class="footer-data">
        <div class="footer-text">
          <div class="row">
            <div class="col">IGV:</div>
            <div class="col">{{form.total_igv}}</div>
          </div>

          <div class="row">
            <div class="col">TOTAL:</div>
            <div class="col">{{form.total}}</div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<style scoped>
.footer-text {
  position: absolute;
  margin-top: 2%;
  width: 50%;
}
.footer-data {
  width: 50%;
  color: #fff;
  background: #17a2b8;
  margin: auto;
  border-right: 30px solid #fff;
  border-left: 30px solid #fff;
  border-bottom: 60px solid transparent;
  text-align: center;
}
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
const url = "https://demo.facturador.pro/api";
import moment from "moment";
import _ from "lodash";
import ItemsForm from "components/document/ItemsForm";
import { auth } from "mixins_/auth";

export default {
  name: "FormSaleNote",
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

    send() {
      const self = this;

      if (!this.form.customer_id) {
        alert("Debe seleccionar un cliente.");
        return false;
      }

      self.$f7.preloader.show();

      this.$http
        .post(`${url}/sale-note`, this.form, this.getHeaderConfig())
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.initForm();

            self.$f7.dialog.alert(
              `Compra registrada: ${data.data.number}`,
              "Facturador PRO APP"
            );
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
      this.form.total = _.round(total + 2);
    },
    selectCustomer() {
      this.$f7.smartSelect.close(".smart-select");
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
        prefix: "NV",
        establishment_id: 1,
        date_of_issue: moment().format("YYYY-MM-DD"),
        time_of_issue: moment().format("HH:mm:ss"),
        customer_id: null,
        currency_type_id: "PEN",
        purchase_order: null,
        exchange_rate_sale: 0,
        total_prepayment: 0,
        total_charge: 0,
        total_discount: 0,
        total_exportation: 0,
        total_free: 0,
        total_taxed: 0,
        total_unaffected: 0,
        total_exonerated: 0,
        total_igv: 0,
        total_base_isc: 0,
        total_isc: 0,
        total_base_other_taxes: 0,
        total_other_taxes: 0,
        total_taxes: 0,
        total_value: 0,
        total: 0,
        operation_type_id: null,
        items: [],
        charges: [],
        discounts: [],
        attributes: [],
        guides: [],
        payments: [],
        additional_information: null,
        actions: {
          format_pdf: "a4"
        },
        apply_concurrency: false,
        type_period: null,
        quantity_period: 0,
        automatic_date_of_issue: null,
        enabled_concurrency: false
      };
    },
    getTables() {
      const self = this;
      self.$f7.preloader.show();
      this.$http
        .get(
          `${this.returnBaseUrl()}/document/customers`,
          this.getHeaderConfig()
        )
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
