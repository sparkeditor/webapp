<template>
    <div class="editor"></div>
</template>
<script>
 import 'ace'
 
 export default {
     name: "Editor",
     mounted: function() {
         this.editor = ace.edit(this.$el);
         this.editor.$blockScrolling = Infinity;
         this.editor.setValue(this.content);
     },
     data() {
         return {
             editor: null
         }
     },
     props: {
         content: {
             type: String,
             required: true
         }
     },
     watch: {
         content() {
             this.editor.setValue(this.content);
             this.editor.gotoLine(0);
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
