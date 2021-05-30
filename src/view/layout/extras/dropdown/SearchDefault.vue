<template>
<!-- <div active :class="{ 'input-icon': true, 'dark': isDark }">
        <input
          type="text"
          :class="{
            'form-control form-control-lg form-control-solid h-50px search-bar': true,
            'dark-search-bar': isDark,
          }"
          placeholder="Search..."
          v-model="search_str"
          v-on:focus="onOurFocus"
          v-on:blur="onOurBlur"
          id="generalSearch"
        />
        <span>
          <span class="svg-icon svg-icon-lg">
            <inline-svg src="media/search.svg" />
          </span>
        </span>
      </div> -->
  <div
    v-bind:class="{ 'quick-search-has-result': hasResult() }"
    class="quick-search quick-search-dropdown quick-search-result-compact"
    id="kt_quick_search_dropdown"
  >
    <form method="get" class="quick-search-form">
      <div
        class="input-group spinner-input spinner-sm spinner-brand spinner-right"
        v-bind:class="{ spinner: loading }"
      >
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="flaticon2-search-1"></i>
          </span>
        </div>
        <input
          type="text"
          class="form-control quick-search-input"
          placeholder="Search..."
          v-model="search_str"
        />
        <div class="input-group-append">
          <span class="input-group-text">
            <i
              class="quick-search-close"
              v-on:click="reset"
              v-bind:style="{ display: hasResult() ? 'flex' : '' }"
            ></i>
          </span>
        </div>
      </div>
    </form>

    <!-- <KTSearchResult v-bind:data="data"></KTSearchResult> -->
    <perfect-scrollbar
      class="aside-menu scroll"
      style="max-height: 50vh; position: relative;"
    >
      <div id="search_body" v-if="search_str.length > 0">
          <p style="color: #3f3f3f; margin-top: 5px;">Search in</p>

          <label class="checkbox" style="margin-top: 5px;">
                <input type="checkbox" name="Checkboxes1" v-model="FolderSearch" />
                <span style="margin-right: 10px;"></span>
                Folder Names
          </label>
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

          <label class="checkbox" style="margin-top: 5px;">
                <input type="checkbox" name="Checkboxes1" v-model="onlyParentDirSearch" />
                <span style="margin-right: 10px;"></span>
                Only {{ parentDir }} Search
          </label>

          <hr />

          <div v-if="search_str.length >= 2">

            <div v-if="FolderSearch">

              <!-- <KTSearchResult :searched_folders="searched_folders" :searched_files="searched_files" :searched_files_contents="searched_files_contents"></KTSearchResult> -->
              <div class="font-size-sm text-success font-weight-bolder text-uppercase mb-2" style="color: #b68c2f !important;">
                  Folders
              </div>

              <div v-for="(searched_folder, index) in searched_folders" :key="index" class="d-flex align-items-center flex-grow-1 mb-2"
                data-placement="right"
                data-container="body"
                data-boundary="window"
                v-b-tooltip.hover.right="searched_folder.folder_path">
                  <!-- <router-link
                :to="searched_folder.path"
                class="font-weight-bold text-dark text-hover-success"
              > -->
                  {{ searched_folder.name }}
                  <!-- </router-link> -->
              </div>

            </div>

            <div v-if="chapterNameSearch">

              <div class="font-size-sm text-success font-weight-bolder text-uppercase mb-2" style="color: #b68c2f !important;">
                  File
              </div>

              <div v-for="(search_file, search_files_index) in searched_files" :key="search_files_index" class="d-flex align-items-center flex-grow-1 mb-2" @click="filePath(search_file.path)"
                data-placement="right"
                data-container="body"
                data-boundary="window"
                v-b-tooltip.hover.right="search_file.file_path">
                  <!-- <router-link
                :to="search_file.path"
                class="font-weight-bold text-dark text-hover-success"
              > -->
                  {{ search_file.name }}
                  <!-- </router-link> -->
              </div>

            </div>


            <div v-if="chapterContentSearch">

              <div class="font-size-sm text-success font-weight-bolder text-uppercase mb-2" style="color: #b68c2f !important;">
                  File Content
              </div>

              <div v-for="(searched_files_content, searched_files_content_index) in searched_files_contents" :key="searched_files_content_index" class="d-flex align-items-center flex-grow-1 mb-2" @click="FileContentPath(searched_files_content.url)"
                data-placement="right"
                data-container="body"
                data-boundary="window"
                v-b-tooltip.hover.right="searched_files_content.content_path">
                  <!-- <router-link
                :to="searched_files_content.path"
                class="font-weight-bold text-dark text-hover-success"
              > -->
                  {{ searched_files_content.name }}
                  <!-- </router-link> -->
              </div>

            </div>


          </div>

      </div>
    </perfect-scrollbar>
  </div>
