<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label for="projectName" hidden>Project Name</label>
            <input v-model="projectName" type="text" name="projectName"
                   placeholder="Project Name" @input="input" />
            <br>
            <button type="submit" name="submit" value="Create Project" :disabled="projectName == ''">
                Create Project
            </button>
            <button type="button" @click="cancel">Cancel</button>
        </form>
        <div class="errorMessage">
            <p v-if="serverError">Sorry, something went wrong! Try again later.</p>
            <p v-if="eexistError">Project {{ projectName }} already exists.</p>
            <p v-if="authError">
                Authentication error. Please <router-link to="/login">log in</router-link>.
            </p>
        </div>
    </div>
</template>
<script>
import io from "../../socketClient";
import statusCodes from "../../statusCodes";

export default {
    name: "ProjectCreator",
    data() {
        return {
            projectName: "",
            serverError: null,
            eexistError: null,
            authError: null
        };
    },
    methods: {
        cancel() {
            this.$router.push("/projects");
        },
        handleSubmit(event) {
            const self = this;
            const credentials = self.$store.state.credentials;
            io.emit(
                "createProject",
                { credentials: credentials, projectName: self.projectName },
                function(response) {
                    if (response.status === statusCodes.OKAY) {
                        self.$store.commit("addProject", response.project);
                        self.$store.commit(
                            "setCurrentProject",
                            response.project
                        );
                        localStorage.setItem(
                            "projects",
                            JSON.stringify(self.$store.state.projects)
                        );
                        localStorage.setItem(
                            "currentProject",
                            JSON.stringify(response.project)
                        );
                        self.$router.push("/editor");
                    } else if (response.status === statusCodes.ACCESS_DENIED) {
                        self.authError = true;
                    } else if (response.status === statusCodes.EEXIST) {
                        self.eexisterror = true;
                    } else {
                        self.serverError = true;
                    }
                }
            );
        },
        input(event) {
            this.serverError = null;
            this.eexistError = null;
            this.authError = null;
        }
    }
};
</script>
<style lang="scss" scoped>
 @import "../../scss/colors.scss";
 
 form {
     width: 350px;
     box-sizing: border-box;
     text-align: left;
 }
 input, button {
     border: none;
     box-shadow: none;
 }
 input[type="text"] {
     background-color: $cream;
     width: 100%;
     box-sizing: border-box;
     margin-right: 0;
     border-bottom: 2px solid $sterling;
 }
 input[type="text"]:focus {
     outline: none;
     border-bottom: 2px solid $raven;
 }
 button {
     line-height: 2;
     width: 100%;
     background-color: $yellow;
     box-sizing: border-box;
 }
 button:focus {
     outline: none;
 }
 button:disabled, button:disabled:hover {
     background-color: $sterling;
     cursor: auto;
 }
 button:hover {
     background-color: $teal;
     cursor: pointer;
 }
</style>
