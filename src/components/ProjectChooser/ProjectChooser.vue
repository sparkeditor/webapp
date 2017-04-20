<template>
    <Container>
        <h1>Choose Project</h1>
        <div class="projectChooser" v-if="credentials && credentials.username && credentials.password">
            <ul>
                <li v-for="project in projects">
                    <button class="projectButton"
                            @click.prevent="handleProjectClick(project)"
                            @mouseover="setActive(project)"
                            @mouseleave="clearActive()"
                    >
                        <i class="fa fa-lg" :class="folderClass(project)" aria-hidden="true"></i>
                        <span>{{ project.name }}</span>
                    </button>
                </li>
            </ul>
            <button class="createProjectButton" @click.prevent="handleNewProjectClick"
                    v-if="shouldShowNewProjectButton">
                <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                <span>Create New Project</span>
            </button>
            <router-view></router-view>
        </div>
        <div v-else>
            <p>Please <router-link to="/login">log in</router-link> to choose a project</p>
        </div>
    </Container>
</template>
<script>
import { mapState } from "vuex";
import Container from "../Container";
import io from "../../socketClient";
import statusCodes from "../../statusCodes";

export default {
    name: "ProjectChooser",
    components: {
        Container
    },
    computed: {
        shouldShowNewProjectButton() {
            if (this.$route.path === "/projects/new") {
                return false;
            } else {
                return this.showNewProjectButton;
            }
        },
        ...mapState(["credentials", "projects"])
    },
    created() {
        const self = this;

        if (!this.credentials) {
            const storedCredentials = localStorage.getItem("credentials");
            const storedProjects = localStorage.getItem("projects");
            if (storedCredentials && storedProjects) {
                const credentials = JSON.parse(storedCredentials);
                const projects = JSON.parse(storedProjects);
                this.$store.commit("setCredentials", credentials);
                this.$store.commit("setProjects", projects);
            }
        } else {
            io.emit(
                "authorize",
                { credentials: this.credentials },
                response => {
                    if (response.status === statusCodes.OKAY) {
                        self.$store.commit("setCredentials", self.credentials);
                        self.$store.commit("setProjects", response.projects);
                        localStorage.setItem(
                            "credentials",
                            JSON.stringify(self.credentials)
                        );
                        localStorage.setItem(
                            "projects",
                            JSON.stringify(response.projects)
                        );
                    } else if (response.status === statusCodes.ACCESS_DENIED) {
                        self.$router.push("401");
                    } else {
                        console.error(response);
                    }
                }
            );
        }
    },
    data() {
        return {
            active: null,
            showNewProjectButton: true
        };
    },
    methods: {
        folderClass(project) {
            return {
                "fa-folder": this.active !== project,
                "fa-folder-open": this.active === project
            };
        },
        handleProjectClick(project) {
            this.$store.commit("setCurrentProject", project);
            localStorage.setItem("currentProject", JSON.stringify(project));
            this.$router.push("/editor");
        },
        setActive(project) {
            this.active = project;
        },
        clearActive() {
            this.active = null;
        },
        handleNewProjectClick() {
            this.showNewProjectButton = false;
            this.$router.push("/projects/new");
        }
    },
    watch: {
        $route(to, from) {
            if (to.path === "/projects") {
                this.showNewProjectButton = true;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
 @import "../../scss/colors.scss";
 
 .projectChooser {
     margin: auto;
     width: 350px;
 }
 ul {
     list-style: none;
     padding-left: 0;
 }
 i {
     padding-right: 5px;
 }
 .projectButton {
     width: 100%;
     box-sizing: border-box;
     text-align: left;
     box-shadow: none;
     color: $cream;
     line-height: 2;
     border: none;
     background-color: $slate;
 }
 .projectButton i, .projectButton span {
     color: $cream;
 }
 .projectButton:hover {
     background-color: $teal;
     cursor: pointer;
 }
 .createProjectButton {
     width: 100%;
     box-sizing: border-box;
     text-align: left;
     box-shadow: none;
     color: $raven;
     line-height: 2;
     border: none;
     background-color: $yellow;
 }
 .createProjectButton i, .createProjectButton span {
     color: $raven;
 }
 .createProjectButton:hover {
     background-color: $teal;
     cursor: pointer;
 }
</style>
