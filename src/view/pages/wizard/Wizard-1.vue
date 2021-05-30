<template>
  <div>
    <div class="col-xl-4">
      <!--begin::Mixed Widget 10-->
      <div
        class="card card-custom gutter-b card-stretch"
        style="
    box-shadow: none;
    border-radius: 10px;
    border: 1px solid lightgray;
"
      >
        <!--begin::Body-->
        <div class="card-body d-flex flex-column">
          <div class="flex-grow-1 pb-5">
            <!--begin::Info-->
            <div class="d-flex align-items-center pr-2 mb-6">
              <span
                class="text-muted font-weight-bold font-size-lg flex-grow-1"
              >
                7 Hours Ago
              </span>
              <a
                href="#"
                class="btn btn-sm btn-success font-weight-bold"
                style="background-color: #fff !important;color: #111111 !important;border-color: #B68C2F !important;border-radius: 2px;"
              >
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg src="media/bookmark_click.svg" />
                  <!--end::Svg Icon-->
                </span>
              </a>
            </div>
            <!--end::Info-->

            <!--begin::Link-->
            <a
              href="#"
              class="text-dark font-weight-bolder text-hover-primary font-size-h4"
              >Page Title</a
            >
            <!--end::Link-->

            <!--begin::Desc-->
            <p class="text-dark-50 font-weight-normal font-size-lg mt-6">
              Pitstop creates quick email campaigns.<br />
              We help to strengthen your brand<br />
              for your every purpose.
            </p>
            <!--end::Desc-->
          </div>

          <!--end::Team-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Mixed Widget 10-->
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import Swal from "sweetalert2";

export default {
  name: "Wizard-1",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Wizard" },
      { title: "Wizard-1" },
    ]);
  },
  methods: {
    submit: function(e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary",
      });
    },
  },
};
</script>
