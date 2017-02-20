<template>
    <div>
        <div v-bind:style="style" class="editor"></div>
    </div>
</template>
<script>
 import 'ace'
 export default {
     name: "Editor",
     mounted: function() {
         this.editor = ace.edit(this.$el.getElementsByClassName("editor")[0]);
     },
     computed: {
         style: function() {
             return {
                 width: this.width,
                 height: this.height
             };
         }
     },
     props: {
         width: {
             type: String,
             required: true
         },
         height: {
             type: String,
             required: true
         }
     }
 }
</script>
<style>
 .editor {
     position: relative;
 }
</style>
