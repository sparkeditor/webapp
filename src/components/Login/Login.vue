<template>
    <Container>
        <h1>Spark Editor</h1>
        <div class="login">
            <form id="form" @submit.prevent="handleSubmit">
                <label for="username" hidden>Username</label>
                <input type="text" name="username" placeholder="Username" @input="input"/>
                <br>
                <label for="password" hidden>Password</label>
                <input type="password" name="password" placeholder="Password" @input="input"/>
                <br>
                <input type="submit" name="submit" value="Log In" />
            </form>
            <div class="errorMessage" v-if="error">
                <p>The username or password you entered is incorrect.</p>
            </div>
            <div class="errorMessage" v-if="serverError">
                <p>Sorry, something went wrong! Try again later.</p>
            </div>
        </div>
    </Container>
</template>
<script>
 import Container from "../Container";
 import io from "../../socketClient";
 
 export default {
     name: "Login",
     components: {
         Container
     },
     data: function() {
         return {
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
             const formData = new FormData(event.target);
             const credentials = {
                 username: formData.get("username"),
                 password: formData.get("password")
             };
             io.emit("authorize", {credentials: credentials}, function(result) {
                 if (result.status === "ACCESS_DENIED") {
                     self.error = true;
                 }
                 else if (result.status === "OKAY") {
                     console.log(result.projects)
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
 .errorMessage p {
     color: $red;
 }
</style>
