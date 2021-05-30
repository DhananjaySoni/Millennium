export const setOpacity = "";
const state = {
    opacityValue: Number,
};

const getters = {
    getOpacity: (state) => state.opacityValue,
};

const mutations = {
    setOpacity: (state, value) => {
        state.opacityValue = value;
    }
};

export default {
    state,
    getters,
    mutations,
};
