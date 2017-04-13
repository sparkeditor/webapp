<template>
    <div class="appContainer">
        <div class="row menu">
            <FileMenu :menu="menu" />
        </div>
        <div class="row appWrapper">
            <div class="treeView col-2">
                <TreeView />
            </div>
            <div class="window col-10">
                <TabbedWindow :currentFile="currentFile"/>
            </div>
        </div>
    </div>
</template>
<script>
 import {mapState} from 'vuex';
 import TreeView from "../TreeView";
 import TabbedWindow from "../TabbedWindow";
 import FileMenu from "../FileMenu";
 
 export default {
     name: 'App',
     components: {
         TreeView,
         TabbedWindow,
         FileMenu
     },
     computed: {
         ...mapState([
             'currentFile'
         ])
     },
     data() {
         return {
             menu: {
                 File: {
                     "New File": () => console.log("new file"),
                     "New Directory": () => console.log("new directory"),
                     "Save": () => console.log("save")
                 },
                 Edit: {
                     "Undo": () => console.log("undo"),
                     "Redo": () => console.log("redo")
                 }
             }
         }
     }
 }
</script>
<style lang="scss">
 @import "../../scss/grid.scss";
 @import "../../scss/colors.scss";
 
 html, body {
     width: 100%;
     height: 100%;
     margin: 0;
 }
 .appContainer {
     position: fixed;
     top: 0;
     right: 0;
     height: 100%;
     width: 100%;
 }
 .appWrapper {
     height: 100%;
 }
 .treeView {
     padding: 0;
     height: 100%;
 }
 .window {
     padding: 0;
     height: 100%;
     border-left: 1px solid $heather;
 }
 .menu {
     border-bottom: 1px solid $heather;
     padding-bottom: 0.5em;
 }
</style>
