import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// The following function is meant to be attached to the projectInfo object
const mapProjectInfo = function(mappingFunc) {
    mapProjectInfoHelper(this.rootDirectory, mappingFunc);
}
const mapProjectInfoHelper = function(fileObject, mappingFunc) {
    mappingFunc(fileObject);
    if (fileObject.children) {
        fileObject.children.forEach((child) => mapProjectInfoHelper(child, mappingFunc));
    }
};

const store = new Vuex.Store({
    state: {
        credentials: null,
        projects: [],
        currentProject: null,
        currentFile: null,
        projectInfo: null,
        editor: null
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
        },
        setProjectInfo(state, projectInfo) {
            state.projectInfo = projectInfo;
            state.projectInfo.mapProjectInfo = mapProjectInfo;
        },
        setEditor(state, editor) {
            state.editor = editor;
        }
    }
});

export default store;
