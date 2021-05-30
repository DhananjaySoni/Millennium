<template>
  <!-- begin:: Aside -->
  <div
    :class="{ 'aside aside-left d-flex aside-fixed': true, dark: isDark }"
    id="kt_aside"
    ref="kt_aside"
  >
    <!--begin::Primary-->
    <div
      :class="{'aside-primary d-flex flex-column align-items-center flex-row-auto':true, 'aside-dark-border': isDark}"
    >
      <!--begin::Brand-->
      <KTBrand></KTBrand>
      <!--end::Brand-->
      <!--begin::Nav Wrapper-->
      <div
        class="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull ps"
        style="height: 528px; overflow: hidden;"
      >
        <!--begin::Nav-->
        <ul class="nav flex-column" role="tablist">
          <!--begin::Item-->

          <!--end::Item-->
          <!--begin::Item-->
          <li
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            v-b-tooltip.hover.right="'Book'"
            @click="callPage('/dashboard')"
          >
            <a
              href="#"
              :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
              data-toggle="tab"
              v-on:click="setActiveTab"
              data-tab="1"
            >
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon-->
                <inline-svg src="media/menu.svg" />
                <!--end::Svg Icon-->
              </span>
            </a>
          </li>
          <li
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            id="notes"
            v-b-tooltip.hover.right="'bookmarks'"
            @click="callPage('/bookmarks')"
          >
            <a
              href="#"
              :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
              v-on:click="setActiveTab"
            >
              <span class="svg-icon svg-icon-xl" style="color:orange">
                <!--begin::Svg Icon-->
                <inline-svg src="media\bookmark.svg" />
                <!--end::Svg Icon-->
              </span>
            </a>
          </li>
          <li
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            id="notes"
            v-b-tooltip.hover.right="'Notes'"
            @click="callPage('/notes')"
          >
            <a
              href="#"
              :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
              v-on:click="setActiveTab"
            >
              <span class="svg-icon svg-icon-xl" style="color:orange">
                <!--begin::Svg Icon-->
                <inline-svg src="media\pen.svg" />
                <!--end::Svg Icon-->
              </span>
            </a>
          </li>
        </ul>
        <!--end::Nav-->
      </div>
      <!--end::Nav Wrapper-->
      <!--begin::Footer-->
      <div
        class="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10"
      >
        <!--begin::Aside Toggle-->
        <span
          :class="{'aside-toggle btn btn-icon btn-border btn-white shadow-sm':true, dark:isDark}"
          id="kt_aside_toggle"
          ref="kt_aside_toggle"
          data-placement="right"
          data-container="body"
          data-boundary="window"
          style="border:1px solid #b68c2f"
        >
          <i class="ki ki-bold-arrow-back icon-sm" style="color:#b68c2f"></i>
        </span>
        <!--end::Aside Toggle-->
        <!--begin::Quick Actions-->
        <!-- <KTQuickActions></KTQuickActions> -->
        <!--end::Quick Actions-->
        <!--begin::Quick Panel-->
        <!-- <KTQuickPanel></KTQuickPanel> -->
        <!--end::Quick Panel-->
        <!--begin::User-->
        <KTQuickUser></KTQuickUser>

        <!--end::User-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Primary-->
    <!--begin::Secondary-->
    <div :class="{'aside-secondary d-flex flex-row-fluid': true, 'dark-custom-aside': isDark }" id="AsideSecondary">
      <!--begin::Workspace-->
      <div
        class="aside-workspace scroll scroll-push my-2 ps"
        style="height: 824px; overflow: hidden;"
      >
        <!--begin::Tab Content-->
        <b-tabs class="hide-tabs" v-model="tabIndex">
          <b-tab active>
            <!--begin::Aside Menu-->
            <div
              class="aside-menu-wrapper flex-column-fluid pt-3"
              id="kt_aside_menu_wrapper"
            >
              <!--begin::Menu Container-->
              <div
                ref="kt_aside_menu"
                id="kt_aside_menu"
                :class="{'aside-menu min-h-lg-800px':true, 'dark':isDark,asideMenuClass}"
                data-menu-vertical="1"
                data-menu-scroll="1"
                
              >
                <!-- example static menu here -->
                <perfect-scrollbar
                  class="aside-menu scroll"
                  style="height: 90vh; position: relative;"
                >
                  <!-- <KTMenu></KTMenu> -->
                </perfect-scrollbar>
              </div>
              <!--end::Menu Container-->
            </div>
            <!--end::Aside Menu-->
          </b-tab>
        </b-tabs>
        <!--end::Tab Content-->
        <!--end::Workspace-->
      </div>
      <!--end::Secondary-->
    </div>
  </div>
  <!-- end:: Aside -->
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}

