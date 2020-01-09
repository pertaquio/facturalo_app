<template>
  <f7-page>
    <f7-fab @click="send" position="right-bottom" slot="fixed" color="green">
      <f7-icon color="white" material="check"></f7-icon>
    </f7-fab>
    <f7-fab @click="filteCart_b = !filteCart_b" position="left-bottom" slot="fixed" color="green">
      <f7-icon color="white" material="shopping_cart"></f7-icon>
    </f7-fab>

    <f7-navbar title="Productos">
      <f7-nav-right>
        <input type="search" placeholder="Buscar.." v-model="search_item" />
      </f7-nav-right>
    </f7-navbar>
    <f7-block style="padding:0px">
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

  data: function() {
    return {
      filteCart_b: false,
      search_item: "",
      items_car: [],
      items_car_base: [],

      items: [],
      affectation_igv_types: []
    };
  },
  computed: {},
  created() {
    this.getTables();
  },
  watch: {
    search_item: function(val) {
      if (val) {
        this.items_car = _.filter(this.items_car_base, function(o) {
          return o.description.toLowerCase().includes(val);
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
