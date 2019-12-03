<template>
  <f7-page>
    <f7-navbar title="Reporte" back-link="Back"></f7-navbar>
    <f7-block-title>
      <p>Reporte</p>
    </f7-block-title>

    <f7-block>
      <f7-row>
        <f7-col>
          <x-graph-line :all-data="general.graph"></x-graph-line>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
const url = "https://demo.facturador.pro/api";
const token = "hcTC1Up87AYr3p4D5jY1APRPwYZ7wXGxBSJL1yUwzynIIPcnyb";
import xGraphLine from "components/graph/GraphLine.vue";

export default {
  components: {xGraphLine},
  data() {
    return {
      report: {},
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
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
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
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgb(54, 162, 235)",
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