.btn.btn-clean-dark:not(:disabled):not(.disabled):active:not(.btn-text), .btn.btn-clean-dark:not(:disabled):not(.disabled).active, .show > .btn.btn-clean-dark.dropdown-toggle, .show .btn.btn-clean-dark.btn-dropdown {
  background-color: #333333 !important;
  border: 1px solid #B68C2F !important;
}

.btn.btn-clean-dark:hover:not(.btn-text):not(:disabled):not(.disabled), .btn.btn-clean-dark:focus:not(.btn-text), .btn.btn-clean-dark.focus:not(.btn-text) {
  background-color: #272727 !important;
}

.aside-dark-border {
  border-right: 1px solid #5f5f5f !important;
}

.dark-custom-aside {
  border: 1px solid #5f5f5f !important;
}
</style>

<script>
import { mapGetters } from "vuex";
import KTLayoutAside from "@/assets/js/layout/base/aside.js";
import KTLayoutAsideMenu from "@/assets/js/layout/base/aside-menu.js";
import KTLayoutAsideToggle from "@/assets/js/layout/base/aside-toggle.js";
import KTBrand from "@/view/layout/brand/Brand.vue";
// import KTMenu from "@/view/layout/aside/Menu.vue";
// import KTQuickActions from "@/view/layout/extras/offcanvas/QuickActions.vue";
import KTQuickUser from "@/view/layout/extras/offcanvas/QuickUser.vue";
import KTQuickPanel from "@/view/layout/extras/offcanvas/QuickPanel.vue";
var fs = require("fs");
export default {
  name: "KTAside",
  data() {
    return {
      insideTm: 0,
      outsideTm: 0,
      tabIndex: 0,
      subFiles: [],
      currentPage: "",
      // isDark: false,
    };
  },
  components: {
    KTBrand,
    // KTMenu,
    // KTQuickActions,
    KTQuickUser,
    KTQuickPanel,
    // router
  },
  mounted() {
    var uri = window.location.href.split("/");
    this.currentPage = uri[uri.length - 1];
    console.log(this.currentPage);
    // if(this.currentPage == 'bookmarks' || this.currentPage == 'notes'){
    //   document.getElementById("AsideSecondary").style.cssText = 'display:none !important';
    //   document.getElementById("kt_aside").style.cssText = 'width:100px';
    //   document.getElementById("kt_aside_toggle").style.cssText = 'display:none !important';
      
    // }
    this.$nextTick(() => {
      // Init Aside
      KTLayoutAside.init(this.$refs["kt_aside"]);

      // Init Aside Menu
      KTLayoutAsideMenu.init(this.$refs["kt_aside_menu"]);

      // Init Aside Toggle
      KTLayoutAsideToggle.init(this.$refs["kt_aside_toggle"]);
    });

   
  },
  methods: {
    callPage(pageName) {
      this.$router.push(pageName);
    },
    setActiveTab(event) {
      let target = event.target;
      if (!event.target.classList.contains("nav-link")) {
        target = event.target.closest(".nav-link");
      }

      const tab = target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(target.getAttribute("data-tab"));

      // set current active tab
      target.classList.add("active");
    },
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },
  },
  computed: {
    ...mapGetters(["layoutConfig", "getClasses"]),

    /**
     * Get extra classes for menu based on the options
     */
    asideMenuClass() {
      const classes = this.getClasses("aside_menu");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },
    isDark() {
      return this.$store.getters.isDark;
    },
  },

};
</script>
