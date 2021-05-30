<template>
  <div
    class="subheader py-3 py-lg-8 subheader-transparent"
    v-bind:class="subheaderClasses"
    id="kt_subheader"
    style="z-index: 10 !important; font-family: 'Merriweather', serif;"
  >
    <b-modal id="modalNoteOpen" size="lg" hide-footer hide-header ref="modalNoteOpen">
        <!-- <form> -->
          <div class="row" style="padding: 20px;">
            <div class="col-9" style=" margin-bottom: 10px;">
              <i class="flaticon2-pen text-success" style="color: rgb(182, 140, 47) !important;"></i>
              <input type="text" v-model="ourNoteTitle" placeholder="Note Title" class="form-control" style="width: 400px; display: inline; margin-left: 20px; font-size: 22px;" id="our-edit-title-input" />
            </div>
            
            <div class="col-12" style="margin-bottom: 20px;"> 
              <!-- <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Content </label> -->
              <br>
              <textarea id="our-textarea" class="form-control" v-model="ourNoteContent" placeholder="Note Content" rows="10"></textarea>
            </div>
            
            <!-- <div class="col-1"></div> -->
            <!-- <b-button
              class="mt-5 col-4 btn btn-danger"
              @click="$bvModal.hide('modalNote')"
              >Cancel</b-button
            > -->
            <!-- <div class="col-2"></div> -->
            <!-- <b-button class="mt-5 col-4 btn btn-success" @click="createNote"
              >Save</b-button
            > -->
            <div class="col-3">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="createNewNote('light')">Save</a>
            </div>
            <div class="col-3">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="cancleNewNote('light')" >Cancle</a>
            </div>
            
          </div>
        <!-- </form> -->
      </b-modal>
    <b-modal id="modalNoteOpenDark" size="lg" hide-footer hide-header ref="modalNoteOpenDark">
        <!-- <form> -->
          <div class="row" style="padding: 20px;">
            <div class="col-9" style=" margin-bottom: 10px;">
              <i class="flaticon2-pen text-success" style="color: rgb(182, 140, 47) !important;"></i>
              <input type="text" v-model="ourNoteTitle" placeholder="Note Title" class="form-control" style="width: 400px; display: inline; margin-left: 20px; font-size: 22px;" id="our-edit-title-input" />
            </div>
            
            <div class="col-12" style="margin-bottom: 20px;"> 
              <!-- <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Content </label> -->
              <br>
              <textarea id="our-textarea" class="form-control" v-model="ourNoteContent" placeholder="Note Content" rows="10"></textarea>
            </div>
            
            <!-- <div class="col-1"></div> -->
            <!-- <b-button
              class="mt-5 col-4 btn btn-danger"
              @click="$bvModal.hide('modalNote')"
              >Cancel</b-button
            > -->
            <!-- <div class="col-2"></div> -->
            <!-- <b-button class="mt-5 col-4 btn btn-success" @click="createNote"
              >Save</b-button
            > -->
            <div class="col-3">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="createNewNote('dark')">Save</a>
            </div>
            <div class="col-3">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="cancleNewNote('dark')" >Cancle</a>
            </div>
            
          </div>
        <!-- </form> -->
      </b-modal>
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
                                  <input type="text" class="form-control quick-search-input" placeholder="Search..." v-model="search_str" />
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
          <a href="#" :class="{'btn btn-fh CustomBtn font-weight-bold mr-2': true, 'darkcustombtn': isDark}" @click="openNewNoteModel()">
            <!--begin::Svg-->
            <span class="svg-icon svg-icon-primary"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-02-01-052524/theme/html/demo1/dist/../src/media/svg/icons/Navigation/Plus.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/>
                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/>
            </g>
            </svg><!--end::Svg Icon--></span>
            <!--end::Svg Icon-->
              New Note
          </a>
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
  border: 1px solid rgb(182, 140, 47) !important;
  border-radius: 2px;
}

.CustomBtn .svg-icon svg g [fill] {
    fill: rgb(182, 140, 47) !important;
}

