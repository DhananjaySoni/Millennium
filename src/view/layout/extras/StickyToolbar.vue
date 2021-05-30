<template>
  <div>
    <!-- begin::Sticky Toolbar -->
    <ul class="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4 custom-sticky-container">
      <li v-b-tooltip.hover.left="'Create Note'" class="nav-item mb-2">
        <div id="notesModal">
          <b-modal id="modalNote" size="lg" hide-footer hide-header>
            <form>
              <!-- <span>Enter Note Title</span> -->
              <div class="row">
                <div class="col-8">
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
                  <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;">Save</a>
                </div>
                <div class="col-2" style="">
                  <a data-v-0c2c2350="" href="#" class="btn btn-primary font-weight-bold buttonStyles button-color" style="width: 100%;">
                    <!-- <span class="svg-icon svg-icon-primary svg-icon-2x our-delete-icon" style="line-height: 37px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24"/>
                            <path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>
                            <path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                        </g>
                    </svg></span> -->
                    Cancle
                  </a>
                </div>
              </div>
            </form>
          </b-modal>
        </div>
        <a
          href="#"
          v-b-modal.modalNote
          class="btn btn-sm btn-icon btn-bg-light btn-text-primary btn-hover-white"
        >
          <span class="svg-icon svg-icon-xl" style="color: orange">
            <!--begin::Svg Icon-->
            <inline-svg src="media\pen.svg" />
            <!--end::Svg Icon-->
          </span>
        </a>
      </li>
    </ul>
    <!-- end::Sticky Toolbar -->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
var fs = require("fs");
var path = require("path");
var notesPath = "C:\\proj_MIL\\Notes\\";
var CryptoJS = require("crypto-js");
export default {
  name: "KTStickyToolbar",
  data() {
    return {
      noteHeading: "",
      noteText: "dgf",
    };
  },
  mounted() {

  },
  computed: {
    getNote() {
      return this.$store.getters.getNote;
    },
  },
  watch: {
    getNote: function(getNote) {
      this.noteText = getNote;
    },
  },
  methods: {
    createNote() {
      var self=this;
          var parentDir = this.$store.getters.getParentDir;
      var heading = document.getElementById("noteInput").value;
      if (heading != "") {
        var content = self.getNote;
        var cipheredContent = CryptoJS.AES.encrypt(content, "milpwkey78921");
        console.log("content" + self.getNote);
        fs.writeFile(
          path.join(notesPath+parentDir, heading),
          cipheredContent,
          function(err) {
            if (err) throw err;
            console.log("Saved!");
            
          }
        );
        self.$bvModal.hide("modalNote");
      }
    },
  },
};
</script>

<style scoped>

.custom-sticky-container {
  font-family: 'Merriweather', serif;
}

.our-delete-icon svg g [fill] {
  fill: #B68C2F !important;
}

#noteInput:focus {
  border: 1px solid #B68C2F;
}
</style>