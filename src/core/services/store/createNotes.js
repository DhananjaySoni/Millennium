const state = {
    note:'',
    rerender:0,
  }
  
  const getters = {
    getNote: state => state.note,
    getRerender: state => state.rerender
  }
  
  
  const mutations = {
      setNote: (state, noteText) => {
        state.note = noteText;
        console.log("Note Setter Called     " +state.note)
      },
      setRerender: state => {
        state.rerender +=1;
      }

  }
  
  export default {
    state,
    getters,
    mutations
  }

  
  