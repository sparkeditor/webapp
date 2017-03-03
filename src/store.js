import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        credentials: null,
        projects: [],
        currentProject: null,
        currentFile: null
    },
    mutations: {
        setCredentials(state, credentials) {
            state.credentials = credentials;
        },
        addProject(state, project) {
            state.projects.push(project);
        },
        setProjects(state, projects) {
            state.projects = projects;
        },
        setCurrentProject(state, project) {
            state.currentProject = project;
        },
        setCurrentFile(state, file) {
            state.currentFile = file;
        }
    }
});

export default store;
