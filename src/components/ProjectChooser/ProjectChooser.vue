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
        </div>
        <div v-else>
            <p>Please <router-link to="/login">log in</router-link> to choose a project</p>
        </div>
    </Container>
</template>
<script>
 import {mapState} from "vuex";
 import Container from "../Container";
 
 export default {
     name: "ProjectChooser",
     components: {
         Container
     },
     computed: {
         ...mapState([
             'credentials',
             'projects'
         ])
     },
     data() {
         return {
             active: null
         }
     },
     methods: {
         folderClass(project) {
             return {
                 "fa-folder": this.active !== project,
                 "fa-folder-open": this.active === project
             }
         },
         handleProjectClick(project) {
             this.$store.commit("setCurrentProject", project);
             this.$router.push("/editor");
         },
         setActive(project) {
             this.active = project;
         },
         clearActive() {
             this.active = null;
         }
     }
 }
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
</style>
