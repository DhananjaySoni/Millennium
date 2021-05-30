export const setSize = "";
const state = {
    sizeValue: Number,
};

const getters = {
    getSize: (state) => state.sizeValue,
};

const mutations = {
    setSize: (state, value) => {
        state.sizeValue = value;
    }
};

export default {
    state,
    getters,
    mutations,
};
