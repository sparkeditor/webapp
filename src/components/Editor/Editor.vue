<template>
    <div class="editor"></div>
</template>
<script>
 import 'ace'
 
 export default {
     name: "Editor",
     mounted: function() {
         this.editor = ace.edit(this.$el);
     }
 }
</script>
<style>
 .editor {
     position: relative;
     width: 100%;
     height: 100%;
 }
</style>
