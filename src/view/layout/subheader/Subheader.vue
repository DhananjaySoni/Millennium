<template>
  <div
    class="subheader py-3 py-lg-8 subheader-transparent subheader-container"
    v-bind:class="subheaderClasses"
    id="kt_subheader"
    style="z-index: 10 !important"
  >
    <div
      class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-flex align-items-baseline mr-5">
        <!--begin::Page Title-->
        <h2 :class="{'subheader-title text-dark font-weight-bold my-2 mr-3': true, 'custom-dark-breadcrumb': isDark}">
          {{ getFileName.replace(".mlnm", "") }}
        </h2>
        <!--end::Page Title-->
        <!--begin::Breadcrumb-->
        <!-- <ul
          class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0"
        >
          <template v-for="(breadcrumb, i) in breadcrumbs">
            <li :key="`${i}-${breadcrumb.id}`" class="breadcrumb-item">
              <router-link
                :key="`${i}-${breadcrumb.id}`"
                v-if="breadcrumb.route"
                :to="breadcrumb.route"
                class="text-muted"
              >
                {{ breadcrumb.title }}
              </router-link>
              <span
                class="text-muted"
                :key="`${i}-${breadcrumb.id}`"
                v-if="!breadcrumb.route"
              >
                {{ breadcrumb.title }}
              </span>
            </li>
          </template>
        </ul> -->
        <!--end::Breadcrumb-->
      </div>

      <!--begin::Toolbar-->
      <div class="d-flex align-items-center">
        <!--begin::Button-->
        <b-dropdown
          toggle-class="btn btn-hover-white font-weight-bold mr-2"
          no-caret
          right
          no-flip
          v-b-tooltip="'Font Options'"
        >
          <template v-slot:button-content>
            <!--begin::Button-->
            <span class="svg-icon svg-icon-success svg-icon-lg">
              <!--begin::Svg-->
              <inline-svg src="media/mode.svg" />
              <!--end::Svg Icon-->
            </span>

            <!--end::Button-->
          </template>
          <!--begin::Navigation-->
          <div class="min-w-md-300px" style="padding-left: 20px; padding-right: 20px;">
            <b-dropdown-text tag="div" class="navi-item">
              <span class="">
                <span class="" style="line-height: 40px;">
                  Text Opacity
                </span>
              </span>
              <!-- <input
                type="range"
                id="opacity-slider"
                class="w-100"
                min=".4"
                max="1"
                step=".01"
                value="1"
              /> -->
              <div id="text_opacity_id"></div>
            </b-dropdown-text>
            <b-dropdown-text tag="div" class="" style="margin-bottom: 20px;">
              <span class="">
                <span style="line-height: 40px;">
                  Text Size
                </span>
              </span>
              <!-- <input
                type="range"
                id="size-slider"
                class="w-100"
                min="1"
                max="3"
                step="0.2"
                value="1"
              /> -->
              <div id="text_size_id"></div>
            </b-dropdown-text>
          </div>
          <!--end::Navigation-->
        </b-dropdown>
        <a
          href="#"
          class="btn btn-hover-white font-weight-bold mr-2"
          @click="bookmarkPage"
          v-b-tooltip="'Bookmark Page'"
        >
          <span class="svg-icon svg-icon-success svg-icon-lg">
            <!--begin::Svg-->
            <inline-svg src="media/bookmark.svg" />
            <!--end::Svg Icon-->
          </span>
        </a>
        <!--end::Button-->

        <!--begin::Button-->
        <a
          href="#"
          class="btn font-weight-bold btn-hover-white"
          data-toggle="modal"
          data-target="#kt_chat_modal"
          id="ourreadingmodeid"
          @click="ModalReadView"
          v-b-tooltip="'Reading Mode'"
          ref="ourreadingmode"
        >
          <span class="svg-icon svg-icon-lg">
            <!--begin::Svg Icon-->
            <inline-svg src="media/fullScreen.svg" />
            <!--end::Svg Icon-->
          </span>
        </a>
        <b-modal
        v-if="isDark"
          id="ModalContent"
          hide-header
          hide-footer
          size="xl"
          :body-bg-variant="'dark'"
          :body-text-variant="'light'"
        >
          <div id="readView" v-html="ModalContent"></div>
          <div class="text-center">
          <b-button
            
            class="mt-5"
            variant="outline-warning"
            @click="$bvModal.hide('ModalContent')"
            >Close</b-button
          ></div>
        </b-modal>

        <b-modal
        v-if="!isDark"
          id="ModalContent"
          hide-header
          hide-footer
          size="xl"
          :body-bg-variant="'light'"
          :body-text-variant="'dark'"
        >
          <div id="readView" v-html="ModalContent"></div>
          <div class="text-center">
          <b-button
            class="mt-5 w-2"
            variant="outline-warning"
            @click="$bvModal.hide('ModalContent')"
            >Close</b-button
          >
          </div>
        </b-modal>

        <!--end::Button-->
      </div>
      <!--end::Toolbar-->
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
var fs = require("fs");
var path = require("path");
var bookmarksPath = "C:\\proj_MIL\\Bookmarks\\";
const Swal = require("sweetalert2");
var CryptoJS = require("crypto-js");

