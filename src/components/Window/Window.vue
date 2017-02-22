<template>
    <div v-bind:style="style">
        <component v-bind:is="contents"></component>
    </div>
</template>
<script>
 import Editor from "../Editor";
 
 export default {
     name: "Window",
     computed: {
         style: function() {
             return {
                 width: this.width,
                 height: this.height
             };
         }
     },
     data: function() {
         return {
             type: Object,
             contents: this.initialContents
         };
     },
     props: {
         initialContents: {
             default: function() {
                 return Editor
             }
         },
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

</style>
