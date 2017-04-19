<template>
    <Container>
        <h1>Spark Editor</h1>
        <div class="login">
            <form @submit.prevent="handleSubmit">
                <label for="username" hidden>Username</label>
                <input type="text" name="username" placeholder="Username"
                       v-model="username" @input="input"/>
                <br>
                <label for="password" hidden>Password</label>
                <input type="password" name="password" placeholder="Password"
                       v-model="password" @input="input"/>
                <br>
                <input type="submit" name="submit" value="Log In" />
            </form>
            <div class="errorMessage" v-if="error">
                <p>Incorrect username or password.</p>
            </div>
            <div class="errorMessage" v-if="serverError">
                <p>Sorry, something went wrong! Try again later.</p>
            </div>
            <div class="createAccountLink">
                <p>
                    Don't have an account? <router-link to="/create-account">Sign up</router-link>!
                </p>
            </div>
        </div>
    </Container>
</template>
<script>
 import Container from "../Container";
 import statusCodes from "../../statusCodes";
 import io from "../../socketClient";
 
 export default {
     name: "Login",
     components: {
         Container
     },
     data: function() {
         return {
             username: null,
             password: null,
             error: false,
             serverError: false
         }
     },
     methods: {
         input(event) {
             this.error = false;
             this.serverError = false;
         },
         handleSubmit(event) {
             const self = this;
             const credentials = {
                 username: self.username,
                 password: self.password
             };
             io.emit("authorize", {credentials: credentials}, function(result) {
                 if (result.status === statusCodes.OKAY) {
                     self.$store.commit("setCredentials", credentials);
                     self.$store.commit("setProjects", result.projects);
                     localStorage.setItem("credentials", JSON.stringify(credentials));
                     localStorage.setItem("projects", JSON.stringify(result.projects));
                     self.$router.push("/projects");
                 }
                 else if (result.status === statusCodes.ACCESS_DENIED) {
                     self.error = true;
                 }
                 else {
                     self.serverError = true;
                 }
             });
         }
     }
 }
</script>
<style lang="scss" scoped>
 @import "../../scss/colors.scss";
 
 .login {
     width: 350px;
     text-align: left;
     margin: auto;
     margin-top: 1.5em;
 }
 input {
     padding-left: 5px;
     width: 100%;
     box-sizing: border-box;
     box-shadow: none;
 }
 input:focus {
     outline: none;
 }
 input[type="text"], input[type="password"] {
     background-color: $cream;
     border: none;
     border-bottom: 2px solid $sterling;
     box-shadow: none;
 }
 input[type="text"]:focus, input[type="password"]:focus {
     border-bottom: 2px solid $raven;
 }
 input[type="submit"] {
     margin-top: 2em;
     line-height: 2;
     border: none;
     color: $cream;
     background-color: $slate;
 }
 input[type="submit"]:hover {
     background-color: $teal;
 }
 .errorMessage {
     text-align: center;
 }
 .errorMessage p {
     color: $red;
 }
 .createAccountLink {
     text-align: center;
 }
</style>
