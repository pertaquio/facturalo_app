<template>
  <f7-page class="page-red-white" color="white">
    <f7-toolbar tabbar :position="isBottom ? 'bottom' : 'top'" bg-color="white" color="red" class="no-shadow">
      <f7-link
        href="/"
        icon-md="material:home">
        Inicio
      </f7-link>
      <f7-link
        tab-link-active
        tab-link="#"
        icon-md="material:insert_drive_file"
        class="text-align-center">
        Crear <br> comprobantes
      </f7-link>
      <f7-link
        href="/documents/"
        icon-md="material:view_stream"
        class="text-align-center">
        Listado de <br> comprobantes
      </f7-link>
      <f7-link
        href="/report/"
        icon-md="material:equalizer">
        Reportes
      </f7-link>
    </f7-toolbar>

    <f7-block>
      <f7-row>
        <f7-col width="90">
          <a class="link back text-color-white">
            <i class="icon icon-back"></i>
            <span class="">Compra</span>
          </a>
        </f7-col>
        <f7-col width="10">
          <f7-link class="panel-open text-color-white text-align-right" open-panel="right" icon="fas fa-bars"></f7-link>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <items-form :showDialog.sync="popupOpened" ref="form_items_car" @addItemsCar="addItems"></items-form>
    </f7-popup>

    <f7-popup
      class="demo-popup"
      :opened="popupSupplierOpened"
      @popup:closed="popupSupplierOpened = false">
      <supplier-form
        :codeType="form.document_type_id"
        :supplierId="form.supplier_id"
        :showDialog.sync="popupSupplierOpened"
        ref="form_supplier_car"
        @addSupplierCar="addSupplier"
      ></supplier-form>
    </f7-popup>

    <f7-card class="card-100 padding-top padding-horizontal no-shadow" color="red">
      <f7-block>
        <form class="list no-hairlines-md" id="demo-form">
          <ul>
            <f7-row>
              <f7-col width="100">

                <div class="item-content item-input">
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
                </div>
              </f7-col>
              <f7-col width="50">
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Serie</div>
                    <div class="item-input-wrap">
                      <input required validate v-model="form.series" type="text" maxlength="4" />
                      <span class="input-clear-button"></span>
                    </div>
                  </div>
                </div>
              </f7-col>
              <f7-col width="50">
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Número</div>
                    <div class="item-input-wrap">
                      <input required validate v-model="form.number" type="number" />
                      <span class="input-clear-button"></span>
                    </div>
                  </div>
                </div>
              </f7-col>
              <f7-col width="50">
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Fecha Emisión</div>
                    <div class="item-input-wrap">
                      <input name="date" v-model="form.date_of_issue" type="date" />
                    </div>
                  </div>
                </div>
              </f7-col>
              <f7-col width="50">
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Fecha Vencimiento</div>
                    <div class="item-input-wrap">
                      <input name="date" v-model="form.date_of_due" type="date" />
                    </div>
                  </div>
                </div>
              </f7-col>
            </f7-row>

            <li>
              <f7-col>
                <f7-card style="font-weight:bold;color:#0f233c;background:#ddd;border-radius: 15px;">
                  <f7-card-content>
                    <f7-row>
                      <f7-col width="15" class="align-self-center">
                        <div class="badge bg-color-white">
                          <f7-icon icon="fas fa-user" size="24" color="blue"></f7-icon>
                        </div>
                      </f7-col>
                      <f7-col width="75" class="text-align-left">
                        <small>PROVEEDOR</small><br>
                        <small class="no-margin">{{this.supplier ? this.supplier : ''}}</small>
                      </f7-col>
                      <f7-col width="10" class="align-self-center">
                        <div class="badge bg-color-white text-align-right color-blue">
                          <f7-link @click="popupSupplierOpened = true" style="color:#0f233c;" icon="fas fa-arrow-right"></f7-link>
                        </div>
                      </f7-col>
                    </f7-row>
                  </f7-card-content>
                </f7-card>
              </f7-col>
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

            <li class="padding-vertical">
              <f7-button @click="popupOpened = true" fill color="blue" class="text-align-left padding-left">
                <small>
                  <f7-icon icon="fas fa-plus"></f7-icon>
                  Añadir producto
                </small>
              </f7-button>
            </li>

            <li class="padding-bottom">
              <f7-card style="font-weight:bold;background:#d61a0c;border-radius: 15px;font-size: 12px;">
                <f7-card-content class="text-color-white">
                  <f7-row>
                    <f7-col width="50" class="padding-left">
                      <h2 class="no-padding no-margin-top" style="margin-bottom: -10px;">{{form.total_taxed}}</h2>
                      <small>OP.GRAVADA</small> <br><br>
                      <h2 class="no-padding no-margin-top" style="margin-bottom: -10px;">{{form.total_igv}}</h2>
                      <small>IGV</small>
                    </f7-col>
                    <f7-col width="50" class="align-self-center">
                      <h1 class="no-padding no-margin">{{form.total}}</h1>
                      TOTAL
                    </f7-col>
                  </f7-row>
                </f7-card-content>
              </f7-card>
              <f7-row class="btn-actions">
                <f7-col width="10" class="">
                  <f7-button raised fill color="gray"  @click="cancel">
                    <f7-icon icon="fas fa-trash"></f7-icon>
                  </f7-button>
                </f7-col>
                <f7-col width="80" class="">
                </f7-col>
                <f7-col width="10" class="">
                  <f7-button raised fill color="green"  @click="send">
                    <f7-icon icon="fas fa-check"></f7-icon>
                  </f7-button>
                </f7-col>
              </f7-row>
            </li>
          </ul>
        </form>
      </f7-block>
    </f7-card>
  </f7-page>
</template>

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
      isBottom: true,
      search_item: "",
      customers: [],
      document_types_invoice: [],
      form: {},
      supplier: "",
      popupOpened: false,
      title_alert:'Mensaje'
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
      this.supplier = row.name

    },
    addItems(rows) {
      let contex = this
      contex.popupOpened = false;
      rows.forEach(record => {
        contex.form.items.push(record)
      });
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
