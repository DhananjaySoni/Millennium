const state = {
    dirName: "Reports",
};

const getters = {
    getParentDir: (state) => state.dirName,
};

const mutations = {
    setParentDir: (state, name) => {
        state.dirName = name;
        console.log("Parent Setter Called " + state.dirName);
    },
};

export default {
    state,
    getters,
    mutations,
};
