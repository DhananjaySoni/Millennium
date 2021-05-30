<template>
  <div :class="{'aside-primary d-flex flex-column align-items-center flex-row-auto':true, 'aside-dark-border': isDark}">
    <ul class="nav flex-column" role="tablist">
      <!--begin::Item-->

      <!--end::Item-->
      <!--begin::Item-->
      <li
        class="nav-item mb-3"
        data-placement="right"
        data-container="body"
        data-boundary="window"
        v-b-tooltip.hover.right="'Go to Home'"
      >
        <router-link to="/landing"
          :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
        >
          <span class="svg-icon svg-icon-xl">
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Home/Home.svg" />
            <!--end::Svg Icon-->
          </span>
        </router-link>
      </li>
      <li
        class="nav-item mb-3"
        data-placement="right"
        data-container="body"
        data-boundary="window"
        v-b-tooltip.hover.right="'Get Update'"
        v-if="showErrorStatus"
      >
        <a
          href="#"
          :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
          data-toggle="tab"
          data-tab="1"
          @click="openErrorModel()"
        >
          <span class="svg-icon svg-icon-xl">
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
            <!--end::Svg Icon-->
          </span>
        </a>
      </li>
      <li
        class="nav-item mb-3"
        data-placement="right"
        data-container="body"
        data-boundary="window"
        v-b-tooltip.hover.right="'Get Update'"
      >
        <a
          href="#"
          :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
          data-toggle="tab"
          data-tab="1"
          @click="getUpdate()"
        >
          <span class="svg-icon svg-icon-xl">
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Files/Import.svg" />
            <!--end::Svg Icon-->
          </span>
        </a>
      </li>
      <li
        class="nav-item mb-3"
        data-placement="right"
        data-container="body"
        data-boundary="window"
        v-b-tooltip.hover.right="'Dark Mode'"
      >
        <a
          href="#"
          :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
          data-toggle="tab"
          data-tab="1"
          @click="darkMode()"
        >
          <span class="svg-icon svg-icon-xl">
            <!--begin::Svg Icon-->
            <inline-svg src="media/darkmode.svg" />
            <!--end::Svg Icon-->
          </span>
        </a>
      </li>
      <li
        class="nav-item mb-3"
        data-placement="right"
        data-container="body"
        data-boundary="window"
        v-b-tooltip.hover.right="'Exit'"
        @click="onExit"
      >
        <a
          href="#"
          :class="{'nav-link btn btn-icon btn-clean btn-lg':true, 'btn-clean-dark': isDark }"
        >
          <span class="svg-icon svg-icon-xl" style="color:orange">
            <!--begin::Svg Icon-->
            <inline-svg src="media/exit.svg" />
            <!--end::Svg Icon-->
          </span>
        </a>
      </li>
    </ul>
    
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
const { remote } = require('electron');

var fs = require('fs');
import Swal from 'sweetalert2'
import ApiService from "@/core/services/api.service";
var path = require('path');
const https = require("https");
const dns = require('dns');

