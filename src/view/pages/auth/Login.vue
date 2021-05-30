<template>
  <div
    class="d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat bgimg login-container"
     >
    <div class="login-form text-center p-7 position-relative overflow-hidden bg-white col-7 " style="margin-top:10Vh;border-radius:10px;border:1px solid lightgray; padding-top: 60px !important; padding-bottom: 80px !important;">
      <!--begin::Login Header-->
      <div
        class="d-flex flex-center mb-15"
        style="margin-bottom: 0px !important;"
      >
        <a href="#">
          <img
            src="media/logos/logo.png"
            class=""
            alt=""
            style="height: 150px;margin-bottom: 30px;"
          />
        </a>
      </div>
      <!-- <div class="d-flex flex-center mb-15">
        <a
          href="#"
          style="text-decoration: none;color: #b68c2f;font-size: 38px;font-weight: 400; font-family: 'Merriweather', serif;"
        >
         Millenium Projects
        </a>
      </div> -->
      <!--end::Login Header-->
      <!--begin::Login Sign in form-->

      <!-- Show this form if already registeed user, direly take the product key -->
      <!-- <div class="login-signin" v-else>
        <div class="mb-20">
          <h3>Sign In To Admin</h3>
          <div class="text-muted font-weight-bold">
            Enter your details to login to your software
          </div> -->

      <!-- show this form if name is required -->
      <!-- <div class="login-signin" v-if="this.$store.name_required == true"> -->
      <div class="login-signin">
        <div class="mb-20">
          <h3>Sign In To Software</h3>
          <div class="text-muted font-weight-bold">
            Enter registered mobile number for activation
          </div>
        </div>
        <div
          class="form fv-plugins-bootstrap fv-plugins-framework"
          id="kt_login_signin_form"
        >
          <form class="form-group mb-5 fv-plugins-icon-container has-danger" v-on:submit.prevent="onSubmit" style="text-align: center;">
            <input
              class="form-control h-auto form-control-solid py-4 px-8"
              type="tel"
              maxlength="10"
              placeholder="Mobile Number"
              v-model="mobile_number"
              style="box-shadow: 0 0px 8px 0 rgba(221,221,221,.2), 0 0px 20px 0 rgba(221,221,221,.2); background-color: rgb(232, 232, 232) !important;color:#000 !important;font-size: 14px !important; width:500px !important;margin:auto !important"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block" v-if="show_mobile_number_required">
                Mobile Number is required
              </div>
            </div>
            <div
              role="alert"
              v-bind:class="{ show: errors.length }"
              class="alert fade alert-danger"
              style="width: 500px !important; display: inline-block;"
            >
              {{ errors }}
            </div>
          </form>
          <div
            class="form-group d-flex flex-wrap justify-content-between align-items-center"
          ></div>
          <button
            id="kt_login_signin_submit"
            class="btn  font-weight-bold px-9 py-4 my-3 mx-4"
            type="submit"
            @click="onSubmit"
          >
            Sign In
          </button>
        </div>
      </div>
      <!--end::Login Sign in form-->

      <div class="text-dark mx-auto" style="margin-top: 50px">
        <span class="text-muted font-weight-bold mr-2">
          1996 - {{ CurrentYear }} &nbsp;&copy;&nbsp;
        </span>
        <span style="color: #b68c2f !important;">Vinayak Publishers, Jodhpur - 0291-2751422</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
.swal-custom-popup {
  border-radius: 20px;
}
.btn{
  color:#b68c2f;
  border:1px solid #b68c2f;
  // background-color:#b68c2f ;
}
.login-container {
  font-family: 'Merriweather', serif;
}
</style>

<script>
import {
  // mapGetters,
  mapState
} from "vuex";
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";
const dns = require("dns");
import Swal from "sweetalert2";

// import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";

export default {
  // mixins: [validationMixin],
  name: "login",
  data() {
    return {
      mobile_number: "",
      show_mobile_number_required: false,
      CurrentYear: new Date().getFullYear()
    };
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.mobile_number = "";

      // this.$nextTick(() => {
      //   this.$v.$reset();
      // });
    },
    onSubmit() {

      var self = this;
      // console.log("---------------------> Oh yeh");

      var abc = dns.resolve("www.google.com", function(err, addr) {
          if (err) {
            // console.log("---------------------> Oh yeh 2");

            Swal.fire({
              title: 'You are offline!',
              html: 'This action requires the Internet Connection.',
              icon: 'warning',
              customClass: {
                  popup: 'our_popup_17',
                  confirmButton: 'our_confirmButton_17',
              }
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


          } else {
            // console.log("---------------------> Oh yeh 3");

            self.show_mobile_number_required = false;
            // clear existing errors
            self.$store.dispatch(LOGOUT);

            if (self.mobile_number == "") {
              self.show_mobile_number_required = true;
            } else {
              const temp_mac_id = self.our_mac_id;
              const mobile_number = self.mobile_number;

              self.$store
                .dispatch(LOGIN, {
                  mac_id: temp_mac_id,
                  mobile_number: "+91"+mobile_number
                  // mac_id
                })

                // go to which page after successfully login
                .then(() => self.$router.push({ name: "landing" }));
            }
          }
      });
    
    
      // console.log(abc);
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    our_mac_id() {
      return this.$store.getters.getmac_id;
    }
  }
};
</script>
