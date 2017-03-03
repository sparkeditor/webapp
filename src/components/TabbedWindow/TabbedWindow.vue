<template>
    <div class="tabbedWindow">
        <Editor :content="currentContent" />
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
             if (this.currentFile) {
                 return this.files[this.currentFile] || "";
             }
             else return "";
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
         // filepath of the current file
         currentFile: String
     },
     watch: {
         currentFile() {
             const self = this;
             self.loading = true;
             if (self.currentFile && self.currentFile !== "") {
                 const credentials = self.$store.state.credentials;
                 io.emit("open",
                         {credentials: credentials, file: self.currentFile},
                         function(response) {
                             self.loading = false;
                             if (response.status === statusCodes.OKAY) {
                                 self.authError = false;
                                 self.serverError = false;
                                 const newFileListing = {};
                                 newFileListing[self.currentFile] = response.contents;
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
