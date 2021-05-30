<template>
    <div class="landing-container">
        <!-- <img
      src="https://4cwe911ts279hv8dd1ag5p31-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Industrial-Design-cover-image-1920x1280.jpg"
      style="position: fixed; left: 0; top: 0; min-width: 100%; opacity: 0.8;"
    /> -->
        <div :class="{ 'card container': true, dark: isDark, 'our-dark-card': isDark }" style="border-radius: 10px; margin-top: 100px">
            <div class="card-body row justify-content-center my-20" style="margin-top: 20px !important; margin-bottom: 20px !important">
                <!--begin: Pricing-->
                <div class="col-md-12" style="text-align: center">
                    <h1 style="font-weight: 700; font-size: 36px" :class="{ 'dark-text': isDark, 'our-custom-text': true }">
                        Millennium Projects
                    </h1>
                    <span
                        style="
              display: inline-block;
              width: 300px;
              height: 2px;
              background: #d6b75c !important;
              margin-top: 20px;
              margin-bottom: 50px;
            "
                    ></span>
                </div>
                <div class="col-md-4 col-xxl-3">
                    <div class="pt-10 pt-md-10 pb-15 px-5 text-center">
                        <!--begin::Icon-->

                        <!--end::Icon-->
                        <!--begin::Content-->
                        <img src="/reports.png" style="height: 200px; max-width: 100%" />
                        <span
                            :class="{
                                'font-size-h1 d-block font-weight-boldest py-2': true,
                                'dark-text': isDark,
                                'our-custom-text': true,
                            }"
                            style="margin-bottom: 10px;"
                            >Reports</span
                        >
                        <!-- <h4
              :class="{
                'font-size-h6 d-block font-weight-bold mb-7': true,
                'dark-text': isDark,
              }"
            >
              1 End Product License
            </h4> -->

                        <a
                            href="#"
                            class="btn btn-primary text-uppercase font-weight-bolder"
                            style="
                border-radius: 50px;
                width: 50px;
                height: 50px;
                line-height: 30px;
                text-align: center;
                background-color: #d6b75c !important;
                border-color: #d6b75c !important;
              "
                            @click="goToDirectory('Reports')"
                        >
                            <span class="svg-icon svg-icon-xl">
                                <!--begin::Svg Icon-->
                                <span data-v-0c069f5b="" class="svg-icon svg-icon-xl"
                                    ><svg data-v-0c069f5b="" version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                                        <g xmlns="http://www.w3.org/2000/svg" id="Stockholm-icons-/-Navigation-/-Arrow-right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                            <rect id="Rectangle" fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"></rect>
                                            <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "></path>
                                        </g></svg
                                ></span>
                                <!--end::Svg Icon-->
                            </span>
                        </a>
                        <!--end::Content-->
                    </div>
                </div>
                <!--end: Pricing-->
                <!--begin: Pricing-->
                <div class="col-md-4 col-xxl-3 border-x-0 border-x-md border-y border-y-md-0">
                    <div class="pt-10 pt-md-10 pb-10 px-5 text-center">
                        <!--begin::Icon-->

                        <!--end::Icon-->
                        <!--begin::Content-->
                        <img src="/analysys.png" style="height: 200px; max-width: 100%" />
                        <span
                            :class="{
                                'font-size-h1 d-block font-weight-boldest py-2': true,
                                'dark-text': isDark,
                                'our-custom-text': true,
                            }"
                            style="margin-bottom: 10px;"
                            >Analysis</span
                        >
                        <!-- <h4
              :class="{
                'font-size-h6 d-block font-weight-bold mb-7': true,
                'dark-text': isDark,
              }"
            >
              Business License
            </h4> -->

                        <a
                            href="#"
                            class="btn btn-primary text-uppercase font-weight-bolder"
                            style="border-radius: 50px;width: 50px;height: 50px;line-height: 30px;background-color: #d6b75c !important;border-color: #d6b75c !important;text-align: center;"
                            @click="goToDirectory('Analysis')"
                        >
                            <span class="svg-icon svg-icon-xl">
                                <!--begin::Svg Icon-->
                                <span data-v-0c069f5b="" class="svg-icon svg-icon-xl"
                                    ><svg data-v-0c069f5b="" version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                                        <g xmlns="http://www.w3.org/2000/svg" id="Stockholm-icons-/-Navigation-/-Arrow-right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                            <rect id="Rectangle" fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"></rect>
                                            <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "></path>
                                        </g></svg
                                ></span>
                                <!--end::Svg Icon-->
                            </span>
                        </a>
                        <!--end::Content-->
                    </div>
                </div>
                <!--end: Pricing-->
                <!--begin: Pricing-->
                <div class="col-md-4 col-xxl-3">
                    <div class="pt-10 pt-md-10 pb-10 px-5 text-center">
                        <!--begin::Icon-->

                        <!--end::Icon-->
                        <!--begin::Content-->
                        <img src="/projects.png" style="height: 200px; max-width: 100%" />
                        <span
                            :class="{
                                'font-size-h1 d-block font-weight-boldest py-2': true,
                                'dark-text': isDark,
                                'our-custom-text': true,
                            }"
                            style="margin-bottom: 10px;"
                            >Projects</span
                        >
                        <!-- <h4
              :class="{
                'font-size-h6 d-block font-weight-bold mb-7': true,
                'dark-text': isDark,
              }"
            >
              Enterprice License
            </h4> -->
                        <!-- <router-link to="/dashboard"> -->
                        <a
                            href="#"
                            class="btn btn-primary text-uppercase font-weight-bolder"
                            style="
                border-radius: 50px;
                width: 50px;
                height: 50px;
                line-height: 30px;
                background-color: #d6b75c !important;
                border-color: #d6b75c !important;
                text-align: center;
              "
                            @click="goToDirectory('Projects')"
                        >
                            <span class="svg-icon svg-icon-xl">
                                <!--begin::Svg Icon-->
                                <span data-v-0c069f5b="" class="svg-icon svg-icon-xl"
                                    ><svg data-v-0c069f5b="" version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                                        <g xmlns="http://www.w3.org/2000/svg" id="Stockholm-icons-/-Navigation-/-Arrow-right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                            <rect id="Rectangle" fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"></rect>
                                            <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "></path>
                                        </g></svg
                                ></span>
                                <!--end::Svg Icon-->
                            </span>
                        </a>
                        <!-- </router-link> -->
                        <!--end::Content-->
                    </div>
                </div>
                <div class="col-12" style="text-align: center;">
                    <a
                        href="#"
                        class="btn btn-primary text-uppercase font-weight-bolder"
                        style="border-radius: 50px;width: 53px;height: 53px;line-height: 30px;background-color: #fff !important;border-color: lightgray !important;text-align: center; padding-top: 10px;"
                        @click="onExit"
                    >
                        <span class="svg-icon svg-icon-xl">
                            <!--begin::Svg Icon-->
                            <inline-svg src="media/exit.svg" />
                            <!--end::Svg Icon-->
                        </span>
                    </a>
                </div>
                <!--end: Pricing-->
                <!-- <button @click="goToLogin">logout</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";
const remote = require('electron').remote;

export default {
    data() {
        return {
            w: remote.getCurrentWindow(), 
        };
    },
    methods: {
        goToDirectory(DirName) {
            this.$store.commit("setParentDir", DirName);
            this.$router.push("/dashboard");
        },
        goToLogin() {
            this.$store.dispatch(LOGOUT);
        },
        onExit() {
            const {app} = remote;
            app.quit();
            // console.log("close called");
            // console.log("hey");
            this.w.close()
            // var window = remote.getCurrentWindow();
            window.close();
        },
    },
    mounted() {},
    computed: {
        isDark() {
            return this.$store.getters.isDark;
        },
    },
};
</script>

<style lang="scss" scoped>
.landing-container {
    font-family: "Merriweather", serif !important;
}

.our-dark-card {
    border: 1px solid gray;
}

.our-custom-text {
    font-family: "Merriweather", serif !important;
    font-weight: normal !important;
}
</style>
