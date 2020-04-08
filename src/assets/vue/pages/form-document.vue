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
      :opened="popupCustomerOpened"
      @popup:closed="popupCustomerOpened = false"
    >
      <customer-form
        :codeType="codeType"
        :showDialog.sync="popupCustomerOpened"
        ref="form_customer_car"
        @addCustomerCar="addCustomer"
      ></customer-form>
    </f7-popup>

    <f7-navbar class="navbar-cus" :title="title" back-link="Back"></f7-navbar>
    <f7-block>
      <form class="list no-hairlines-md" id="demo-form">
        <ul style="margin-bottom: 25% !important;">
          <li>
            <f7-col>
              <f7-card class="demo-card-header-pic">
                <f7-card-header
                  style="font-weight:bold;color:white;background:#17a2b8"
                >Cliente</f7-card-header>
                <f7-card-content>
                  <p>{{this.form.datos_del_cliente_o_receptor ? this.form.datos_del_cliente_o_receptor.apellidos_y_nombres_o_razon_social : ''}}</p>
                </f7-card-content>
                <f7-card-footer>
                  <f7-link @click="popupCustomerOpened = true" >Seleccione cliente</f7-link>
                </f7-card-footer>
              </f7-card>
          </f7-col>
           <!-- <a class="item-link" @click="popupCustomerOpened = true">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">
                    <span style="font-size:19px;font-weight:bold;">+</span> Clientes
                  </div>
                </div>
              </div>
            </a> -->
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
                    <th class="medium-cell">Descripcion</th>
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
                        @click.native="deleteItem(row.item_id)"
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
.navbar-cus{
   background:#17a2b8;
   color:white
}
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
const url = "https://demo.facturador.pro/api";
import moment from "moment";
import _ from "lodash";
import ItemsForm from "components/document/ItemsForm";
import CustomerForm from "components/document/CustomerForm";

import { auth } from "mixins_/auth";

export default {
  name: "FormDocument",
  components: { ItemsForm, CustomerForm },
  mixins: [auth],
  data: function() {
    // Must return an object
    return {
      codeType: "",
      search_item: "",
      form: {},
      popupOpened: false,
      popupCustomerOpened: false,
      title: ""
    };
  },
  computed: {},
  created() {
    this.codeType = this.$f7route.params.cod;
    this.initForm();
    //this.getTables();
    this.selectDocumentType();
  },

  methods: {
    deleteItem(id) {
      this.$refs.form_items_car.delete_parent(id);
    },
    addItems(rows) {
      let contex = this

      contex.popupOpened = false;

      rows.forEach(record => {

        contex.form.items.push(record)

      });

      this.calculateTotal();
    },
    addCustomer(row) {
      this.popupCustomerOpened = false;
      this.form.customer_id = row.id;
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

    validate() {
      const self = this;
      if (this.form.items.length == 0) {
        self.$f7.dialog.alert(`Debe agregar productos.`, "Facturador PRO APP");

        return false;
      }

      if (!this.form.customer_id) {
        self.$f7.dialog.alert(
          `Debe seleccionar un cliente.`,
          "Facturador PRO APP"
        );

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
        .post(`${url}/documents`, this.getFormatter(), this.getHeaderConfig())
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
    selectDocumentType() {
      if (this.form.codigo_tipo_documento == "01") {
        this.form.serie_documento = "F001";
        this.title = "Factura Electrónica";
      } else if (this.form.codigo_tipo_documento == "03") {
        this.form.serie_documento = "B001";
        this.title = "Boleta Electrónica";
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

    initForm() {
      this.form = {
        total_taxed: 0,
        total_plastic_bag_taxes: 0,
        total_igv: 0,
        total: 0,
        serie_documento: "",
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
    }
  }
};
</script>
