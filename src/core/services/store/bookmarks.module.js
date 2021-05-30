var fs = require("fs");
import Swal from 'sweetalert2'

export const addBookmark = "addBookmark";
export const deleteBookmark = "deleteBookmark";

const state = {
  
};

const getters = {
};

const actions = {
  [addBookmark](state, payload) {
    // section : Reports, Analysis, Projects
    var reports_bookmarks_raw = fs.readFileSync("C:\\proj_MIL\\Bookmarks\\Reports.txt", "utf8");
    console.log(reports_bookmarks_raw.split("\n"));

    var reports_bookmarks_arr = reports_bookmarks_raw.split("\n");
    var reports_bookmarks = [];

    for (let i = 0; i < reports_bookmarks_arr.length; i++) {
        reports_bookmarks.push({
            title: reports_bookmarks_arr[i].split("|")[0],
            path: reports_bookmarks_arr[i].split("|")[1],
            saved_time: reports_bookmarks_arr[i].split("|")[2],
        });        
    }

    var already_present = false;

    for (let i = 0; i < reports_bookmarks.length; i++) {
        if ( reports_bookmarks[i].path == payload.path ) {
            already_present = true;
        }
    }

    if ( already_present ) {

      Swal.fire({
          icon: "warning",
          title: "Page is already Bookmarked",
          customClass: {
            popup: 'our_popup_6',
            confirmButton: 'our_confirmButton_6',
          }
      });

      document.getElementsByClassName("our_popup_6")[0].style.borderRadius = "20px";
      // document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
      // document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
      // document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

      document.getElementsByClassName("our_confirmButton_6")[0].style.backgroundColor = "#ffffff";
      document.getElementsByClassName("our_confirmButton_6")[0].style.border = "1px solid #B68C2F";
      document.getElementsByClassName("our_confirmButton_6")[0].style.padding = "8px 24px";
      document.getElementsByClassName("our_confirmButton_6")[0].style.borderRadius = "2px";
      document.getElementsByClassName("our_confirmButton_6")[0].style.color = "black";
    
    } else {

        if ( reports_bookmarks_raw.length == 0 ) {
          reports_bookmarks_raw = payload.title + "|" + payload.path + "|" + new Date();
        } else {
          reports_bookmarks_raw += "\n" + payload.title + "|" + payload.path + "|" + new Date();
        }

        fs.writeFileSync( "C:\\proj_MIL\\Bookmarks\\Reports.txt", reports_bookmarks_raw);
    
        Swal.fire({
            icon: "success",
            title: "Page Bookmarked",
            customClass: {
              popup: 'our_popup_5',
              confirmButton: 'our_confirmButton_5',
            }
        });

        document.getElementsByClassName("our_popup_5")[0].style.borderRadius = "20px";
        document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
        document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
        document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

        document.getElementsByClassName("our_confirmButton_5")[0].style.backgroundColor = "#ffffff";
        document.getElementsByClassName("our_confirmButton_5")[0].style.border = "1px solid #B68C2F";
        document.getElementsByClassName("our_confirmButton_5")[0].style.padding = "8px 24px";
        document.getElementsByClassName("our_confirmButton_5")[0].style.borderRadius = "2px";
        document.getElementsByClassName("our_confirmButton_5")[0].style.color = "black";

    }

    console.log(reports_bookmarks);

    

    // fs.writeFile(
    //     path.join(bookmarksPath+parentDir, name),
    //     content,
    //     function (err) {
    //         if (err) throw err;

    //         Swal.fire({
    //         icon: "success",
    //         title: "BookMarked ",
    //         });
    //     }
    // );

  },
  [deleteBookmark](state, payloadPath) {

    var reports_bookmarks_raw = fs.readFileSync("C:\\proj_MIL\\Bookmarks\\Reports.txt", "utf8");
    console.log(reports_bookmarks_raw.split("\n"));

    var reports_bookmarks_arr = reports_bookmarks_raw.split("\n");
    var reports_bookmarks = [];

    for (let i = 0; i < reports_bookmarks_arr.length; i++) {

        if ( payloadPath == reports_bookmarks_arr[i].split("|")[1] ) {

          reports_bookmarks_arr.splice(i, 1);
          break;

        }

    }

    console.log(reports_bookmarks_arr);

    fs.writeFileSync( "C:\\proj_MIL\\Bookmarks\\Reports.txt", reports_bookmarks_arr.join("\n"));

    Swal.fire({
        icon: "success",
        title: "BookMark deleted ",
        customClass: {
          popup: 'our_popup_5',
          confirmButton: 'our_confirmButton_5',
        }
    });

    document.getElementsByClassName("our_popup_5")[0].style.borderRadius = "20px";
    document.getElementsByClassName("swal2-success-ring")[0].style.borderColor = "#B68C2F30";
    document.getElementsByClassName("swal2-success-line-tip")[0].style.backgroundColor = "#B68C2F";
    document.getElementsByClassName("swal2-success-line-long")[0].style.backgroundColor = "#B68C2F";

    document.getElementsByClassName("our_confirmButton_5")[0].style.backgroundColor = "#ffffff";
    document.getElementsByClassName("our_confirmButton_5")[0].style.border = "1px solid #B68C2F";
    document.getElementsByClassName("our_confirmButton_5")[0].style.padding = "8px 24px";
    document.getElementsByClassName("our_confirmButton_5")[0].style.borderRadius = "2px";
    document.getElementsByClassName("our_confirmButton_5")[0].style.color = "black";

  }
};

export default {
  state,
  getters,
  actions,
};
