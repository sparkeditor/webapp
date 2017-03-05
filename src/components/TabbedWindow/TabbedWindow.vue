<template>
    <div class="tabbedWindow">
        <Editor :content="currentContent" :path="currentFilePath"/>
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
             if (this.currentFile && this.currentFile.path) {
                 return this.files[this.currentFile.path] || "";
             }
             else return "";
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
             files: {}
         }
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
                                 newFileListing[self.currentFile.path] = response.contents;
                                 self.files = Object.assign(
                                     {},
                                     self.files,
                                     newFileListing
                                 );
                             }
                             else if (response.status === statusCodes.ACCESS_DENIED) {
                                 self.authError = true;
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
 .tabbedWindow {
     width: 100%;
     height: 100%;
 }
</style>
