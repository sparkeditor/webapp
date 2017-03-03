<template>
    <div class="treeView">
        <div v-if="projectInfo" class="tree">
            <TreeItem :name="projectInfo.rootDirectory.name"
                      :type="projectInfo.rootDirectory.type"
                      :children="projectInfo.rootDirectory.children"
                      :ignored="projectInfo.rootDirectory.ignored"
                      :startExpanded="true"
            />
        </div>
        <div v-if="loading">
            <i class="fa fa-lg fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script>
 import {mapState} from "vuex";
 import io from "../../socketClient";
 import statusCodes from "../../statusCodes";
 import TreeItem from "./TreeItem";
 
 export default {
     name: "TreeView",
     computed: {
         ...mapState([
             'credentials',
             'currentProject'
         ])
     },
     components: {
         TreeItem
     },
     data() {
         return {
             loading: false,
             projectInfo: null,
             authError: false,
             serverError:  false
         }
     },
     mounted() {
         const self = this;
         this.loading = true;
         io.emit("openProject",
                 { credentials: this.credentials, projectId: this.currentProject.id },
                 function(response) {
                     self.loading = false;
                     if (response.status === statusCodes.OKAY) {
                         self.projectInfo = response.projectInfo;
                     }
                     else if (response.status === statusCodes.ACCESS_DENIED) {
                         self.authError = true;
                     }
                     else {
                         self.serverError = true;
                     }
                 });
     }
 }
</script>
<style lang="scss" scoped>
 .treeView {
     width: 350px;
     height: 100%;
     overflow-y: scroll;
     overflow-x: visible;
 }
 .tree {
     margin-top: .5rem;
     margin-left: .5rem;
 }
</style>
