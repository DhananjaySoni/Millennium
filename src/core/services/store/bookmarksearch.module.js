export const set_search_str = "";
const state = {
    search_str: "",
};

const getters = {
    get_search_str: (state) => state.search_str,
};

const mutations = {
    set_search_str: (state, value) => {
        state.search_str = value;
    }
};

export default {
    state,
    getters,
    mutations,
};
