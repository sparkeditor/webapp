<template>
    <div class="editor"></div>
</template>
<script>
 import ace from "brace";
 import languages from "./languages";
 
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
             if (this.extension) {
                 const language = languages[this.extension];
                 if (language) {
                     this.editor.getSession().setMode("ace/mode/" + language);
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
         extension: String
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
