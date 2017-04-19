import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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
            // Calls mappingFunc on each file item in the projectInfo
            const mapProjectInfo = function(mappingFunc) {
                mapProjectInfoHelper(this.rootDirectory, mappingFunc);
            }
            const mapProjectInfoHelper = function(fileObject, mappingFunc) {
                mappingFunc(fileObject);
                if (fileObject.children) {
                    fileObject.children.forEach((child) => mapProjectInfoHelper(child, mappingFunc));
                }
            };

            state.projectInfo = projectInfo;
            state.projectInfo.mapProjectInfo = mapProjectInfo;
        },
        addFileToProjectInfo(state, payload) {
            const filename = payload.filename;
            const isDir = payload.isDir;
            const delimiter = state.projectInfo.delimiter;
            const newState = Object.assign({}, state);

            const insertNewFileHelper = function(fileObject, filename, isDir) {
                const filepath = state.projectInfo.rootDirectory.path + 
                                 state.projectInfo.delimiter +
                                 filename;
                // If the filepath is the path of this file, return
                if (fileObject.path === filepath) {
                    return;
                }
                // If the filepath suggests the the new file is a child of this file,
                // create the next file in the chain and recurse
                if (filepath.search(fileObject.path) === 0) {
                    const remainingPath = filepath.substr(fileObject.path.length + 1);
                    const remainingPathParts = remainingPath.split(/[\/\\]/);
                    if (remainingPathParts.length === 1) {
                        const newFile = {
                            name: remainingPathParts[0],
                            path: fileObject.path + delimiter + remainingPathParts[0]
                        }
                        // Figure out whether to create a file or directory
                        if (isDir) {
                            newFile.type = 'directory';
                        }
                        const childrenLength = fileObject.children.push(newFile);
                        // Recurse to reach base case
                        insertNewFileHelper(fileObject.children[childrenLength - 1], filepath, isDir);
                    }
                    else {
                        // Create a new directory and recurse
                        const childrenLength = fileObject.children.push({
                            name: remainingPathParts[0],
                            path: fileObject.path + delimiter + remainingPathParts[0], 
                            type: 'directory'
                        });
                        insertNewFileHelper(fileObject.children[childrenLength - 1], filepath, isDir);
                    }
                }
            }
            insertNewFileHelper(newState.projectInfo.rootDirectory, filename, isDir);
            state = newState;
        },
        setEditor(state, editor) {
            state.editor = editor;
        }
    }
});

export default store;
