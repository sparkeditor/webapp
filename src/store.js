import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        credentials: null,
        projects: [],
        currentProject: null
    },
    mutations: {
        setCredentials(state, credentials) {
            state.credentials = credentials;
        },
        setProjects(state, projects) {
            state.projects = projects;
        },
        setCurrentProject(state, project) {
            state.currentProject = project;
        }
    }
});

export default store;
