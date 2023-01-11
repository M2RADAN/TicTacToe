import { createApp } from "vue";
import "./style.css";
import "./normalize.css";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Board from "./components/Board/Board.vue";

const routes = [{ path: "/game", component: Board }];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
