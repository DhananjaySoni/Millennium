<template>
  <div
    class="subheader py-3 py-lg-8 subheader-transparent"
    v-bind:class="subheaderClasses"
    id="kt_subheader"
    style="z-index: 10 !important; font-family: 'Merriweather', serif;"
  >
    <div
      class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-flex align-items-baseline mr-5">
        <!--begin::Page Title-->
        <h2 :class="{'subheader-title text-dark font-weight-bold my-2 mr-3': true, 'custom-dark-breadcrumb': isDark}">
          {{ title }}
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
        <!--begin: Search -->
          <b-dropdown size="sm" id="kt_quick_search_toggle" variant="link" toggle-class="topbar-item text-decoration-none" no-caret right no-flip>
              <template v-slot:button-content>
                  <div class="btn btn-icon btn-clean btn-lg btn-dropdown mr-1">
                      <span class="svg-icon svg-icon-xl svg-icon-primary">
                          <inline-svg src="media/search.svg" />
                      </span>
                  </div>
              </template>
              <b-dropdown-text tag="div" class="min-w-md-350px">
                  <div>
                      <div v-bind:class="{ 'quick-search-has-result': hasResult() }" class="quick-search quick-search-dropdown quick-search-result-compact" id="kt_quick_search_dropdown">
                          <form method="get" class="quick-search-form">
                              <div class="input-group spinner-input spinner-sm spinner-brand spinner-right" v-bind:class="{ spinner: loading }">
                                  <div class="input-group-prepend">
                                      <span class="input-group-text">
                                          <span class="svg-icon svg-icon-lg">
                                              <inline-svg src="media/search.svg" />
                                          </span>
                                      </span>
                                  </div>
                                  <input v-on:keyup="onSearchNew" type="text" class="form-control quick-search-input" placeholder="Search..." v-model="search_str" />
                                  <div class="input-group-append">
                                      <span class="input-group-text">
                                          <i class="quick-search-close" v-on:click="reset" v-bind:style="{ display: hasResult() ? 'flex' : '' }"></i>
                                      </span>
                                  </div>
                              </div>
                          </form>

                          <div id="search_body">
                              <!-- <p style="color: #3f3f3f; margin-top: 5px;">Search in</p>

                              <label class="checkbox" style="margin-top: 5px;">
                                  <input type="checkbox" name="Checkboxes1" v-model="chapterNameSearch" />
                                  <span style="margin-right: 10px;"></span>
                                  Chapter Names
                              </label>

                              <label class="checkbox" style="margin-top: 5px;">
                                  <input type="checkbox" name="Checkboxes1" v-model="chapterContentSearch" />
                                  <span style="margin-right: 10px;"></span>
                                  Chapter Content
                              </label>

                              <hr />

                              <div class="font-size-sm text-primary font-weight-bolder text-uppercase mb-2">
                                  File
                              </div> -->

                              <div v-for="(search_file, search_files_index) in searched_files" :key="search_files_index" class="d-flex align-items-center flex-grow-1 mb-2" v-b-modal.modal-scrollable2 @click="OpenFile(search_file.path)" style="margin-top: 10px;">
                                  <a href="#" @click="GoToBookmarkPage(search_file.path, search_file.name)" class="font-weight-bold text-dark our-search-result">
                                    {{ search_file.name.replace(".mlnm","") }}
                                  </a>
                              </div>

                              
                          </div>
                      </div>
                  </div>
              </b-dropdown-text>
          </b-dropdown>
          <!--end: Search -->
        <!-- <b-dropdown
          toggle-class="btn btn-hover-white font-weight-bold mr-2"
          no-caret
          right
          no-flip
          v-b-tooltip="'Quick actions'"
        >
          <template v-slot:button-content>
            
            <span class="svg-icon svg-icon-success svg-icon-lg">
              
              <inline-svg src="media/mode.svg" />
              
            </span>

            
          </template>
          
          <div class="navi navi-hover min-w-md-250px">
            <b-dropdown-text tag="div" class="navi-item">
              <span class="navi-text">
                <span class="label label-xl label-inline label-light-success">
                  Text Opacity
                </span>
              </span>
              <input
                type="range"
                id="opacity-slider"
                class="w-100"
                min=".4"
                max="1"
                step=".01"
                value="1"
              />
            </b-dropdown-text>
            <b-dropdown-text tag="div" class="navi-item">
              <span class="navi-text">
                <span class="label label-xl label-inline label-light-danger">
                  Text Size
                </span>
              </span>
              <input
                type="range"
                id="size-slider"
                class="w-100"
                min="1"
                max="3"
                step="0.2"
                value="1"
              />
            </b-dropdown-text>
          </div>
          
        </b-dropdown> -->
        <!-- <a
          href="#"
          class="btn btn-hover-white font-weight-bold mr-2"
          @click="bookmarkPage"
          v-b-tooltip="'Bookmark Page'"
        >
          <span class="svg-icon svg-icon-success svg-icon-lg">
            
            <inline-svg src="media/bookmark.svg" />
            
          </span>
        </a> -->
        <!--end::Button-->

        <!--begin::Button-->
        <!-- <a
          href="#"
          class="btn font-weight-bold btn-hover-white"
          data-toggle="modal"
          data-target="#kt_chat_modal"
          v-b-modal.ModalContent
          @click="ModalReadView"
          v-b-tooltip="'Reading Mode'"
        >
          <span class="svg-icon svg-icon-lg">
            
            <inline-svg src="media/fullScreen.svg" />
            
          </span>
        </a> -->
        <!-- <b-modal
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
            block
            class="mt-5 w-2"
            variant="outline-warning"
            @click="$bvModal.hide('ModalContent')"
            >Close</b-button
          >
          </div>
        </b-modal> -->

        <!--end::Button-->
      </div>
      <!--end::Toolbar-->
    </div>
  </div>
