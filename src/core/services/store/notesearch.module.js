export const set_note_search_str = "";
export const set_refresh_status = "set_refresh_status";
const state = {
    note_search_str: "",
    refresh_status: false
};

const getters = {
    get_note_search_str: (state) => state.note_search_str,
    get_refresh_status: (state) => state.refresh_status
};

const actions = {
    set_refresh_status(state, value) {
        state.commit(set_refresh_status, value);
    }
}

const mutations = {
    set_note_search_str: (state, value) => {
        state.note_search_str = value;
    },
    set_refresh_status: (state, value) => {
        state.refresh_status = value;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
