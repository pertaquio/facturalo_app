<template>
  <f7-page>
    <f7-fab @click="send" position="right-bottom" slot="fixed" color="green">
      <f7-icon color="white" material="check"></f7-icon>
    </f7-fab>

    <!--<f7-fab @click="addForm = !addForm" position="left-bottom" slot="fixed" color="orange">
      <f7-icon color="white" material="add"></f7-icon>
    </f7-fab>-->
    <f7-fab @click="filteCart_b = !filteCart_b" position="left-bottom" slot="fixed" color="orange">
      <f7-icon color="white" material="shopping_cart"></f7-icon>
      <f7-badge style="margin-left: 68%;font-size: 15px" color="red">{{countCar}}</f7-badge>
    </f7-fab>

    <!--<f7-navbar>
      <input
        style="margin:4%;width:70%"
        type="search"
        placeholder="Buscar producto.."
        v-model="search_item"
      />
      <f7-button @click="addForm = !addForm" style="margin:2%;width:30%" raised>Nuevo</f7-button>
    </f7-navbar>-->

    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding">
        <div class="left">
          <a href="#" @click="closePopup" class="link">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        <div class="title">Productos</div>
        <div class="right">
          <a @click="addForm = !addForm" href="#" class="link">
            <f7-icon material="add"></f7-icon>
          </a>
        </div>
      </div>
    </div>

    <f7-block style="padding:0px">
      <div class="searchbar searchbar-inline" style="margin:4%">
        <div class="searchbar-input-wrap">
          <input type="search" placeholder="Buscar producto.." v-model="search_item" />
          <i class="searchbar-icon"></i>
          <span class="input-clear-button"></span>
        </div>
      </div>
      <div class="list inset">
        <p v-if="filteCart_b && items_car.length == 0">No tienes productos agregados</p>
        <ul>
          <li v-for="(item, index) in items_car" :key="index">
            <div class="item-content">
              <div @click="add(item)" class="item-media" style="min-width: 0px !important;">
                <f7-icon :material="item.quantity > 0 ? 'check_box' : 'check_box_outline_blank'"></f7-icon>
              </div>
              <div class="item-inner">
                <div class="item-title">
                  <div class="item-header"></div>
                  {{item.description}}
                  <div class="item-footer">S/. {{item.sale_unit_price}}</div>
                </div>

                <div class="item-after" style="width: 101px;">
                  <div class="stepper stepper-raised stepper-init stepper-small">
                    <div
                      class="stepper-button-minus"
                      @click=" item.quantity > 0 ? item.quantity -- : ''"
                    ></div>
                    <div class="stepper-input-wrap">
                      <input type="text" :value="item.quantity" min="0" max="100" step="1" readonly />
                    </div>
                    <div @click="item.quantity ++" class="stepper-button-plus"></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </f7-block>

    <f7-sheet
      style="height:55%;"
      class="demo-sheet"
      :opened="addForm"
      @sheet:closed="addForm = false"
    >
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Cancelar</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block style="margin-top: 0px !important; ">
          <form class="list no-hairlines-md" id="demo-form-item">
            <ul>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Nombre</div>
                  <div class="item-input-wrap">
                    <input v-model="form.description" required validate type="text" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Descripción</div>
                  <div class="item-input-wrap">
                    <input v-model="form.name" required validate type="text" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Precio Unitario (Venta) *</div>
                  <div class="item-input-wrap">
                    <input
                      v-model="form.sale_unit_price"
                      required
                      validate
                      step="any"
                      type="number"
                    />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <f7-button fill @click="submit">Guardar</f7-button>
                </div>
              </li>
            </ul>
          </form>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
  </f7-page>
</template>

<style scoped>
.page-content {
  padding-top: 2% !important;
}
</style>

<script>
import { auth } from "mixins_/auth";
import _ from "lodash";
import { calculateRowItem } from "js_/helpers/functions";

