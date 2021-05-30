<template>
  <div class="container">
    <div id="notesOpenModal">
      <b-modal id="modalNoteOpen" size="lg" hide-footer hide-header ref="modalNoteOpen" :style="{ 'background-color': isDark ? '#333':'#fff' }" v-if="!isDark">
        <!-- <form> -->
          <div class="row" v-if="selectedNoteObj != null" style="padding: 20px;">
            <div class="col-9" style=" margin-bottom: 10px;">
              <i class="flaticon2-pen text-success" style="color: rgb(182, 140, 47) !important;"></i>
              <span style="font-size: 22px; margin-left: 10px;" v-if="!noteInEditMode"> {{ selectedNoteObj.noteHeading }} </span>
              <input type="text" v-model="ourNoteTitle" class="form-control" v-if="noteInEditMode" style="width: 400px; display: inline; margin-left: 10px; font-size: 22px;" id="our-edit-title-input" />
              <span  v-if="!noteInEditMode"> {{ selectedNoteObj.noteSavedTime }} </span>
            </div>
            <div class="col-3" style="text-align: right;">
              

              <a
                href="#"
                :class="{
                  'btn btn-sm btn-success font-weight-bold': true,
                  dark: isDark,
                }"
                @click="openNotePage(selectedNoteObj.notePath, selectedNoteObj.noteHeading)"
                v-if="!noteInEditMode && selectedNoteObj.notePath != ''"
                style="
                  background-color: #fff;
                  color: #111111 !important;
                  border-color: #b68c2f !important;
                  border-radius: 2px;
                  width: 45px;
                  height: 45px;
                  padding-top: 12px;
                  margin-right: 10px;
                "
              >
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/bookmark_click.svg" />
                  <!--end::Svg Icon-->
                </span>
              </a>

              <a
                href="#"
                :class="{
                  'btn btn-sm btn-success font-weight-bold': true,
                  dark: isDark,
                }"
                @click="editNote()"
                v-if="!noteInEditMode"
                style="
                  background-color: #fff;
                  color: #111111 !important;
                  border-color: #b68c2f !important;
                  border-radius: 2px;
                  width: 45px;
                  height: 45px;
                  text-align: center;
                  padding-left: 12px;
                "
              >
                <span class="">
                  <!--begin::Svg Icon-->
                  <i class="flaticon2-edit text-success" style="color: rgb(182, 140, 47) !important;padding-top: 7px; "></i>
                  <!--end::Svg Icon-->
                </span>
              </a>

              <a
                href="#"
                :class="{
                  'btn btn-sm btn-success font-weight-bold': true,
                  dark: isDark,
                }"
                @click="deleteNote()"
                v-if="!noteInEditMode"
                style="
                  background-color: #fff;
                  color: #111111 !important;
                  border-color: #b68c2f !important;
                  border-radius: 2px;
                  width: 45px;
                  height: 45px;
                  text-align: center;
                  padding-left: 8px;
                  margin-left: 10px;
                "
              >
                <span data-v-3ab02941="" class="svg-icon svg-icon-2x our-delete-icon">
                  <svg data-v-3ab02941="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g data-v-3ab02941="" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect data-v-3ab02941="" x="0" y="0" width="24" height="24"></rect>
                      <path data-v-3ab02941="" d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"></path>
                      <path data-v-3ab02941="" d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
            <!-- <div class="col-8">
              <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Title </label>
              <br>
              {{ noteTitle }}
            </div> -->
            <div class="col-12" style="margin-bottom: 20px;"> 
              <!-- <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Content </label> -->
              <br>
              <textarea id="our-textarea" class="form-control" v-model="ourNoteContent" v-if="noteInEditMode" rows="10"></textarea>
              <div v-html="selectedNoteObj.noteContent" v-if="!noteInEditMode"></div>
            </div>
            <div class="col-12" style="margin-bottom: 20px;" v-if="selectedNoteObj.notePath != '' && !noteInEditMode"> 
              <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Page </label>
              <a href="#" class="page-link" @click="openNotePage(selectedNoteObj.notePath)"> {{ selectedNoteObj.notePath.replace( selectedNoteObj.notePath.split("\\")[0], "" ).replace( selectedNoteObj.notePath.split("\\")[1], "" ).replace( selectedNoteObj.notePath.split("\\")[2], "" ).replace("\\","").replace("\\","").replace("\\","").split("\\").join(" \\ ") }}</a>
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
            <div class="col-4" v-if="noteInEditMode">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="updateEditedNote()">Save Changes</a>
            </div>
            <div class="col-4" v-if="noteInEditMode">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="discardChanges()" >Discard Changes</a>
            </div>
            
          </div>
        <!-- </form> -->
      </b-modal>
      <b-modal id="modalNoteOpenDark" size="lg" hide-footer hide-header ref="modalNoteOpen" :style="{ 'background-color': isDark ? '#333':'#fff' }" v-if="isDark">
        <!-- <form> -->
          <div class="row" v-if="selectedNoteObj != null" style="padding: 20px;">
            <div class="col-9" style=" margin-bottom: 10px;">
              <i class="flaticon2-pen text-success" style="color: rgb(182, 140, 47) !important;"></i>
              <span style="font-size: 22px; margin-left: 10px;" v-if="!noteInEditMode"> {{ selectedNoteObj.noteHeading }} </span>
              <input type="text" v-model="ourNoteTitle" class="form-control" v-if="noteInEditMode" style="width: 400px; display: inline; margin-left: 10px; font-size: 22px;" id="our-edit-title-input" />
              <span  v-if="!noteInEditMode"> {{ selectedNoteObj.noteSavedTime }} </span>
            </div>
            <div class="col-3" style="text-align: right;">
              

              <a
                href="#"
                :class="{
                  'btn btn-sm btn-success font-weight-bold': true,
                  dark: isDark,
                }"
                @click="openNotePage(selectedNoteObj.notePath, selectedNoteObj.noteHeading)"
                v-if="!noteInEditMode && selectedNoteObj.notePath != ''"
                style="
                  background-color: #fff;
                  color: #111111 !important;
                  border-color: #b68c2f !important;
                  border-radius: 2px;
                  width: 45px;
                  height: 45px;
                  padding-top: 12px;
                  margin-right: 10px;
                "
              >
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/bookmark_click.svg" />
                  <!--end::Svg Icon-->
                </span>
              </a>

              <a
                href="#"
                :class="{
                  'btn btn-sm btn-success font-weight-bold': true,
                  dark: isDark,
                }"
                @click="editNote()"
                v-if="!noteInEditMode"
                style="
                  background-color: #fff;
                  color: #111111 !important;
                  border-color: #b68c2f !important;
                  border-radius: 2px;
                  width: 45px;
                  height: 45px;
                  text-align: center;
                  padding-left: 12px;
                "
              >
                <span class="">
                  <!--begin::Svg Icon-->
                  <i class="flaticon2-edit text-success" style="color: rgb(182, 140, 47) !important;padding-top: 7px; "></i>
                  <!--end::Svg Icon-->
                </span>
              </a>

              <a
                href="#"
                :class="{
                  'btn btn-sm btn-success font-weight-bold': true,
                  dark: isDark,
                }"
                @click="deleteNote()"
                v-if="!noteInEditMode"
                style="
                  background-color: #fff;
                  color: #111111 !important;
                  border-color: #b68c2f !important;
                  border-radius: 2px;
                  width: 45px;
                  height: 45px;
                  text-align: center;
                  padding-left: 8px;
                  margin-left: 10px;
                "
              >
                <span data-v-3ab02941="" class="svg-icon svg-icon-2x our-delete-icon">
                  <svg data-v-3ab02941="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g data-v-3ab02941="" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect data-v-3ab02941="" x="0" y="0" width="24" height="24"></rect>
                      <path data-v-3ab02941="" d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"></path>
                      <path data-v-3ab02941="" d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
            <!-- <div class="col-8">
              <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Title </label>
              <br>
              {{ noteTitle }}
            </div> -->
            <div class="col-12" style="margin-bottom: 20px;"> 
              <!-- <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Note Content </label> -->
              <br>
              <textarea id="our-textarea" class="form-control" v-model="ourNoteContent" v-if="noteInEditMode" rows="10"></textarea>
              <div v-html="selectedNoteObj.noteContent" v-if="!noteInEditMode"></div>
            </div>
            <div class="col-12" style="margin-bottom: 20px;" v-if="selectedNoteObj.notePath != '' && !noteInEditMode"> 
              <label style="font-weight: bold; margin-bottom: 5px; margin-top: 10px;"> Page </label>
              <a href="#" class="page-link" @click="openNotePage(selectedNoteObj.notePath)"> {{ selectedNoteObj.notePath.replace( selectedNoteObj.notePath.split("\\")[0], "" ).replace( selectedNoteObj.notePath.split("\\")[1], "" ).replace( selectedNoteObj.notePath.split("\\")[2], "" ).replace("\\","").replace("\\","").replace("\\","").split("\\").join(" \\ ") }}</a>
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
            <div class="col-4" v-if="noteInEditMode">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="updateEditedNote()">Save Changes</a>
            </div>
            <div class="col-4" v-if="noteInEditMode">
              <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;" @click="discardChanges()" >Discard Changes</a>
            </div>
            
          </div>
        <!-- </form> -->
      </b-modal>
    </div>
    <!-- <NotesBookmarkHeader />
    <Aside /> -->
    <div class="row container">
      <b-modal
        v-if="!isDark"
        id="modal-scrollable"
        centered
        size="xl"
        hide-header
        hide-footer
      >
        <div v-html="ModalData"></div>
        <div class="text-center">
          <b-button
            class="mt-5"
            variant="outline-warning"
            @click="$bvModal.hide('modal-scrollable')"
            >Close</b-button
          >
        </div>
      </b-modal>
      <b-modal
        v-if="isDark"
        id="modal-scrollable"
        centered
        size="xl"
        hide-header
        hide-footer
        :body-bg-variant="'dark'"
        :body-text-variant="'light'"
      >
        <div v-html="ModalData"></div>
        <div class="text-center">
          <b-button
            class="mt-5"
            variant="outline-warning"
            @click="$bvModal.hide('modal-scrollable')"
            >Close</b-button
          >
        </div>
      </b-modal>

      <div
        class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4"
        v-for="(note, index) in Notes"
        :key="index"
        v-if="note_search_str == '' || (note.noteHeading.toLowerCase().indexOf(note_search_str.toLowerCase()) >= 0 || note.noteContent.toLowerCase().indexOf(note_search_str.toLowerCase()) >= 0 )"
        style="padding-bottom: 25px"
      >
        <!--begin::Card-->
        <div
          :class="{
            'card card-custom card-fit card-border': true,
            'dark dark-text border-orange': isDark,
          }"
          style="
            box-shadow: none;
            border-radius: 10px;
            border: 1px solid lightgray;
            height: 250px;
            overflow: hidden;
            padding: 20px;
          "
        >
          <div class="card-header">
            <div class="card-title">
              <span class="card-icon">
                <i
                  class="flaticon2-pen text-success"
                  style="color: #b68c2f !important"
                ></i>
              </span>
              <h3 :class="{ 'card-label ml-3': true, 'dark-text': isDark }">
                {{ note.noteHeading.length > 10 ? note.noteHeading.substr(0, 10) + "..." : note.noteHeading }}<br />
                <small> {{ note.noteSavedTime }} </small>
              </h3>
            </div>
            
          </div>
          <div class="card-body pt-2" style="color:#888888; overflow: hidden;">
            {{ note.noteContent.length > 80 ? note.noteContent.substr(0, 80) + "..." : note.noteContent }}
          </div>
          <div class="card-footer pt-2" style="text-align: right;">
            <a
                href="#"
                :class="{
                  'btn btn-success font-weight-bold': true,
                  dark: isDark,
                }"
                @click="ModalViewBookmark(note)"
                style="
                  background-color: #fff;
                  color: #111111 !important;
                  border-color: #b68c2f !important;
                  border-radius: 2px;
                "
              >
                <!-- <span class="svg-icon svg-icon-lg"> -->
                  <!--begin::Svg Icon-->
                  <!-- <inline-svg src="media/bookmark_click.svg" /> -->
                  <!-- <span class="svg-icon svg-icon-primary svg-icon-2x" id="ouropensvgicon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M13.6855025,18.7082217 C15.9113859,17.8189707 18.682885,17.2495635 22,17 C22,16.9325178 22,13.1012863 22,5.50630526 L21.9999762,5.50630526 C21.9999762,5.23017604 21.7761292,5.00632908 21.5,5.00632908 C21.4957817,5.00632908 21.4915635,5.00638247 21.4873465,5.00648922 C18.658231,5.07811173 15.8291155,5.74261533 13,7 C13,7.04449645 13,10.79246 13,18.2438906 L12.9999854,18.2438906 C12.9999854,18.520041 13.2238496,18.7439052 13.5,18.7439052 C13.5635398,18.7439052 13.6264972,18.7317946 13.6855025,18.7082217 Z" fill="#000000"/>
                          <path d="M10.3144829,18.7082217 C8.08859955,17.8189707 5.31710038,17.2495635 1.99998542,17 C1.99998542,16.9325178 1.99998542,13.1012863 1.99998542,5.50630526 L2.00000925,5.50630526 C2.00000925,5.23017604 2.22385621,5.00632908 2.49998542,5.00632908 C2.50420375,5.00632908 2.5084219,5.00638247 2.51263888,5.00648922 C5.34175439,5.07811173 8.17086991,5.74261533 10.9999854,7 C10.9999854,7.04449645 10.9999854,10.79246 10.9999854,18.2438906 L11,18.2438906 C11,18.520041 10.7761358,18.7439052 10.4999854,18.7439052 C10.4364457,18.7439052 10.3734882,18.7317946 10.3144829,18.7082217 Z" fill="#000000" opacity="0.3"/>
                      </g>
                  </svg></span> -->
                  <span :style="{ 'color': isDark ? '#B5B5C3': '#000' }">Open</span>
                  <!--end::Svg Icon-->
                <!-- </span> -->
              </a>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  font-family: 'Merriweather', serif;
}
#ouropensvgicon svg g [fill], .our-delete-icon svg g [fill] {
  fill: #B68C2F !important;
}
.page-link {
  color: black;
}
.page-link:hover {
  color: #B68C2F;
}
#our-textarea:focus, #our-edit-title-input:focus {
  border: 1px solid #B68C2F;
}
.dark-text {
  color: white !important;
}
#modalNoteOpenDark .modal-content {
  background-color: #333 !important;
  color: white;
}
#modalNoteOpenDark .modal-content input, #modalNoteOpenDark .modal-content textarea {
  border: 1px solid rgb(107, 107, 107);
}
#modalNoteOpenDark .modal-content input, #modalNoteOpenDark .modal-content textarea, #modalNoteOpenDark .modal-content .btn {
  background-color: #333 !important;
  color: white !important;
}
#modalNoteOpenDark .modal-content .page-link {
  background-color: #333 !important;
  border: 1px solid rgb(107, 107, 107);
  color: white;
}
#modalNoteOpenDark .modal-content .page-link:hover {
  color: #B68C2F;
}
@import "@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Aside from "@/view/layout/aside/Aside.vue";
import Swal from "sweetalert2";
// import NotesBookmarkHeader from "@/view/layout/subheader/NotesBookmarkHeader";
var fs = require("fs");
var path = require('path')
var notesPath = "C:\\proj_MIL\\Notes\\";
var CryptoJS = require("crypto-js");
export default {
  name: "Notes",
  data() {
    return {
      Notes: [],
      ModalData: "",
      selectedNoteObj: null,
      noteInEditMode: false,
      ourNoteContent: "",
      ourNoteTitle: "",
    };
  },
  components: {
    Aside,
    // NotesBookmarkHeader,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Notes" }
    ]);
    // this.$store.dispatch(SET_BREADCRUMB, [
    //   { title: "Wizard" },
    //   { title: "Wizard-1" },
    // ])
    this.iniNotes();
  },
  methods: {
    iniNotes() {
      var self = this;
      this.Notes = [];
      var parentDir = this.$store.getters.getParentDir;
      fs.readdir(notesPath+parentDir, (err, files) => {
        if (!err)  {
          // console.log(err);
        // else {
          files.forEach((file) => {
            var data = fs.readFileSync(notesPath + parentDir + "\\" + file, "utf8");
            // console.log("++++++++++++++++++" + data);
            var notepath = data.split("\n")[0];

            var notesavedtime = data.split("\n")[1];

            var timestamp = Date.parse(notesavedtime);
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

            var data = data.replace(data.split("\n")[0], "");
            var data = data.replace(data.split("\n")[1], "");
            var data = data.replace("\n", "");
            var data = data.replace("\n", "");
            // console.log("++++++++++++++++++" + data);
            var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");

            var noteData = bytes.toString(CryptoJS.enc.Utf8);
            // console.log("++++++++++++++++++" + noteData);
            // console.log(data)
            this.Notes.push({
              noteHeading: file.split(".")[0],
              noteContent: noteData,
              noteSavedTime: final_diff<2 ? final_diff+' ' + type.substr(0, type.length-1) + ' ago' : final_diff+' ' + type + ' ago',
              notePath: notepath
            });
          });
        }
      });
  
    },
    deleteNote() {

      var self=this;
      var parentDir = this.$store.getters.getParentDir;
      var heading = self.ourNoteTitle;

      fs.unlinkSync("C:\\proj_MIL\\Notes\\" + parentDir + "\\" + heading);

      Swal.fire({
          icon: "success",
          title: "Note deleted",
          customClass: {
            popup: 'our_popup_4',
            confirmButton: 'our_confirmButton_4',
          }
      });

      document.getElementsByClassName("our_popup_4")[0].style.borderRadius = "20px";
      document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
      document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
      document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

      document.getElementsByClassName("our_confirmButton_4")[0].style.backgroundColor = "#ffffff";
      document.getElementsByClassName("our_confirmButton_4")[0].style.border = "1px solid #B68C2F";
      document.getElementsByClassName("our_confirmButton_4")[0].style.padding = "8px 24px";
      document.getElementsByClassName("our_confirmButton_4")[0].style.borderRadius = "2px";
      document.getElementsByClassName("our_confirmButton_4")[0].style.color = "black";

      this.$refs['modalNoteOpen'].hide();
      this.iniNotes();
    },
    editNote() {
      this.noteInEditMode = true;
    },
    discardChanges() {
      this.noteInEditMode = false;
    },
    updateEditedNote() {

      var self=this;
      var parentDir = this.$store.getters.getParentDir;
      var heading = self.ourNoteTitle;

      if (heading != "") {
        if ( heading == self.selectedNoteObj.noteHeading ) {

          var content = self.ourNoteContent;
          var cipheredContent = CryptoJS.AES.encrypt(content, "milpwkey78921");
          
          fs.writeFile(
            path.join("C:\\proj_MIL\\Notes\\"+parentDir, heading),
            self.selectedNoteObj.notePath + "\n" + 
            new Date() + "\n" +
            cipheredContent,
            function(err) {
              if (err) throw err;
              // console.log("Saved!");
  
              Swal.fire({
                  icon: "success",
                  title: "Note Edited Successfully!",
                  customClass: {
                    popup: 'our_popup',
                    confirmButton: 'our_confirmButton',
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
              
              
              self.iniNotes();
              self.$refs['modalNoteOpen'].hide()
              self.noteInEditMode = false;

            }
          );
          
        } else {

          // check if name already present
          var counter = 0;

          fs.readdirSync("C:\\proj_MIL\\Notes\\"+parentDir).forEach(file => { 
            if (file == heading) {
              // console.log("stop"); 
              Swal.fire({
                  icon: "error",
                  title: "Note with that name already exists!",
                  customClass: {
                    popup: 'our_popup_2',
                    confirmButton: 'our_confirmButton_2',
                  }
              });
  
              // .swal2-success-ring, .swal2-success-line-tip, .swal2-success-line-long
              document.getElementsByClassName("our_popup_2")[0].style.borderRadius = "20px";
              // document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
              // document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
              // document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";
  
              document.getElementsByClassName("our_confirmButton_2")[0].style.backgroundColor = "#ffffff";
              document.getElementsByClassName("our_confirmButton_2")[0].style.border = "1px solid #B68C2F";
              document.getElementsByClassName("our_confirmButton_2")[0].style.padding = "8px 24px";
              document.getElementsByClassName("our_confirmButton_2")[0].style.borderRadius = "2px";
              document.getElementsByClassName("our_confirmButton_2")[0].style.color = "black";
              counter++;
            }
          });

          if ( counter != 0 ) {
              return 0;
          } else {

            // go further
            fs.rename("C:\\proj_MIL\\Notes\\"+parentDir+"\\"+self.selectedNoteObj.noteHeading, "C:\\proj_MIL\\Notes\\"+parentDir+"\\"+self.ourNoteTitle, () => { 
              // console.log("\nFile Renamed!\n"); 
              
              var content = self.ourNoteContent;
              var cipheredContent = CryptoJS.AES.encrypt(content, "milpwkey78921");
              
              fs.writeFile(
                path.join("C:\\proj_MIL\\Notes\\"+parentDir, self.ourNoteTitle),
                self.selectedNoteObj.notePath + "\n" + 
                new Date() + "\n" +
                cipheredContent,
                function(err) {
                  if (err) throw err;
                  // console.log("Saved!");
      
                  Swal.fire({
                      icon: "success",
                      title: "Note Edited Successfully!",
                      customClass: {
                        popup: 'our_popup',
                        confirmButton: 'our_confirmButton',
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
                  

                  self.iniNotes();
                  self.$refs['modalNoteOpen'].hide()
                  self.noteInEditMode = false;
                }
              );
              // List all the filenames after renaming 
              // getCurrentFilenames(); 
            }); 
          }

          
        }
        // self.$bvModal.hide("modalNote");
      } else {
        Swal.fire({
            icon: "error",
            title: "Note title can't be empty!",
            customClass: {
                popup: 'our_popup_7',
                confirmButton: 'our_confirmButton_7',
            }
        });

        document.getElementsByClassName("our_popup_7")[0].style.borderRadius = "20px";
        // document.getElementsByClassName("swal2-error-ring")[0].style.borderColor = "#B68C2F30";
        // document.getElementsByClassName("swal2-error-line-tip")[0].style.backgroundColor = "#B68C2F";
        // document.getElementsByClassName("swal2-error-line-long")[0].style.backgroundColor = "#B68C2F";

        document.getElementsByClassName("our_confirmButton_7")[0].style.backgroundColor = "#ffffff";
        document.getElementsByClassName("our_confirmButton_7")[0].style.border = "1px solid #B68C2F";
        document.getElementsByClassName("our_confirmButton_7")[0].style.padding = "8px 24px";
        document.getElementsByClassName("our_confirmButton_7")[0].style.borderRadius = "2px";
        document.getElementsByClassName("our_confirmButton_7")[0].style.color = "black";
      }

    },
    submit: function (e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary",
      });
    },
    openNotePage(path, name) {
      this.$store.commit("setHtmPath", path);
      this.$store.commit("setFileName", path.split("\\")[path.split("\\").length-1]);
      this.$router.push("/Dashboard");
    },
    ModalViewBookmark(note) {
      this.$refs['modalNoteOpen'].show()
      this.selectedNoteObj = note;
      this.ourNoteContent = note.noteContent;
      this.ourNoteTitle = note.noteHeading;
      // var filename = note.noteHeading;
      // var parentDir = this.$store.getters.getParentDir;
      // // console.log(filename);
      // fs.readdir(notesPath+parentDir, (err, files) => {
      //   if (err) console.log(err);
      //   else {
      //     files.forEach((file) => {
            // console.log("file   "+file);
            // console.log(path.join(notesPath + parentDir) + '\\' + file.trim()+"this is the path")
      //       var data = fs.readFileSync(path.join(notesPath + parentDir)+ '\\' + file.trim(), "utf8");
      //       var bytes = CryptoJS.AES.decrypt(data, "milpwkey78921");

      //       var noteData = bytes.toString(CryptoJS.enc.Utf8);
      //       // console.log(data)
      //       if (file.split(".")[0].trim() == filename.trim()) {
              // console.log(noteData);
      //         this.ModalData = noteData;
      //       }
      //     });
      //   }
      // });
    },
  },
  computed: {
    isDark() {
      return this.$store.getters.isDark;
    },
    note_search_str() {
      return this.$store.getters.get_note_search_str;
    },
    refresh_status() {
      return this.$store.getters.get_refresh_status;
    }
    // rerender(){
    //   return this.$store.getters.getRerender;
    // }
  },
  watch: {
    refresh_status: function() {
      if (this.refresh_status) { 
        // console.log("got it yeh " + this.$store.getters.get_refresh_status);
        if ( this.$store.getters.get_refresh_status ) {
          // console.log("got it");
          this.iniNotes();
          this.$store.commit('set_refresh_status', false);
        }
      }
    }
  }
  // watch: {
  // rerender: function(rerender){
  //   this.notesKey = rerender;
  //   console.log(this.notesKey)
  // }
  // },
};
</script>