</template>

<style scoped>
.checkbox > input:checked ~ span {
  background-color: #b68c2f !important;
}

.menu-link {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

.dark-search-bar {
  background-color: #333333 !important;
  border: 0px !important;
  caret-color: #c2c2c2 !important;
  color: #c2c2c2 !important;
}

a {
  color: #b68c2f !important;
}
</style>

<script>
var fs = require('fs');
var CryptoJS = require("crypto-js");
import KTSearchResult from "@/view/layout/extras/dropdown/SearchResult.vue";

export default {
  name: "KTSearchDefault",
  components: { KTSearchResult },
  data() {
    return {
      data: [],
      loading: false,
      search_str: "",
      FolderSearch: true,
      chapterNameSearch: false,
      chapterContentSearch: false,
      onlyParentDirSearch: false,
      searched_folders: [],
      searched_files: [],
      searched_files_contents: [],
      search_in_focus: false,
      // dummy search result data
      result: [
        {
          text: "Documents",
          type: 0
        },
        {
          svg: process.env.BASE_URL + "media/svg/files/doc.svg",
          text: "AirPlus Requirements",
          desc: "by Grog John",
          type: 1
        },
        {
          svg: process.env.BASE_URL + "media/svg/files/pdf.svg",
          text: "TechNav Documentation",
          desc: "by Mary Broun",
          type: 1
        },
        {
          svg: process.env.BASE_URL + "media/svg/files/zip.svg",
          text: "All Framework Docs",
          desc: "by Nick Stone",
          type: 1
        },
        {
          svg: process.env.BASE_URL + "media/svg/files/xml.svg",
          text: "AirPlus Requirements",
          desc: "by Tim Hardy",
          type: 1
        },
        {
          text: "Customers",
          type: 0
        },
        {
          img: process.env.BASE_URL + "media/users/300_12.jpg",
          text: "Jimmy Curry",
          desc: "Software Developer",
          type: 1
        },
        {
          img: process.env.BASE_URL + "media/users/300_13.jpg",
          text: "Milena Gibson",
          desc: "UI Designer",
          type: 1
        },
        {
          img: process.env.BASE_URL + "media/users/300_14.jpg",
          text: "Stefan JohnStefan",
          desc: "Marketing Manager",
          type: 1
        },
        {
          img: process.env.BASE_URL + "media/users/300_15.jpg",
          text: "Anna Strong",
          desc: "Software Developer",
          type: 1
        },
        {
          text: "Files",
          type: 0
        },
        {
          icon: "flaticon2-box text-danger",
          text: "2 New items submitted",
          desc: "Marketing Manager",
          type: 1
        },
        {
          icon: "flaticon-psd text-brand",
          text: "79 PSD files generated",
          desc: "by Grog John",
          type: 1
        },
        {
          icon: "flaticon2-supermarket text-warning",
          text: "$2900 worth products sold",
          desc: "Total 234 items",
          type: 1
        },
        {
          icon: "flaticon-safe-shield-protection text-info",
          text: "4 New items submitted",
          desc: "Marketing Manager",
          type: 1
        }
      ]
    };
  },
  mounted() {

    this.parentDir = this.$store.getters.getParentDir;
    // console.log("Parent directory received " + this.parentDir);
    const dirTree = require("directory-tree");
    const dirPath = dirTree("C:\\proj_MIL\\" + this.parentDir);
    this.parentDirContent = dirPath.children;

  },
  methods: {
    refresh_search() {
      // if (event.target.value.length > 2) {
      //   this.loading = true;
      //   // simulate getting search result
      //   setTimeout(() => {
      //     this.data = this.result;
      //     this.loading = false;
      //   }, 2000);
      // }

      if ( this.onlyParentDirSearch ) {

        const dirTree = require("directory-tree");
        const dirPath = dirTree("C:\\proj_MIL\\" + this.parentDir);
        this.parentDirContent = dirPath.children;
      } else {
        const dirTree = require("directory-tree");
        const dirPath = dirTree("C:\\proj_MIL\\Reports");
        this.parentDirContent = dirPath.children;

        const dirPath2 = dirTree("C:\\proj_MIL\\Analysis");
        this.parentDirContent.push(dirPath2.children);

        const dirPath3 = dirTree("C:\\proj_MIL\\Projects");
        this.parentDirContent.push(dirPath3.children);
      }

      var self = this;
      self.data = [];
      self.searched_folders = [];
      self.searched_files = [];
      self.searched_files_contents = [];
      var local_search_str = self.search_str.toLowerCase();
      // folder search
      if (self.FolderSearch == true) {
          if (self.search_str.length > 2) {
              // LEVEL 1
              self.parentDirContent.forEach((folder_obj) => {
                  if (folder_obj.type == "directory") {
                      if (folder_obj.name.toLowerCase().indexOf(local_search_str) >= 0) {
                          // console.log("folders 1");
                          // console.log(folder_obj)
                          self.searched_folders.push({
                              name: folder_obj.name,
                              path: folder_obj.path,
                              folder_path: folder_obj.name
                          });
                      }
                  }
                  // LEVEL 2
                  if (folder_obj.type == "directory") {
                      folder_obj.children.forEach((folder_obj2) => {
                          if (folder_obj2.type == "directory") {
                              if (folder_obj2.name.toLowerCase().indexOf(local_search_str) >= 0) {
                                  // console.log("folders 2");
                                  // console.log(folder_obj)
                                  self.searched_folders.push({
                                      name: folder_obj2.name,
                                      path: folder_obj2.path,
                                      folder_path: folder_obj.name + " | " + folder_obj2.name
                                  });
                              }
                          }
                          // LEVEL 3

                          if (folder_obj2.type == "directory") {
                              folder_obj2.children.forEach((folder_obj3) => {
                                  if (folder_obj3.type == "directory") {
                                      if (folder_obj3.name.toLowerCase().indexOf(local_search_str) >= 0) {
                                          // console.log("folders 3");
                                          // console.log(folder_obj)
                                          self.searched_folders.push({
                                              name: folder_obj3.name,
                                              path: folder_obj3.path,
                                              folder_path: folder_obj.name + " | " + folder_obj2.name + " | " + folder_obj3.name
                                          });
                                      }
                                  }
                              });
                          }
                      });
                  }
              });
          }
      }
      // file search\
      if (self.chapterNameSearch == true) {
          // LEVEL 1 File
          if (self.search_str.length > 2) {
              self.parentDirContent.forEach((File_obj) => {
                  if (File_obj.type == "file") {
                      if (File_obj.name.toLowerCase().indexOf(local_search_str) >= 0) {
                          self.searched_files.push({
                              name: File_obj.name,
                              path: File_obj.path,
                              file_path: File_obj.name
                          });
                      }
                  }
                  // LEVEL 2 File
                  if (File_obj.type == "directory") {
                      File_obj.children.forEach((File_obj2) => {
                          if (File_obj2.type == "file") {
                              if (File_obj2.name.toLowerCase().indexOf(local_search_str) >= 0) {
                                  // console.log(File_obj2.name.toLowerCase().indexOf(local_search_str));
                                  // console.log(folder_obj)
                                  self.searched_files.push({
                                      name: File_obj2.name,
                                      path: File_obj2.path,
                                      file_path: File_obj.name + " | " + File_obj2.name
                                  });
                              }
                          }

                          // LEVEL 3 File

                          if (File_obj2.type == "directory") {
                              File_obj2.children.forEach((File_obj3) => {
                                  if (File_obj3.type == "file") {
                                      if (File_obj3.name.toLowerCase().indexOf(local_search_str) >= 0) {
                                          // console.log(File_obj3.name.toLowerCase().indexOf(local_search_str));
                                          self.searched_files.push({
                                              name: File_obj3.name,
                                              path: File_obj3.path,
                                              file_path: File_obj.name + " | " + File_obj2.name + " | " + File_obj3.name
                                          });
                                      }
                                  }
                              });
                          }
                      });
                  }
              });
          }
      }
      // file content search
      if (self.chapterContentSearch == true) {
          if (self.search_str.length > 2) {
              self.searched_files_contents = [];
              self.parentDirContent.forEach((content) => {
                  // LEVEL 1
                  if (content.type == "file") {
                      var full_file_url = content.path;

                      fs.readFile(full_file_url, "utf-8", (err, data) => {
                          if (err) {
                              alert("An error ocurred reading the file :" + err.message);
                              return;
                          }

                          var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");
                          var originalText = bytes.toString(CryptoJS.enc.Utf8);

                          if (originalText.toLowerCase().indexOf(local_search_str) >= 0) {
                              self.searched_files_contents.push({
                                  name: content.name,
                                  url: content.path,
                                  content_path: content.name
                              });
                          }
                      });
                  }
                  // LEVEL 2
                  if (content.type == "directory") {
                      content.children.forEach((content2) => {
                          if (content2.type == "file") {
                              var full_file_url = content2.path;

                              fs.readFile(full_file_url, "utf-8", (err, data) => {
                                  if (err) {
                                      alert("An error ocurred reading the file :" + err.message);
                                      return;
                                  }

                                  var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");
                                  var originalText = bytes.toString(CryptoJS.enc.Utf8);

                                  if (originalText.toLowerCase().indexOf(local_search_str) >= 0) {
                                      self.searched_files_contents.push({
                                          name: content2.name,
                                          url: content2.path,
                                          content_path: content.name + " | " + content2.name
                                      });
                                  }
                              });
                          }
                          // LEVEL 3
                          if (content2.type == "directory") {
                              content2.children.forEach((content3) => {
                                  if (content3.type == "file") {
                                      var full_file_url = content3.path;

                                      fs.readFile(full_file_url, "utf-8", (err, data) => {
                                          if (err) {
                                              alert("An error ocurred reading the file :" + err.message);
                                              return;
                                          }

                                          var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");
                                          var originalText = bytes.toString(CryptoJS.enc.Utf8);

                                          if (originalText.toLowerCase().indexOf(local_search_str) >= 0) {
                                              self.searched_files_contents.push({
                                                  name: content3.name,
                                                  url: content3.path,
                                                  content_path: content.name + " | " + content2.name + " | " + content3.name
                                              });
                                          }
                                      });
                                  }

                                  // LEVEL 4
                                  if (content3.type == "directory") {
                                      content3.children.forEach((content4) => {
                                          if (content4.type == "file") {
                                              var full_file_url = content4.path;

                                              fs.readFile(full_file_url, "utf-8", (err, data) => {
                                                  if (err) {
                                                      alert("An error ocurred reading the file :" + err.message);
                                                      return;
                                                  }

                                                  var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");
                                                  var originalText = bytes.toString(CryptoJS.enc.Utf8);

                                                  if (originalText.toLowerCase().indexOf(local_search_str) >= 0) {
                                                      self.searched_files_contents.push({
                                                          name: content4.name,
                                                          url: content4.path,
                                                          content_path: content.name + " | " + content2.name + " | " + content3.name + " | " + content4.name
                                                      });
                                                  }
                                              });
                                          }

                                          // LEVEL 5
                                      });
                                  }
                              });
                          }
                      });
                  }
              });
          }
      }
    },
    filePath(search_file) {
        this.$store.commit("setHtmPath", search_file);
        // this.$store.commit("setFileName", fileName);
    },
    FileContentPath(searched_files_content) {
        // console.log(searched_files_content)
        this.$store.commit("setHtmPath", searched_files_content);
    },
    /**
     * Check if the data has result
     * @returns {boolean}
     */
    hasResult() {
      return this.data.length || false;
    },
    /**
     * Reset search data
     */
    reset() {
      this.data = [];
    }
  },
  watch: {
    search_str() {
      this.refresh_search();
    },
    FolderSearch() {
      this.refresh_search();
    },
    chapterNameSearch() {
      this.refresh_search();
    },
    chapterContentSearch() {
      this.refresh_search();
    },
    onlyParentDirSearch() {
      this.refresh_search();
    }
  },
};
</script>
