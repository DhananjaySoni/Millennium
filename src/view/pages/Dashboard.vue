<template>
  <div class="dashboard-container">
    <div id="notesModal">
      <b-modal id="modalNote" size="lg" hide-footer hide-header ref="modalNote">
        <!-- <form> -->
          <div class="row">
            <div class="col-12" style=" margin-bottom: 10px;">
              <span style="font-size: 22px;"> Create Note </span>
            </div>
            <div class="col-8">
              <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Title </label>
              <br>
              <input
                type="text"
                name="notes"
                id="noteInput"
                class="form-control"
                placeholder="Enter Note Title"
                style="border-radius: 3px; width: 100%; display: inline;"
                v-model="noteHeading"
                required
              />
              <p v-if="createNoteTitleRequired" style="color: red; padding: 5px; font-size: 12px;"> Title is required </p>
            </div>
            <div class="col-12" style="margin-bottom: 20px;"> 
              <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Content </label>
              <br>
              <textarea id="our-textarea" class="form-control" v-model="ourNoteContent" rows="10"></textarea>
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
            <div class="col-2" style="">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="createNote">Save</a>
            </div>
            <div class="col-2" style="">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="cancelNote">
                <!-- <span class="svg-icon svg-icon-primary svg-icon-2x our-delete-icon" style="line-height: 37px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"/>
                        <path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>
                        <path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                    </g>
                </svg></span> -->
                Cancel
              </a>
            </div>
          </div>
        <!-- </form> -->
      </b-modal>
    </div>
    <div
      :class="{
        'card card-custom gutter-b': true,
        'dark border-orange': isDark,
      }"
      style="box-shadow: none;border-radius: 10px;border: 1px solid lightgray;"
      v-if="fileToDisplay && chapContent != ''"
    >
      <!--begin::Header-->

      <!--end::Header-->
      <!-- {{fileOpacity}} -->
      <!--begin::Body-->
      <!-- https://codepen.io/tahazsh/pen/WYywXW -->
      <!-- https://www.freecodecamp.org/news/how-to-create-a-medium-like-highlight-menu-in-vue-dc515f2dddef/ -->
      <div class="popup" :style="{top: offsetTop, left: offsetLeft}" ref="popup">
        <span @click="openNoteModel()" class="our-btn-hover">
          <span class="svg-icon svg-icon-xl" style="color: orange;"><svg version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
              <g xmlns="http://www.w3.org/2000/svg" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <path d="M11,3 L11,11 C11,11.0862364 11.0109158,11.1699233 11.0314412,11.2497543 C10.4163437,11.5908673 10,12.2468125 10,13 C10,14.1045695 10.8954305,15 12,15 C13.1045695,15 14,14.1045695 14,13 C14,12.2468125 13.5836563,11.5908673 12.9685588,11.2497543 C12.9890842,11.1699233 13,11.0862364 13,11 L13,3 L17.7925828,12.5851656 C17.9241309,12.8482619 17.9331722,13.1559315 17.8173006,13.4262985 L15.1298744,19.6969596 C15.051085,19.8808016 14.870316,20 14.6703019,20 L9.32969808,20 C9.12968402,20 8.94891496,19.8808016 8.87012556,19.6969596 L6.18269936,13.4262985 C6.06682778,13.1559315 6.07586907,12.8482619 6.2074172,12.5851656 L11,3 Z" fill="#000000" style="fill: #B68C2F !important;"></path>
                  <path d="M10,21 L14,21 C14.5522847,21 15,21.4477153 15,22 L15,23 L9,23 L9,22 C9,21.4477153 9.44771525,21 10,21 Z" fill="#000000" opacity="0.3" style="fill: #B68C2F !important;"></path>
              </g>
          </svg></span>
          <span style="margin-left: 5px; line-height: 26px">Add Note</span>
        </span>
      </div>
      <div
        :class="{ 'card-body pt-2 pb-0': true, 'dark-text': isDark }"
        id="main_body"
        style="padding: 50px 70px !important;"
        v-html="chapContent"
      >
        <!--begin::Table-->

        <!--end::Table-->
      </div>
      <!-- <div
        class="card-footer d-flex justify-content-between"
        style="border: none;"
      >
        <a
          href="#"
          :class="{
            'btn btn-primary font-weight-bold buttonStyles': true,
            'dark dark-text': isDark,
            'button-color': !isDark,
          }"
          >Previous</a
        >
        <a
          href="#"
          :class="{
            'btn btn-primary font-weight-bold buttonStyles': true,
            'dark dark-text': isDark,
            'button-color': !isDark,
          }"
          >Next</a
        >
      </div> -->
      <!--end::Body-->
    </div>
    <!-- <div id="createNote">
      <KTStickyToolbar></KTStickyToolbar>
    </div> -->
  </div>
