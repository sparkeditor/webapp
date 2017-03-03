<template>
    <div class="appContainer">
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
 
 export default {
     name: 'App',
     components: {
         TreeView,
         TabbedWindow
     },
     computed: {
         ...mapState([
             'currentFile'
         ])
     }
 }
</script>
<style lang="scss">
 @import "../../scss/grid.scss";
 
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
 }
</style>
