<template>
  <!-- begin:: Footer -->
  <div :class="{'footer py-4 d-flex flex-lg-column w-100':true, 'dark-custom-footer':isDark}" id="kt_footer" style="">
    <div
      class="d-flex align-items-center justify-content-between ml-0"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <!-- <div class="nav nav-dark">
        <a class="nav-link pr-3 pl-0">
          About
        </a>
        <a class="nav-link px-3">
          Team
        </a>
        <a class="nav-link pl-3 pr-0">
          Contact
        </a>
      </div> -->
      <div class="text-dark mx-auto" style="font-family: 'Merriweather', serif; z-index: 10;">
        <span class="text-muted font-weight-bold mr-2">
         Year
        </span>
        <span style="color: #B68C2F !important;">Footer</span>
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>

<style scoped>
.dark-custom-footer {
  
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  data() {
    return {
      CurrentYear: new Date().getFullYear(),
    };
  },
  mounted() {
    document.getElementById('kt_footer').style.width = window.innerWidth - 265 + "px";
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    },
    isDark(){
      return this.$store.getters.isDark;
    }
  },

};
</script>
