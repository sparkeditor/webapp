import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import App from "./components/App";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import ProjectChooser from "./components/ProjectChooser";
import ProjectCreator from "./components/ProjectCreator";
import CreateAccount from "./components/CreateAccount";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: () => {
            if (localStorage.getItem("credentials")) {
                return "/projects";
            } else {
                return "/login";
            }
        }
    },
    { path: "/login", component: Login },
    { path: "/create-account", component: CreateAccount },
    {
        path: "/projects",
        component: ProjectChooser,
        children: [{ path: "new", component: ProjectCreator }]
    },
    { path: "/editor", component: App },
    { path: "/401", component: Unauthorized },
    {
        path: "/logout",
        redirect: () => {
            localStorage.clear();
            store.commit("setCredentials", null);
            store.commit("setCurrentProject", null);
            store.commit("setProjects", null);
            return "/login";
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

new Vue({
    router,
    store
}).$mount("#app");
