<template>
    <div class="treeView">
        <div v-if="projectInfo" class="tree">
            <TreeItem :name="projectInfo.rootDirectory.name"
                      :type="projectInfo.rootDirectory.type"
                      :path="projectInfo.rootDirectory.path"
                      :children="projectInfo.rootDirectory.children"
                      :ignored="projectInfo.rootDirectory.ignored"
                      :startExpanded="true"
            />
        </div>
        <div class="loading" v-if="loading">
            <i class="fa fa-lg fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import io from "../../socketClient";
import statusCodes from "../../statusCodes";
import TreeItem from "./TreeItem";

export default {
    name: "TreeView",
    computed: {
        ...mapState(["credentials", "currentProject"])
    },
    components: {
        TreeItem
    },
    data() {
        return {
            loading: false,
            projectInfo: null,
            authError: false,
            serverError: false
        };
    },
    mounted() {
        const self = this;
        this.loading = true;

        if (!this.credentials || !this.currentProject) {
            return;
        }

        io.emit(
            "openProject",
            {
                credentials: this.credentials,
                projectId: this.currentProject.id
            },
            function(response) {
                self.loading = false;
                if (response.status === statusCodes.OKAY) {
                    self.$store.commit("setProjectInfo", response.projectInfo);
                    self.projectInfo = self.$store.state.projectInfo;
                } else if (response.status === statusCodes.ACCESS_DENIED) {
                    self.authError = true;
                } else {
                    self.serverError = true;
                }
            }
        );
        io.on("create", function(data) {
            if (data.projectId === self.currentProject.id) {
                self.$store.commit("addFileToProjectInfo", {
                    filename: data.file
                });
            }
        });
        io.on("createDir", function(data) {
            if (data.projectId === self.currentProject.id) {
                self.$store.commit("addFileToProjectInfo", {
                    filename: data.directory,
                    isDir: true
                });
            }
        });
    }
};
</script>
<style lang="scss" scoped>
 @import "../../scss/colors.scss";
 
 ::-webkit-scrollbar {
     width: 12px;
 }
 ::-webkit-scrollbar-track {
     background-color: $cream;
 }
 ::-webkit-scrollbar-thumb {
     background-color: $heather;
 }
 .treeView {
     width: 100%;
     height: 100%;
     overflow-y: scroll;
 }
 .tree {
     margin-top: .5rem;
     margin-left: .5rem;
 }
 .loading {
     margin-top: 1.5rem;
 }
</style>
