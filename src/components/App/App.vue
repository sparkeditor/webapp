<template>
    <div class="appContainer">
        <PopupDialog title="Save File As" :show="showSaveAs" :buttons="saveAsButtons">
            <form>
                <div class="confirmMessage" v-if="confirmMessage"> 
                    File {{ saveAsName }} already exists! Are you sure you want to overwrite it?
                </div>
                <input v-else class="saveAsInput" type="text" v-model="saveAsName" />
                <div class="saveAsMessage" v-if="saveAsMessage !== ''">{{ saveAsMessage }}</div>
            </form>
        </PopupDialog>
        <div class="row menu">
            <FileMenu :menu="menu" />
        </div>
        <div class="row appWrapper">
            <div class="treeView col-2">
                <TreeView />
            </div>
            <div class="window col-10">
                <TabbedWindow :currentFile="currentFile"/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import path from "path";
import TreeView from "../TreeView";
import TabbedWindow from "../TabbedWindow";
import FileMenu from "../FileMenu";
import PopupDialog from "../PopupDialog";
import io from "../../socketClient";
import statusCodes from "../../statusCodes";

export default {
    name: "App",
    components: {
        TreeView,
        TabbedWindow,
        FileMenu,
        PopupDialog
    },
    computed: {
        initialSaveAsName() {
            if (!this.currentFile) {
                return "";
            }
            const filepath = this.currentFile.path;
            const projectPath = this.$store.state.projectInfo.rootDirectory
                .path;
            this.delimiter = filepath.substr(
                filepath.search(projectPath),
                filepath.search(projectPath) + projectPath.length
            );
            return filepath.substr(
                filepath.search(projectPath) + projectPath.length + 1
            );
        },
        ...mapState(["currentFile"])
    },
    data() {
        const self = this;
        return {
            confirmMessage: false,
            menu: {
                File: {
                    // TODO on create new, open a new 'untitled' buffer
                    "New File": () => console.log("new file"),
                    "New Directory": () => console.log("new directory"),
                    // TODO if current buffer is 'untitled', do a save as instead
                    Save: self.saveCurrentFile,
                    "Save As": () => {
                        self.showSaveAs = true;
                    }
                },
                Edit: {
                    Undo: () => console.log("undo"),
                    Redo: () => console.log("redo")
                }
            },
            saveAsMessage: "",
            showSaveAs: false,
            initialSaveAsButtons: [
                {
                    text: "Cancel",
                    onclick: function() {
                        self.saveAsName = self.initialSaveAsName;
                        self.showSaveAs = false;
                    }
                },
                {
                    text: "Save",
                    onclick: function() {
                        switch (self.saveAsName) {
                            case "":
                                self.saveAsMessage = "Path cannot be blank";
                                break;
                            case self.initialSaveAsName:
                                self.saveCurrentFile();
                                self.showSaveAs = false;
                                break;
                            default:
                                // Check if the path is valid
                                const pathDir = path.dirname(self.saveAsName);
                                let dirExists = false;
                                let fileExists = false;
                                const projectPath =
                                    self.$store.state.projectInfo.rootDirectory
                                        .path;
                                self.$store.state.projectInfo.mapProjectInfo(
                                    fileObject => {
                                        const fullDirPath = pathDir === "."
                                            ? projectPath
                                            : projectPath +
                                                  self.delimiter +
                                                  pathDir;
                                        if (fileObject.path === fullDirPath) {
                                            dirExists = true;
                                        }
                                        if (
                                            fileObject.path ===
                                            projectPath +
                                                self.delimiter +
                                                self.saveAsName
                                        ) {
                                            fileExists = true;
                                        }
                                    }
                                );
                                // If the directory does not exist, show an error
                                if (!dirExists) {
                                    self.saveAsMessage =
                                        "Path does not point to a valid directory. You may need to create a new directory.";
                                    break;
                                }
                                // If the file already exists, ask for confirmation
                                if (fileExists) {
                                    self.confirmMessage = true;
                                    self.saveAsButtons = [
                                        {
                                            text: "Cancel",
                                            onclick: function() {
                                                self.saveAsName =
                                                    self.initialSaveAsName;
                                                self.showSaveAs = false;
                                                self.saveAsButtons =
                                                    self.initialSaveAsButtons;
                                                self.confirmMessage = false;
                                            }
                                        },
                                        {
                                            text: "Confirm",
                                            onclick: function() {
                                                self.saveFileAs(self.saveAsName);
                                                self.showSaveAs = false;
                                                self.saveAsButtons =
                                                    self.initialSaveAsButtons;
                                                self.confirmMessage = false;
                                            }
                                        }
                                    ];
                                    break;
                                }
                                // Otherwise, save the file as a new file
                                self.saveFileAsNew(self.saveAsName);
                                self.showSaveAs = false;
                                // TODO switch current file to new filename
                                break;
                        }
                    }
                }
            ],
            saveAsButtons: [],
            saveAsName: self.initialSaveAsName,
            delimiter: "/"
        };
    },
    methods: {
        saveCurrentFile() {
            const self = this;

            io.emit(
                "write",
                {
                    file: self.currentFile.path,
                    credentials: self.$store.state.credentials
                },
                response => {
                    if (response.status !== statusCodes.OKAY) {
                        console.error(response);
                    }
                }
            );
        },
        saveFileAs(filename) {
            const self = this;

            const projectPath =
                self.$store.state.projectInfo.rootDirectory.path;
            const filepath = projectPath + this.delimiter + filename;
            io.emit(
                "write",
                {
                    file: filepath,
                    credentials: self.$store.state.credentials
                },
                response => {
                    // TODO this won't work - I need to make a new file object
                    self.$store.commit("setCurrentFile", filepath);
                    if (response.status !== statusCodes.OKAY) {
                        console.error(response);
                    }
                }
            );
        }
    },
    mounted() {
        this.saveAsButtons = this.initialSaveAsButtons;
    },
    watch: {
        initialSaveAsName() {
            this.saveAsName = this.initialSaveAsName;
        }
    }
};
</script>
<style lang="scss">
 @import "../../scss/grid.scss";
 @import "../../scss/colors.scss";
 
 html, body {
     width: 100%;
     height: 100%;
     margin: 0;
     font-family: "Open Sans", arial, sans-serif;
 }
 .appContainer {
     position: fixed;
     top: 0;
     right: 0;
     height: 100%;
     width: 100%;
 }
 .appWrapper {
     height: 100%;
 }
 .treeView {
     padding: 0;
     height: 100%;
 }
 .window {
     padding: 0;
     height: 100%;
     border-left: 1px solid $heather;
 }
 .menu {
     border-bottom: 1px solid $heather;
     padding-bottom: 0.5em;
 }
 .saveAsInput {
    border: none;
    border-bottom: 2px solid $sterling;
    box-shadow: none;
    width: 80%;
    margin-bottom: 1.5em;
    padding: 5px;
    font-size: 1.2rem;
    background-color: $cream;
 }
 .saveAsInput:focus {
     outline: none;
     border-bottom: 2px solid $raven;
 }
 .confirmMessage {
     margin-bottom: 1.5em;
     font-family: "Open Sans", arial, sans-serif;
     font-size: 1.2rem;
 }
</style>
