<template>
    <div class="appContainer">
        <TreeView />
        <TabbedWindow />
    </div>
</template>
<script>
 import TreeView from "../TreeView";
 import TabbedWindow from "../TabbedWindow";
 
 export default {
     name: 'App',
     components: {
         TreeView,
         TabbedWindow
     }
 }
</script>
<style lang="scss" scoped>
 .appContainer {
     position: fixed;
     top: 0;
     right: 0;
     height: 100%;
     width: 100%;
 }
</style>
