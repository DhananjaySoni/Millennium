<template>
<div>
  <div :class="{'no-layer':!isDark, 'dark-main-bg':isDark}">
  </div>
    <img
      src="/media/my/cover.jpg"
      :class="{'bg':true }"
    />
  <router-view></router-view>
</div>
</template>

<style lang="scss">
// 3rd party plugins css
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "~perfect-scrollbar/css/perfect-scrollbar.css";
@import "~socicon/css/socicon.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "assets/plugins/flaticon/flaticon.css";
@import "assets/plugins/flaticon2/flaticon.css";
@import "assets/plugins/keenthemes-icons/font/ki.css";

// Main demo style scss
@import "assets/sass/style.vue";

// Check documentation for RTL css
// Update HTML with RTL attribute at public/index.html
/*@import "assets/css/style.vue.rtl";*/
</style>

<script>
import { OVERRIDE_LAYOUT_CONFIG } from "@/core/services/store/config.module";

export default {
  name: "MetronicVue",
  data(){
    return{
      isDark:false,
    }
  },
  computed: {
    checkDarkMode() {
      return this.$store.getters.isDark;
    },
  },
  watch: {
    checkDarkMode: function(checkDarkMode) {
      this.isDark = checkDarkMode;
    },
  },
  mounted() {
    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
    this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG);
  }
};
</script>
<style>
.buttonStyles{
 background-color: #fff !important;
    border-color: #B68C2F !important;
    padding: 8px 24px;
    border-radius: 2px;
}
.button-color{
    color: #111111 !important;
}
#createNote {
  display: none;
}
.dark{
  background: #333333 !important;
 
}
.dark-text{
   color:rgb(199, 195, 195) !important;
}
.border-orange{
  border: 1px solid #b68c2f !important;
}

.no-layer{
  display: none;
}
.dark-main-bg{
  height:100%;
  width:100%;
  position:absolute;
  top:0;
  background-color:rgba(0,0,0,0.7)
}
</style>
<style scoped>
.bg{
  z-index:0;
   position: fixed;
    opacity: 0.2;
    left : 0;
    top:0;
    min-width : 100%
}
</style>