<template>
    <div class="tabbedWindow">
        <Editor />
    </div>
</template>
<script>
 import Editor from "../Editor";
 
 export default {
     name: "TabbedWindow",
     components: {
         Editor
     }
 }
</script>
<style lang="scss" scoped>
 .tabbedWindow {
     width: 100%;
     height: 100%;
 }
</style>
