<template>
  <div :class="{'container': true}">
    <!-- <NotesBookmarkHeader />
    <Aside /> -->
    <div class="container">
      <div class="row">
        <div class="col-4" v-for="(Bookmark, index) in allBookmarks" :key="index" v-if="search_str == '' || Bookmark.title.toLowerCase().indexOf(search_str.toLowerCase()) >= 0">
          <!--begin::Mixed Widget 10-->
          <div :class="{
              'card card-custom gutter-b card-stretch': true,
              'dark dark-text border-orange': isDark,
            }" style="
            box-shadow: none;
            border-radius: 10px;
            border: 1px solid lightgray;
          ">
            <!--begin::Body-->
            <div class="card-body d-flex flex-column" style="padding-bottom: 0px;">
              <div class="flex-grow-1 pb-5">
                <!--begin::Info-->
                <div class="d-flex align-items-center pr-2 mb-6">
                  <span class="text-muted font-weight-bold font-size-lg flex-grow-1" v-text="Bookmark.last_modified<2 ? Bookmark.last_modified+' ' + Bookmark.last_modified_type.substr(0, Bookmark.last_modified_type.length-1) + ' ago' : Bookmark.last_modified+' ' + Bookmark.last_modified_type + ' ago'">
                  </span>
                  <a href="#" :class="{
                      'btn btn-sm btn-success font-weight-bold': true,
                      dark: isDark,
                    }" style="
                      background-color: #fff;
                      color: #111111 !important;
                      border-color: #b68c2f !important;
                      border-radius: 2px;
                    " @click="openBookmark(Bookmark.path, Bookmark.title)">
                    <span class="svg-icon svg-icon-lg">
                      <!--begin::Svg Icon-->
                      <inline-svg src="media/bookmark_click.svg" />
                      <!--end::Svg Icon-->
                    </span>
                  </a>
                </div>
                <!--end::Info-->

                <!--begin::Link-->
                <a href="#" :class="{'text-dark font-weight-bolder font-size-h4 custom-hover-class':true, 'dark_custom_heading': isDark }">{{ Bookmark.title.replace(".mlnm","") }}</a>
                <!--end::Link-->

                <!--begin::Desc-->

                <!-- <p
                  :class="{
                    'text-dark-50 font-weight-normal font-size-lg mt-6 h-200px overflow-hidden': true,
                    'dark-text': isDark,
                  }"
                  v-html="Bookmark.BookmarkContent"
                ></p> -->
                <!--end::Desc-->
              </div>

              <!--end::Team-->
            </div>
            <div class="card-footer" style="padding-top: 0px; border: 0px; text-align: right;">
              <!-- <button type="button" :class="{'btn btn-icon btn-sm our-delete-button': true, 'hide-our-btn': openMenuIndex == index, 'show-our-btn': openMenuIndex == -1}" v-on:mouseover="openMenuIndex = index" v-on:mouseout="openMenuIndex = -1">
                  <span class="svg-icon svg-icon-2x our-delete-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <circle fill="#000000" cx="5" cy="12" r="2"/>
                          <circle fill="#000000" cx="12" cy="12" r="2"/>
                          <circle fill="#000000" cx="19" cy="12" r="2"/>
                      </g>
                  </svg></span>
              </button> -->
              <button type="button" :class="{'btn btn-icon btn-sm our-delete-button': true}" @click="ourDeleteBookmark(index)">
                  <span class="svg-icon svg-icon-2x our-delete-icon"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-02-01-052524/theme/html/demo1/dist/../src/media/svg/icons/Home/Trash.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>
                          <path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                      </g>
                  </svg><!--end::Svg Icon--></span>
              </button>
            </div>
            <!--end::Body-->
          </div>
          <!--end::Mixed Widget 10-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Aside from "@/view/layout/aside/Aside.vue";
  // import NotesBookmarkHeader from "@/view/layout/subheader/NotesBookmarkHeader";
  var fs = require("fs");
  import Swal from 'sweetalert2'
  import {
    SET_BREADCRUMB
  } from "@/core/services/store/breadcrumbs.module";
  import {
    deleteBookmark
  } from "@/core/services/store/bookmarks.module";
  var CryptoJS = require("crypto-js");
  var bookmarkPath = "C:\\proj_MIL\\Bookmarks\\";
  export default {
    data() {
      return {
        openMenuIndex: -1,
        allBookmarks: []
      };
    },
    components: {
      Aside,
      // NotesBookmarkHeader,
    },
    mounted() {
      this.$store.dispatch(SET_BREADCRUMB, [{
        title: "Bookmarks"
      }]);
      this.readBookmarks();
    },
    methods: {
      openBookmark(path, name) {
        this.$store.commit("setHtmPath", path);
        this.$store.commit("setFileName", name);
        this.$router.push("/Dashboard");
      },
      ourDeleteBookmark( index ) {
        this.$store.dispatch(deleteBookmark, this.allBookmarks[index].path);
        this.readBookmarks();
      },
      readBookmarks() {
        var parent_dir = this.$store.getters.getParentDir;
        var self = this;
        // console.log("fdhsjkd");
        if ( parent_dir == "Reports" ) {
          
          var reports_bookmarks_raw = fs.readFileSync("C:\\proj_MIL\\Bookmarks\\Reports.txt", "utf8");

          if (reports_bookmarks_raw.length == 0) {
            self.allBookmarks = [];
          }
          // console.log("-=>" + reports_bookmarks_raw);

          var reports_bookmarks = [];
          
          if ( reports_bookmarks_raw != '' ) {

            var reports_bookmarks_arr = reports_bookmarks_raw.split("\n");
            // console.log("-----=>" + reports_bookmarks_arr);
  
            for (let i = 0; i < reports_bookmarks_arr.length; i++) {
                var timestamp = Date.parse(reports_bookmarks_arr[i].split("|")[2]);
                var dateObject = new Date(timestamp);
  
                var type = "";
                var final_diff = -1;
                var diff = Math.abs(Date.parse(new Date()) - dateObject);
  
                if ( diff < ( 1000 * 60 * 60 * 24 ) ) {
                  type = "Days";
                  final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 * 60 * 24 ));
                }
                if ( diff < ( 1000 * 60 * 60 ) ) {
                  type = "Hours";
                  final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 * 60 ));
                }
                if ( diff < ( 1000 * 60 ) ) {
                  type = "Minutes";
                  final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 ));
                }
                if (diff < 1000) {
                  type = "Seconds";
                  final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / 1000);
                }
  
                reports_bookmarks.push({
                    title: reports_bookmarks_arr[i].split("|")[0],
                    path: reports_bookmarks_arr[i].split("|")[1],
                    saved_time: reports_bookmarks_arr[i].split("|")[2],
                    last_modified: final_diff,
                    last_modified_type: type
                }); 
            }

          }


          self.allBookmarks = reports_bookmarks

        } else if ( parent_dir == "Analysis" ) {

          var analysis_bookmarks_raw = fs.readFileSync("C:\\proj_MIL\\Bookmarks\\Analysis.txt", "utf8");

          if (analysis_bookmarks_raw.length == 0) {
            self.allBookmarks = [];
          }

          var analysis_bookmarks_arr = analysis_bookmarks_raw.split("\n");
          var analysis_bookmarks = [];

          for (let i = 0; i < analysis_bookmarks_arr.length; i++) {
              
              var timestamp = Date.parse(analysis_bookmarks_arr[i].split("|")[2]);
              var dateObject = new Date(timestamp);

              var type = "";
              var final_diff = -1;
              var diff = Math.abs(Date.parse(new Date()) - dateObject);

              if ( diff < ( 1000 * 60 * 60 * 24 ) ) {
                type = "Days";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 * 60 * 24 ));
              }
              if ( diff < ( 1000 * 60 * 60 ) ) {
                type = "Hours";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 * 60 ));
              }
              if ( diff < ( 1000 * 60 ) ) {
                type = "Minutes";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 ));
              }
              if (diff < 1000) {
                type = "Seconds";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / 1000);
              }

              analysis_bookmarks.push({
                  title: analysis_bookmarks_arr[i].split("|")[0],
                  path: analysis_bookmarks_arr[i].split("|")[1],
                  saved_time: analysis_bookmarks_arr[i].split("|")[2],
                  last_modified: final_diff,
                  last_modified_type: type
              });
          }

          self.allBookmarks = analysis_bookmarks;

        } else if ( parent_dir == "Projects" ) {
          
          var projects_bookmarks_raw = fs.readFileSync("C:\\proj_MIL\\Bookmarks\\Projects.txt", "utf8");

          if (projects_bookmarks_raw.length == 0) {
            self.allBookmarks = [];
          }

          var projects_bookmarks_arr = projects_bookmarks_raw.split("\n");
          var projects_bookmarks = [];

          for (let i = 0; i < projects_bookmarks_arr.length; i++) {
            
              var timestamp = Date.parse(projects_bookmarks_arr[i].split("|")[2]);
              var dateObject = new Date(timestamp);

              var type = "";
              var final_diff = -1;
              var diff = Math.abs(Date.parse(new Date()) - dateObject);

              if ( diff < ( 1000 * 60 * 60 * 24 ) ) {
                type = "Days";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 * 60 * 24 ));
              }
              if ( diff < ( 1000 * 60 * 60 ) ) {
                type = "Hours";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 * 60 ));
              }
              if ( diff < ( 1000 * 60 ) ) {
                type = "Minutes";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / ( 1000 * 60 ));
              }
              if (diff < 1000) {
                type = "Seconds";
                final_diff = Math.ceil(Math.abs(Date.parse(new Date()) - dateObject) / 1000);
              }

              projects_bookmarks.push({
                  title: projects_bookmarks_arr[i].split("|")[0],
                  path: projects_bookmarks_arr[i].split("|")[1],
                  saved_time: projects_bookmarks_arr[i].split("|")[2],
                  last_modified: final_diff,
                  last_modified_type: type
              });        
          }

          self.allBookmarks = projects_bookmarks;

        }
      }
    },
    computed: {
      isDark() {
        return this.$store.getters.isDark;
      },
      search_str() {
        return this.$store.getters.get_search_str;
      }
    },
  };
</script>

<style scoped>
  .container {
    font-family: 'Merriweather', serif;
  }

  .custom-hover-class:hover {
    color: #b68c2f !important;
  }

  .dark_custom_heading {
    color: #B5B5C3 !important;
  }

  .our-delete-icon svg g [fill] {
    fill: #b68c2f !important;
  }

  .show-our-btn {
    display: inline-block !important;
  }

  .hide-our-btn {
    display: none !important;
  }
</style>