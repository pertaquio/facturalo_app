<template>
  <f7-page>
    <f7-fab @click="send" position="right-bottom" slot="fixed" color="green">
      <f7-icon size="35px" color="white" material="check"></f7-icon>
    </f7-fab>
    <f7-fab small position="left-bottom" @click="cancel" slot="fixed" color="red">
      <f7-icon ios="f7:close" aurora="f7:close" md="material:close"></f7-icon>
    </f7-fab>

    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <items-form :showDialog.sync="popupOpened" ref="form_items_car" @addItemsCar="addItems"></items-form>
    </f7-popup>

    <f7-popup
      class="demo-popup"
      :opened="popupSupplierOpened"
      @popup:closed="popupSupplierOpened = false"
    >
      <supplier-form
        :codeType="form.document_type_id"
        :supplierId="form.supplier_id"
        :showDialog.sync="popupSupplierOpened"
        ref="form_supplier_car"
        @addSupplierCar="addSupplier"
      ></supplier-form>
    </f7-popup>

    <f7-navbar title="Compra" back-link="Back"></f7-navbar>
    <f7-block>
      <form class="list no-hairlines-md" id="demo-form">
        <ul>
          
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Tipo de documento</div>
              <div class="item-input-wrap input-dropdown-wrap">
                <select v-model="form.document_type_id" placeholder="Please choose..." @change="changeDocumentType">
                  <template v-for="(row, index) in document_types_invoice">
                    <option :value="row.id" :key="index">{{row.description}}</option> 
                  </template>
                </select>
              </div>
            </div>
          </li>
          
          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Serie</div>
              <div class="item-input-wrap">
                <input required validate v-model="form.series" type="text" maxlength="4" />
                <span class="input-clear-button"></span>
              </div>
            </div>
            
            <div class="item-inner">
              <div class="item-title item-label">Número</div>
              <div class="item-input-wrap">
                <input required validate v-model="form.number" type="number" />
                <span class="input-clear-button"></span>
              </div>
            </div>

          </li>

          <li class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">Fecha Emisión</div>
              <div class="item-input-wrap">
                <input name="date" v-model="form.date_of_issue" type="date" />
              </div>
            </div>
            <div class="item-inner">
              <div class="item-title item-label">Fecha Vencimiento</div>
              <div class="item-input-wrap">
                <input name="date" v-model="form.date_of_due" type="date" />
              </div>
            </div>
          </li>

          <li>
            <a class="item-link" @click="popupSupplierOpened = true">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">
                    <span style="font-size:19px;font-weight:bold;">+</span> Proveedores
                  </div>
                </div>
              </div>
            </a>
          </li>

          <li>
            <a class="item-link" @click="popupOpened = true">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">
                    <span style="font-size:19px;font-weight:bold;">+</span> Productos
                  </div>
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
                    <th class="label-cell"></th>
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
                    <td>
                      <f7-icon
                        @click.native="deleteItem(index)"
                        color="red"
                        material="cancel"
                      ></f7-icon>
                    </td>
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
            <div class="col m-text">OP.GRAVADA:</div>
            <div class="col m-text-r">{{form.total_taxed}}</div>
          </div>

          <div class="row">
            <div class="col m-text">IGV:</div>
            <div class="col m-text-r">{{form.total_igv}}</div>
          </div>

          <div class="row">
            <div class="col m-text">TOTAL:</div>
            <div class="col m-text-r">{{form.total}}</div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<style scoped>
.m-text {
  text-align: left;
  font-size: 12px;
  font-weight: bold;
}
.m-text-r {
  text-align: center;
}
.footer-text {
  position: absolute;
  margin-top: 2%;
  width: 50%;
  padding-left: 1%;
}
.footer-data {
  width: 50%;
  color: #fff;
  background: #17a2b8;
  margin: auto;
  border-right: 30px solid #fff;
  border-left: 30px solid #fff;
  border-bottom: 73px solid transparent;
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
import moment from "moment";
import _ from "lodash";
import ItemsForm from "components/document/ItemsForm";
import SupplierForm from "components/purchases/SupplierForm";
import { auth } from "mixins_/auth";

export default {
  name: "FormPurchase",
  components: { ItemsForm, SupplierForm },
  mixins: [auth],
  data: function() {
    // Must return an object
    return {
      popupSupplierOpened: false,
      search_item: "",
      customers: [],
      document_types_invoice: [],
      form: {},
      popupOpened: false,
      title_alert:'Facturador PRO APP'
    };
  },
  computed: {},
  created() {
    this.initForm();
    this.getTables();
  },

  methods: {
    changeDocumentType(){
      this.$refs.form_supplier_car.initItems(this.form.document_type_id);
    },
    deleteItem(index) {
      this.form.items.splice(index, 1)
      // this.$refs.form_items_car.delete_parent(id);
    },
    addSupplier(row) {

      this.popupSupplierOpened = false;
      this.form.supplier_id = row.id; 

    },
    addItems(rows) {
      this.popupOpened = false;
      this.form.items = rows;
      this.calculateTotal();
    },
    cancel() {
      this.initForm();
      this.$f7router.navigate("/");
    },

    validate() {

      const self = this;

      if (this.form.date_of_issue > this.form.date_of_due) {
        self.$f7.dialog.alert(`La fecha de emisión no puede ser posterior a la de vencimiento.`,this.title_alert);
        return false;
      }

      if (this.form.items.length == 0) {
        self.$f7.dialog.alert(`Debe agregar productos.`, this.title_alert);
        return false;
      }

      if (!this.form.supplier_id) {
        self.$f7.dialog.alert(
          `Debe seleccionar un proveedor.`,
          this.title_alert
        );

        return false;
      }

      if (!this.form.series) {
        self.$f7.dialog.alert(`Debe ingresar una serie.`,this.title_alert);
        return false;
      }
       
      if (!this.form.number) {
        self.$f7.dialog.alert(`Debe ingresar un número.`,this.title_alert);
        return false;
      }

      return true;
    },

    send() {
      const self = this;

      let valid = this.validate();

      if (!valid) return;

      self.$f7.preloader.show();

      this.$http
        .post(`${this.returnBaseUrl()}/purchases`, this.form, this.getHeaderConfig())
        .then(response => {
          let data = response.data;
          if (data.success) {
            this.initForm();
            self.$f7.dialog.alert(`Compra registrada: ${data.data.number_full}`,this.title_alert);
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
      this.form.total = _.round(total, 2);
    },

    initForm() {

      this.form = { 
        document_type_id: '01',
        series: null,
        number: null,
        date_of_issue: moment().format("YYYY-MM-DD"),
        time_of_issue: moment().format("HH:mm:ss"),
        supplier_id: null, 
        currency_type_id: 'PEN', 
        exchange_rate_sale: 1,
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
        total_perception: 0,
        date_of_due: moment().format("YYYY-MM-DD"),
        items: [],
        charges: [],
        discounts: [],
        attributes: [],
        guides: [],
        payments: []
      }

    },
    getTables() {
      const self = this;
      self.$f7.preloader.show();
      this.$http
        .get(
          `${this.returnBaseUrl()}/purchases/tables`,
          this.getHeaderConfig()
        )
        .then(response => {
          self.document_types_invoice = response.data.document_types_invoice;
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