#modalNoteOpenDark .modal-content {
  background-color: #333 !important;
}

.custom-dark-breadcrumb {
  color: #fff !important;
}

.darkcustombtn {
  background-color: #333;
  color: white;
}
</style>
<script>
import { mapGetters } from "vuex";
var fs = require("fs");
var path = require("path");
import Swal from "sweetalert2";
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

      location: "Notes",
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

      ourNoteTitle: "",
      ourNoteContent: "",
    };
  },
  mounted() {
    var uri = window.location.href.split("/");
    this.currentPage = uri[uri.length - 1];

    this.parentDir = this.$store.getters.getParentDir;
    // console.log("Parent directory received in search " + "\\Notes\\" + this.parentDir);
    const dirTree = require("directory-tree");
    const dirPath = dirTree("C:\\proj_MIL\\Notes\\" + this.parentDir);
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
      this.$store.commit('set_note_search_str', this.search_str);
    }
  },
  methods: {
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
    createNewNote() {
        var parentDir = this.$store.getters.getParentDir;
        var self = this;
        if (self.ourNoteTitle != "") {
            var content = self.ourNoteContent;
            var cipheredContent = CryptoJS.AES.encrypt(content, "milpwkey78921");
            fs.writeFile(path.join("C:\\proj_MIL\\Notes\\"+parentDir, self.ourNoteTitle), 
                "\n" +
                new Date() + "\n" +
                cipheredContent, 
                function(err) {
                if (err) throw err;
                // console.log("Saved!");
                self.$refs['modalNoteOpen'].hide();
                Swal.fire({
                    icon: "success",
                    title: "Note created successfully",
                    customClass: {
                        popup: 'our_popup_5',
                        confirmButton: 'our_confirmButton_5',
                    }
                });

                document.getElementsByClassName("our_popup_5")[0].style.borderRadius = "20px";
                document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
                document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
                document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

                document.getElementsByClassName("our_confirmButton_5")[0].style.backgroundColor = "#ffffff";
                document.getElementsByClassName("our_confirmButton_5")[0].style.border = "1px solid #B68C2F";
                document.getElementsByClassName("our_confirmButton_5")[0].style.padding = "8px 24px";
                document.getElementsByClassName("our_confirmButton_5")[0].style.borderRadius = "2px";
                document.getElementsByClassName("our_confirmButton_5")[0].style.color = "black";

                self.$store.dispatch("set_refresh_status", true);
            });
            // self.$store.commit("setRerender");
        } else {
            Swal.fire({
                icon: "error",
                title: "Note title can't be empty!",
                customClass: {
                    popup: 'our_popup_6',
                    confirmButton: 'our_confirmButton_6',
                }
            });

            document.getElementsByClassName("our_popup_6")[0].style.borderRadius = "20px";
            // document.getElementsByClassName("swal2-error-ring")[0].style.borderColor = "#B68C2F30";
            // document.getElementsByClassName("swal2-error-line-tip")[0].style.backgroundColor = "#B68C2F";
            // document.getElementsByClassName("swal2-error-line-long")[0].style.backgroundColor = "#B68C2F";

            document.getElementsByClassName("our_confirmButton_6")[0].style.backgroundColor = "#ffffff";
            document.getElementsByClassName("our_confirmButton_6")[0].style.border = "1px solid #B68C2F";
            document.getElementsByClassName("our_confirmButton_6")[0].style.padding = "8px 24px";
            document.getElementsByClassName("our_confirmButton_6")[0].style.borderRadius = "2px";
            document.getElementsByClassName("our_confirmButton_6")[0].style.color = "black";
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
    openNewNoteModel() {
        if (this.isDark) {
          this.$refs['modalNoteOpenDark'].show();
        } else {
          this.$refs['modalNoteOpen'].show();
        }
    },
    cancleNewNote() {
        this.$refs['modalNoteOpen'].hide();
        this.ourNoteTitle = "";
        this.ourNoteContent = "";
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
