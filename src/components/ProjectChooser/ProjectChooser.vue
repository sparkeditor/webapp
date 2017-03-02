<template>
    <Container>
        <h1>Choose Project</h1>
        <div v-if="credentials && credentials.username && credentials.password">
            <ul>
                <li v-for="project in projects">
                    <button @click.prevent="handleProjectClick(project)">{{ project.name }}</button>
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
     computed: mapState([
         'credentials',
         'projects'
     ]),
     methods: {
         handleProjectClick(project) {
             this.$store.commit("setCurrentProject", project);
             this.$router.push("/editor");
         }
     }
 }
</script>
<style lang="scss" scoped>

</style>
