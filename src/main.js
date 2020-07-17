import Vue from "vue"
import App from "./App";
import VUpdateRefresherPlugin from './index';

Vue.use(VUpdateRefresherPlugin, {}); //, {versionURL: "http://localhost:8000/version"});

new Vue({
    render: h=> h(App)
}).$mount("#app");