</template>


<style lang="scss" scoped>
.dashboard-container, #modalNote {
  font-family: 'Merriweather', serif !important;
}


// .our_popup {
//   border-radius: 20px !important;
// }

// .swal2-success-ring, .swal2-success-line-tip, .swal2-success-line-long {
//   border-color: black !important;
// }

.our-delete-icon svg g [fill] {
  fill: #B68C2F !important;
}

#noteInput:focus, #our-textarea:focus {
  border: 1px solid #B68C2F;
}

.popup {
  position: absolute;
  color: #000;
  background-color: #fff;
  padding: 10px 0px;
  border-radius: 5px;
  transform-origin: center, center;
  cursor: pointer;
  border: 1px solid lightgray;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 5%);
}
.popup:after {
  content: "";
  border-bottom: 5px solid #fff;
  border-right: 5px solid #fff;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  position: absolute;
  top: calc(100% - 5px);
  transform: rotate(45deg);
  left: calc(50% - 3px);
}

.our-btn-hover {
  padding: 10px 16px;
}

.our-btn-hover:hover {
  background-color: #f3f3f3;
}

</style>

<script>
// import { mapGetters } from "vuex";

import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
// import KTStickyToolbar from "@/view/layout/extras/StickyToolbar.vue";
var fs = require("fs");
// var dirpath = "C:\\proj_MIL\\HTM\\";
var CryptoJS = require("crypto-js");
import Swal from 'sweetalert2'

var path = require("path");
var notesPath = "C:\\proj_MIL\\Notes\\";

