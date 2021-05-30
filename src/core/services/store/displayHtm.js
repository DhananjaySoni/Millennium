export const setHtmPath = "";
const state = {
  htmFilePath: "",
  fileName:""
};

const getters = {
  getHtmPath: state => state.htmFilePath,
  getFileName: state => state.fileName
};

const mutations = {
  setHtmPath: (state, recivedHtmPath) => {
    state.htmFilePath = recivedHtmPath;
    console.log("File Setter  " + state.htmFilePath);
  },
  setFileName: (state, receivedFileName) => {
    state.fileName = receivedFileName;
    console.log("File Name Setter "+ receivedFileName);
  }
};

export default {
  state,
  getters,
  mutations,
};
