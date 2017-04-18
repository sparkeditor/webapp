<template>
    <div class="tabbedWindow">
        <div class="tabs" :style="tabsStyle">
            <!-- Eventually there will be a v-for in here, but for now only the current file gets a tab -->
            <div class="tab">{{ currentFileName }}</div>
        </div>
        <Editor class="editor"
                :content="currentContent" 
                :path="currentFilePath" 
                :clients="currentFileClients"
                @change="computeTabsStyle"
        />
    </div>
</template>
<script>
 import io from "../../socketClient";
 import statusCodes from "../../statusCodes";
 import Editor from "../Editor";
 
 export default {
     name: "TabbedWindow",
     components: {
         Editor
     },
     computed: {
         currentContent() {
             if (this.currentFile && this.currentFile.path && this.files[this.currentFile.path]) {
                 return this.files[this.currentFile.path].contents || "";
             }
             else return "";
         },
         currentFileClients() {
             if (this.currentFile && this.currentFile.path && this.files[this.currentFile.path]) {
                 return this.files[this.currentFile.path].clients || {};
             }
             else return {};
         },
         currentFileName() {
             if (this.currentFile) {
                 return this.currentFile.path.replace(/^.*?([^\\\/]*)$/, '$1');
             }
             else {
                 return "untitled";
             }
         },
         currentFilePath() {
             if (this.currentFile) {
                 return this.currentFile.path;
             }
             else {
                 return "";
             }
         }
    },
     data() {
         return {
             authError: false,
             serverError: false,
             loading: false,
             // files maps filepaths to contents
             files: {},
             tabsStyle: {}
         }
     },
     methods: {
         computeTabsStyle() {
             var $gutter = document.getElementsByClassName("ace_gutter")[0];
             var left = $gutter ? $gutter.offsetWidth : 50;
             this.tabsStyle = {
                 left: left + "px"
             };
         }
     }, 
     mounted() {
         this.computeTabsStyle();
     },
     props: {
         // current file object
         currentFile: Object
     },
     watch: {
         currentFile() {
             const self = this;
             self.loading = true;
             if (self.currentFile && self.currentFile.path) {
                 const credentials = self.$store.state.credentials;
                 io.emit("open",
                         {credentials: credentials, file: self.currentFile.path},
                         function(response) {
                             self.loading = false;
                             if (response.status === statusCodes.OKAY) {
                                 self.authError = false;
                                 self.serverError = false;
                                 const newFileListing = {};
                                 newFileListing[self.currentFile.path] = {
                                     contents: response.contents,
                                     clients: response.clients
                                 }
                                 self.files = Object.assign(
                                     {},
                                     self.files,
                                     newFileListing
                                 );
                             }
                             else if (response.status === statusCodes.ACCESS_DENIED) {
                                 self.authError = true;
                             }
                             else if (response.status === statusCodes.ENOENT) {
                                 // TODO
                                 console.error(response);
                             }
                             else if (response.status === statusCodes.ERROR) {
                                 self.serverError = true;
                             }
                         });
                                                
             }
         }
     }
 }
</script>
<style lang="scss" scoped>
 @import "../../scss/colors.scss";

 .tabbedWindow {
     width: 100%;
     height: 100%;
 }
 .editor {
     border-top: 1px solid $heather;
 }
 .tabs {
     text-align: left;
     position: relative;
 }
 .tabs > .tab {
     padding: 0.5em;
     width: 150px;
     border-left: 1px solid $heather;
     border-right: 1px solid $heather;
     text-align: center;
     font-family: "Open Sans", arial, sans-serif;
 }
</style>
