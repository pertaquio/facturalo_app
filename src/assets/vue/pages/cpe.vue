<template>
  <f7-page>
    <f7-navbar title="Color Themes" back-link="Back"></f7-navbar>
    <f7-block-title>Scan Qr</f7-block-title>
    <f7-block>
      <f7-row></f7-row>
    </f7-block>

    <f7-block>
      <f7-row>
        <f7-button @click="scan" round>sacn</f7-button>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    scan() {
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          alert(
            "We got a barcode\n" +
              "Result: " +
              result.text +
              "\n" +
              "Format: " +
              result.format +
              "\n" +
              "Cancelled: " +
              result.cancelled
          );
        },
        function(error) {
          alert("Scanning failed: " + error);
        }
      );
    }
  }
};
</script>
