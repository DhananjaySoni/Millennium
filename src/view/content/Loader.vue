<template>
  <!-- begin::Page loader -->
  <div :class="{'page-loader page-loader-logo': true, 'loader-dark': isDark}">
    <img alt="Logo" :src="logo" width="100" />
    <div class="spinner" v-bind:class="{spinnerClass: spinnerClass, 'spinner-success': !spinnerClass, 'our-dark-spinner': isDark}"></div>
  </div>
  <!-- end::Page Loader -->
</template>

<style scoped>
.loader-dark {
  background-color: #333333 !important;
}

.spinner.spinner-success:before {
  border: 2px solid rgb(182, 140, 47) !important;
  border-right: 2px solid #ffffff !important;
}

.our-dark-spinner {
  border-right: 2px solid #333 !important;
}
</style>

<script>
export default {
  name: "Loader",
  props: {
    logo: String,
    spinnerClass: String
  },
  computed: {
    isDark() {
      return this.$store.getters.isDark;
    },
  }
};
</script>
