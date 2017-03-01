import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        credentials: null,
        projects: []
    },
    mutations: {
        setCredentials(state, credentials) {
            state.credentials = credentials;
        },
        setProjects(state, projects) {
            state.projects = projects;
        }
    }
});

export default store;