import { addBookmark } from "@/core/services/store/bookmarks.module";

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export default {
  name: "KTSubheader",
  props: {
    breadcrumbs: Array,
  },
  data() {
    return {
      ModalContent: "",
      opacity: "",
      fontSize: "",
    };
  },
  mounted() {
    var self = this;

    var text_opacity_slider = document.getElementById('text_opacity_id');

    noUiSlider.create(text_opacity_slider, {
        start: [ 1 ],
        step: 0.01,
        range: {
          'min': [ 0.4 ],
          'max': [ 1.0 ]
        }
    });

    text_opacity_slider.noUiSlider.on('update', function (values, handle) {
        // console.log(" -=-> " + values + " | " + handle);
        self.$store.commit("setOpacity", values);
    });


    var text_size_slider = document.getElementById('text_size_id');

    noUiSlider.create(text_size_slider, {
        start: [ 1 ],
        step: 0.2,
        range: {
          'min': [ 1 ],
          'max': [ 3 ]
        }
    });

    text_size_slider.noUiSlider.on('update', function (values, handle) {
        // console.log(" +=-> " + values + " | " + handle);
        self.$store.commit("setSize", values);
    });

    // document
    //   .getElementById("opacity-slider")
    //   .addEventListener("input", function (e) {
    //     self.$store.commit("setOpacity", this.value);
    //     self.opacity = this.value;
    //   });
    // document
    //   .getElementById("size-slider")
    //   .addEventListener("input", function (e) {
    //     self.$store.commit("setSize", this.value);
    //     self.fontSize = this.value;
    //   });
    this.$on("bv::modal::shown", (bvEvent, ModalContent) => {
      document.getElementById("readView").style.cssText =
        "opacity: " + self.opacity + "; zoom: " + self.fontSize;
    });
  },
  computed: {
    ...mapGetters(["layoutConfig"]),
    isDark() {
      return this.$store.getters.isDark;
    },

    getFileName() {
      return this.$store.getters.getFileName;
    },

    /**
     * Check if subheader width is fluid
     */
    widthFluid() {
      return this.layoutConfig("subheader.width") === "fluid";
    },

    subheaderClasses() {
      const classes = [];
      const style = this.layoutConfig("subheader.style");
      if (style) {
        classes.push(style);

        if (style === "solid") {
          classes.push("bg-white");
        }

        if (this.layoutConfig("subheader.fixed")) {
          classes.push("border-top");
        }

        if (this.layoutConfig("subheader.clear")) {
          classes.push("mb-0");
        }
      }
      return classes.join(" ");
    },
  },
  methods: {
    setOpacityModal(value) {
      document.getElementById("readView").style.cssText =
        "opacity:" + value + " !important";
    },
    setFontSizeModal() {
      document.getElementById("readView").style.cssText =
        "zoom:" + this.value + " !important";
    },
    bookmarkPage() {
      // var parentDir = this.$store.getters.getParentDir;
      // var chapName = this.$store.getters.getHtm;
      // var content = fs.readFileSync(chapName.trim(), "utf8");
      // fs.writeFile(
        //   path.join(bookmarksPath+parentDir, name),
      //   content,
      //   function (err) {
        //     if (err) throw err;

      //     Swal.fire({
        //       icon: "success",
      //       title: "BookMarked ",
      //     });
      //   }
      // );
      var name = this.$store.getters.getFileName;
      var path = this.$store.getters.getHtmPath;
      this.$store.dispatch(addBookmark, {
        section: "Reports", 
        title: name,
        path: path
      });
    },
    ModalReadView() {
      // var chapName = this.$store.getters.getHtm;
      // var content = fs.readFileSync(chapName.trim(), "utf8");
      // var bytes = CryptoJS.AES.decrypt(content, "milpwkey78921");
      // this.ModalContent = bytes.toString(CryptoJS.enc.Utf8);
      if (document.getElementById("kt_aside").style.marginLeft != "-500px") {
        document.getElementById("kt_aside").style.marginLeft = "-500px";
        document.getElementById("kt_wrapper").style.paddingLeft = "0px";
      } else {
        document.getElementById("kt_aside").style.marginLeft = "0px";
        document.getElementById("kt_wrapper").style.paddingLeft = "475px";
      }
      document.getElementById('ourreadingmodeid').blur();
      
    },
  },
};
</script>

<style scoped>

/* .noUi-target { */
/* .noUi-base { */
/* .noUi-origin { */
/* .noUi-handle	{ */
#text_opacity_id .noUi-handle-lower {
  background-color: black !important;
}

.modal-open::-webkit-scrollbar {
  display: none !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
.modal-open {
  -ms-overflow-style: none !important;  /* IE and Edge */
  scrollbar-width: none !important;  /* Firefox */
overflow: hidden;
    overflow-y: scroll;
    padding-right: 0 !important;
}

.subheader-container {
  font-family: 'Merriweather', serif;
}


.custom-dark-breadcrumb {
  color: #B5B5C3 !important;
}
</style>