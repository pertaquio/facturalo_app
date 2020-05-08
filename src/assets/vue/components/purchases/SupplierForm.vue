<template>
  <f7-page>
    <div class="navbar color-theme-white no-shadow theme-dark">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding">
        <div class="left">
          <a href="#" @click="closePopup" class="link">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        <div class="title">Proveedor</div>
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
          <input type="search" placeholder="Buscar proveedor.." v-model="search_item" />
          <i class="searchbar-icon"></i>
          <span class="input-clear-button"></span>
        </div>
      </div>
      <div class="list inset">
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <a @click="selected(item)" href="#" class="item-content" style="color:#212121">
              <div class="item-media">
                <f7-icon :material="item.selected ? 'check_box' : 'check_box_outline_blank'"></f7-icon>
              </div>
              <div class="item-inner">
                <div class="item-title">{{item.name}}</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </f7-block>

    <f7-sheet
      style="height:85%;"
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
          <form class="list no-hairlines-md" id="demo-form-customer">
            <ul>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Tipo Doc. Identidad</div>
                  <div class="item-input-wrap input-dropdown-wrap">
                    <select v-model="form.identity_document_type_id" placeholder="Please choose...">
                      <option value="1">DNI</option>
                      <option value="6">RUC</option>
                    </select>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Número</div>

                  <div class="row no-gap" style="width:100%">
                    <div class="col-70">
                      <div class="item-input-wrap">
                        <input
                          v-model="form.number"
                          required
                          validate
                          type="number"
                          :maxlength="maxLength"
                        />
                        <span class="input-clear-button"></span>
                      </div>
                    </div>
                    <div class="col-25">
                      <button @click="searchServiceNumberByType" class="col button button-outline">
                        <template v-if="form.identity_document_type_id === '6'">SUNAT</template>
                        <template v-if="form.identity_document_type_id === '1'">RENIEC</template>
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Nombre *</div>
                  <div class="item-input-wrap">
                    <input v-model="form.name" required validate type="text" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Nombre comercial</div>
                  <div class="item-input-wrap">
                    <input v-model="form.trade_name" type="text" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Dirección</div>
                  <div class="item-input-wrap">
                    <input v-model="form.address" type="text" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Teléfono</div>
                  <div class="item-input-wrap">
                    <input v-model="form.telephone" type="tel" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Correo electrónico</div>
                  <div class="item-input-wrap">
                    <input v-model="form.email" validate type="email" />
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>

              <li class="item-content item-input">
                <f7-button style="width: 50%;" fill @click="submit">Guardar</f7-button>
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

export default {
  mixins: [auth],
  name: "SupplierForm",
  components: {},
  props: ["showDialog", "codeType"],
  data: function() {
    return {
      search_item: "",
      addForm: false,
      items: [],
      items_base: [],
      form: {}
    };
  },
  computed: {
    maxLength: function() {
      if (this.form.identity_document_type_id === "6") {
        return 11;
      }
      if (this.form.identity_document_type_id === "1") {
        return 8;
      }
    }
  },
  created() {
    this.initForm();
    this.getData();
  },
  watch: {
    search_item: function(val) {
       if (val.length > 1) {
        this.searchSuppliers();
      } else if (val.length == 0) {
        this.initItems();
      }
    }
  },
  methods: {
    initForm() {
      this.form = {
        id: null,
        type: 'suppliers',
        identity_document_type_id: "6",
        number: "",
        name: null,
        trade_name: null,
        country_id: "PE",
        department_id: null,
        province_id: null,
        district_id: null,
        address: null,
        telephone: null,
        condition: null,
        state: null,
        email: null,
        perception_agent: false,
        percentage_perception: 0,
        more_address: []
      };
    },

    validate() {
      if (!this.form.number) {
        this.$f7.dialog.alert(
          `Ingresar el número a buscar`,
          "Facturador PRO APP"
        );

        return false;
      }

      if (!this.form.name) {
        this.$f7.dialog.alert(`Ingresar el nombre`, "Facturador PRO APP");
        return false;
      }

      return true;
    },
    submit() {
      this.addForm = false;

      if (!this.validate()) return;

      const self = this;
      self.$f7.preloader.show();
      this.$http
        .post(
          `${this.returnBaseUrl()}/person`,
          this.form,
          this.getHeaderConfig()
        )
        .then(response => {
          self.$f7.dialog.alert(`${response.data.msg}`, "Facturador PRO APP");
          let it = response.data.data;
          // self.items.push(it);
          this.getData()
        })
        .catch(err => {
          alert("Sucedio un error al guardar.");
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    },
    closePopup() {
      this.$emit("update:showDialog", false);
    },
    selected(item) {
      this.items.forEach(element => (element.selected = false));
      item.selected = !item.selected;

      this.$emit("addSupplierCar", item);
    },
    async initItems(document_type_id = '01')
    {
        const self = this;
        // console.log(document_type_id)

        if (document_type_id == "01") {

          self.items = await self.items_base.filter(o => o.identity_document_type_id == "6")

        } else if (document_type_id == "03") {

          self.items = await self.items_base.filter(o => ['1','4','6','7','0'].includes(o.identity_document_type_id))

        } else {
          self.items = await self.items_base
        }


    },
    getData() {
      const self = this;
      self.$f7.preloader.show();
      this.$http
        .get(
          `${this.returnBaseUrl()}/purchases/suppliers`,
          this.getHeaderConfig()
        )
        .then(response => {

          self.items_base = response.data;

          self.initItems()
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          self.$f7.preloader.hide();
        });
    },
    async searchServiceNumberByType() {
      if (this.form.number === "") {
        this.$f7.dialog.alert(
          `Ingresar el número a buscar`,
          "Facturador PRO APP"
        );

        return;
      }

      this.$f7.preloader.show();

      let identity_document_type_name = "";
      if (this.form.identity_document_type_id === "6") {
        identity_document_type_name = "ruc";
      }
      if (this.form.identity_document_type_id === "1") {
        identity_document_type_name = "dni";
      }
      //this.loading_search = true;
      let response = await this.$http.get(
        `${this.returnBaseUrl()}/services/${identity_document_type_name}/${
          this.form.number
        }`,
        this.getHeaderConfig()
      );

      if (response.data.success) {
        let data = response.data.data;
        this.form.name = data.name;
        this.form.trade_name = data.trade_name;
        this.form.address = data.address;
        this.form.department_id = data.department_id;
        this.form.province_id = data.province_id;
        this.form.district_id = data.district_id;
        this.form.phone = data.phone;

        this.$f7.dialog.alert(`Datos encontrados.`, "Facturador PRO APP");
      } else {
        this.$f7.dialog.alert(`No hay datos.`, "Facturador PRO APP");
      }
      //this.loading_search = false;

      this.$f7.preloader.hide();
    },
    async searchSuppliers()
    {
      if (this.search_item.length > 1) {

          const self = this;
          self.$f7.preloader.show();

          let parameters = `input=${this.search_item}&document_type_id=${this.codeType}`

          await this.$http.get(`${this.returnBaseUrl()}/purchases/search-suppliers/?${parameters}`, this.getHeaderConfig())
          .then(response => {

            this.items = response.data

          })
            .catch(err => {
              alert('Error')
            })
          .then(()=> {
              self.$f7.preloader.hide();
          })


      }
      else{
       // this.initItems()
      }
    }
  }
};
</script>