export default {
  name: "KTQuickUser",
  data() {
    return {
      showErrorStatus: false,
      w: remote.getCurrentWindow(), 
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
    var getErrors = this.$store.getters.getErrors;
    if ( getErrors == null || Object.keys(getErrors).length == 0 ) {
      this.showErrorStatus = false;
    } else {
      this.showErrorStatus = true;
    }
  },
  methods: {
    onExit() {
      const {app} = remote;
      app.quit();
      // console.log("close called");
      // console.log("hey");
      this.w.close()
      // var window = remote.getCurrentWindow();
      window.close();
    },
    darkMode() {
      this.$store.commit("toggleDarkMode");
    },
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
    openErrorModel() {
      // console.log("licence lapsed");
        Swal.fire({
          title: 'Your licence is now Lapsed!',
          html: "To renew the streamlined version, <br>call on: 0291-2751422. <br>You can access your files but some funcionalities will be disabled. ",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'OK',
          confirmButtonText:'Renew Now',
          customClass: {
            popup: 'our_popup_16',
            confirmButton: 'our_confirmButton_16',
            cancelButton: 'our_cancelButton_16',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            require("electron").shell.openExternal("https://www.payumoney.com/paybypayumoney/#/629C4A32B1881BE2AF56B5C28C0C2D9D");
          }
        });

        document.getElementsByClassName("our_popup_16")[0].style.borderRadius = "20px";
        // document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
        // document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
        // document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

        document.getElementsByClassName("our_confirmButton_16")[0].style.backgroundColor = "#ffffff";
        document.getElementsByClassName("our_confirmButton_16")[0].style.border = "1px solid #B68C2F";
        document.getElementsByClassName("our_confirmButton_16")[0].style.padding = "8px 24px";
        document.getElementsByClassName("our_confirmButton_16")[0].style.borderRadius = "2px";
        document.getElementsByClassName("our_confirmButton_16")[0].style.color = "black";
        
        document.getElementsByClassName("our_cancelButton_16")[0].style.backgroundColor = "#ffffff";
        document.getElementsByClassName("our_cancelButton_16")[0].style.border = "1px solid #B68C2F";
        document.getElementsByClassName("our_cancelButton_16")[0].style.padding = "8px 24px";
        document.getElementsByClassName("our_cancelButton_16")[0].style.borderRadius = "2px";
        document.getElementsByClassName("our_cancelButton_16")[0].style.color = "black";
    },
    create_folder(path) {
      fs.mkdirSync(path);
    },
    create_files_in_folder(parent_folder_path, files_arr) {
      var local_updates_to_files = [];

      files_arr.forEach(api_file => {

        var request = https.get( api_file.file, function (response) {
          
          // console.log( path.join(dirpath, parent_folder_path.name) + "\\" + api_file.file_name + ".deed" );

          if (response.statusCode === 200) {
            
              var file = fs.createWriteStream( parent_folder_path + "\\" + api_file.file_name );
              response.pipe(file);
            }
            request.setTimeout(12000, function () {
              request.abort();
            });

        });

        local_updates_to_files.push({
          "name": api_file.file_name
        });

      });

      return local_updates_to_files;
    },
    create_file_in_folder(full_file_path, file_url) {
      var request = https.get( file_url, function (response) {
          
        // console.log( path.join(dirpath, parent_folder_path.name) + "\\" + api_file.file_name + ".deed" );

        if (response.statusCode === 200) {
          
          var file = fs.createWriteStream( full_file_path );
            response.pipe(file);
          }
          request.setTimeout(12000, function () {
            request.abort();
          });

      });
    },
    getUpdate() {
      var self = this;

      var getErrors = self.$store.getters.getErrors;
      if ( getErrors == null || Object.keys(getErrors).length == 0 ) {
        dns.resolve("www.google.com", function(err, addr) {
          if (err) {
            // console.log("google error");
            Swal.fire({
              title: 'You are offline!',
              html: 'This action requires the Internet Connection.',
              icon: 'warning',
              customClass: {
                  popup: 'our_popup_15',
                  confirmButton: 'our_confirmButton_15',
              }
            });

            document.getElementsByClassName("our_popup_15")[0].style.borderRadius = "20px";
            // document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
            // document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
            // document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

            document.getElementsByClassName("our_confirmButton_15")[0].style.backgroundColor = "#ffffff";
            document.getElementsByClassName("our_confirmButton_15")[0].style.border = "1px solid #B68C2F";
            document.getElementsByClassName("our_confirmButton_15")[0].style.padding = "8px 24px";
            document.getElementsByClassName("our_confirmButton_15")[0].style.borderRadius = "2px";
            document.getElementsByClassName("our_confirmButton_15")[0].style.color = "black";

          } else {
            // console.log("google success");
            var url = "";
            ApiService.get(url).then(({
              data
            }) => {
              if (data.status != "error") {
                const dirTree = require("directory-tree");
                var dirpath = "C:\\proj_MIL\\"
                const dirArray = dirTree(dirpath);
                var local_file_system = dirArray.children;
                // console.log(local_file_system)
                var local_updates_tracker = [];

                var api_file_system = data;

                var local_updates_to_folders = [];
                
                // loop through api folders
                api_file_system.forEach(api_folder => {
                  
                  var counter = 0;
                  var outer_local_folder = null;
                  // match if this api folder is present in local
                  // local_file_system.forEach(local_folder => {
                  for (var a=0; a<local_file_system.length; a++) {
                    var local_folder = local_file_system[a];
                    // console.log(api_folder.name + " | " + local_folder.name);
                    if ( api_folder.name == local_folder.name ) {
                      counter++;
                      outer_local_folder = local_folder;
                      // console.log(outer_local_folder);
                      // console.log(local_folder);
                    }

                  // });
                  }

                  // console.log(counter);
                  // console.log(outer_local_folder);

                  // api folder not present in local
                  if (counter == 0) {

                    // create folder in local filesystem
                    var api_to_local_folder_path = path.join(dirpath, api_folder.name);
                    self.create_folder(api_to_local_folder_path);

                    // also download files of that folder
                    var local_updates_to_files = [];
                    local_updates_to_files = self.create_files_in_folder(dirpath + "\\" + api_folder.name, api_folder.files);

                    // and level 2 folders
                    var local_updates_to_level_2_folders = [];
                    api_folder.folders.forEach(api_level_2_folder => {

                      // create level 2 folder folder
                      var api_to_local_level_2_folder_path = path.join(dirpath, api_folder.name) + "//" + api_level_2_folder.name;
                      self.create_folder(api_to_local_level_2_folder_path);

                      // also download files of that folder
                      var local_updates_to_level_2_files = [];
                      local_updates_to_level_2_files = self.create_files_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_level_2_folder.name, api_level_2_folder.files);

                      // and level 3 folders
                      var local_updates_to_level_3_folders = [];
                      api_level_2_folder.folders.forEach(api_level_3_folder => {

                        // create level 3 folder folder
                        var api_to_local_level_3_folder_path = path.join(dirpath, api_folder.name) + "\\" + api_level_2_folder.name + "\\" + api_level_3_folder.name;
                        self.create_folder(api_to_local_level_3_folder_path);

                        // also download files of that folder
                        var local_updates_to_level_3_files = [];
                        local_updates_to_level_3_files = self.create_files_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_level_2_folder.name + "\\" + api_level_3_folder.name, api_level_3_folder.files);
                        

                        local_updates_to_level_3_folders.push({
                          'name': api_level_3_folder.name,
                          'level_3_files': local_updates_to_level_3_files
                        });

                      });

                      if ( local_updates_to_level_2_files.length != 0 || local_updates_to_level_3_folders.length != 0 ) {
                        local_updates_to_level_2_folders.push({
                          'name': api_level_2_folder.name,
                          'level_2_files': local_updates_to_level_2_files,
                          'level_2_folders': local_updates_to_level_3_folders
                        });
                      }

                    });
                    
                    if ( local_updates_to_files.length != 0 || local_updates_to_level_2_folders.length != 0 ) {
                      local_updates_to_folders.push({
                        'name': api_folder.name,
                        'files': local_updates_to_files,
                        'level_2_folders': local_updates_to_level_2_folders
                      });
                    }

                  }
                  // api folder present in local
                  else {

                    // then read local folder files, to check if there is any missing from api
                    var local_files = [];
                    var local_level_2_folders = [];
                    
                    outer_local_folder.children.forEach(local_level_2_ff => {
                      if ( local_level_2_ff.type=='file' ) {
                        local_files.push(local_level_2_ff);
                      } else {
                        local_level_2_folders.push(local_level_2_ff);
                      }
                    });

                    // console.log(local_level_2_folders);

                    // check if files of that folder has any updates
                    var local_updates_to_files = [];
                    api_folder.files.forEach( api_file => {

                      var counter2 = 0;

                      local_files.forEach( local_file => {

                        if ( local_file.name == api_file.file_name) {
                          counter2++;
                        }

                      });

                      // new file is there in api
                      if ( counter2 == 0 ) {

                        // download it to local
                        // var request2 = https.get( api_file.file, function (response) {
                          

                        //       if (response.statusCode === 200) {

                        //         var file = fs.createWriteStream( path.join(dirpath, api_folder.name) + "\\" + api_file.file_name);
                        //         response.pipe(file);

                        //       }
                        //       request2.setTimeout(12000, function () {
                        //         request2.abort();
                        //       });

                        // });
                        self.create_file_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_file.file_name, api_file.file);

                        local_updates_to_files.push({
                          "name": api_file.file_name
                        });

                      }
                      // otherwise it's fine! Do Nothing

                    });

                    // check if level 2 folders of that folder has any updates
                    var local_updates_to_level_2_folders = [];
                    // console.log(local_level_2_folders);
                    // api_folder.folders.forEach( api_level_2_folder => {
                    for (var i = 0 ; i < api_folder.folders.length ; i++ ) {
                      var api_level_2_folder = api_folder.folders[i];
                      var counter3 = 0;
                      // console.log(local_level_2_folders);
                      var outer_local_level_2_folder = null;
                      local_level_2_folders.forEach( local_level_2_folder => {

                        if ( local_level_2_folder.name == api_level_2_folder.name ) {
                          counter3++;
                          outer_local_level_2_folder = local_level_2_folder;
                        }

                      });

                      // api level 2 folder not present in local
                      if ( counter3 == 0 ) {

                        // create level 2 folder folder
                        var api_to_local_level_2_folder_path = path.join(dirpath, api_folder.name) + "//" + api_level_2_folder.name;
                        self.create_folder(api_to_local_level_2_folder_path);

                        // also download files of that folder
                        var local_updates_to_level_2_files = [];
                        local_updates_to_level_2_files = self.create_files_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_level_2_folder.name, api_level_2_folder.files);

                        // and level 3 folders
                        var local_updates_to_level_3_folders = [];
                        api_level_2_folder.folders.forEach(api_level_3_folder => {

                          // create level 3 folder folder
                          var api_to_local_level_3_folder_path = path.join(dirpath, api_folder.name) + "\\" + api_level_2_folder.name + "\\" + api_level_3_folder.name;
                          self.create_folder(api_to_local_level_3_folder_path);

                          // also download files of that folder
                          var local_updates_to_level_3_files = [];
                          local_updates_to_level_3_files = self.create_files_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_level_2_folder.name + "\\" + api_level_3_folder.name, api_level_3_folder.files);
                          

                          local_updates_to_level_3_folders.push({
                            'name': api_level_3_folder.name,
                            'level_3_files': local_updates_to_level_3_files
                          });

                        });

                        if ( local_updates_to_level_2_files.length != 0 || local_updates_to_level_3_folders.length != 0 ) {
                          local_updates_to_level_2_folders.push({
                            'name': api_level_2_folder.name,
                            'level_2_files': local_updates_to_level_2_files,
                            'level_2_folders': local_updates_to_level_3_folders
                          });
                        }

                        // local_updates_to_level_2_folders.push({
                        //   'name': api_level_2_folder.name,
                        //   'level_2_files': local_updates_to_level_2_files
                        // });

                      }

                      // api level 2 folder folder present in local
                      else {

                        // then read local folder files, to check if there is any missing from api
                        var local_level_2_files = [];
                        var local_level_3_folders = [];

                        outer_local_level_2_folder.children.forEach(local_level_2_sub_ff => {
                          if(local_level_2_sub_ff.type=="file") {
                            local_level_2_files.push(local_level_2_sub_ff);
                          } else {
                            local_level_3_folders.push(local_level_2_sub_ff);
                          }
                        });

                        // check if level 2 files of that folder has any updates
                        var local_updates_to_level_2_files = [];
                        // api_level_2_folder.files.forEach( api_level_2_file => {
                        for ( var j = 0 ; j < api_level_2_folder.files.length ; j++ ) {
                          var api_level_2_file = api_level_2_folder.files[j];

                          var counter4 = 0;

                          // local_level_2_files.forEach( local_level_2_file => {
                          for ( var k = 0 ; k < local_level_2_files.length ; k++ ) {
                            var local_level_2_file = local_level_2_files[k];
                            if( local_level_2_file.name == api_level_2_file.file_name) {
                              counter4++;
                            }
                          }
                          // });

                          if ( counter4 == 0 ) {

                            // download it to local
                            // var request2 = https.get( api_level_2_file.file, function (response) {


                            //       if (response.statusCode === 200) {

                            //         var file = fs.createWriteStream( path.join(dirpath, api_folder.name) + "\\" + api_level_2_folder.name + "\\" + api_level_2_file.file_name);
                            //         response.pipe(file);

                            //       }
                            //       request2.setTimeout(12000, function () {
                            //         request2.abort();
                            //       });

                            // });
                            self.create_file_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_level_2_folder.name + "\\" + api_level_2_file.file_name, api_level_2_file.file);

                            local_updates_to_level_2_files.push({
                              "name": api_level_2_file.file_name
                            });

                          }
                          // otherwise it's fine! Do Nothing
                          

                        // });
                        }

                        // check if level 3 folders of that folder has any updates
                        var local_updates_to_level_3_folders = [];
                        // api_level_2_folder.folders.forEach( api_level_3_folder => {
                        for ( var j = 0 ; j < api_level_2_folder.folders.length ; j++ ) {
                          var api_level_3_folder = api_level_2_folder.folders[j];

                          var counter3 = 0;
                          // console.log(local_level_3_folders);
                          var outer_local_level_3_folder = null;
                          local_level_3_folders.forEach( local_level_3_folder => {

                            if ( local_level_3_folder.name == api_level_3_folder.name ) {
                              counter3++;
                              outer_local_level_3_folder = local_level_3_folder;
                            }

                          });

                          // api level 3 folder not present in local
                          if ( counter3 == 0 ) {

                            // create level 3 folder folder
                            var api_to_local_level_3_folder_path = path.join(dirpath, api_folder.name) + "\\" + api_level_2_folder.name + "\\" + api_level_3_folder.name;
                            self.create_folder(api_to_local_level_3_folder_path);

                            // also download files of that folder
                            var local_updates_to_level_3_files = [];
                            local_updates_to_level_3_files = self.create_files_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_level_2_folder.name + "\\" + api_level_3_folder.name, api_level_3_folder.files);

                            local_updates_to_level_3_folders.push({
                              'name': api_level_3_folder.name,
                              'level_3_files': local_updates_to_level_3_files
                            });

                          }

                          // api level 3 folder folder present in local
                          else {

                            // then read local folder files, to check if there is any missing from api
                            var local_level_3_files = [];
                            var local_level_4_folders = [];
                                            
                            outer_local_level_3_folder.children.forEach(local_level_3_sub_ff => {
                              if(local_level_3_sub_ff.type=="file") {
                                local_level_3_files.push(local_level_3_sub_ff);
                              } else {
                                local_level_4_folders.push(local_level_3_sub_ff);
                              }
                            });

                            // check if level 3 files of that folder has any updates
                            var local_updates_to_level_3_files = [];
                            api_level_3_folder.files.forEach( api_level_3_file => {

                              var counter4 = 0;

                              local_level_3_files.forEach( local_level_3_file => {
                                if( local_level_3_file.name == api_level_3_file.file_name) {
                                  counter4++;
                                }
                              });

                              if ( counter4 == 0 ) {

                                // download it to local
                                // var request2 = https.get( api_level_3_file.file, function (response) {


                                //       if (response.statusCode === 200) {

                                //         var file = fs.createWriteStream( path.join(dirpath, api_folder.name) + "\\" + api_level_3_folder.name + "\\" + api_level_3_file.file_name);
                                //         response.pipe(file);

                                //       }
                                //       request2.setTimeout(12000, function () {
                                //         request2.abort();
                                //       });

                                // });
                                self.create_file_in_folder(dirpath + "\\" + api_folder.name + "\\" + api_level_2_folder.name + "\\" + api_level_3_folder.name + "\\" + api_level_3_file.file_name, api_level_3_file.file);

                                local_updates_to_level_3_files.push({
                                  "name": api_level_3_file.file_name
                                });

                              }
                              // otherwise it's fine! Do Nothing
                              

                            });

                            // if ( local_updates_to_level_2_files.length != 0 ) {
                            //   local_updates_to_level_2_folders.push({
                            //     'name': api_level_2_folder.name,
                            //     'level_2_files': local_updates_to_level_2_files,
                            //     'level_3_folders': local_updates_to_level_3_folders
                            //   });
                            // }

                          }


                        // });
                        }

                        if ( local_updates_to_level_2_files.length != 0 || local_updates_to_level_3_folders.length != 0 ) {  
                          local_updates_to_folders.push({
                            'name': api_level_2_folder.name,
                            'level_2_files': local_updates_to_level_2_files,
                            'level_3_folders': local_updates_to_level_3_folders
                          });
                        }

                      }


                    // });
                    }
                    
                    if ( local_updates_to_files.length != 0 || local_updates_to_level_2_folders.length != 0 ) {  
                      local_updates_to_folders.push({
                        'name': api_folder.name,
                        'files': local_updates_to_files,
                        'level_2_folders': local_updates_to_level_2_folders
                      });
                    }

                  }

                });

                // console.log(local_updates_to_folders);
                local_updates_tracker = local_updates_to_folders;

                try {

                  var html_text = "";

                  // html_text += "<ul style=\"text-align: left;\">";


                  // local_updates_tracker.forEach(local_update_to_folder => {
                  //   html_text += "<li style=\"margin-bottom: 10px\"><b>" + local_update_to_folder.name + "</b><ul style=\"margin-left: 10px\">";

                  //   local_update_to_folder.files.forEach(file => {
                  //     html_text += "<li style=\"margin-top: 7px;\">" + file.name + "</li>"
                  //   });

                  //   local_update_to_folder.level_2_folders.forEach(level_2_folder => {
                  //     html_text += "<li style=\"margin-top: 7px;\"><b>" + level_2_folder.name + "</b><ul style=\"margin-left: 20px\">"

                  //     level_2_folder.level_2_files.forEach(level_2_file => {
                  //       html_text += "<li style=\"margin-top: 7px; list-style-type: none\">" + level_2_file.name + "</li>"
                  //     });

                  //     html_text += "</ul></li>";
                  //   });

                  //   html_text += "</ul></li>";
                  // });

                  // html_text += "</ul>";

                  var final_html = "";

                  if (local_updates_tracker.length > 0) {
                    final_html = "files Updated Successfully!";
                  } else {
                    final_html = "files are already Up to Date";
                  }

                  Swal.fire({
                    html: final_html,
                    icon: "success",
                    customClass: {
                      popup: 'our_popup_18',
                      confirmButton: 'our_confirmButton_18',
                    }
                  }).then((result) => {
                    if ( local_updates_tracker.length > 0 ) {
                      location.reload();
                    }
                  });

                  document.getElementsByClassName("our_popup_18")[0].style.borderRadius = "20px";
                  // document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
                  // document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
                  // document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

                  document.getElementsByClassName("our_confirmButton_18")[0].style.backgroundColor = "#ffffff";
                  document.getElementsByClassName("our_confirmButton_18")[0].style.border = "1px solid #B68C2F";
                  document.getElementsByClassName("our_confirmButton_18")[0].style.padding = "8px 24px";
                  document.getElementsByClassName("our_confirmButton_18")[0].style.borderRadius = "2px";
                  document.getElementsByClassName("our_confirmButton_18")[0].style.color = "black";

                } catch (err) {
                  // console.error(err);
                }
              }
            });

          }
        });

      } else {
        // console.log("licence lapsed");
        Swal.fire({
          title: 'Your licence is now Lapsed!',
          html: "To renew the streamlined version, <br>call on: 0291-2751422. <br>You can access your files but some funcionalities will be disabled. ",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'OK',
          confirmButtonText:'Renew Now',
          customClass: {
            popup: 'our_popup_17',
            confirmButton: 'our_confirmButton_17',
            cancelButton: 'our_cancelButton_17',
          }
        }).then((result) => {
          
        });

        document.getElementsByClassName("our_popup_17")[0].style.borderRadius = "20px";
        // document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
        // document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
        // document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

        document.getElementsByClassName("our_confirmButton_17")[0].style.backgroundColor = "#ffffff";
        document.getElementsByClassName("our_confirmButton_17")[0].style.border = "1px solid #B68C2F";
        document.getElementsByClassName("our_confirmButton_17")[0].style.padding = "8px 24px";
        document.getElementsByClassName("our_confirmButton_17")[0].style.borderRadius = "2px";
        document.getElementsByClassName("our_confirmButton_17")[0].style.color = "black";
        
        document.getElementsByClassName("our_cancelButton_17")[0].style.backgroundColor = "#ffffff";
        document.getElementsByClassName("our_cancelButton_17")[0].style.border = "1px solid #B68C2F";
        document.getElementsByClassName("our_cancelButton_17")[0].style.padding = "8px 24px";
        document.getElementsByClassName("our_cancelButton_17")[0].style.borderRadius = "2px";
        document.getElementsByClassName("our_cancelButton_17")[0].style.color = "black";

      }
    }
  },
  computed: {
   isDark() {
      return this.$store.getters.isDark;
    },
  }
};
</script>
