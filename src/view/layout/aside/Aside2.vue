<template>
  <!-- begin:: Aside -->
  <div
    :class="{ 'aside aside-left d-flex aside-fixed': true, dark: isDark }"
    id="kt_aside"
    ref="kt_aside"
    style="width: 100px !important;"
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
        <!-- <span
          :class="{'aside-toggle btn btn-icon btn-border btn-white shadow-sm':true, dark:isDark}"
          id="kt_aside_toggle"
          ref="kt_aside_toggle"
          data-placement="right"
          data-container="body"
          data-boundary="window"
          style="border:1px solid #b68c2f"
        >
          <i class="ki ki-bold-arrow-back icon-sm" style="color:#b68c2f"></i>
        </span> -->
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
   
  </div>
  <!-- end:: Aside -->
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
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
  name: "KTAside2",
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
