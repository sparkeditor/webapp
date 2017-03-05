<template>
    <div class="editor"></div>
</template>
<script>
 import ace from "brace";
 import "brace/ext/modelist";
 import languages from "./languages";

 const modelist = ace.acequire("ace/ext/modelist");
 
 export default {
     name: "Editor",
     mounted: function() {
         this.editor = ace.edit(this.$el);
         this.editor.setOptions({
             fontSize: "0.9rem"
         });
         this.editor.$blockScrolling = Infinity;
         this.setContent(this.content);
     },
     data() {
         return {
             editor: null
         }
     },
     methods: {
         setContent(content) {
             if (this.path && this.path !== "") {
                 const language = modelist.getModeForPath(this.path);
                 if (language && language.mode) {
                     this.editor.getSession().setMode(language.mode);
                 }
             }
             this.editor.setValue(content);
             this.editor.gotoLine(0);
         }
     },
     props: {
         content: {
             type: String,
             required: true
         },
         path: String
     },
     watch: {
         content() {
             this.setContent(this.content);
         }
     }
 }
</script>
<style lang="scss" scoped>
 .editor {
     position: relative;
     width: 100%;
     height: 100%;
 }
</style>
