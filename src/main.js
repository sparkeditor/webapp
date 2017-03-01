import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './components/App';
import Login from './components/Login';

Vue.use(Vuex);
Vue.use(VueRouter);

const routes = [
    {path: "/", redirect: () => {
        // TODO if there is a user in a cookie/web worker, redirect to app
        return "/login";
    }},
    {path: "/login", component: Login},
    {path: "/app", component: App}
];

const router = new VueRouter({ routes });

new Vue({
    router
}).$mount('#app');
