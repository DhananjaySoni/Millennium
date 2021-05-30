const state = {
    isDark: false
  }
  
  const getters = {
    isDark: state => state.isDark
  }
  
  
  const mutations = {
    toggleDarkMode: state => {
      state.isDark = !state.isDark
      console.log("darkmode toggled "+state.isDark)
    }
  }
  
  export default {
    state,
    getters,
    mutations
  }

  
  