export default {
  //props: ["search_item"],
  mixins: [auth],
  name: "ItemsForm",
  components: {},
  props: ["showDialog"],

  data: function() {
    return {
      filteCart_b: false,
      search_item: "",
      items_car: [],
      items_car_base: [],
      addForm: false,
      items: [],
      affectation_igv_types: [],
      form: {}
    };
  },
  computed: {
    countCar() {
      return _.filter(this.items_car_base, function(o) {
        return o.quantity > 0;
      }).length;
    }
  },
  created() {
    this.initForm();
    this.getTables();
  },
  watch: {
    search_item: function(val) {
      if (val) {
        this.items_car = _.filter(this.items_car_base, function(o) {
          return o.description.toLowerCase().includes(val.toLowerCase());
        });
      } else {
        this.items_car = this.items_car_base;
      }
    },
    filteCart_b: function(val) {
      if (val) {
        this.items_car = _.filter(this.items_car_base, function(o) {
          return o.quantity > 0;
        });
      } else {
        this.items_car = this.items_car_base;
      }
    }
  },

  methods: {
    closePopup() {
      this.$emit("update:showDialog", false);
    },
    initForm() {
      this.form = {
        id: null,
        item_type_id: "01",
        internal_id: null,
        item_code: null,
        item_code_gs1: null,
        description: null,
        name: null,
        second_name: null,
        unit_type_id: "NIU",
        currency_type_id: "PEN",
        sale_unit_price: 0,
        purchase_unit_price: 0,
        has_isc: false,
        system_isc_type_id: null,
        percentage_isc: 0,
        suggested_price: 0,
        sale_affectation_igv_type_id: "10",
        purchase_affectation_igv_type_id: "10",
        calculate_quantity: false,
        stock: 0,
        stock_min: 1,
        has_igv: true,
        has_perception: false,
        item_unit_types: [],
        percentage_of_profit: 0,
        percentage_perception: 0,
        image: null,
        image_url: null,
        temp_path: null,
        is_set: false,
        account_id: null,
        category_id: null,
        brand_id: null,
        date_of_due: null,
        lot_code: null,
        lots_enabled: false,
        lots: []
      };
    },
    submit() {
      this.addForm = false;

      const self = this;
      self.$f7.preloader.show();
      this.$http
        .post(`${this.returnBaseUrl()}/item`, this.form, this.getHeaderConfig())
        .then(response => {
          self.$f7.dialog.alert(`${response.data.msg}`, "Facturador PRO APP");
          let it = response.data.data;
          self.items.push(it);
          self.items_car_base.push({
            description: it.description,
            id: it.id,
            quantity: 0,
            sale_unit_price: it.sale_unit_price
          });
        })
        .catch(err => {
          alert("Sucedio un error al guardar.");
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    },
    delete_parent(id) {
      let o = this.items_car.find(x => x.id == id);
      o.quantity = 0;
      this.send();
    },
    initFormItem() {
      return {
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

    send() {
      const self = this;
      let send_items = this.items_car
        .filter(x => x.quantity > 0)
        .map(o => {
          let obj = self.initFormItem();
          obj.quantity = o.quantity;
          obj.item = _.find(self.items, { id: o.id });
          obj.unit_price_value = obj.item.sale_unit_price;
          obj.has_igv = obj.item.has_igv;
          obj.affectation_igv_type_id = obj.item.sale_affectation_igv_type_id;

          let unit_price = obj.has_igv
            ? obj.unit_price_value
            : obj.unit_price_value * 1.18;

          obj.unit_price = unit_price;
          obj.item.unit_price = unit_price;
          obj.item.presentation = null;

          obj.charges = [];
          obj.discounts = [];
          obj.attributes = [];
          obj.affectation_igv_type = _.find(this.affectation_igv_types, {
            id: obj.affectation_igv_type_id
          });

          let row = calculateRowItem(obj, "PEN", 3.327);

          return row;
        });

      this.$emit("addItemsCar", send_items);
    },
    add(item) {
      if (item.quantity > 0) {
        item.quantity = 0;
      } else {
        item.quantity = 1;
      }
    },
    initItems() {
      this.items_car = this.items.map(x => {
        return {
          description: x.description,
          id: x.id,
          quantity: 0,
          sale_unit_price: x.sale_unit_price
        };
      });

      this.items_car_base = this.items_car;
    },
    getTables() {
      const self = this;
      self.$f7.preloader.show();
      this.$http
        .get(`${this.returnBaseUrl()}/document/tables`, this.getHeaderConfig())
        .then(response => {
          let source = response.data.data;
          self.items = source.items;
          self.affectation_igv_types = source.affectation_types;
          self.initItems();
        })
        .catch(err => {})
        .then(() => {
          self.$f7.preloader.hide();
        });
    }
  }
};
</script>
