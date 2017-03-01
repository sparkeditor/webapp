import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "./store";
import App from './components/App';
import Login from './components/Login';

Vue.use(VueRouter);

const routes = [
    {path: "/", redirect: () => {
        // TODO if there is a user in a cookie/web worker, redirect to app
        return "/login";
    }},
    {path: "/login", component: Login},
    {path: "/app", component: App}
];

const router = new VueRouter({
    mode: "history",
    routes
});

new Vue({
    router,
    store
}).$mount('#app');
