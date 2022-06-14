import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { appAxios } from "@/utils/appAxios";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')

// app.config.globalProperties.$appAxios = appAxios;


// createApp(App).use(router).mount('#app')