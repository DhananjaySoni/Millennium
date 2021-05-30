import Vue from "vue";
import Vuex from "vuex";
import dark from  "./darkmod"
import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import displayHtm from  "./displayHtm"
import opacity from  "./opacitySetter"
import size from  "./fontSizeSetter"
import notes from  "./createNotes"
import customstore from "./customstore.module";
import connection from "./connection.module";
import parent from "./parentDirectory";
import bookmarks from "./bookmarks.module";
import bookmarksearch from "./bookmarksearch.module";
import notesearch from "./notesearch.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    dark,
    displayHtm,
    opacity,
    size,
    notes,
    connection,
    customstore,
    parent,
    bookmarks,
    bookmarksearch,
    notesearch
  }
});
