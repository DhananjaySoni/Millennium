<template>
  <div class="d-flex flex-column flex-root"
  
  >
    <div
      class="login login-1 login-signin-on "
      id="kt_login"
    >

      <!--begin::Aside-->

      <!--begin::Content-->
      <div
        class="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden"
      >
        <div class="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
          <router-view></router-view>
        </div>
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "auth",
  methods: {},
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    backgroundImage() {
      return process.env.BASE_URL + "media/bg/bg-4.jpg";
    }
  }
};
</script>