</template>
<style scoped>
.CustomBtn {
  background: #fff;
  border: 1px solid orangered;
}

.our-search-result:hover {
  color: #B68C2F !important;
}

.custom-dark-breadcrumb {
  color: #B5B5C3 !important;
}
</style>
<script>
import { mapGetters } from "vuex";
var fs = require("fs");
var path = require("path");
var notesPath = "C:\\proj_MIL\\Notes\\";
var CryptoJS = require("crypto-js");

export default {
  name: "KTSubheader",
  props: {
    breadcrumbs: Array,
    title: String,
  },
  data() {
    return {
      currentPage: "",
      NoteContentGet: "",

      location: "Bookmarks",
      data: [],
      loading: false,
      parentDir: "",
      parentDirContent: [],
      // dummy search result data
      result: [],
      // FolderSearch: true,
      chapterNameSearch: true,
      chapterContentSearch: false,
      search_str: "",
      searched_folders: [],
      searched_files: [],
      searched_files_contents: [],
      ModalData: "",
    };
  },
  mounted() {
    var uri = window.location.href.split("/");
    this.currentPage = uri[uri.length - 1];

    this.parentDir = this.$store.getters.getParentDir;
    // console.log("Parent directory received in search " + "\\Notes\\" + this.parentDir);
    const dirTree = require("directory-tree");
    const dirPath = dirTree("C:\\proj_MIL\\Bookmarks\\" + this.parentDir);
    // console.log("this is notes");
    // console.log(dirPath);
    this.parentDirContent = dirPath.children;
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

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
    isDark() {
      return this.$store.getters.isDark;
    },
    getNote() {
      return this.$store.getters.getNote;
    },
  },
  watch: {
    search_str: function(value) {
      this.$store.commit('set_search_str', this.search_str);
    }
  },
  methods: {
    GoToBookmarkPage(path, name) {
      this.$store.commit("setHtmPath", path);
      this.$store.commit("setFileName", name);
      this.$router.push("/Dashboard");
    },
    createNote() {
      var heading = document.getElementById("noteHeading").value;
      var parentDir = this.$store.getters.getParentDir;

      var self = this;
      if (heading != "") {
        var content = document.getElementById("noteContent").value;
        var cipheredContent = CryptoJS.AES.encrypt(content, "milpwkey78921");
        fs.writeFile(path.join(notesPath+parentDir, heading), cipheredContent, function(
          err
        ) {
          if (err) throw err;
          // console.log("Saved!");
          self.$bvModal.hide("newNoteModal");
        });
        // self.$store.commit("setRerender");
      }
    },

    OpenFile(search_file) {
          // console.log(search_file + "This is file link");

          var data = fs.readFileSync(search_file, "utf8");
          var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");

          var noteData = bytes.toString(CryptoJS.enc.Utf8);
          // console.log(data)

          this.ModalData = noteData;
  
    },
    onSearchNew(event) {
      // console.log(this.search_str);
        var self = this;
        self.data = [];
        self.searched_files = [];
        self.searched_files_contents = [];
        self.search_str = self.search_str.toLowerCase();


        if (event.target.value.length > 2) {

            // if ( self.chapterNameSearch == true ) {

                var bookmarks_raw = fs.readFileSync("C:\\proj_MIL\\Bookmarks\\" + self.$store.getters.getParentDir + ".txt", "utf8");
                var bookmarks_arr = bookmarks_raw.split("\n");
                
                // console.log(bookmarks_arr);
  
                bookmarks_arr.forEach((line) => {
                    if (line.split("|")[0].toLowerCase().indexOf(self.search_str) >= 0) {
                        
                        self.searched_files.push({
                            name: line.split("|")[0],
                            path: line.split("|")[1],
                        });
  
                    }
                });
                

            // }

            // if (self.chapterContentSearch == true) {
                
            //     self.searched_files_contents = [];

            //     var bookmarks_raw = fs.readFileSync("C:\\proj_MIL\\Bookmarks\\" + self.$store.getters.getParentDir + ".txt", "utf8");
            //     var bookmarks_arr = bookmarks_raw.split("\n");

            //     bookmarks_arr.forEach((line) => {
            //         // LEVEL 1
                    
            //             var full_file_url = line.split("|")[1];

            //             fs.readFile(full_file_url, "utf-8", (err, data) => {
            //                 if (err) {
            //                     alert("An error ocurred reading the file :" + err.message);
            //                     return;
            //                 }

            //                 var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");
            //                 var originalText = bytes.toString(CryptoJS.enc.Utf8);

            //                 if (originalText.toLowerCase().indexOf(self.search_str) >= 0) {
            //                     self.searched_files_contents.push({
            //                         name: content.name,
            //                         url: content.path,
            //                     });
            //                 }
            //             });
            //     });
                
            // }

        }

    },
    hasResult() {
        return this.data.length || false;
    },
    /**
     * Reset search data
     */
    reset() {
        this.data = [];
        document.getElementById("search_body").style.cssText = "display:none";
    },
  },
};
</script>