export default {
  name: "dashboard",
  data() {
    return {
      chapContent: "",
      SelectedToNote: "",

      popupInitialTopOffset: 0,
      popupInitialLeftOffset: 0,
      offsetTop: 0,
      offsetLeft: "-999em",
      selectedText: undefined,
      ourNoteContent: "",

      noteHeading: "",
      noteText: "",

      createNoteTitleRequired: false,
    };
  },
  // components: { KTStickyToolbar },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.selectedFileName },
    ]);

    // if ( this.$store.getters.getHtmPath == "" || this.$store.getters.getHtmPath.indexOf(this.$store.getters.getParentDir) == -1 ) {

    //   var parentDir = this.$store.getters.getParentDir;
    //   // console.log("Yo -- Parent directory received " + parentDir);
    //   const dirTree = require("directory-tree");
    //   const dirPathint = dirTree("C:\\proj_MIL\\" + parentDir);
    //   const dirPath = dirPathint.children;
    //   // console.log("======================");
    //   // console.log(dirPathint);
    //   // console.log(dirPath);
    //   // console.log("======================");
    //   if ( dirPath[0].type == "file" ) {
  
    //     this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name);
    //     this.$store.commit("setFileName", dirPath[0].name);
  
    //   } else {
        
    //     if ( dirPath[0].children[0].type == "file" ) {
  
    //       this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name + "\\" + dirPath[0].children[0].name);
    //       this.$store.commit("setFileName", dirPath[0].children[0].name);
  
    //     } else {
          
    //       if ( dirPath[0].children[0].children[0].type == "file" ) {
  
    //         this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name + "\\" + dirPath[0].children[0].name + "\\" + dirPath[0].children[0].children[0].name);
    //         this.$store.commit("setFileName", dirPath[0].children[0].children[0].name);
            
    //       } else {
            
    //         if ( dirPath[0].children[0].children[0].children[0].type == "file" ) {
  
    //           this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name + "\\" + dirPath[0].children[0].name + "\\" + dirPath[0].children[0].children[0].name + "\\" + dirPath[0].children[0].children[0].children[0].name);
    //           this.$store.commit("setFileName", dirPath[0].children[0].children[0].children[0].name);
              
    //         } else {
              
    //         }
  
    //       }
  
    //     }
  
    //   }

    // }

    this.popupInitialTopOffset = 50;
    this.popupInitialLeftOffset = 123;
    // console.log(this.popupInitialTopOffset, this.popupInitialLeftOffset);
    window.addEventListener("mouseup", this.ListenToDocumentSelection);
    window.addEventListener("ontouchend", this.ListenToDocumentSelection);

    // console.log("## YO im on dashboard ##");
    // console.log("'"+this.$store.getters.getHtmPath+"'");

    // if (this.$store.getters.getHtmPath != '' ) {

    //   var fileContent = fs.readFileSync(
    //     this.$store.getters.getHtmPath.trim(),
    //     "utf8"
    //   );
    //   var bytes = CryptoJS.AES.decrypt(fileContent, "milpwkey78921");
    //   this.chapContent = bytes.toString(CryptoJS.enc.Utf8);

    // }

  

    // var body = document.getElementById("main_body");
    // var that=this;
    // body.onclick = function(e) {
    //   that.SelectedNote();
    // };
  },
  computed: {
    fileToDisplay() {
      return this.$store.getters.getHtmPath;
    },
    isDark() {
      return this.$store.getters.isDark;
    },
    fileOpacity() {
      return this.$store.getters.getOpacity;
    },
    fontSizeGet() {
      return this.$store.getters.getSize;
    },
    selectedFileName() {
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: this.$store.getters.getFileName.replace(".mlnm","") },
      ]);
      return this.$store.getters.getFileName.replace(".mlnm","");
    },
    getNote() {
      return this.$store.getters.getNote;
    },
  },
  watch: {
    fileToDisplay: function(fileToDisplay) {
      var fileContent = fs.readFileSync(fileToDisplay.trim(), "utf8");

      var bytes = CryptoJS.AES.decrypt(fileContent, "milpwkey78921");
      this.chapContent = bytes.toString(CryptoJS.enc.Utf8);
    },
    fileOpacity: function(fileOpacity) {
      setTimeout(() => {
        document.getElementById("main_body").style.opacity = fileOpacity;
      }, 0);
    },
    fontSizeGet: function(fontSizeGet) {
      setTimeout(() => {
        document.getElementById("main_body").style.cssText = "zoom: " + fontSizeGet;
        document.getElementById("main_body").style.opacity = this.$store.getters.getOpacity;
      }, 0);
    },
    getNote: function(getNote) {
      this.noteText = getNote;
    },
    '$route'(to, from ) {
      
      console.log(to);
      console.log(from);
      // tinymce.activeEditor.setContent(this.editor_data_original);
      // tinymce.remove();
      if ( this.$store.getters.getHtmPath == "" || this.$store.getters.getHtmPath.indexOf(this.$store.getters.getParentDir) == 0 ) {

        var parentDir = this.$store.getters.getParentDir;
        // console.log("Yo -- Parent directory received " + parentDir);
        const dirTree = require("directory-tree");
        const dirPathint = dirTree("C:\\proj_MIL\\" + parentDir);
        const dirPath = dirPathint.children;
        console.log("======================");
        console.log(dirPathint);
        console.log(dirPath);
        console.log("======================");
        if ( dirPath[0].type == "file" ) {
    
          this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name);
          this.$store.commit("setFileName", dirPath[0].name);
    
        } else {
          
          if ( dirPath[0].children[0].type == "file" ) {
    
            this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name + "\\" + dirPath[0].children[0].name);
            this.$store.commit("setFileName", dirPath[0].children[0].name);
    
          } else {
            
            if ( dirPath[0].children[0].children[0].type == "file" ) {
    
              this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name + "\\" + dirPath[0].children[0].name + "\\" + dirPath[0].children[0].children[0].name);
              this.$store.commit("setFileName", dirPath[0].children[0].children[0].name);
              
            } else {
              
              if ( dirPath[0].children[0].children[0].children[0].type == "file" ) {
    
                this.$store.commit("setHtmPath", "C:\\proj_MIL\\" + parentDir + "\\" + dirPath[0].name + "\\" + dirPath[0].children[0].name + "\\" + dirPath[0].children[0].children[0].name + "\\" + dirPath[0].children[0].children[0].children[0].name);
                this.$store.commit("setFileName", dirPath[0].children[0].children[0].children[0].name);
                
              } else {
                
              }
    
            }
    
          }
    
        }

      }
    }
  },
  methods: {
    getSelectedText() {
      if (window.getSelection) {
        return window.getSelection().toString();
      } else if (document.selection) {
        return document.selection.createRange().text;
      }
      return "";
    },
    openNoteModel() {
      // self.$bvModal.show("modalNote");
      this.$refs['modalNote'].show()
      this.ourNoteContent = this.selectedText;
    },
    // SelectedNote() {
    //   var selText = this.getSelectedText();
    //   var x = document.getElementById("createNote");
    //   if (selText != "") {
    //     x.style.display = "block";
    //     this.$store.commit("setNote", selText);
        // console.log(selText);
    //   } else {
    //     x.style.display = "none";
    //   }
    // },
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    cancelNote() {
      this.noteHeading = "";
      this.ourNoteContent = "";
      this.$refs['modalNote'].hide()
    },
    createNote() {
      var self=this;
      var parentDir = this.$store.getters.getParentDir;
      var heading = self.noteHeading;
      if (heading != "") {
        this.createNoteTitleRequired = false;
        var content = self.ourNoteContent;
        var cipheredContent = CryptoJS.AES.encrypt(content, "milpwkey78921");
        // console.log("content" + self.getNote);
        fs.writeFile(
          path.join("C:\\proj_MIL\\Notes\\"+parentDir, heading),
          self.fileToDisplay + "\n" + 
          new Date() + "\n" +
          cipheredContent,
          function(err) {
            if (err) throw err;
            // console.log("Saved!");

            Swal.fire({
                icon: "success",
                title: "Note Created Successfully!",
                customClass: {
                  container: 'our_container',
                  popup: 'our_popup',
                  header: 'our_header',
                  title: 'our_title',
                  closeButton: 'our_closeButton',
                  icon: 'our_icon',
                  image: 'our_image',
                  content: 'our_content',
                  htmlContainer: 'our_htmlContainer',
                  input: 'our_input',
                  inputLabel: 'our_inputLabel',
                  validationMessage: 'our_validationMessage',
                  actions: 'our_actions',
                  confirmButton: 'our_confirmButton',
                  denyButton: 'our_denyButton',
                  cancelButton: 'our_cancelButton',
                  loader: 'our_loader',
                  footer: 'our_footer.'
                }
            });

            // .swal2-success-ring, .swal2-success-line-tip, .swal2-success-line-long
            document.getElementsByClassName("our_popup")[0].style.borderRadius = "20px";
            document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
            document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
            document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

            document.getElementsByClassName("our_confirmButton")[0].style.backgroundColor = "#ffffff";
            document.getElementsByClassName("our_confirmButton")[0].style.border = "1px solid #B68C2F";
            document.getElementsByClassName("our_confirmButton")[0].style.padding = "8px 24px";
            document.getElementsByClassName("our_confirmButton")[0].style.borderRadius = "2px";
            document.getElementsByClassName("our_confirmButton")[0].style.color = "black";
            
            self.noteHeading = "";
            self.ourNoteContent = "";

          }
        );
        self.$bvModal.hide("modalNote");
      } else {
        this.createNoteTitleRequired = true;
      }
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    },

    // medium like select popup
    ListenToDocumentSelection() {
      let sel = window.getSelection();
      setTimeout(_ => {
        if (sel && !sel.isCollapsed) {
          this.selectedText = sel.toString();
          // console.log(sel);
          // console.log(sel.anchorNode.parentElement.classList);
          // console.log(sel.anchorNode.parentElement.id);
          if (sel.rangeCount) {
            let range = sel.getRangeAt(0).cloneRange();
            if (range.getBoundingClientRect) {
              var rect = range.getBoundingClientRect();
              let left = rect.left + (rect.right - rect.left) / 2;
              let top = rect.top;

              this.offsetTop = ((top-document.getElementById("main_body").offsetParent.offsetTop) - this.popupInitialTopOffset - 15) + document.getElementsByTagName("body")[0].parentNode.scrollTop + "px";
              // this.offsetTop = (top-document.getElementById("main_body").offsetParent.offsetTop) + "px";

              this.offsetLeft = (left-document.getElementById("main_body").offsetParent.offsetLeft) - this.popupInitialLeftOffset / 2 + "px";
              // this.offsetLeft = (left-document.getElementById("main_body").offsetParent.offsetLeft) + "px";
            }
          }
        } else {
          this.offsetLeft = "-999em";
        }
      }, 0);
    },
    AlertSelectedText() {
      alert(`"${this.selectedText}" posted as comment`);
    }
  },
  destroyed() {
    window.removeEventListener("mouseup", this.ListenToDocumentSelection);
  }
};
</script>
