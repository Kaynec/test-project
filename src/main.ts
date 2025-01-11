import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";

import Notifications from "notiwind";

createApp(App).use(router).use(Notifications).mount("#app");
