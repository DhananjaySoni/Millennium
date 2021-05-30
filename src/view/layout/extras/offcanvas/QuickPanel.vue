<template>
  <div>
    <button class="btn ml-5 mx-auto" @click="darkMode()">
      <span class="svg-icon svg-icon-xl ">
        <!--begin::Svg Icon-->
        <inline-svg src="media/darkmode.svg" />
        <!--end::Svg Icon-->
      </span>
    </button>
  </div>
</template>

<script>
import KTLayoutQuickPanel from "@/assets/js/layout/extended/quick-panel.js";

export default {
  name: "KTQuickPanel",
  data() {
    return {
    //   darkMode: false,
    };
  },
  mounted() {
    // Init Quick Offcanvas Panel
    KTLayoutQuickPanel.init(this.$refs["kt_quick_panel"]);
  },

  methods: {
    darkMode() {
      this.$store.commit("toggleDarkMode");
    },
    // darkDark() {
    //   return this.darkMode && "darkmode-toggled";
    // },
  },
};
</script>
