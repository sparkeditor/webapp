<template>
    <Container>
        <h1>Create Account</h1>
        <div class="createAccount">
            <form @submit.prevent="handleSubmit">
                <label for="username" hidden>Username</label>
                <input type="text" name="username" placeholder="New Username" @input="input" v-model="username"/>
                <br>
                <label for="password" hidden>Password</label>
                <input type="password" name="password" placeholder="New Password" @input="input" v-model="password"/>
                <br>
                <label for="confirmPassword" hidden>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" @input="input" v-model="confirmPassword"/>
                <br>
                <input type="submit" name="submit" value="Create Account" />
            </form>
            <div class="errorMessage" v-if="!passwordsMatch">
                <p>Passwords must match.</p>
            </div>
            <div class="errorMessage" v-if="eexistError">
                <p>User {{ username  }} already exists.</p>
            </div>
            <div class="errorMessage" v-if="serverError">
                <p>Sorry, something went wrong! Try again later.</p>
            </div>
        </div>
    </Container>
</template>
<script>
 import Container from "../Container.vue";
 import io from "../../socketClient";
 import statusCodes from "../../statusCodes";
 
 export default {
     name: "CreateAccount",
     components: {
         Container
     },
     data: function() {
         return {
             username: "",
             password: "",
             confirmPassword: "",
             eexistError: false,
             serverError: false
         }
     },
     computed: {
         passwordsMatch() {
             return this.password == this.confirmPassword;
         }
     },
     methods: {
         input(event) {
             this.eexistError = false;
             this.serverError = false;
         },
         handleSubmit(event) {
             if (!this.passwordsMatch) {
                 return;
             }
             const self = this;
             const formData = new FormData(event.target);
             const username = formData.get("username");
             const password = formData.get("password");
             io.emit("createUser", {username: username, password: password}, function(result) {
                 if (result.status === statusCodes.OKAY) {
                     self.$router.push("/login");
                 }
                 else if (result.status === statusCodes.EEXIST) {
                     self.eexistError = true;
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
 
 .createAccount {
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
</style>
