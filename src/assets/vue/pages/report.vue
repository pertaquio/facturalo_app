<template>
  <f7-page class="page-red" color="white">
    <f7-toolbar tabbar :position="isBottom ? 'bottom' : 'top'" bg-color="white" color="red" class="no-shadow">
      <f7-link
        href="/"
        icon-md="material:home">
        Inicio
      </f7-link>
      <f7-link
        href="/form-document/01"
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
        tab-link="#"
        tab-link-active
        icon-md="material:equalizer">
        Reportes
      </f7-link>
    </f7-toolbar>
    <f7-block>
      <f7-row>
        <f7-col width="90">
          <a class="link back text-color-white">
            <i class="icon icon-back"></i>
            <span class="">Reporte</span>
          </a>
        </f7-col>
        <f7-col width="10">
          <f7-link class="panel-open text-color-white text-align-right" open-panel="right" icon="fas fa-bars"></f7-link>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-card class="card-100">
      <f7-block class="padding-top padding-bottom">
        <f7-card >
          <f7-row class="padding-top padding-bottom">
            <f7-col width="20" class="text-align-right">
              <div class="badge color-red" style="padding: 15px 10px"><f7-icon icon="fa fa-file"></f7-icon></div>
            </f7-col>
            <f7-col width="40">
              Total notas de venta
            </f7-col>
            <f7-col width="40" class="text-align-right padding-right text-color-red">
              {{general.totals.total_sale_notes}}
            </f7-col>
          </f7-row>
        </f7-card>
        <f7-card>
          <f7-row class="padding-top padding-bottom">
            <f7-col width="20" class="text-align-right">
              <div class="badge color-blue" style="padding: 15px 7px"><f7-icon icon="fa fa-newspaper"></f7-icon></div>
            </f7-col>
            <f7-col width="40">
              Total comprobantes
            </f7-col>
            <f7-col width="40" class="text-align-right padding-right text-color-red">
              {{general.totals.total_documents}}
            </f7-col>
          </f7-row>
        </f7-card>
        <hr>
        <f7-row class=" text-align-center">
          <f7-col width="50">
            <strong>Total</strong>
          </f7-col>
          <f7-col width="50" class="text-align-right padding-right text-color-red">
            <div class="badge color-red"><h3>{{general.totals.total}}</h3></div>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-block class="padding-top padding-bottom">
        <f7-row class="padding-top padding-bottom">
          <f7-col class="padding-top padding-bottom">
            <x-graph-line :all-data="general.graph"></x-graph-line>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-card>

  </f7-page>
</template>

<style  scoped>
</style>

<script>
const url = "https://demo.facturador.pro/api";
const token = "hcTC1Up87AYr3p4D5jY1APRPwYZ7wXGxBSJL1yUwzynIIPcnyb";
import xGraphLine from "components/graph/GraphLine.vue";

export default {
  components: { xGraphLine },
  data() {
    return {
      report: {},
      isBottom: true,
      general: {
        totals: {
          total_documents: "177,210.65",
          total_sale_notes: "21,170.40",
          total: "198,381.05"
        },
        graph: {
          labels: [
            "00h",
            "01h",
            "02h",
            "03h",
            "04h",
            "05h",
            "06h",
            "07h",
            "08h",
            "09h",
            "10h",
            "11h",
            "12h",
            "13h",
            "14h",
            "15h",
            "16h",
            "17h",
            "18h",
            "19h",
            "20h",
            "21h",
            "22h",
            "23h"
          ],
          datasets: [
            {
              label: "Total notas de venta",
              data: [
                0,
                0,
                0,
                0,
                0,
                0,
                11686.5,
                0,
                0,
                0,
                0,
                4011.8,
                0,
                0,
                0,
                0,
                0,
                5205.5,
                3,
                0,
                13.6,
                0,
                250,
                0
              ],
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: "Total comprobantes",
              data: [
                13520,
                0,
                0,
                0,
                0,
                0,
                0,
                185,
                0,
                0,
                8455.8,
                1.78,
                19783.63,
                497.7,
                129.8,
                70760.77,
                23733.27,
                0,
                21097.14,
                0.9,
                424.5,
                0,
                8205.9,
                10414.46
              ],
              backgroundColor: "blue",
              borderColor: "blue",
              borderWidth: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: "Total",
              data: [
                13520,
                0,
                0,
                0,
                0,
                0,
                11686.5,
                185,
                0,
                0,
                8455.8,
                4013.5800000000004,
                19783.63,
                497.7,
                129.8,
                70760.77,
                23733.27,
                5205.5,
                21100.14,
                0.9,
                438.1,
                0,
                8455.9,
                10414.46
              ],
              backgroundColor: "rgb(201, 203, 207)",
              borderColor: "rgb(201, 203, 207)",
              borderWidth: 1,
              fill: false,
              lineTension: 0
            }
          ]
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
